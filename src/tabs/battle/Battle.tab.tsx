import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createCompletions } from "../../api/open-ai";
import { criticizeUserRequest } from "../../api/llama-rally";
import { useModelsStore } from "../../stores/models.store";
import { usePromptStore } from "../../stores/prompt.store";

export function Battle() {
  const promptStore = usePromptStore();

  const models = useModelsStore();

  const hasResponses = models.modelA.response || models.modelB.response;

  const [loading, setLoading] = useState(false);

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    promptStore.setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // const res = await criticizeUserRequest(prompt);
      // console.log("res", res);
      await Promise.all([
        models.fetchModelAResponse(promptStore.prompt),
        models.fetchModelBResponse(promptStore.prompt),
      ]);
    } catch (error) {
      console.error("Error fetching responses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (vote: string) => {
    console.log(`Vote: ${vote}`);
    // Implement voting logic here
  };

  return (
    <Box sx={{ width: "100%", margin: "auto", mt: 4 }}>
      <Grid container spacing={2} sx={{ mb: 10 }}>
        {hasResponses &&
          [models.modelA, models.modelB].map((response, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {response.name}
                </Typography>
                <Typography variant="body1">{response.response}</Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>

      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter your prompt"
          value={promptStore.prompt}
          onChange={handlePromptChange}
          multiline
          rows={1}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "4px" } }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <IconButton
            color="primary"
            onClick={handleSubmit}
            disabled={loading || promptStore.prompt.length === 0}
            sx={{ padding: 0 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>

      {hasResponses && (
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleVote("A is better")}
            >
              A IS BETTER
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleVote("B is better")}
            >
              B IS BETTER
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleVote("Tie")}
            >
              TIE
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleVote("Both are bad")}
            >
              BOTH ARE BAD
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Battle;

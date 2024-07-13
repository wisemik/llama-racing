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

interface ModelResponse {
  model: string;
  response: string;
}

export function Battle() {
  const [prompt, setPrompt] = useState("");

  const [responseA, setResponseA] = useState<ModelResponse>({
    model: "Model A (GPT-4o)",
    response: "",
  });
  const [responseB, setResponseB] = useState<ModelResponse>({
    model: "Model B (GPT-4)",
    response: "",
  });

  const hasResponses = responseA.response || responseB.response;

  const [loading, setLoading] = useState(false);

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchModelAResponse(prompt),
        fetchModelBResponse(prompt),
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

  const fetchModelAResponse = async (prompt: string) => {
    const stream = await createCompletions("gpt-4o", prompt);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      setResponseA((prev) => ({ ...prev, response: prev.response + content }));
    }
  };

  const fetchModelBResponse = async (prompt: string) => {
    const stream = await createCompletions("gpt-4", prompt);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      setResponseB((prev) => ({ ...prev, response: prev.response + content }));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Grid container spacing={2} sx={{ mb: 10 }}>
        {hasResponses &&
          [responseA, responseB].map((response, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {response.model}
                </Typography>
                <Typography variant="body1">{response.response}</Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter your prompt"
          value={prompt}
          onChange={handlePromptChange}
          multiline
          rows={1}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "4px" } }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <IconButton
            color="primary"
            onClick={handleSubmit}
            disabled={loading || !prompt}
            sx={{ padding: 0 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>

      {hasResponses.length > 0 && (
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

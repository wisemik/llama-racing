import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { usePromptStore } from "../../stores/prompt.store";
import { useModelsStore } from "../../stores/models.store";
import { useState } from "react";
import { criticizeUserRequest } from "../../api/llama-rally";
import ModalUnstyled, { useModal } from "./modals";
import { useVoteStore } from "../../stores/vote.store";

export function Form() {
  const promptStore = usePromptStore();

  const modelsStore = useModelsStore();
  const modalState = useModal();
  const voteStore = useVoteStore();

  const [loading, setLoading] = useState(false);

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    promptStore.setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    voteStore.reset();
    modelsStore.reset();

    try {
      const res = await criticizeUserRequest(promptStore.prompt);
      console.log("res", res);

      if ("error" in res) {
        alert(res.error);
        return;
      }

      if (res.score < 7) {
        modalState.update(true, res.description);
        return;
      }

      await Promise.all([
        modelsStore.fetchModelAResponse(promptStore.prompt),
        modelsStore.fetchModelBResponse(promptStore.prompt),
      ]);
    } catch (error) {
      console.error("Error fetching responses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalUnstyled />
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
    </>
  );
}

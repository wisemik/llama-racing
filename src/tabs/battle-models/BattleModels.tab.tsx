import { Box } from "@mui/material";
import { useModelsStore } from "../../stores/models.store";
import { Vote } from "./Vote";
import { Form } from "./Form";
import { Responses } from "./Responses";
import { useEffect } from "react";
import { getLeaderboard } from "../../api/llama-rally";

export function BattleModels() {
  const models = useModelsStore();

  useEffect(() => {
    models.initRandomModels();
    getLeaderboard();
  }, []);

  const hasResponses = models.modelA.response || models.modelB.response;

  return (
    <Box sx={{ width: "100%", margin: "auto", mt: 4 }}>
      <Responses />

      <Form />

      {hasResponses && <Vote />}
    </Box>
  );
}

export default BattleModels;

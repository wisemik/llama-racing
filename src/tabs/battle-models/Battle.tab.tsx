import { Box } from "@mui/material";
import { useModelsStore } from "../../stores/models.store";
import { Vote } from "./Vote";
import { Form } from "./Form";
import { Responses } from "./Responses";
import { useVoteStore } from "../../stores/vote.store";

export function BattleModels() {
  const modelsStore = useModelsStore();
  const voteStore = useVoteStore();

  const hasResponses =
    modelsStore.modelA.response || modelsStore.modelB.response;

  console.log("modelsStore.modelA.response", modelsStore.modelA.response);
  console.log("modelsStore.modelB.response", modelsStore.modelB.response);
  console.log("hasResponses", hasResponses, Boolean(hasResponses));

  return (
    <Box sx={{ width: "100%", margin: "auto", mt: 4 }}>
      <Responses />

      <Form />

      {Boolean(hasResponses) && <Vote />}
    </Box>
  );
}

export default BattleModels;

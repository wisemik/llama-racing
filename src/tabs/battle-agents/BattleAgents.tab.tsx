import { Box } from "@mui/material";
import { Vote } from "./Vote";
import { Form } from "./Form";
import { Responses } from "./Responses";
import { useAgentsStore } from "../../stores/agents.store";
// import { useVoteAgentsStore } from "../../stores/vote.store";

export function AgentsModels() {
  const agentsStore = useAgentsStore();
  // const voteStore = useVoteAgentsStore();

  const hasResponses =
  agentsStore.agentA.response || agentsStore.agentB.response;

  console.log("agentsStore.agentA.response", agentsStore.agentA.response);
  console.log("agentsStore.agentB.response", agentsStore.agentB.response);
  console.log("hasResponses", hasResponses, Boolean(hasResponses));

  return (
    <Box sx={{ width: "100%", margin: "auto", mt: 4 }}>
      <Responses />

      <Form />

      {Boolean(hasResponses) && <Vote />}
    </Box>
  );
}

export default AgentsModels;

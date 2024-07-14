import { Button, Grid } from "@mui/material";
import { VoteResult } from "../../api/llama-rally";
import { useVoteModal, VoteModal } from "../battle-models/modals";
import { useAgentsStore } from "../../stores/agents.store";
import { useVoteAgentsStore } from "../../stores/voteAgents.store";

export function Vote() {
  const agentsStore = useAgentsStore();
  const voteStore = useVoteAgentsStore();
  const voteModal = useVoteModal();

  const handleVote = async (result: VoteResult) => {
    console.log(`Vote: ${result}`);

    const message = await voteStore.sendVote({
      agentA: agentsStore.agentA.type!,
      agentB: agentsStore.agentB.type!,
      result,
    });

    voteModal.update(true, message);
  };

  return (
    <>
      <VoteModal />

      <Grid container spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
        <Grid item>
          <Button
            variant={
              voteStore.voteResult == agentsStore.agentA.type
                ? "contained"
                : "outlined"
            }
            size="small"
            disabled={voteStore.voteResult != null}
            onClick={() => handleVote(agentsStore.agentA.type!)}
          >
            A IS BETTER
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={
              voteStore.voteResult == agentsStore.agentB.type
                ? "contained"
                : "outlined"
            }
            size="small"
            disabled={voteStore.voteResult != null}
            onClick={() => handleVote(agentsStore.agentB.type!)}
          >
            B IS BETTER
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={voteStore.voteResult == "draw" ? "contained" : "outlined"}
            size="small"
            disabled={voteStore.voteResult != null}
            onClick={() => handleVote("draw")}
          >
            DRAW
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

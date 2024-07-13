import { Button, Grid } from "@mui/material";
import { useModelsStore } from "../../stores/models.store";
import { useVoteStore } from "../../stores/vote.store";
import { VoteResult } from "../../api/llama-rally";
import { useVoteModal, VoteModal } from "./modals";

export function Vote() {
  const modelsStore = useModelsStore();
  const voteStore = useVoteStore();
  const voteModal = useVoteModal();

  const handleVote = async (result: VoteResult) => {
    console.log(`Vote: ${result}`);

    const message = await voteStore.sendVote({
      modelA: modelsStore.modelA.type!,
      modelB: modelsStore.modelB.type!,
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
              voteStore.voteResult == modelsStore.modelA.type
                ? "contained"
                : "outlined"
            }
            size="small"
            disabled={voteStore.voteResult != null}
            onClick={() => handleVote(modelsStore.modelA.type!)}
          >
            A IS BETTER
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={
              voteStore.voteResult == modelsStore.modelB.type
                ? "contained"
                : "outlined"
            }
            size="small"
            disabled={voteStore.voteResult != null}
            onClick={() => handleVote(modelsStore.modelB.type!)}
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

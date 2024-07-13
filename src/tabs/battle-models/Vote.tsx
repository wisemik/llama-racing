import { Button, Grid } from "@mui/material";

export function Vote() {
  const handleVote = (vote: string) => {
    console.log(`Vote: ${vote}`);
    // Implement voting logic here
  };

  return (
    <Grid container spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
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
  );
}

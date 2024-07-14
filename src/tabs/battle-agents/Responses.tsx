import { Typography, Paper, Grid } from "@mui/material";
import { useAgentsStore } from "../../stores/agents.store";

export function Responses() {
  const agents = useAgentsStore();

  const hasResponses = agents.agentA.response || agents.agentB.response;

  return (
    <Grid container spacing={2} sx={{ mb: 10 }}>
      {hasResponses &&
        [agents.agentA, agents.agentB].map((response, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                {response.name}
              </Typography>
              <Typography variant="body1">{response.response}</Typography>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
}

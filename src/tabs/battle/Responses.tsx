import { Typography, Paper, Grid } from "@mui/material";
import { useModelsStore } from "../../stores/models.store";

export function Responses() {
  const models = useModelsStore();

  const hasResponses = models.modelA.response || models.modelB.response;

  return (
    <Grid container spacing={2} sx={{ mb: 10 }}>
      {hasResponses &&
        [models.modelA, models.modelB].map((response, index) => (
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

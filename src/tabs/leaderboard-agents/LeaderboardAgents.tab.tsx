import { useEffect } from "react";
import { useLeaderboardAgentsStore } from "../../stores/leaderboard.store";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LeaderboardAgent } from "../../api/llama-rally";

const columns: GridColDef<LeaderboardAgent>[] = [
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    sortable: true,
  },
  {
    field: "price_per_score",
    headerName: "Price Per Score",
    width: 150,
    sortable: true,
  },
  {
    field: "rank",
    headerName: "Rank",
    type: "number",
    width: 100,
    sortable: true,
  },
  {
    field: "score",
    headerName: "Score",
    sortable: true,
    width: 130,
  },
];

export default function LeaderboardAgents() {
  const leaderboardStore = useLeaderboardAgentsStore();

  useEffect(() => {
    leaderboardStore.loadLeaderboardAgents();
  });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {leaderboardStore.list && (
        <DataGrid rows={leaderboardStore.list} columns={columns} autoPageSize />
      )}
    </Box>
  );
}

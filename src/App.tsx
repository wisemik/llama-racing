import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import BattleModels from "./tabs/battle-models/Battle.tab.tsx";
import LeaderboardModels from "./tabs/leaderboard-models/LeaderboardModels.tab.tsx";
import LeaderboardAgents from "./tabs/leaderboard-agents/LeaderboardAgents.tab.tsx";
import BattleAgents from "./tabs/battle-agents/BattleAgents.tab.tsx";
import Auth from "./Auth.tsx";
import { useAuthStore } from "./stores/auth.store.ts";

export default function App() {
  const [value, setValue] = React.useState("1");
  const authStore = useAuthStore();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authStore.nullifier_hash) {
    return <Auth />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 800, typography: "body1" }}>
      <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
        Llama Rally
      </Typography>
      <TabContext value={value}>
        <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="BATTLE MODELS" value="1" />
            <Tab label="BATTLE AGENTS" value="2" />
            <Tab label="LEADERBOARD MODELS" value="3" />
            <Tab label="LEADERBOARD AGENTS" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <BattleModels />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 2 }}>
          <BattleAgents />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 2 }}>
          <LeaderboardModels />
        </TabPanel>
        <TabPanel value="4" sx={{ padding: 2 }}>
          <LeaderboardAgents />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Battle from "./tabs/battle/Battle.tab.tsx";
import Leaderboard from "./tabs/leaderboard/Leaderboard.tab.tsx";

export default function App() {
  const [value, setValue] = React.useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
        Llama Rally
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Battle" value="1" />
            <Tab label="LeaderBoard" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Battle />
        </TabPanel>
        <TabPanel value="2">
          <Leaderboard />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

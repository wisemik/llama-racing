import React from "react";
import ReactDOM from "react-dom/client";
import Battle from "./tabs/battle/Battle.tab.tsx";
import "./index.css";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Leaderboard from "./tabs/leaderboard/Leaderboard.tab.tsx";
import App from "./App.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Battle />,
//   },
//   {
//     path: "/leaderboard",
//     element: <Leaderboard />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles_general.css";
import "./styles_landing.css";
import "./styles_game.css";
import "./styles_game_modal.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
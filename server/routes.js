import express from "express";
import { createGame, joinGame } from "./controllers";

const router = express.Router();

// Admin
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// New game
router.post("/api/game/create", async (req, res) => {
  const result = await createGame(req.body.playerName);
  res.json(result);
});

router.post("/api/game/join", async (req, res) => {
  const { playerName, roomNo } = req.body;
  const result = await joinGame(playerName, roomNo);
  res.json(result);
});

export default router;
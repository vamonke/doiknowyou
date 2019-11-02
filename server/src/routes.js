import express from "express";
import { createGame, joinGame, getQuestionBank } from "./controllers";
import { populateQuestionBank } from "./controllers";
const router = express.Router();

// Admin
router.get("/", (_, res) => {
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
  if (result) {
    return res.json(result);
  }
  return res.status(404).json({ error: "Room not found" });
});

// Question Bank
router.get("/api/populate", (_, res) => {
  populateQuestionBank();
  res.json({ result: "ok" });
});

router.get("/api/questionbank", async (_, res) => {
  const questionBank = await getQuestionBank();
  res.json({ questionBank });
});

export default router;
import express from "express";
import { createGame, joinGame, getQuestionBank, getQuestionBankAll } from "./controllers";
import { toggleQuestion, populateQuestionBank } from "./controllers";
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
router.get("/api/questionbank/populate", (_, res) => {
  populateQuestionBank();
  res.json({ result: "ok" });
});
router.get("/api/questionbank/toggle/:id", async (req, res) => {
  if (!req.params || !req.params.id) {
    return res.json({ result: "Missing param: id" });
  }

  const question = await toggleQuestion(req.params.id);
  res.json({ question });
});

router.get("/api/questionbank", async (_, res) => {
  const questionBank = await getQuestionBank();
  res.json({ questionBank });
});

router.get("/api/questionbank/all", async (_, res) => {
  const questionBank = await getQuestionBankAll();
  res.json({ questionBank });
});

export default router;
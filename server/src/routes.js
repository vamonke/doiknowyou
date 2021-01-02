import express from "express";
import { createGame, joinGame, getQuestionBank, projectGame } from "./controllers";
import * as Admin from "./controllers/admin";
const router = express.Router();

// Admin
router.get("/", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

// New game
router.post("/api/game/create", async (req, res) => {
  const { playerName } = req.body;
  if (!playerName) return res.json({ error: "Missing name" });

  const result = await createGame(playerName);
  res.json(result);
});

router.post("/api/game/join", async (req, res) => {
  const { playerName, roomNo } = req.body;
  if (!playerName || !roomNo) return res.json({ error: "Missing fields" });

  const result = await joinGame(playerName, roomNo);
  if (result) return res.json(result);

  return res.json({ error: `Room ${roomNo} not found` });
});

router.post("/api/game/project", async (req, res) => {
  const { roomNo } = req.body;
  if (!roomNo) return res.json({ error: "Missing room number" });

  const result = await projectGame(roomNo);
  if (result) return res.json(result);

  return res.json({ error: `Room ${roomNo} not found` });
});

// Question Bank
router.get("/api/questionbank", async (_, res) => {
  const questionBank = await getQuestionBank();
  res.json({ questionBank });
});

// Admin
router.get("/api/questionbank/populate", (_, res) => {
  Admin.populateQuestionBank();
  res.json({ result: "ok" });
});

router.get("/api/questionbank/toggle/:id", async (req, res) => {
  if (!req.params || !req.params.id) {
    return res.json({ result: "Missing param: id" });
  }

  const question = await Admin.toggleQuestion(req.params.id);
  res.json({ question });
});

router.get("/api/questionbank/all", async (_, res) => {
  const questionBank = await Admin.getQuestionBankAll();
  res.json({ questionBank });
});

router.get("/api/rooms", async (_, res) => {
  const rooms = await Admin.getRooms();
  res.json({ rooms });
});

router.get("/api/rooms/:id", async (req, res) => {
  if (!req.params || !req.params.id) {
    return res.json({ result: "Missing param: id" });
  }
  const room = await Admin.getRoom(req.params.id);
  res.json({ room });
});

export default router;

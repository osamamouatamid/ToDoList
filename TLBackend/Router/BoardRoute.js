import express from "express";
import Board from "../Model/Board.js";

const router = express.Router();

// Create a board
router.post("/", async (req, res) => {
  try {
    const { title, owner } = req.body;
    if (!title || !owner) return res.status(400).json({ message: "Title and owner required" });

    const board = await Board.create({ title, owner });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find().populate("owner", "name email");
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get board by id
router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete board
router.delete("/:id", async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json({ message: "Board deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

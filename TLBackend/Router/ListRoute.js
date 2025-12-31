import express from "express";
import List from "../Model/List.js";

const router = express.Router();

// Create a new list
router.post("/", async (req, res) => {
  try {
    const { title, board } = req.body;

    if (!title || !board) {
      return res.status(400).json({ message: "Title and board are required" });
    }

    const list = await List.create({ title, board });
    res.status(201).json(list);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all lists
router.get("/", async (req, res) => {
  try {
    const lists = await List.find().populate("board", "title");
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get lists by board id
router.get("/board/:boardId", async (req, res) => {
  try {
    const lists = await List.find({ board: req.params.boardId }).populate("board", "title");
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a list
router.delete("/:id", async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.id);
    if (!list) return res.status(404).json({ message: "List not found" });

    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
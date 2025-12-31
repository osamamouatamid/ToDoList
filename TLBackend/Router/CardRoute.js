import express from "express";
import Card from "../Model/Card.js";

const router = express.Router();

// Create a card
router.post("/", async (req, res) => {
  try {
    const { title, list, description, assignedTo, dueDate, priority } = req.body;
    if (!title || !list) return res.status(400).json({ message: "Title and list are required" });

    const card = await Card.create({ title, list, description, assignedTo, dueDate, priority });
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find()
      .populate("list", "title")
      .populate("assignedTo", "name email");
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cards by list
router.get("/list/:listId", async (req, res) => {
  try {
    const cards = await Card.find({ list: req.params.listId })
      .populate("list", "title")
      .populate("assignedTo", "name email");
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get card by id
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate("list", "title")
      .populate("assignedTo", "name email");
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a card
router.put("/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a card
router.delete("/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./Router/UserRoute.js";
import boardRoute from "./Router/BoardRoute.js";
import listRoute from "./Router/ListRoute.js";
import cardRoutes from "./Router/CardRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoute);
app.use("/api/boards", boardRoute);
app.use("/api/lists", listRoute);
app.use("/api/cards", cardRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

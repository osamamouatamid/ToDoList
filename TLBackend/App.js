import express from "express";
import mongoose from "mongoose";
import userRoute from "./Router/UserRoute.js";
import boardRoute from "./Router/BoardRoute.js";
import listRoute from "./Router/ListRoute.js";
import cardRoutes from "./Router/CardRoute.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.port || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/users", userRoute);
app.use("/api/boards", boardRoute);
app.use("/api/lists", listRoute);
app.use("/api/cards", cardRoutes);

app.listen(port,()=>{
console.log("demarade de ", port)
})

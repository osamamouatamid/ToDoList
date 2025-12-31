import express from "express";
import mongoo from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./Router/UserRoute.js";
import boardRoute from "./Router/BoardRoute.js";
import listRoute from "./Router/ListRoute.js";
import cardRoutes from "./Router/CardRoute.js";

const port = process.env.port || 4000;
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoo.connect("mongodb+srv://TodoListDB:R12345678@cluster0.1vjt04j.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err))

app.use("/api/users", userRoute);
app.use("/api/boards", boardRoute);
app.use("/api/lists", listRoute);
app.use("/api/cards", cardRoutes);

app.listen(port,()=>{
console.log("demarade de ", port)
})

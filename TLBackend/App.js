const express = require("express");
const port = process.env.port || 4000;
const mongoo = require("mongoose")
const app = express();
const bodyParser = require("body-parser");


mongoo.connect("mongodb+srv://TodoListDB:R12345678@cluster0.1vjt04j.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err))

app.listen(port,()=>{
console.log("demarade de ", port)
})

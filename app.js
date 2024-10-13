import express from "express";
import "dotenv/config";
import { getTodo, createTodo, deleteTodo, updateTodo } from "./todo.js";
import { register, login } from "./Auth.js";
import { connectDB } from "./db/mongo/config.js";
import { verifyToken } from "./middlware.js";
const app = express();
app.use(express.json());
const port = 5500;
app.post("/register", register);
app.post("/login", login);

app.use(verifyToken);
app.get("/todos", getTodo);
app.post("/todos", createTodo);
app.delete("/todos/:id", deleteTodo);
app.put("/todos/:id", updateTodo);

//mongodb
const promiseObj = connectDB();
promiseObj
  .then(() => {
    app.listen(port, () => {
      console.log(`server Started on port:${port}`);
    });
  })
  .catch((error) => {
    console.log("failed to connect mongo:", error);
  });

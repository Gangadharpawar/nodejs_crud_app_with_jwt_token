// const http = require("http");
// const { getTodo, createTodo, updateTodo } = require("./todo");
// const todo = requrie("./todo.js");
// const express = require("express");
// import http from "http";
import express from "express";
import { getTodo, createTodo, updateTodo } from "./todo.js";
import { logger, Deleter } from "./middlware.js";

const ServerObj = express();

ServerObj.use(express.json());
ServerObj.use(logger);

ServerObj.get("/todos", getTodo);
ServerObj.post("/todos", createTodo);
ServerObj.patch("/todos", updateTodo);
ServerObj.use(Deleter);
ServerObj.delete("/todos/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query.id);
  res.send(`Delete todos in Express :${req.params.id}`);
});

// const ServerObj = http.createServer((req, res) => {
//   // res.end("Hello from server ", req.url, req.method);nn
//   if (req.url == "/todos" && req.method == "GET") {
//     //logic to perform get todos
//     res.end("take your todos");
//     return;
//   } else if (req.url == "/todos" && req.method == "POST") {
//     res.end("create todos");
//     return;
//   } else if (req.url == "/todos" && req.method == "DELETE") {
//     res.end("delete todos");
//     return;
//   } else if (req.url == "/todos" && req.method == "PUT") {
//     res.end("UPDATE todos");
//     return;
//   } else if (req.url == "/employees" && req.method == "POST") {
//     res.end("create employees");
//     return;
//   } else if (req.url == "/employees" && req.method == "DELETE") {
//     res.end("delete employees");
//     res.end("deleted laziness");
//     return;
//   } else if (req.url == "/employees" && req.method == "PUT") {
//     res.end("UPDATE employees");
//     return;
//   } else if (req.url == "/employees" && req.method == "GET") {
//     res.end("take your  employees");
//     res.end("complete assignment daily");
//     return;
//   }

//   res.end("Please send valid request");
// });
ServerObj.listen(5500);
console.log("Server started on Port:5500");

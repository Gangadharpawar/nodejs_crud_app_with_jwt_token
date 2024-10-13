import { getDB } from "./config.js";
var ID = 1;
export async function addTodos(description) {
  const newTodo = {
    id: ID++,
    description: description,
  };
  const db = getDB();
  const result = await db.collection("todos").insertOne(newTodo);
  console.log("result", result);
}

export async function getTodos() {
  const db = getDB();
  const todos = await db.collection("todos").find({}).toArray();
  return todos;
}

export async function deleteTodos(id) {
  const db = getDB();
  const deleteResult = await db.collection("todos").deleteOne({ id: id });
  console.log("Deleted documents =>", deleteResult);
}

export async function updateTodos(id, description) {
  const db = getDB();
  const updateresult = await db
    .collection("todos")
    .updateOne({ id: id }, { $set: { description: description } });
  console.log("Updated documents =>", updateresult);
}

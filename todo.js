// import { getTodos, addTodos, deleteTodos } from "./db/memory.js";
import {
  addTodos,
  getTodos,
  deleteTodos,
  updateTodos,
} from "./db/mongo/todo.js";
export async function getTodo(req, res, next) {
  try {
    const todos = await getTodos();
    console.log(todos);
    // let todos = [
    //   {
    //     id: 1,
    //     description: "learn nodejs",
    //   },
    //   {
    //     id: 2,
    //     description: "learn Mongo",
    //   },
    // ];
    // const todos = getTodos();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
}

export async function createTodo(req, res, next) {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "description is required" });
    }
    // addTodos(req.body.description);
    await addTodos(req.body.description);
    res.end(`create  todo for Desc:${req.body.description}`);
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    // const filter = { id: id };
    // const update = { $set: req.body };
    const description = req.body.description;
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }
    await updateTodos(id, description);
    res.send(`Update  todo for Desc:${req.body.description}`);
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await deleteTodos(id);
    return res.status(200).json(`Todo deleted successfully ${req.params.id}`);
  } catch (error) {
    next(error);
    return res.status(500).json(`Error Deleting the Todo${req.params.id}`);
  }
}

// export function deleteTodo(req, res) {
//   res.end("Delete Your Toddo From Moduel Function ");
// }

// exports.getTodo = getTodo;
// exports.createTodo = createTodo;
// exports.updateTodo = updateTodo;

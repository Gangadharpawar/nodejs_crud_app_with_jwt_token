let todos = [];
let id = 1;
export function addTodos(description) {
  const newTodo = {
    id: id++,
    description: description,
  };
  todos.push(newTodo);
}

export function getTodos() {
  return todos;
}

export function deleteTodos(todoid) {
  let newTodo = todos.filter((todo) => todo.id !== todoid);
}

const uuid = require("uuid/v4");
let todos = [];

const getTodos = (req, res) => {
  res.json(todos);
};

const addTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Missing title and / or description" });
  }

  todos.push({ id: uuid(), title, description });

  res.json(todos);
};

const editTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title && !description) {
    return res.status(400).json({ error: "Missing title or description" });
  }

  const index = todos.findIndex(todo => todo.id === req.params.id);

  if (index === -1) {
    return res.status(400).json({ error: "Not found" });
  }

  todos[index] = {
    id: todos[index].id,
    title: title || todos[index].title,
    description: description || todos[index].description
  };

  res.json(todos);
};

const removeTodo = (req, res) => {
  const index = todos.findIndex(todo => todo.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  todos = todos.filter(todo => todo.id !== req.params.id);

  return res.json(todos);
};

module.exports = {
  getTodos,
  addTodo,
  editTodo,
  removeTodo
};

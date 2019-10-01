const uuid = require("uuid/v5");
const todos = [];

const getTodos = (req, res) => {
  res.json({ data: todos });
};

const getTodoById = (req, res) => {
  const todo = todos.find(todo => todo.id === req.params.id);

  if (todo) {
    res.json({ data: todo });
  } else {
    res.json({ error: "Not found" });
  }
};

const addTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Missing title and / or description" });
  }

  todos.push({ id: uuid(), title, description });

  res.json({ data: todos });
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
    title: title || todos[index].title,
    description: description || todos[index].description
  };

  res.json({ data: todos });
};

const removeTodo = (req, res) => {
  const index = todos.findIndex(todo => todo.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  todos = todos.filter(todo => todo.id !== req.params.id);

  return res.json({ data: todos });
};

module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  editTodo,
  removeTodo
};

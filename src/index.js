const express = require("express");
const app = express();
const port = 3001;
const todos = require("./todo");

app.use(express.json());

app.get("/todo", todos.getTodos);
app.get("/todo/:id", todos.getTodoById);
app.post("/todo", todos.addTodo);
app.put("/todo/:id", todos.editTodo);
app.delete("/todo/:id", todos.removeTodo);

app.use("*", (req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));

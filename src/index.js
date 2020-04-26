const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const todos = require("./todo");
const data = require("./data");

app.use(express.json());
app.use(cors());

app.get("/todo", todos.getTodos);
app.post("/todo", todos.addTodo);
app.put("/todo/:id", todos.editTodo);
app.delete("/todo/:id", todos.removeTodo);

app.get("/data", data.getData);
app.post("/data", data.addData);
app.put("/data/:id", data.editData);
app.delete("/data/:id", data.removeData);

app.use("*", (req, res, next) => {
  res.status(404).send("Endpoint not found");
});

app.listen(port, () => console.log(`Listening on port: ${port}`));

const uuid = require("uuid/v4");
let data = [{ id: "1" }];

const getData = (req, res) => {
  res.json(data);
};

const addData = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Can't be an empty object" });
  }

  data.push({ ...req.body, id: uuid() });

  res.json(data);
};

const editData = (req, res) => {
  const { title, description } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Can't be an empty object" });
  }

  const index = data.findIndex((d) => d.id === req.params.id);

  if (index === -1) {
    return res.status(400).json({ error: "Not found" });
  }

  data[index] = {
    ...data[index],
    ...req.body,
  };

  res.json(data);
};

const removeData = (req, res) => {
  const index = data.findIndex((d) => d.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  data = data.filter((d) => d.id !== req.params.id);

  return res.json(data);
};

module.exports = {
  getData,
  addData,
  editData,
  removeData,
};

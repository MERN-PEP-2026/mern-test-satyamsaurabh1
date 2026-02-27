const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const task = await Task.create({
    title,
    description: description || "",
    status: status === "completed" ? "completed" : "pending",
    createdBy: String(req.user._id),
  });

  return res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const filter = { createdBy: String(req.user._id) };

  if (req.query.status && ["pending", "completed"].includes(req.query.status)) {
    filter.status = req.query.status;
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  return res.json(tasks);
};

const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: String(req.user._id) });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }

  if (req.body.description !== undefined) {
    task.description = req.body.description;
  }

  if (req.body.status && ["pending", "completed"].includes(req.body.status)) {
    task.status = req.body.status;
  }

  const updatedTask = await task.save();
  return res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: String(req.user._id) });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.deleteOne();
  return res.json({ message: "Task deleted" });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

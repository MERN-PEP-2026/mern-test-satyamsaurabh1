const Task = require("../models/Task");

// just the basics for now
const statusKinds = ["pending", "completed"];

const fixTitle = (val = "") => val.trim();
const fixDesc = (val = "") => val.trim();

const getFilter = (userId, status) => {
  const filter = { createdBy: String(userId) };
  // check if status is actually valid
  if (statusKinds.includes(status)) {
    filter.status = status;
  }
  return filter;
};

const createTask = async (req, res) => {
  const { title, description = "", status } = req.body;
  const taskTitle = fixTitle(title);

  if (!taskTitle) {
    return res.status(400).json({ message: "title is required" });
  }

  // default to pending if something weird happens
  const taskStatus = statusKinds.includes(status) ? status : "pending";

  const task = await Task.create({
    title: taskTitle,
    description: fixDesc(description),
    status: taskStatus,
    createdBy: String(req.user._id),
  });

  return res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find(getFilter(req.user._id, req.query.status)).sort({ createdAt: -1 });
  return res.json(tasks);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, createdBy: String(req.user._id) });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (req.body.title !== undefined) {
    task.title = fixTitle(req.body.title);
  }

  if (req.body.description !== undefined) {
    task.description = fixDesc(req.body.description);
  }

  if (statusKinds.includes(req.body.status)) {
    task.status = req.body.status;
  }

  // actual save op
  const savedTask = await task.save();
  return res.json(savedTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, createdBy: String(req.user._id) });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.deleteOne();
  return res.json({ message: "Task deleted" });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

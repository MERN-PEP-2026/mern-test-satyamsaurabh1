const Task = require("../models/Task");

const ALLOWED_STATUS = new Set(["pending", "completed"]);

const normalizeTitle = (value = "") => value.trim();
const normalizeDescription = (value = "") => value.trim();

const buildTaskFilter = (userId, status) => {
  const filter = { createdBy: String(userId) };
  if (ALLOWED_STATUS.has(status)) {
    filter.status = status;
  }
  return filter;
};

const createTask = async (req, res) => {
  const { title, description = "", status } = req.body;
  const taskTitle = normalizeTitle(title);

  if (!taskTitle) {
    return res.status(400).json({ message: "title is required" });
  }

  const task = await Task.create({
    title: taskTitle,
    description: normalizeDescription(description),
    status: ALLOWED_STATUS.has(status) ? status : "pending",
    createdBy: String(req.user._id),
  });

  return res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find(buildTaskFilter(req.user._id, req.query.status)).sort({ createdAt: -1 });
  return res.json(tasks);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, createdBy: String(req.user._id) });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (req.body.title !== undefined) {
    task.title = normalizeTitle(req.body.title);
  }

  if (req.body.description !== undefined) {
    task.description = normalizeDescription(req.body.description);
  }

  if (ALLOWED_STATUS.has(req.body.status)) {
    task.status = req.body.status;
  }

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

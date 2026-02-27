const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const asyncHandler = require("../middleware/asyncHandler");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

// Get all tasks or make a new one
router.get("/", protect, asyncHandler(getTasks));
router.post("/", protect, asyncHandler(createTask));

// Single task operations
router.put("/:id", protect, validateObjectId, asyncHandler(updateTask));
router.delete("/:id", protect, validateObjectId, asyncHandler(deleteTask));

module.exports = router;

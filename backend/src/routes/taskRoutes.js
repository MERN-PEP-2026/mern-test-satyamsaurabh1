const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const asyncHandler = require("../middleware/asyncHandler");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.route("/").post(protect, asyncHandler(createTask)).get(protect, asyncHandler(getTasks));
router
  .route("/:id")
  .put(protect, validateObjectId, asyncHandler(updateTask))
  .delete(protect, validateObjectId, asyncHandler(deleteTask));

module.exports = router;

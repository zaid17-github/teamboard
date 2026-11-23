const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createProject, getMyProjects } = require("../controllers/projectController");
const { createTask, getProjectTasks } = require("../controllers/taskController");

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);

router.post("/:projectId/tasks", protect, createTask);
router.get("/:projectId/tasks", protect, getProjectTasks);

module.exports = router;
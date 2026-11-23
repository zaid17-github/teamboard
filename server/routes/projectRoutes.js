const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createProject, getMyProjects, addMember } = require("../controllers/projectController");
const { createTask, getProjectTasks, updateTask, deleteTask } = require("../controllers/taskController");

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);
router.post("/:projectId/members", protect, addMember);

router.post("/:projectId/tasks", protect, createTask);
router.get("/:projectId/tasks", protect, getProjectTasks);
router.put("/tasks/:taskId", protect, updateTask);
router.delete("/tasks/:taskId", protect, deleteTask);

module.exports = router;
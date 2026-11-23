const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo } = req.body;
    const { projectId } = req.params;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.members.includes(req.userId)) {
      return res.status(403).json({ message: "You are not a member of this project" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project: projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.log("Create task error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.members.includes(req.userId)) {
      return res.status(403).json({ message: "You are not a member of this project" });
    }

    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } catch (error) {
    console.log("Get tasks error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
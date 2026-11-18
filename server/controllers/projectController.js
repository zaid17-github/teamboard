const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description,
      owner: req.userId,
      members: [req.userId],
    });

    res.status(201).json(project);
  } catch (error) {
    console.log("Create project error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ members: req.userId });
    res.json(projects);
  } catch (error) {
    console.log("Get projects error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
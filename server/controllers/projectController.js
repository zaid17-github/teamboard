const Project = require("../models/Project");
const User = require("../models/User");

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

exports.addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: "Only the owner can add members" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user with that email" });
    }

    if (project.members.includes(user._id)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    project.members.push(user._id);
    await project.save();

    res.json({ message: "Member added", members: project.members });
  } catch (error) {
    console.log("Add member error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
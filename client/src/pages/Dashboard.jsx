import { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const loadProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", { name, description });
      setName("");
      setDescription("");
      setError("");
      loadProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create project");
    }
  };

  return (
    <div>
      <h2>My Projects</h2>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">Create project</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {projects.map((p) => (
        <div key={p._id}>
          <h3><Link to={`/projects/${p._id}`}>{p.name}</Link></h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
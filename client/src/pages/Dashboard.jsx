import { useState, useEffect } from "react";
import api from "../api/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div>
      <h2>My Projects</h2>
      {projects.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
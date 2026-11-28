import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

const columns = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

function Board() {
  const { projectId } = useParams();
  console.log("projectId is:", projectId);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
const [priority, setPriority] = useState("medium");

const loadTasks = async () => {
  const res = await api.get(`/projects/${projectId}/tasks`);
  setTasks(res.data);
};

const handleAdd = async (e) => {
  e.preventDefault();
  if (!title) return;
  await api.post(`/projects/${projectId}/tasks`, { title, priority });
  setTitle("");
  loadTasks();
};

 useEffect(() => {
  loadTasks();
}, [projectId]);

  return (
    <div>
      <Link to="/dashboard">Back to projects</Link>
      <h2>Board</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
  <input
    placeholder="New task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <select value={priority} onChange={(e) => setPriority(e.target.value)}>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
  <button type="submit">Add task</button>
</form>

      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map((col) => (
          <div
            key={col.key}
            style={{
              flex: 1,
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "8px",
              color: "#222",
            }}
          >
            <h3>{col.label}</h3>
            {tasks
              .filter((t) => t.status === col.key)
              .map((t) => (
                <div
                  key={t._id}
                  style={{
                    background: "white",
                    padding: "8px",
                    marginBottom: "8px",
                    borderRadius: "6px",
                  }}
                >
                  <b>{t.title}</b>
                  <div>Priority: {t.priority}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
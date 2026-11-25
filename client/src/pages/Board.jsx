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
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get(`/projects/${projectId}/tasks`).then((res) => setTasks(res.data));
  }, [projectId]);

  return (
    <div>
      <Link to="/dashboard">Back to projects</Link>
      <h2>Board</h2>

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
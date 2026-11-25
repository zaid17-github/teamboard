import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

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
      {tasks.map((t) => (
        <div key={t._id}>
          <b>{t.title}</b> - {t.status}
        </div>
      ))}
    </div>
  );
}

export default Board;
import { useEffect, useState } from "react";
import api from "../api";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [taskForm, setTaskForm] = useState({ title: "", description: "" });

  const fetchTasks = async (statusValue = filter) => {
    setLoading(true);
    setError("");
    try {
      const query = statusValue !== "all" ? `?status=${statusValue}` : "";
      const response = await api.get(`/tasks${query}`);
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (event) => {
    event.preventDefault();
    if (!taskForm.title.trim()) {
      return;
    }

    try {
      await api.post("/tasks", { ...taskForm, status: "pending" });
      setTaskForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleStatusToggle = async (task) => {
    const nextStatus = task.status === "pending" ? "completed" : "pending";
    try {
      await api.put(`/tasks/${task._id}`, { status: nextStatus });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleFilterChange = (event) => {
    const nextFilter = event.target.value;
    setFilter(nextFilter);
    fetchTasks(nextFilter);
  };

  return (
    <section className="container page-wrap">
      <article className="panel">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Private Workspace</p>
            <h1>Dashboard</h1>
            <p className="subtitle">Create and manage your tasks.</p>
          </div>
        </header>

        <form onSubmit={handleCreateTask} className="form inline-form">
          <input
            name="title"
            placeholder="Task title"
            value={taskForm.title}
            onChange={(e) => setTaskForm((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={taskForm.description}
            onChange={(e) => setTaskForm((prev) => ({ ...prev, description: e.target.value }))}
          />
          <button className="btn btn-primary" type="submit">Add Task</button>
        </form>

        <div className="filter-row">
          <label htmlFor="status-filter">Filter:</label>
          <select id="status-filter" value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {error ? <p className="error">{error}</p> : null}
        {loading ? <p>Loading tasks...</p> : null}

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description || "No description"}</p>
                <small>Status: {task.status}</small>
              </div>
              <div className="task-actions">
                <button className="btn btn-outline" type="button" onClick={() => handleStatusToggle(task)}>
                  Mark {task.status === "pending" ? "Completed" : "Pending"}
                </button>
                <button className="btn btn-danger" type="button" onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default DashboardPage;

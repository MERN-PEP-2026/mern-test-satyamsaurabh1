import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api";

const EMPTY_TASK_FORM = { title: "", description: "" };

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [taskForm, setTaskForm] = useState(EMPTY_TASK_FORM);

  const loadTasks = useCallback(async (nextStatus = statusFilter) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const query = nextStatus !== "all" ? `?status=${nextStatus}` : "";
      const { data } = await api.get(`/tasks${query}`);
      setTasks(data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Could not load tasks");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setTaskForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();

    const payload = {
      title: taskForm.title.trim(),
      description: taskForm.description.trim(),
      status: "pending",
    };

    if (!payload.title) {
      return;
    }

    try {
      await api.post("/tasks", payload);
      setTaskForm(EMPTY_TASK_FORM);
      loadTasks();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Could not create task");
    }
  };

  const toggleStatus = async (task) => {
    const nextStatus = task.status === "pending" ? "completed" : "pending";

    try {
      await api.put(`/tasks/${task._id}`, { status: nextStatus });
      loadTasks();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Could not update task");
    }
  };

  const removeTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      loadTasks();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Could not delete task");
    }
  };

  const handleFilterChange = (event) => {
    const nextStatus = event.target.value;
    setStatusFilter(nextStatus);
    loadTasks(nextStatus);
  };

  const taskSummary = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "completed").length;
    const pending = tasks.length - completed;
    return { total: tasks.length, completed, pending };
  }, [tasks]);

  return (
    <section className="container page-wrap">
      <article className="panel">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Private Workspace</p>
            <h1>Dashboard</h1>
            <p className="subtitle">Create and manage your tasks.</p>
          </div>
          <div>
            <small>
              Total: {taskSummary.total} | Pending: {taskSummary.pending} | Completed: {taskSummary.completed}
            </small>
          </div>
        </header>

        <form onSubmit={handleCreateTask} className="form inline-form">
          <input
            name="title"
            placeholder="Task title"
            value={taskForm.title}
            onChange={handleFormChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={taskForm.description}
            onChange={handleFormChange}
          />
          <button className="btn btn-primary" type="submit">Add Task</button>
        </form>

        <div className="filter-row">
          <label htmlFor="status-filter">Filter:</label>
          <select id="status-filter" value={statusFilter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {errorMessage ? <p className="error">{errorMessage}</p> : null}
        {isLoading ? <p>Loading tasks...</p> : null}

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description || "No description"}</p>
                <small>Status: {task.status}</small>
              </div>
              <div className="task-actions">
                <button className="btn btn-outline" type="button" onClick={() => toggleStatus(task)}>
                  Mark {task.status === "pending" ? "Completed" : "Pending"}
                </button>
                <button className="btn btn-danger" type="button" onClick={() => removeTask(task._id)}>
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

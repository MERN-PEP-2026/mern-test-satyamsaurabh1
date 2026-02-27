import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../client";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await http.post("/auth/login", formData);
      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="view-box page-wrap auth-wrap">
      <article className="panel auth-panel">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to continue your task workflow.</p>
        <form onSubmit={handleSubmit} className="form">
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          {error ? <p className="error">{error}</p> : null}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p>
          New user? <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
};

export default LoginPage;

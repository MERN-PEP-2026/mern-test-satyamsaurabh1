import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="container page-wrap">
      <div className="hero-grid">
        <article className="hero-card">
          <p className="eyebrow">MERN Productivity Suite</p>
          <h1>Plan faster. Ship cleaner. Stay focused.</h1>
          <p>
            TaskForge gives your team a clear system to track tasks, manage statuses, and deliver work with confidence.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Create Account
            </Link>
            <Link to="/dashboard" className="btn btn-outline">
              Open Dashboard
            </Link>
          </div>
        </article>

        <aside className="stats-card">
          <h2>At a glance</h2>
          <div className="stat-row">
            <strong>3x</strong>
            <span>better task clarity with status tracking</span>
          </div>
          <div className="stat-row">
            <strong>JWT</strong>
            <span>secure authentication and private data</span>
          </div>
          <div className="stat-row">
            <strong>MERN</strong>
            <span>single stack for quick iterations</span>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default HomePage;

const FeaturesPage = () => {
  return (
    <section className="view-box page-wrap">
      <h1>Features</h1>
      <p className="subtitle">Everything required to run a task workflow from one interface.</p>
      <div className="feature-grid">
        <article className="feature-card">
          <h3>Authentication</h3>
          <p>Register and login flows protected by JWT-based access control.</p>
        </article>
        <article className="feature-card">
          <h3>Task Lifecycle</h3>
          <p>Create, read, update, and delete tasks with instant UI feedback.</p>
        </article>
        <article className="feature-card">
          <h3>Status Filters</h3>
          <p>Filter pending and completed tasks to focus on what matters now.</p>
        </article>
        <article className="feature-card">
          <h3>Private Workspace</h3>
          <p>Each user sees only their own tasks through protected API routes.</p>
        </article>
      </div>
    </section>
  );
};

export default FeaturesPage;

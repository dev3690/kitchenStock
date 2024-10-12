function DashboardPage({ logout }) {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DashboardPage;


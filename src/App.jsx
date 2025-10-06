import { useEffect, useState } from "react";
import "./App.css";
import { issuesUrl } from "./api/service";

function App() {
  const [issues, setIssues] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("open");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(true);

  const getIssues = async () => {
    try {
      setLoading(true);
      const response = await fetch(issuesUrl());
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setIssues(data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  useEffect(() => {
    let data = [...issues];

    // Search
    if (search.trim()) {
      data = data.filter((i) =>
        i.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    data.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFiltered(data);
  }, [search, sortOrder, issues]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6"> GitHub Issues Dashboard</h1>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="🔍 Search by title..."
          className="border border-gray-300 rounded-lg p-2 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded-lg p-2"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="all">All</option>
        </select>

        <select
          className="border border-gray-300 rounded-lg p-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Dashboard Grid */}
      {loading ? (
        <p>⏳ Loading issues...</p>
      ) : filtered.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition"
            >
              <div className="flex items-center mb-3">
                <img
                  src={issue.user.avatar_url}
                  alt={issue.user.login}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <a
                    href={issue.user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-800 hover:underline"
                  >
                    {issue.user.login}
                  </a>
                  <p className="text-xs text-gray-500">
                    #{issue.number} • {issue.state.toUpperCase()}
                  </p>
                </div>
              </div>

              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 font-medium mb-2 hover:underline"
              >
                {issue.title}
              </a>

              <div className="flex flex-wrap gap-2 mb-3">
                {issue.labels.map((label) => (
                  <span
                    key={label.name}
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: `#${label.color}`,
                      color: "#333",
                    }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-500">
                🕒 Created: {new Date(issue.created_at).toLocaleString()}
                <br />
                💬 Comments: {issue.comments}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

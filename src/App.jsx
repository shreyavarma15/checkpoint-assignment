import { useEffect, useState } from "react";
import "./App.css";
import { issuesUrl } from "./api/service";
import GitHubIssuesGrid from "./components/GitHubIssuesGrid";

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const getIssues = async () => {
    try {
      setLoading(true);
      const response = await fetch(issuesUrl());
      const data = await response.json();
      setLoading(false);
      console.log(data);
      setIssues(data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Facebook React GitHub Issues</h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded border transition ${
            theme === "dark"
              ? "bg-gray-800 text-gray-100 border-gray-700"
              : "bg-gray-200 text-gray-900 border-gray-300"
          }`}
        >
          {theme === "light" ? " Dark Mode" : " Light Mode"}
        </button>
      </div>
      {loading ? (
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
          Loading issues...
        </p>
      ) : (
        <GitHubIssuesGrid issues={issues} theme={theme} />
      )}
    </div>
  );
}

export default App;

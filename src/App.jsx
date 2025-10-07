import { useEffect, useState } from "react";
import "./App.css";
import { issuesUrl } from "./api/service";
import GitHubIssuesGrid from "./components/GitHubIssuesGrid";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [buttonText, setButtonText] = useState("Dark Mode");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setButtonText(theme === "light" ? "Light Mode" : "Dark Mode");
  };

  const getIssues = async () => {
    try {
      setLoading(true);
      const response = await fetch(issuesUrl());
      const data = await response.json();
      setLoading(false);
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
          className={`px-4 py-2 cursor-pointer rounded border transition ${
            theme === "dark"
              ? "bg-gray-800 text-gray-100 border-gray-700"
              : "bg-gray-200 text-gray-900 border-gray-300"
          }`}
        >
          {buttonText}
        </button>
      </div>
      {loading ? (
        <p
          className={`text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Loading issues...
        </p>
      ) : (
        <ErrorBoundary
          fallback={
            <div className="text-center">Could not load issues grid.</div>
          }
        >
          <GitHubIssuesGrid issues={issues} theme={theme} />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;

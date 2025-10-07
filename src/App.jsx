import { useEffect, useState } from "react";
import "./App.css";
import { issuesUrl } from "./api/service";
import GitHubIssuesGrid from "./components/GitHubIssuesGrid";
import ErrorBoundary from "./components/ErrorBoundary";
import { THEME, BUTTON_TEXT } from "./constants";

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(THEME.LIGHT);
  const [buttonText, setButtonText] = useState(BUTTON_TEXT.DARK_MODE);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
    setButtonText(
      theme === THEME.LIGHT ? BUTTON_TEXT.LIGHT_MODE : BUTTON_TEXT.DARK_MODE
    );
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
    <main
      className={`p-6 min-h-screen ${
        theme === THEME.DARK
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      } transition-colors duration-300`}
      role="main"
      aria-label="GitHub Issues Main Content"
    >
      <header className="flex justify-between items-center mb-4" role="banner">
        <h1
          className="text-2xl font-bold"
          tabIndex={0}
          aria-label="Facebook React GitHub Issues"
        >
          Facebook React GitHub Issues
        </h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 cursor-pointer rounded border transition ${
            theme === THEME.DARK
              ? "bg-gray-800 text-gray-100 border-gray-700"
              : "bg-gray-200 text-gray-900 border-gray-300"
          }`}
          aria-label={buttonText}
          aria-pressed={theme === THEME.DARK}
        >
          {buttonText}
        </button>
      </header>
      {loading ? (
        <p
          className={`text-center ${
            theme === THEME.DARK ? "text-gray-400" : "text-gray-600"
          }`}
          role="status"
          aria-live="polite"
        >
          Loading issues...
        </p>
      ) : (
        <ErrorBoundary
          fallback={
            <div className="text-center" role="alert">
              Could not load issues grid.
            </div>
          }
        >
          <GitHubIssuesGrid issues={issues} theme={theme} />
        </ErrorBoundary>
      )}
    </main>
  );
}

export default App;

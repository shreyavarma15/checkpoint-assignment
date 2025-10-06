import { useEffect, useState } from "react";
import "./App.css";
import { issuesUrl } from "./api/service";
import GitHubIssuesGrid from "./components/GitHubIssuesGrid";

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Facebook React GitHub Issues</h1>
      {loading ? (
        <p className="text-gray-600">Loading issues...</p>
      ) : (
        <GitHubIssuesGrid issues={issues} />
      )}
    </div>
  );
}

export default App;

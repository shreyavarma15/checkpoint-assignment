import { render, screen, waitFor, within } from "@testing-library/react";
import GitHubIssuesGrid from "../GitHubIssuesGrid";
import { describe, test, expect } from "vitest";

const mockIssues = [
  {
    number: 101,
    title: "Github bug",
    user: { login: "xyz abc" },
    state: "open",
    labels: [{ name: "bug" }, { name: "urgent" }],
    comments: 3,
    created_at: "2024-09-15T10:20:00Z",
    html_url: "https://github.com/example/issue/101",
  },
  {
    number: 102,
    title: "Improve UI performance",
    user: { login: "frontend-dev" },
    state: "closed",
    labels: [{ name: "enhancement" }],
    comments: 1,
    created_at: "2024-09-14T08:00:00Z",
    html_url: "https://github.com/example/issue/102",
  },
];

describe("GitHubIssuesGrid Component", () => {
  test("renders grid with issue data", async () => {
    render(<GitHubIssuesGrid issues={mockIssues} />);

    await waitFor(() => {
      expect(screen.getByText("Github bug")).toBeInTheDocument();
      expect(screen.getByText("Improve UI performance")).toBeInTheDocument();
    });

    expect(screen.getByText("xyz abc")).toBeInTheDocument();
    expect(screen.getByText("frontend-dev")).toBeInTheDocument();

    expect(screen.getByText("open")).toBeInTheDocument();
    expect(screen.getByText("closed")).toBeInTheDocument();

    expect(screen.getByText("bug, urgent")).toBeInTheDocument();
    expect(screen.getByText("enhancement")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("renders correct date format and link", async () => {
    render(<GitHubIssuesGrid issues={[mockIssues[0]]} />);

    const formattedDate = new Date(mockIssues[0].created_at).toLocaleString(
      "en-GB",
      {
        dateStyle: "short",
        timeStyle: "short",
      }
    );

    await waitFor(() => {
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    const link = screen.getByRole("link", { name: /view/i });
    expect(link).toHaveAttribute("href", mockIssues[0].html_url);
    expect(link).toHaveClass("text-blue-600", "underline");
  });

  test("renders empty grid when no issues passed", async () => {
    render(<GitHubIssuesGrid issues={[]} />);

    await waitFor(() => {
      const gridContainer = screen.getByRole("grid", { hidden: true });
      expect(
        within(gridContainer).queryByText(/view/i)
      ).not.toBeInTheDocument();
    });
  });
});

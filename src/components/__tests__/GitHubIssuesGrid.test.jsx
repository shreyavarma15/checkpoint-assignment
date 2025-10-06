import { render, screen, waitFor, within } from "@testing-library/react";
import GitHubIssuesGrid from "../GitHubIssuesGrid";
import "@testing-library/jest-dom";

// Mock issues data
const mockIssues = [
  {
    number: 101,
    title: "Fix login bug",
    user: { login: "queen-shreya" },
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

    // Wait for grid rows to render
    await waitFor(() => {
      expect(screen.getByText("Fix login bug")).toBeInTheDocument();
      expect(screen.getByText("Improve UI performance")).toBeInTheDocument();
    });

    // Verify user column values
    expect(screen.getByText("queen-shreya")).toBeInTheDocument();
    expect(screen.getByText("frontend-dev")).toBeInTheDocument();

    // Verify state column values
    expect(screen.getByText("open")).toBeInTheDocument();
    expect(screen.getByText("closed")).toBeInTheDocument();

    // Verify label column content
    expect(screen.getByText("bug, urgent")).toBeInTheDocument();
    expect(screen.getByText("enhancement")).toBeInTheDocument();

    // Verify comments
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("renders correct date format and link", async () => {
    render(<GitHubIssuesGrid issues={[mockIssues[0]]} />);

    // Date formatted as per "en-GB" locale (dd/mm/yyyy, hh:mm)
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

    // Verify link
    const link = screen.getByRole("link", { name: /view/i });
    expect(link).toHaveAttribute("href", mockIssues[0].html_url);
    expect(link).toHaveClass("text-blue-600", "underline");
  });

  test("renders empty grid when no issues passed", async () => {
    render(<GitHubIssuesGrid issues={[]} />);

    // Wait to confirm no data rows appear
    await waitFor(() => {
      const gridContainer = screen.getByRole("grid", { hidden: true });
      expect(
        within(gridContainer).queryByText(/view/i)
      ).not.toBeInTheDocument();
    });
  });
});

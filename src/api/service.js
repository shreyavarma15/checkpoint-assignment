import { GITHUB_OWNER, GITHUB_REPO, ISSUES_PER_PAGE } from "../config";

export const issuesUrl = (page = 1) =>
  `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?per_page=${ISSUES_PER_PAGE}&page=${page}&state=all`;

// Note: GitHub's issues endpoint returns PRs too. We filter PRs out in code by presence of `pull_request`.

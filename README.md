## Running the project in local

- Clone the project using this link- [https://github.com/shreyavarma15/checkpoint-assignment.git]
- Run the command "npm install" to install all the dependencies
- To run the project in the local environment, execute the command- "npm run dev"

## React + Vite tech stack

- Vite is faster than webpack, as it updates only the changed modules during development resulting in instant HMR. (Ref-[https://dualite.dev/blog/vite-vs-webpack])
- Ag-grid library is used to display Github issues data as it provides in-built search, sort, filter and pagination. It is also efficient to use with scaling data.
- React Testing Library + Vitest is used for writing unit test cases as Jest is not compatible with Vite's configuration.

## AI Usage

- ChatGpt used for setup and configuration of tailwind and Vitest
- Github Copilot used for adding Tailwind css and unit test cases.

## Team Practices & Scaling

- With the growing project features and team size, there should be restriction on the main branch. Code can be merged to main branch only after PR approval from feature branches.
- PR review should be compulsory from minimum 2 team members and it should be reviewed on the basis of functionality, code test coverage and reusability of code.
- SonarQube can be setup for ensuring code quality and identifying vulnerabilities and critical issues.

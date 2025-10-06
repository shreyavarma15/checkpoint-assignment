import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const GitHubIssuesGrid = ({ issues, theme }) => {
  const columnDefs = useMemo(
    () => [
      { headerName: "Number", field: "number", width: 110 },
      {
        headerName: "Title",
        field: "title",
        flex: 2,
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: "User",
        valueGetter: (user) => user.data.user?.login,
        width: 150,
      },
      { headerName: "State", field: "state", width: 100 },
      {
        headerName: "Labels",
        valueGetter: (label) =>
          label.data.labels?.map((l) => l.name).join(", "),
        flex: 2,
      },
      { headerName: "Comments", field: "comments", width: 120 },
      {
        headerName: "Created At",
        valueGetter: (p) =>
          new Date(p.data.created_at).toLocaleString("en-GB", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        width: 180,
      },
      {
        headerName: "Link",
        field: "html_url",
        cellRenderer: (p) => (
          <a
            href={p.value}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View
          </a>
        ),
        width: 100,
      },
    ],
    []
  );

  return (
    <div
      className={theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine "}
      style={{ width: "100%" }}
    >
      <AgGridReact
        rowData={issues}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        style={{ overflow: "auto" }}
        defaultColDef={{
          filter: true,
          floatingFilter: true,
          resizable: true,
        }}
      />
    </div>
  );
};

export default GitHubIssuesGrid;

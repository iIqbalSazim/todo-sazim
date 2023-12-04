import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResizeObserver from "resize-observer-polyfill";

import TasksList from "./TasksList";
import { mockToDoItems } from "../../../../mockData/toDoItems";

global.ResizeObserver = ResizeObserver;

jest.mock("../../HomePageConstants", () => ({
  PRIORITY: {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
  },
  COMPLETED_STATUS: {
    ALL: "all",
    ACTIVE: "active",
    COMPLETED: "completed",
  },
}));

describe("TasksList", () => {
  test("renders tasks correctly", () => {
    const { container } = render(
      <TasksList
        toggleIsCompleted={() => {}}
        openEditForm={() => {}}
        filter={{ status: "all", priority: "", dueDate: false }}
        tasks={mockToDoItems}
        archiveTask={() => {}}
        isLoading={false}
      />
    );

    expect(screen.getAllByText(/Test Task 1/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Test Task 2/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Test Task 3/i)[0]).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("handles loading state", () => {
    render(
      <TasksList
        toggleIsCompleted={() => {}}
        openEditForm={() => {}}
        filter={{ status: "all", priority: "", dueDate: false }}
        tasks={[]}
        archiveTask={() => {}}
        isLoading={true}
      />
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});

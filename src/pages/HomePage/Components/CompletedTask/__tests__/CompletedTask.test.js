import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CompletedTask from "../CompletedTask";

const mockToggleIsCompleted = jest.fn();
const mockArchiveTask = jest.fn();

const mockTask = {
  id: 1,
  description: "This is a test",
  priority: "high",
  created_at: new Date(2023, 11, 2, 14, 17, 0, 0),
  due_date: "Sat Dec 02 2023",
};

describe("CompletedTask", () => {
  test("renders correctly", () => {
    const { container } = render(
      <CompletedTask
        task={mockTask}
        toggleIsCompleted={mockToggleIsCompleted}
        archiveTask={mockArchiveTask}
      />
    );

    const descriptionElements = screen.getAllByText(mockTask.description);
    const createdAtElements = screen.getAllByText(/created at/i);

    const toggleCompletedButton = screen.getByTestId("toggle-completed");
    const archiveButton = screen.getByTestId("archive");

    expect(descriptionElements.length).toBe(2);
    expect(createdAtElements.length).toBe(2);

    expect(toggleCompletedButton).toBeInTheDocument();
    expect(archiveButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("calls toggleIsCompleted with task-id as argument on check-icon button click", async () => {
    render(
      <CompletedTask
        task={mockTask}
        toggleIsCompleted={mockToggleIsCompleted}
        archiveTask={mockArchiveTask}
      />
    );

    const toggleCompletedButton = screen.getByTestId("toggle-completed");

    await userEvent.click(toggleCompletedButton);

    expect(mockToggleIsCompleted).toBeCalledWith(mockTask.id);
  });

  test("calls archiveTask with task as argument on minus-icon button click", async () => {
    render(
      <CompletedTask
        task={mockTask}
        toggleIsCompleted={mockToggleIsCompleted}
        archiveTask={mockArchiveTask}
      />
    );

    const archiveButton = screen.getByTestId("archive");

    await userEvent.click(archiveButton);

    expect(mockArchiveTask).toBeCalledWith(mockTask);
  });
});

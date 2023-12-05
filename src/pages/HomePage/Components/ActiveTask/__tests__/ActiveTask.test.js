import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActiveTask from "../ActiveTask";

const mockToggleIsCompleted = jest.fn();
const mockOpenEditForm = jest.fn();
const mockArchiveTask = jest.fn();

const mockTask = {
  id: 1,
  description: "This is a test",
  priority: "high",
  created_at: new Date(2023, 11, 2, 14, 17, 0, 0),
  due_date: "Sat Dec 02 2023",
};

describe("ActiveTask", () => {
  test("renders correctly", () => {
    const { container } = render(
      <ActiveTask
        task={mockTask}
        assignColorByPriority={() => {}}
        toggleIsCompleted={mockToggleIsCompleted}
        openEditForm={mockOpenEditForm}
        archiveTask={mockArchiveTask}
      />
    );

    const taskDescriptionElements = screen.getAllByText(mockTask.description);
    const taskPriorityElements = screen.getAllByText(mockTask.priority);
    const createdAtElement = screen.getByText(/created at/i);
    const dueDateElements = screen.getAllByText(/complete by/i);
    const toggleCompleteButton = screen.getByTestId("toggle-complete");
    const openEditFormButton = screen.getByTestId("edit");
    const archiveButton = screen.getByTestId("archive");

    expect(taskDescriptionElements.length).toBe(2);
    expect(taskPriorityElements.length).toBe(2);
    expect(createdAtElement).toBeInTheDocument();
    expect(dueDateElements.length).toBe(2);
    expect(toggleCompleteButton).toBeInTheDocument();
    expect(openEditFormButton).toBeInTheDocument();
    expect(archiveButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("calls toggleIsCompleted with task id as argument on check-icon button click", async () => {
    render(
      <ActiveTask
        task={mockTask}
        assignColorByPriority={() => {}}
        toggleIsCompleted={mockToggleIsCompleted}
        openEditForm={mockOpenEditForm}
        archiveTask={mockArchiveTask}
      />
    );

    const toggleCompleteButton = screen.getByTestId("toggle-complete");

    await userEvent.click(toggleCompleteButton);

    expect(mockToggleIsCompleted).toHaveBeenCalledWith(mockTask.id);
  });

  test("calls openEditForm with task as argument on edit-icon button click", async () => {
    render(
      <ActiveTask
        task={mockTask}
        assignColorByPriority={() => {}}
        toggleIsCompleted={mockToggleIsCompleted}
        openEditForm={mockOpenEditForm}
        archiveTask={mockArchiveTask}
      />
    );

    const openEditFormButton = screen.getByTestId("edit");

    await userEvent.click(openEditFormButton);

    expect(mockOpenEditForm).toHaveBeenCalledWith(mockTask);
  });

  test("calls archiveTask with task as argument on minus-icon button click", async () => {
    render(
      <ActiveTask
        task={mockTask}
        assignColorByPriority={() => {}}
        toggleIsCompleted={mockToggleIsCompleted}
        openEditForm={mockOpenEditForm}
        archiveTask={mockArchiveTask}
      />
    );

    const archiveButton = screen.getByTestId("archive");

    await userEvent.click(archiveButton);

    expect(mockArchiveTask).toHaveBeenCalledWith(mockTask);
  });
});

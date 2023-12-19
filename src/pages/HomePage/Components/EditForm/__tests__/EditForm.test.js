import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockToDo } from "../../../../../mockData/toDoItems";

import EditForm from "../EditForm";
import { replaceAllRandomGeneratedIds } from "../../../HomePageHelpers";

describe("EditForm", () => {
  const mockEditTask = jest.fn();

  test("renders correctly with the correct task data", async () => {
    const { container } = render(
      <EditForm
        task={mockToDo}
        isOpen={true}
        closeModal={() => {}}
        editTask={mockEditTask}
      />
    );

    const titleElement = screen.getByText("Create Todo");
    const taskInputElement = screen.getByPlaceholderText("Write your task");
    const setPriorityElement = screen.getByRole("searchbox");
    const dueDateElement = screen.getByLabelText("Due Date");
    const updateButtonElement = screen.getByRole("button", {
      name: "Update",
    });

    expect(titleElement).toBeInTheDocument();
    expect(taskInputElement).toBeInTheDocument();
    expect(setPriorityElement).toBeInTheDocument();
    expect(dueDateElement).toBeInTheDocument();
    expect(updateButtonElement).toBeInTheDocument();

    expect(taskInputElement).toHaveValue("Task description");
    expect(setPriorityElement).toHaveValue("High");
    expect(dueDateElement).toHaveValue("December 31, 2023");

    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
  });

  test("calls editTask with the correct task data", async () => {
    const { container } = render(
      <EditForm
        task={mockToDo}
        isOpen={true}
        closeModal={() => {}}
        editTask={mockEditTask}
      />
    );

    const taskInputElement = screen.getByPlaceholderText("Write your task");
    const dueDateElement = screen.getByLabelText("Due Date");
    const updateButtonElement = screen.getByRole("button", {
      name: "Update",
    });

    await userEvent.clear(taskInputElement);
    await userEvent.type(taskInputElement, "Updated Task Description");

    await userEvent.clear(dueDateElement);
    await userEvent.type(dueDateElement, "December 24, 2023");

    await userEvent.click(updateButtonElement);

    await waitFor(() => {
      expect(mockEditTask).toHaveBeenCalledTimes(1);
      expect(mockEditTask).toHaveBeenCalledWith({
        id: 1,
        description: "Updated Task Description",
        priority: "high",
        due_date: new Date("2023-12-23T18:00:00.000Z"),
      });
    });

    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
  }, 20000);
});

import { render, screen } from "@testing-library/react";

import { replaceAllRandomGeneratedIds } from "../../../HomePageHelpers";
import AddTaskForm from "../AddTaskForm";

describe("AddTaskForm", () => {
  test("renders correctly", () => {
    const { container } = render(
      <AddTaskForm isOpen={true} closeModal={() => {}} />
    );

    const titleElement = screen.getByText("Create Todo");
    const taskInputElement = screen.getByPlaceholderText("Write your task");
    const setPriorityElement = screen.getByRole("searchbox");
    const dueDateElement = screen.getByRole("textbox", {
      name: /due date/i,
    });
    const createButtonElement = screen.getByRole("button", {
      name: "Create",
    });

    expect(titleElement).toBeInTheDocument();
    expect(taskInputElement).toBeInTheDocument();
    expect(setPriorityElement).toBeInTheDocument();
    expect(dueDateElement).toBeInTheDocument();
    expect(createButtonElement).toBeInTheDocument();

    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
  });
});

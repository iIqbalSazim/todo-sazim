import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActionButtons from "./ActionButtons";

const mockHandleNewToDoClick = jest.fn();
const mockSetIsConfirmModalOpen = jest.fn();
const mockSetFilter = jest.fn();

describe("ActionButtons", () => {
  test("renders correctly", () => {
    const { container } = render(
      <ActionButtons
        handleNewToDoClick={mockHandleNewToDoClick}
        setIsConfirmModalOpen={mockSetIsConfirmModalOpen}
        setFilter={mockSetFilter}
        filter={{}}
      />
    );

    expect(screen.getByText("Add todo")).toBeInTheDocument();
    expect(screen.getByText("Remove Completed")).toBeInTheDocument();
    expect(screen.getByText("Todo")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("calls handleNewToDoClick on 'Add todo' or 'Todo' button click", async () => {
    render(
      <ActionButtons
        handleNewToDoClick={mockHandleNewToDoClick}
        setIsConfirmModalOpen={mockSetIsConfirmModalOpen}
        setFilter={mockSetFilter}
        filter={{}}
      />
    );

    const addTodoButton = screen.getByText("Add todo");
    await userEvent.click(addTodoButton);
    expect(mockHandleNewToDoClick).toHaveBeenCalled();
  });

  test("calls setIsConfirmModalOpen on 'Remove Completed' or 'Completed' button click", async () => {
    render(
      <ActionButtons
        handleNewToDoClick={mockHandleNewToDoClick}
        setIsConfirmModalOpen={mockSetIsConfirmModalOpen}
        setFilter={mockSetFilter}
        filter={{}}
      />
    );

    const removeCompletedButton = screen.getByText("Remove Completed");
    await userEvent.click(removeCompletedButton);
    expect(mockSetIsConfirmModalOpen).toHaveBeenCalled();
  });
});

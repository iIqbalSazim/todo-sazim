import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { replaceAllRandomGeneratedIds } from "../../../HomePageHelpers";
import RemoveCompletedConfirmModal from "../RemoveCompletedConfirmModal";

const mockClearAllCompletedTasks = jest.fn();
const mockCloseModal = jest.fn();

describe("RemoveCompletedConfirmModal", () => {
  test("renders correctly", () => {
    const { container } = render(
      <RemoveCompletedConfirmModal
        clearAllCompletedTasks={mockClearAllCompletedTasks}
        closeModal={mockCloseModal}
        isConfirmModalOpen
      />
    );

    const titleElement = screen.getByRole("heading", {
      name: /confirm delete/i,
    });
    const areYouSureElement = screen.getByText(
      "Are you sure you want to permanently delete all completed tasks?"
    );
    const keepThemButton = screen.getByRole("button", {
      name: "No, Keep them.",
    });
    const deleteButton = screen.getByRole("button", {
      name: "Yes, Delete!",
    });

    expect(titleElement).toBeInTheDocument();
    expect(areYouSureElement).toBeInTheDocument();
    expect(keepThemButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
  });

  test("calls closeModal function on 'No, Keep them.' button click", async () => {
    render(
      <RemoveCompletedConfirmModal
        clearAllCompletedTasks={mockClearAllCompletedTasks}
        closeModal={mockCloseModal}
        isConfirmModalOpen
      />
    );

    const keepThemButton = screen.getByRole("button", {
      name: "No, Keep them.",
    });

    await userEvent.click(keepThemButton);

    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("calls clearAllCompletedTasks and closeModal functions on 'Yes, Delete!' button click", async () => {
    render(
      <RemoveCompletedConfirmModal
        clearAllCompletedTasks={mockClearAllCompletedTasks}
        closeModal={mockCloseModal}
        isConfirmModalOpen
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: "Yes, Delete!",
    });

    await userEvent.click(deleteButton);

    expect(mockClearAllCompletedTasks).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
  });
});

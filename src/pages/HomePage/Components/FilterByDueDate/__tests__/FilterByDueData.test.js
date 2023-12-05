import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FilterByDueDate from "../FilterByDueDate";

const mockToggleFilterDueDate = jest.fn();

describe("FilterByDueDate", () => {
  test("renders correctly", () => {
    const { container } = render(
      <FilterByDueDate
        filter={{}}
        toggleFilterDueDate={mockToggleFilterDueDate}
      />
    );

    const sortByDueDateButtons = screen.getAllByRole("button", {
      name: /sort by due date/i,
    });

    expect(sortByDueDateButtons.length).toBe(2);

    expect(container.innerHTML).toMatchSnapshot();
  });

  test("calls toggleFilterDueDate function on 'Sort by Due Date' button click", async () => {
    const { container } = render(
      <FilterByDueDate
        filter={{}}
        toggleFilterDueDate={mockToggleFilterDueDate}
      />
    );

    const sortByDueDateButton = screen.getByTestId("due-date-button-md");

    await userEvent.click(sortByDueDateButton);

    expect(mockToggleFilterDueDate).toHaveBeenCalled();

    expect(container.innerHTML).toMatchSnapshot();
  });
});

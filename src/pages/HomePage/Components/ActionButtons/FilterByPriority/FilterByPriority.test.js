import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import FilterByPriority from "./FilterByPriority";
import userEvent from "@testing-library/user-event";
import { PRIORITY } from "../../../HomePageConstants";

const mockSetFilter = jest.fn();

describe("FilterByPriority", () => {
  test("renders correctly", () => {
    const { container } = render(
      <FilterByPriority setFilter={mockSetFilter} filter={{}} />
    );

    const highButtons = screen.getAllByText("High");
    const mediumButtons = screen.getAllByText("Medium");
    const lowButtons = screen.getAllByText("Low");
    const clearFilterButton = screen.getByText("Clear Filter");
    const clearButton = screen.getByText("Clear Filter");

    expect(highButtons.length).toBe(2);
    expect(lowButtons.length).toBe(2);
    expect(mediumButtons.length).toBe(2);
    expect(clearFilterButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("activates the high filter when clicked on 'High' button", async () => {
    const { container } = render(
      <FilterByPriority setFilter={mockSetFilter} filter={{}} />
    );

    const highButtonMd = screen.getByTestId("high-button-md");
    await userEvent.click(highButtonMd);
    expect(mockSetFilter).toHaveBeenCalledWith(PRIORITY.HIGH);

    expect(container).toMatchSnapshot();
  });

  test("activates the medium filter when clicked on 'Medium' button", async () => {
    const { container } = render(
      <FilterByPriority setFilter={mockSetFilter} filter={{}} />
    );

    const mediumButtonMd = screen.getByTestId("medium-button-md");
    await userEvent.click(mediumButtonMd);
    expect(mockSetFilter).toHaveBeenCalledWith(PRIORITY.MEDIUM);

    expect(container).toMatchSnapshot();
  });

  test("activates the low filter when clicked on 'Low' button", async () => {
    const { container } = render(
      <FilterByPriority setFilter={mockSetFilter} filter={{}} />
    );

    const lowButtonMd = screen.getByTestId("low-button-md");
    await userEvent.click(lowButtonMd);
    expect(mockSetFilter).toHaveBeenCalledWith(PRIORITY.LOW);

    expect(container).toMatchSnapshot();
  });

  test("clears filter when clicked on 'Clear Filter' button", async () => {
    render(<FilterByPriority setFilter={mockSetFilter} filter={{}} />);

    const clearFilterButton = screen.getByRole("button", {
      name: "Clear Filter",
    });
    await userEvent.click(clearFilterButton);
    expect(mockSetFilter).toHaveBeenCalledWith("");
  });
});

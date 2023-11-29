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
    expect(container).toMatchSnapshot();

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
  });

  test("activates the high filter when clicked on 'High' button", async () => {
    render(<FilterByPriority setFilter={mockSetFilter} filter={{}} />);

    const highButtonMd = screen.getByTestId("high-button-md");
    await userEvent.click(highButtonMd);
    expect(mockSetFilter).toHaveBeenCalledWith(PRIORITY.HIGH);

    const highButtonSm = screen.getByTestId("high-button-sm");
    await userEvent.click(highButtonSm);
    expect(mockSetFilter).toHaveBeenCalledWith(PRIORITY.HIGH);
  });

  test("activates the medium filter when clicked on 'Medium' button", async () => {
    render(<FilterByPriority setFilter={mockSetFilter} filter={{}} />);

    const mediumButtonMd = screen.getByTestId("medium-button-md");
    await userEvent.click(mediumButtonMd);
    expect(mockSetFilter).toHaveBeenCalledWith(PRIORITY.MEDIUM);

    const mediumButtonSm = screen.getByTestId("medium-button-sm");
    await userEvent.click(mediumButtonSm);
    expect(mockSetFilter).toHaveBeenCalledWith(PRIORITY.MEDIUM);
  });

  test("activates the low filter when clicked on 'Low' button", async () => {
    render(<FilterByPriority setFilter={mockSetFilter} filter={{}} />);

    const lowButtonMd = screen.getByTestId("low-button-md");
    await userEvent.click(lowButtonMd);
    expect(mockSetFilter).toHaveBeenCalledWith(PRIORITY.LOW);

    const lowButtonSm = screen.getByTestId("low-button-sm");
    await userEvent.click(lowButtonSm);
    expect(mockSetFilter).toHaveBeenCalledWith(PRIORITY.LOW);
  });

  test("clears filter when clicked on 'Clear Filter' or 'Clear' button", async () => {
    render(<FilterByPriority setFilter={mockSetFilter} filter={{}} />);

    const clearFilterButton = screen.getByRole("button", {
      name: "Clear Filter",
    });
    await userEvent.click(clearFilterButton);
    expect(mockSetFilter).toHaveBeenCalledWith("");

    const clearButton = screen.getByRole("button", {
      name: "Clear",
    });
    await userEvent.click(clearButton);
    expect(mockSetFilter).toHaveBeenCalledWith("");
  });
});

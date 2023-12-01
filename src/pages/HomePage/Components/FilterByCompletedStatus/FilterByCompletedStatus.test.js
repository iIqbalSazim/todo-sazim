import { render, screen } from "@testing-library/react";
import FilterByCompletedStatus from "./FilterByCompletedStatus";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockSetFilter = jest.fn();

describe("FilterByCompletedStatus", () => {
  test("renders correctly", () => {
    const { container } = render(
      <FilterByCompletedStatus setFilter={mockSetFilter} />
    );

    const allTab = screen.getByRole("tab", {
      name: /all/i,
    });
    const activeTab = screen.getByRole("tab", {
      name: /active/i,
    });
    const completedTab = screen.getByRole("tab", {
      name: /completed/i,
    });

    expect(allTab).toBeInTheDocument();
    expect(activeTab).toBeInTheDocument();
    expect(completedTab).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("calls setFilter with value 'all' when clicked on All tab", async () => {
    const { container } = render(
      <FilterByCompletedStatus setFilter={mockSetFilter} />
    );

    const allTab = screen.getByRole("tab", {
      name: /all/i,
    });

    await userEvent.click(allTab);

    expect(mockSetFilter).toBeCalledWith("all");

    expect(container).toMatchSnapshot();
  });

  test("calls setFilter with value 'active' when clicked on Active tab", async () => {
    const { container } = render(
      <FilterByCompletedStatus setFilter={mockSetFilter} />
    );

    const activeTab = screen.getByRole("tab", {
      name: /active/i,
    });

    await userEvent.click(activeTab);

    expect(mockSetFilter).toBeCalledWith("active");

    expect(container).toMatchSnapshot();
  });

  test("calls setFilter with value 'completed' when clicked on Completed tab", async () => {
    const { container } = render(
      <FilterByCompletedStatus setFilter={mockSetFilter} />
    );

    const completedTab = screen.getByRole("tab", {
      name: /completed/i,
    });

    await userEvent.click(completedTab);

    expect(mockSetFilter).toBeCalledWith("completed");

    expect(container).toMatchSnapshot();
  });
});

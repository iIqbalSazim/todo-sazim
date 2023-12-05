import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { replaceAllRandomGeneratedIds } from "../../../HomePageHelpers";
import FilterByCompletedStatus from "../FilterByCompletedStatus";

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

    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
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

    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
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
    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
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
    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
  });
});

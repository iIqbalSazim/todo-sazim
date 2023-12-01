import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ResponsiveFilterByCompletedStatus from "./ResponsiveFilterByCompletedStatus";

const mockSetCompletedStatusFilter = jest.fn();

describe("ResponsiveFilterByCompletedStatus", () => {
  test("renders correctly", () => {
    const { container } = render(
      <ResponsiveFilterByCompletedStatus
        setCompletedStatusFilter={mockSetCompletedStatusFilter}
        filter={{}}
      />
    );

    const allButton = screen.getByRole("button", {
      name: /all/i,
    });
    const activeButton = screen.getByRole("button", {
      name: /active/i,
    });
    const completedButton = screen.getByRole("button", {
      name: /completed/i,
    });

    expect(allButton).toBeInTheDocument();
    expect(activeButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("calls setCompletedStatusFilter with value 'all' when clicked on All button", async () => {
    const { container } = render(
      <ResponsiveFilterByCompletedStatus
        setCompletedStatusFilter={mockSetCompletedStatusFilter}
        filter={{}}
      />
    );

    const allButton = screen.getByRole("button", {
      name: /all/i,
    });

    await userEvent.click(allButton);

    expect(mockSetCompletedStatusFilter).toHaveBeenCalledWith("all");
    expect(container).toMatchSnapshot();
  });

  test("calls setCompletedStatusFilter with value 'active' when clicked on Active button", async () => {
    const { container } = render(
      <ResponsiveFilterByCompletedStatus
        setCompletedStatusFilter={mockSetCompletedStatusFilter}
        filter={{}}
      />
    );

    const active = screen.getByRole("button", {
      name: /active/i,
    });

    await userEvent.click(active);

    expect(mockSetCompletedStatusFilter).toHaveBeenCalledWith("active");
    expect(container).toMatchSnapshot();
  });

  test("calls setCompletedStatusFilter with value 'completed' when clicked on Completed button", async () => {
    const { container } = render(
      <ResponsiveFilterByCompletedStatus
        setCompletedStatusFilter={mockSetCompletedStatusFilter}
        filter={{}}
      />
    );

    const completedButton = screen.getByRole("button", {
      name: /completed/i,
    });

    await userEvent.click(completedButton);

    expect(mockSetCompletedStatusFilter).toHaveBeenCalledWith("completed");
    expect(container).toMatchSnapshot();
  });
});

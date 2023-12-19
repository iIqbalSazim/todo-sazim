import { act, render, screen, waitFor } from "@testing-library/react";

import { mockToDoItems } from "../../../mockData/toDoItems";
import HomePage from "../HomePage";
import * as apiMethods from "../Api/HomePageMethods";
import { replaceAllRandomGeneratedIds } from "../HomePageHelpers";

describe("HomePage", () => {
  test("renders correctly with no tasks", async () => {
    const fetchAllTasksSpy = jest.spyOn(apiMethods, "fetchAllTasks");
    fetchAllTasksSpy.mockResolvedValueOnce({ data: [] });

    let container;
    await act(async () => {
      ({ container } = render(<HomePage />));
    });

    const youHaveNoTodosElement = screen.getByText(/You have no todos/i);

    expect(youHaveNoTodosElement).toBeInTheDocument();

    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
  });

  test("fetch tasks array and removes 'You have no todos' element from document", async () => {
    const fetchAllTasksSpy = jest.spyOn(apiMethods, "fetchAllTasks");
    fetchAllTasksSpy.mockResolvedValueOnce({ data: mockToDoItems });

    let container;
    await act(async () => {
      ({ container } = render(<HomePage />, { initialState: { tasks: [] } }));
    });

    await waitFor(() => {
      const youHaveNoTodosElement = screen.queryByText(/You have no todos/i);
      expect(youHaveNoTodosElement).not.toBeInTheDocument();
    });

    expect(screen.getAllByText(/test task 1/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/test task 2/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/test task 3/i)[0]).toBeInTheDocument();

    expect(replaceAllRandomGeneratedIds(container.innerHTML)).toMatchSnapshot();
  });
});

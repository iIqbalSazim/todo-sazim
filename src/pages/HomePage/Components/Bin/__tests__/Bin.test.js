import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockTrashTodos } from "../../../../../mockData/toDoItems";
import { replaceAllRandomGeneratedIds } from "../../../HomePageHelpers";
import Bin from "../Bin";

const mockRetrieveAllClick = jest.fn();
const mockEmptyBinClick = jest.fn();

describe("Bin", () => {
  test("renders correctly", () => {
    const { container } = render(
      <Bin
        trash={mockTrashTodos}
        handleRetrieveAllClick={mockRetrieveAllClick}
        handleEmptyBinClick={mockEmptyBinClick}
      />
    );

    const binButton = screen.getByRole("button");

    expect(binButton).toBeInTheDocument();

    const randomIdsReplaced = replaceAllRandomGeneratedIds(container.innerHTML);

    expect(randomIdsReplaced).toMatchSnapshot();
  });

  test("menu renders correctly after clicking on bin button", async () => {
    const { container } = render(
      <Bin
        trash={mockTrashTodos}
        handleRetrieveAllClick={mockRetrieveAllClick}
        handleEmptyBinClick={mockEmptyBinClick}
      />
    );

    const binButton = screen.getByRole("button");

    await userEvent.click(binButton);

    const retrieveAllMenuButton = screen.getByText(/retrieve all/i);
    const emptyBinMenuButton = screen.getByText(/empty bin/i);

    expect(retrieveAllMenuButton).toBeInTheDocument();
    expect(emptyBinMenuButton).toBeInTheDocument();

    const randomIdsReplaced = replaceAllRandomGeneratedIds(container.innerHTML);

    expect(randomIdsReplaced).toMatchSnapshot();
  });

  test("calls handleRetrieveAllClick on retrieve all button click", async () => {
    render(
      <Bin
        trash={mockTrashTodos}
        handleRetrieveAllClick={mockRetrieveAllClick}
        handleEmptyBinClick={mockEmptyBinClick}
      />
    );

    const binButton = screen.getByRole("button");
    await userEvent.click(binButton);

    const retrieveAllMenuButton = screen.getByText(/retrieve all/i);
    await userEvent.click(retrieveAllMenuButton);

    expect(mockRetrieveAllClick).toHaveBeenCalled();
  });

  test("calls handleEmptyBinClick on empty bin button click", async () => {
    render(
      <Bin
        trash={mockTrashTodos}
        handleRetrieveAllClick={mockRetrieveAllClick}
        handleEmptyBinClick={mockEmptyBinClick}
      />
    );

    const binButton = screen.getByRole("button");
    await userEvent.click(binButton);

    const emptyBinMenuButton = screen.getByText(/empty bin/i);
    await userEvent.click(emptyBinMenuButton);

    expect(mockEmptyBinClick).toHaveBeenCalled();
  });
});

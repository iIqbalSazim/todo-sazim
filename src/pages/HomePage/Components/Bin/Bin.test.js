import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bin from "./Bin";
import userEvent from "@testing-library/user-event";

const mockTrash = [
  {
    id: 1,
    description: "Test task 1",
  },
  {
    id: 2,
    description: "Test task 2",
  },
];
const mockRetrieveAllClick = jest.fn();
const mockEmptyBinClick = jest.fn();

describe("Bin", () => {
  test("renders correctly", () => {
    const { container } = render(
      <Bin
        trash={mockTrash}
        handleRetrieveAllClick={mockRetrieveAllClick}
        handleEmptyBinClick={mockEmptyBinClick}
      />
    );

    const binButton = screen.getByRole("button");

    expect(binButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("menu renders correctly after clicking on bin button", async () => {
    const { container } = render(
      <Bin
        trash={mockTrash}
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

    expect(container).toMatchSnapshot();
  });

  test("calls handleRetrieveAllClick on retrieve all button click", async () => {
    render(
      <Bin
        trash={mockTrash}
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
        trash={mockTrash}
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

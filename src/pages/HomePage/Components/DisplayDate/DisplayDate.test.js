import { render, screen } from "@testing-library/react";
import DisplayDate from "./DisplayDate";

describe("DisplayDate", () => {
  test("renders correctly with correct date", () => {
    const { container } = render(<DisplayDate />);

    const dateTitles = screen.getAllByRole("heading");

    expect(dateTitles).toHaveLength(2);

    expect(dateTitles[0].textContent).toEqual(new Date().toDateString());
    expect(dateTitles[1].textContent).toEqual(new Date().toDateString());

    expect(container).toMatchSnapshot();
  });
});

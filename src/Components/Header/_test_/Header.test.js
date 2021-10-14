import { render, screen } from "@testing-library/react";
import Header from "../Header";

it("renders Header component", async () => {
  render(<Header />);
  const headingElement = screen.getByText(/Beta/i);
  expect(headingElement).toBeInTheDocument();
});

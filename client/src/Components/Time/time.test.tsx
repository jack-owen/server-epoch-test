import React from "react";
import { render, screen } from "@testing-library/react";
import Time from ".";

test("renders metrics component", () => {
  render(<Time />);
  const linkElement = screen.getByText(/\/time endpoint/i);
  expect(linkElement).toBeInTheDocument();
});

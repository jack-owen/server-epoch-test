import React from "react";
import { render, screen } from "@testing-library/react";
import Metrics from ".";

test("renders metrics component", () => {
  render(<Metrics />);
  const linkElement = screen.getByText(/\/metrics endpoint/i);
  expect(linkElement).toBeInTheDocument();
});

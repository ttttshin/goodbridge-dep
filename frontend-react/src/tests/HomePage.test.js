import { render, screen } from "@testing-library/react";
import HomePage from "../components/pages/homepage";
import { BrowserRouter } from "react-router-dom";
import React from "react";

test("renders home page", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const H1 = screen.getAllByText(/Connecting/i);
  expect(H1).toHaveLength(1);
  expect(H1[0]).toBeInTheDocument();
});

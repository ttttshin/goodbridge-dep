import React from "react";
import { render } from "@testing-library/react";
import LogoutButton from "../components/utils/logoutButton";
import { BrowserRouter } from "react-router-dom";

describe("Button component", () => {
  test("renders a button with given label", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <LogoutButton label="Click me" />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import DeleteAccountButton from "../components/utils/deleteAccountButton";
import { BrowserRouter } from "react-router-dom";

describe("Button component", () => {
  test("renders a button with given label", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <DeleteAccountButton label="Click me" />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import CustomButton from "../components/utils/CustomButton";

describe("Button component", () => {
  test("renders a button with given label", () => {
    const { asFragment } = render(<CustomButton label="Click me" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

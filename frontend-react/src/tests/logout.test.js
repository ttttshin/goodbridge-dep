import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogoutButton from "../components/utils/logoutButton";
import React from "react";

describe("LogoutButton", () => {
  it("should clear local storage when logout button is clicked", () => {
    // Set a value in local storage to verify that it is cleared
    localStorage.setItem("token", "fake-token");

    // Render the component containing the logout button
    const { getByText } = render(
          <BrowserRouter>     
    <LogoutButton />
          </BrowserRouter>
    );

    // Simulate a click on the logout button
    fireEvent.click(getByText("Logout"));

    // Check that local storage has been cleared
    expect(localStorage.getItem("token")).toBeNull();
  });
});

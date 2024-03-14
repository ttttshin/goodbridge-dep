import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/pages/login";
import { BrowserRouter } from "react-router-dom";
import React from "react";

test("check all the text fro the login form", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByRole('textbox', { type: 'email' });
  const passwordInput = screen.getByRole('textbox', { type: 'password' });
  const submitButton = screen.getByRole("button", { type: 'login' });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("does not log in the user with invalid credentials", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByRole('textbox', { type: 'email' });
  const passwordInput = screen.getByRole('textbox', { type: 'password' });
  const submitButton = screen.getByRole("button", { type: 'login' });

  userEvent.type(emailInput, "email");
  userEvent.type(passwordInput, "password");
  userEvent.click(submitButton);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

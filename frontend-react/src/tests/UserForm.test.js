import { render, screen } from "@testing-library/react";
import UserForm from "../components/componentsForAdmin/UserForm";
import { UserContext } from '../context/UserContext';
import userEvent from "@testing-library/user-event";
import React from "react";

const mockDispatch = jest.fn();

// Example test
test("check all components rendered correctly", async () => {

  // Wrap UserForm in UsersContext.Provider if it uses context
  render(
    <UserContext.Provider value={{ dispatch: mockDispatch }}>
      <UserForm />
    </UserContext.Provider>
  );

  // Simulate user input
  const emailInput = screen.getByText(/Email:/i);
  const passwordInput = screen.getByText(/Password:/i);
  const bioInput= screen.getByText(/Bio:/i);
  const nameInput = screen.getByText(/Name:/i);
  const submitButton = screen.getByRole('button',{name: /Add user/i});
  const countryInput = screen.getByText(/Country:/i);
  const stateInput = screen.getByText(/State:/i);
  const cityInput = screen.getByText(/City:/i);
  const valuesInput = screen.getByTestId("valuesInput");



  expect(emailInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(bioInput).toBeInTheDocument();
  expect(countryInput).toBeInTheDocument();
  expect(stateInput).toBeInTheDocument();
  expect(cityInput).toBeInTheDocument();
  expect(valuesInput).toBeInTheDocument();

});


test("check if the component is still there after invalid input", async () => {
  // Wrap UserForm in UsersContext.Provider if it uses context
  render(
    <UserContext.Provider value={{ dispatch: mockDispatch }}>
      <UserForm />
    </UserContext.Provider>
  );
  
  // Simulate user input
  const emailInput = screen.getByText(/Email:/i);
  const passwordInput = screen.getByText(/Password:/i);
  const bioInput= screen.getByText(/Bio:/i);
  const nameInput = screen.getByText(/Name:/i);
  const submitButton = screen.getByRole('button',{name: /Add user/i});
  const countryInput = screen.getByText(/Country:/i);
  const stateInput = screen.getByText(/State:/i);
  const cityInput = screen.getByText(/City:/i);
  const valuesInput = screen.getByTestId("valuesInput"); 

  
  //simulate user action to check everything is still there
  userEvent.type(emailInput, "email");
  userEvent.type(passwordInput, "password");
  userEvent.click(submitButton);
  
  
  
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(bioInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(countryInput).toBeInTheDocument();
  expect(stateInput).toBeInTheDocument();
  expect(cityInput).toBeInTheDocument();
  expect(valuesInput).toBeInTheDocument();
  
  });


test("check if the component is still there after another invalid input", async () => {

  // Wrap UserForm in UsersContext.Provider if it uses context
  render(
    <UserContext.Provider value={{ dispatch: mockDispatch }}>
      <UserForm />
    </UserContext.Provider>
  );

  const submitButton = screen.getByRole('button',{name: /Add user/i});
  const emailInput = screen.getByText(/Email:/i);
  const passwordInput = screen.getByText(/Password:/i);
  const bioInput= screen.getByText(/Bio:/i);
  const nameInput = screen.getByText(/Name:/i);
  const countryInput = screen.getByText(/Country:/i);
  const stateInput = screen.getByText(/State:/i);
  const cityInput = screen.getByText(/City:/i);
  const valuesInput = screen.getByTestId("valuesInput"); 
  
  
 //simulate user action to check everything is still there
 userEvent.type(bioInput, "bio");
 userEvent.type(passwordInput, "password");
 userEvent.click(submitButton);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(bioInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(countryInput).toBeInTheDocument();
  expect(stateInput).toBeInTheDocument();
  expect(cityInput).toBeInTheDocument();
  expect(valuesInput).toBeInTheDocument();
  
  
});




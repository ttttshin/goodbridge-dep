import { render, screen } from "@testing-library/react";
import SignUp from "../components/pages/signUp";
import { BrowserRouter } from "react-router-dom";
import React from "react";


test("check all the text fro the login form", async () => {
     render(
       <BrowserRouter>
         <SignUp />
       </BrowserRouter>
     );
   
     const userNameInput = screen.getByTestId('name');
     const emailInput = screen.getByTestId('email')
     const passwordInput = screen.getByTestId('password');
     const submitButton = screen.getByTestId('button');
   
     expect(userNameInput).toBeInTheDocument();
     expect(emailInput).toBeInTheDocument();
     expect(passwordInput).toBeInTheDocument();
     expect(submitButton).toBeInTheDocument();

   });
   

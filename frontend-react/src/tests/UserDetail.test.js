import { render, screen } from "@testing-library/react";
import { UserContext } from '../context/UserContext'; // Adjust the import path as necessary
import UserDetails from "../components/componentsForAdmin/UserDetails";
import React from "react"; 

// Mock the useUsersContext hook

const mockDispatch = jest.fn();

// Mock user data
const mockUser = {
  _id: "1",
  name: "John Doe",
  email: "john@example.com",
  bio: "Developer",
  location: ["City", "Country"],
  values: ["Integrity", "Passion", "Innovation"]
};


test("renders user details correctly", () => {
    // Provide the mock implementation for useUsersContext
   
  
    render(
    <UserContext.Provider value={{ dispatch: mockDispatch }}>
      <UserDetails user={mockUser} />
    </UserContext.Provider>
    );
  
    // Verify that user details are rendered
    expect(screen.getByText(mockUser._id)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.email}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.bio}`)).toBeInTheDocument();
    expect(screen.getByTestId("location")).toBeInTheDocument();
    expect(screen.getByTestId("values")).toBeInTheDocument();
    
  
    // Verify that the delete button is rendered
    expect(screen.getByText('Delete')).toBeInTheDocument();
});
  
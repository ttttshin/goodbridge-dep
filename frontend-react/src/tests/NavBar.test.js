import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/utils/NavBar";
import '@testing-library/jest-dom';
import React from "react";

test("renders NavBar", () => {
  const links = [
    { to: "/about", text: "About" },
    { to: "/contactus", text: "Contact Us" },
    { to: "/news", text: "News" },
  ];
  render(
    <MemoryRouter>
      <NavBar links={links} />
    </MemoryRouter>
  );
  const link = screen.getByTestId('admin-link');
  fireEvent.click(link);

  expect(window.location.href).toBe("http://localhost/");

  const link2 = screen.getByTestId('contact-us-link');
  fireEvent.click(link2);
  expect(window.location.href).toBe("http://localhost/");
  const link3 = screen.getByTestId('news-link');
  fireEvent.click(link3);
  expect(window.location.href).toBe("http://localhost/");
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

jest.mock("./api", () => ({
  ...jest.requireActual("./api"),
  useApi: () => ({ isLoading: true, data: null }),
}));

it("shows that it's loading", () => {
  render(<App />);
  const element = screen.getByText(/Loading.../i);
  expect(element).toBeInTheDocument();
});

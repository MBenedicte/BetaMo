import { fireEvent, render, screen } from "@testing-library/react";
import BottomNavBar from "../BottomNavbar";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("Renders BottomNavbar component", () => {
  it("should trigger the path change to trending", async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <BottomNavBar />
      </Router>
    );

    const navbarElement = screen.getAllByRole("button");
    expect(navbarElement.length).toBe(4);
  });

  it("should trigger the path change to favorite", async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <BottomNavBar />
      </Router>
    );

    fireEvent.click(getByText(/Favorites/i));
    expect(history.length).toBe(3);
  });

  it("should trigger the path change to watchLater", async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <BottomNavBar />
      </Router>
    );

    fireEvent.click(getByText(/watch later/i));
    expect(history.length).toBe(3);
  });

  it("should trigger the path change to search", async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <BottomNavBar />
      </Router>
    );

    fireEvent.click(getByText(/search/i));
    expect(history.length).toBe(3);
  });
});

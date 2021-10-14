import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import Search from "../Search";

describe("Search Component", () => {
  it("should check tv", () => {
    render(<Search />);

    const gettvtext = screen.getByText("Search TV Series");
    expect(gettvtext).toBeInTheDocument();
  });
  it("should check movie", () => {
    render(<Search />);

    const getmovietext = screen.getByText("Search Movie");
    expect(getmovietext).toBeInTheDocument();
  });
});

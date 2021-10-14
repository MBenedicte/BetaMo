import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import Trending from "../Trending";

describe("Trending Component", () => {
  it("should check tv", () => {
    render(<Trending />);

    const gettvtext = screen.getByText("TV Series");
    expect(gettvtext).toBeInTheDocument();
  });
  it("should check movie", () => {
    render(<Trending />);

    const getmovietext = screen.getByText("Movie");
    expect(getmovietext).toBeInTheDocument();
  });
});

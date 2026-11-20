import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductCard } from "./ProductCard";

describe("ProductCard", () => {
  it("renders product title and price", () => {
    render(<MemoryRouter><ProductCard product={{
      id: 1, title: "Demo product", price: 12.5, description: "A demo",
      category: "test", image: "https://example.com/image.png"
    }} /></MemoryRouter>);
    expect(screen.getByText("Demo product")).toBeInTheDocument();
    expect(screen.getByText("$12.50")).toBeInTheDocument();
  });
});

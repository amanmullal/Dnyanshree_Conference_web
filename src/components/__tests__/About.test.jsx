import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { About } from "../About";

describe("About Component", () => {
  const mockData = {
    paragraph:
      "Magnox Energy Solutions LLP is dedicated to streamlining renewable energy projects with our extensive industry network and in-depth regulatory knowledge.",
    Why: [
      "Lorem ipsum dolor",
      "Tempor incididunt",
      "Lorem ipsum dolor",
      "Incididunt ut labore",
    ],
    Why2: [
      "Aliquip ex ea commodo",
      "Lorem ipsum dolor",
      "Exercitation ullamco",
      "Lorem ipsum dolor",
    ],
  };

  it("renders without crashing", () => {
    render(<About data={mockData} />);
  });

  it("displays the main paragraph", () => {
    render(<About data={mockData} />);
    expect(
      screen.getByText(/Magnox Energy Solutions LLP is dedicated/)
    ).toBeInTheDocument();
  });

  it("renders all Why items", () => {
    render(<About data={mockData} />);
    mockData.Why.forEach((item) => {
      const elements = screen.getAllByText(item);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("renders all Why2 items", () => {
    render(<About data={mockData} />);
    mockData.Why2.forEach((item) => {
      const elements = screen.getAllByText(item);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("renders the About Us heading", () => {
    render(<About data={mockData} />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("renders Why Choose Us heading", () => {
    render(<About data={mockData} />);
    expect(screen.getByText("Why Choose Us?")).toBeInTheDocument();
  });

  it("displays the about image", () => {
    render(<About data={mockData} />);
    const image = screen.getByAltText("About Magnox Energy Solutions");
    expect(image).toBeInTheDocument();
  });

  it("renders with loading state when no data provided", () => {
    render(<About />);
    expect(screen.getByText("Loading our story...")).toBeInTheDocument();
  });

  it("has proper section id", () => {
    render(<About data={mockData} />);
    const section = document.querySelector("#about");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "about");
  });

  it("displays experience badge", () => {
    render(<About data={mockData} />);
    expect(screen.getByText("5+")).toBeInTheDocument();
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(<About data={mockData} />);
    const ctaButton = screen.getByRole("link", {
      name: /explore our services/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "#services");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Services } from "../Services";

describe("Services Component", () => {
  const mockData = [
    {
      name: "Consultancy",
      text: "Need expert advice on your electrical projects? Look no further. At Green En Solutions, we provide consultancy services for a wide range of projects.",
    },
    {
      name: "Renewable Energy",
      text: "Renewable energy is at the heart of what we do. We handle every aspect of renewable energy projects.",
    },
    {
      name: "Control Panels",
      text: "We specialize in control panels, providing everything from design and supply to installation, testing, and commissioning.",
    },
  ];

  it("renders without crashing", () => {
    render(<Services data={mockData} />);
  });

  it("displays the Services heading", () => {
    render(<Services data={mockData} />);
    expect(screen.getByText("Our")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("displays the main description", () => {
    render(<Services data={mockData} />);
    expect(
      screen.getByText(/comprehensive range of services/)
    ).toBeInTheDocument();
  });

  it("renders all service items", () => {
    render(<Services data={mockData} />);
    mockData.forEach((service) => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
      expect(screen.getByText(service.text)).toBeInTheDocument();
    });
  });

  it("renders CTA button", () => {
    render(<Services data={mockData} />);
    const ctaButton = screen.getByRole("link", {
      name: /see what our clients say/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "#testimonials");
  });

  it("has proper section id", () => {
    render(<Services data={mockData} />);
    const section = document.querySelector("#services");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "services");
  });

  it("renders with loading state when no data provided", () => {
    render(<Services />);
    expect(screen.getByText("Loading our services...")).toBeInTheDocument();
  });

  it("renders service cards with proper structure", () => {
    render(<Services data={mockData} />);
    // Should have service cards for each item
    mockData.forEach((service) => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    });
  });
});

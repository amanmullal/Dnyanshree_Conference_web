import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Features } from "../Features";

describe("Features Component", () => {
  const mockData = [
    {
      title: "Power Evacuation Mastery",
      text: "We specialize in efficient power evacuation for Solar and Wind projects, with expertise in Special Energy Metering at both Generation and Plant End.",
    },
    {
      title: "EPC Project",
      text: "Our robust capabilities extend to transmission line EPC projects, from Generation End to Substation End, including bay design and comprehensive EPC services.",
    },
    {
      title: "Right-of-Way Expertise",
      text: "We are experts at handling the complex process of securing land and permissions needed for energy projects.",
    },
    {
      title: "Utility-Scale Projects",
      text: "From the ground up, we design, build, and manage extensive grid-scale solar, wind, and hybrid projects across India.",
    },
  ];

  it("renders without crashing", () => {
    render(<Features data={mockData} />);
  });

  it("displays the Amazing Features heading", () => {
    render(<Features data={mockData} />);
    expect(screen.getByText("Amazing Features")).toBeInTheDocument();
  });

  it("displays the main description", () => {
    render(<Features data={mockData} />);
    expect(
      screen.getByText(/Discover the powerful features/)
    ).toBeInTheDocument();
  });

  it("renders all feature items", () => {
    render(<Features data={mockData} />);
    mockData.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.text)).toBeInTheDocument();
    });
  });

  it("renders CTA button", () => {
    render(<Features data={mockData} />);
    const ctaButton = screen.getByRole("link", {
      name: /learn more about us/i,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "#about");
  });

  it("has proper section id", () => {
    render(<Features data={mockData} />);
    const section = document.querySelector("#features");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "features");
  });

  it("renders with loading state when no data provided", () => {
    render(<Features />);
    expect(screen.getByText("Loading amazing features...")).toBeInTheDocument();
  });

  it("renders feature cards with proper structure", () => {
    render(<Features data={mockData} />);
    mockData.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
    });
  });
});

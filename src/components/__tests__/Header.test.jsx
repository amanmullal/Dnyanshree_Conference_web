import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "../Header";

describe("Header Component", () => {
  const mockData = {
    title: "Innovative Energy for a Greener Tomorrow!",
    paragraph:
      "From advanced technology to sustainable practices, we provide end-to-end energy solutions that empower growth and protect the planet.",
  };

  it("renders without crashing", () => {
    render(<Header data={mockData} />);
  });

  it("displays the correct title", () => {
    render(<Header data={mockData} />);
    // The title is split into individual words, so check for the heading role instead
    const heading = screen.getByRole("heading", {
      name: /innovative energy for a greener tomorrow/i,
    });
    expect(heading).toBeInTheDocument();

    // Also check individual words are present
    expect(screen.getByText(/Innovative/)).toBeInTheDocument();
    expect(screen.getByText(/Energy/)).toBeInTheDocument();
    expect(screen.getByText(/Greener/)).toBeInTheDocument();
  });

  it("displays the correct paragraph text", () => {
    render(<Header data={mockData} />);
    expect(
      screen.getByText(/From advanced technology to sustainable practices/)
    ).toBeInTheDocument();
  });

  it("renders the video element", () => {
    render(<Header data={mockData} />);
    const video = document.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
  });

  it("renders the Get Started CTA button", () => {
    render(<Header data={mockData} />);
    const ctaButton = screen.getByRole("link", { name: /get started/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "#features");
  });

  it("renders the Learn More button", () => {
    render(<Header data={mockData} />);
    const learnMoreButton = screen.getByRole("link", { name: /learn more/i });
    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton).toHaveAttribute("href", "#about");
  });

  it("renders with fallback content when no data provided", () => {
    render(<Header />);
    const loadingElements = screen.getAllByText("Loading...");
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it("renders scroll indicator", () => {
    render(<Header data={mockData} />);
    expect(screen.getByText("Scroll to explore")).toBeInTheDocument();
  });

  it("displays title words individually when data is provided", () => {
    render(<Header data={mockData} />);
    // The title should be split into individual words
    expect(screen.getByText(/Innovative/)).toBeInTheDocument();
    expect(screen.getByText(/Energy/)).toBeInTheDocument();
    expect(screen.getByText(/Greener/)).toBeInTheDocument();
  });
});

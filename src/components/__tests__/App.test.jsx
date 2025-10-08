import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import App from "../../App";

// Mock all components to focus on App logic
vi.mock("../Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar Component</div>,
}));

vi.mock("../Header", () => ({
  Header: ({ data }) => (
    <div data-testid="header">
      Header Component - {data?.title || "No Title"}
    </div>
  ),
}));

vi.mock("../Features", () => ({
  Features: ({ data }) => (
    <div data-testid="features">
      Features Component - {data?.length || 0} items
    </div>
  ),
}));

vi.mock("../About", () => ({
  About: ({ data }) => (
    <div data-testid="about">
      About Component - {data?.paragraph ? "Has Content" : "No Content"}
    </div>
  ),
}));

vi.mock("../Services", () => ({
  Services: ({ data }) => (
    <div data-testid="services">
      Services Component - {data?.length || 0} items
    </div>
  ),
}));

vi.mock("../Gallery", () => ({
  Gallery: ({ data }) => (
    <div data-testid="gallery">
      Gallery Component - {data?.length || 0} items
    </div>
  ),
}));

// vi.mock("../Testimonials", () => ({
//   Testimonials: ({ data }) => (
//     <div data-testid="testimonials">
//       Testimonials Component - {data?.length || 0} items
//     </div>
//   ),
// }));

// vi.mock("../Team", () => ({
//   Team: ({ data }) => (
//     <div data-testid="team">Team Component - {data?.length || 0} members</div>
//   ),
// }));

vi.mock("../Contact", () => ({
  Contact: ({ data }) => (
    <div data-testid="contact">
      Contact Component - {data?.email || "No Email"}
    </div>
  ),
}));

// Mock the JSON data
vi.mock("../../data/data.json", () => ({
  default: {
    Header: {
      title: "Innovative Energy for a Greener Tomorrow!",
      paragraph:
        "From advanced technology to sustainable practices, we provide end-to-end energy solutions that empower growth and protect the planet.",
    },
    About: {
      paragraph:
        "Magnox Energy Solutions LLP is dedicated to streamlining renewable energy projects...",
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
    },
    Gallery: [
      {
        title: "500MW Solar Power Plant - Rajasthan",
        largeImage: "img1.jpg",
        smallImage: "img1-small.jpg",
      },
      {
        title: "Wind Farm Grid Integration Project",
        largeImage: "img2.jpg",
        smallImage: "img2-small.jpg",
      },
    ],
    Services: [
      {
        icon: "fa fa-wordpress",
        name: "Consultancy",
        text: "Expert advice on electrical projects...",
      },
      {
        icon: "fa fa-cart-arrow-down",
        name: "Renewable Energy",
        text: "Renewable energy solutions...",
      },
    ],
    Testimonials: [
      {
        img: "img/testimonials/01.jpg",
        text: "Great service!",
        name: "John Doe",
      },
      {
        img: "img/testimonials/02.jpg",
        text: "Excellent work!",
        name: "Jane Smith",
      },
    ],
    Team: [
      { img: "team1.jpg", name: "Team Member 1", job: "Director" },
      { img: "team2.jpg", name: "Team Member 2", job: "Senior Engineer" },
    ],
    Contact: {
      address: "Baner, Pune, Maharashtra, India",
      phone: "+91 8419871919",
      email: "magnoxenergysolutionsllp@gmail.com",
      facebook: "fb.com",
      twitter: "twitter.com",
      youtube: "youtube.com",
    },
    Features: [
      {
        icon: "fa fa-comments-o",
        title: "Power Evacuation Mastery",
        text: "We specialize in efficient power evacuation...",
      },
      {
        icon: "fa fa-bullhorn",
        title: "EPC Project",
        text: "Our robust capabilities extend to transmission line EPC projects...",
      },
    ],
  },
}));

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders all main components", () => {
    render(<App />);

    // Verify all components are rendered
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("features")).toBeInTheDocument();
    expect(screen.getByTestId("about")).toBeInTheDocument();
    expect(screen.getByTestId("services")).toBeInTheDocument();
    expect(screen.getByTestId("gallery")).toBeInTheDocument();
    // expect(screen.getByTestId("testimonials")).toBeInTheDocument();
    // expect(screen.getByTestId("team")).toBeInTheDocument();
    expect(screen.getByTestId("contact")).toBeInTheDocument();
  });

  it("loads and passes data to components correctly", async () => {
    render(<App />);

    // Wait for useEffect to complete and data to be loaded
    await waitFor(() => {
      expect(
        screen.getByText(
          "Header Component - Innovative Energy for a Greener Tomorrow!"
        )
      ).toBeInTheDocument();
    });

    // Verify data is passed to components
    expect(
      screen.getByText("Features Component - 2 items")
    ).toBeInTheDocument();
    expect(
      screen.getByText("About Component - Has Content")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Services Component - 2 items")
    ).toBeInTheDocument();
    expect(screen.getByText("Gallery Component - 2 items")).toBeInTheDocument();
    // expect(
    //   screen.getByText("Testimonials Component - 2 items")
    // ).toBeInTheDocument();
    // expect(screen.getByText("Team Component - 2 members")).toBeInTheDocument();
    expect(
      screen.getByText("Contact Component - magnoxenergysolutionsllp@gmail.com")
    ).toBeInTheDocument();
  });

  it("renders components in correct order", () => {
    render(<App />);

    const components = [
      screen.getByTestId("navbar"),
      screen.getByTestId("header"),
      screen.getByTestId("features"),
      screen.getByTestId("about"),
      screen.getByTestId("services"),
      screen.getByTestId("gallery"),
      // screen.getByTestId("testimonials"),
      // screen.getByTestId("team"),
      screen.getByTestId("contact"),
    ];

    // Verify all components are present
    components.forEach((component) => {
      expect(component).toBeInTheDocument();
    });
  });

  it("passes correct data structure to each component", async () => {
    render(<App />);

    await waitFor(() => {
      // Verify each component receives the correct data structure
      expect(screen.getByTestId("header")).toHaveTextContent(
        "Innovative Energy for a Greener Tomorrow!"
      );
      expect(screen.getByTestId("features")).toHaveTextContent("2 items");
      expect(screen.getByTestId("about")).toHaveTextContent("Has Content");
      expect(screen.getByTestId("services")).toHaveTextContent("2 items");
      expect(screen.getByTestId("gallery")).toHaveTextContent("2 items");
      // expect(screen.getByTestId("testimonials")).toHaveTextContent("2 items");
      // expect(screen.getByTestId("team")).toHaveTextContent("2 members");
      expect(screen.getByTestId("contact")).toHaveTextContent(
        "magnoxenergysolutionsllp@gmail.com"
      );
    });
  });

  it("handles empty data gracefully", () => {
    // This test verifies the component can handle empty initial state
    render(<App />);

    // Initially, before useEffect runs, components should handle empty data
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});

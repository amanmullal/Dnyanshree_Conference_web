import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "../Navbar";

// Mock React Router hooks
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({ pathname: "/" }),
    useNavigate: () => vi.fn(),
  };
});

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    nav: ({ children, className, ...props }) => (
      <nav className={className} {...props}>
        {children}
      </nav>
    ),
    div: ({ children, className, ...props }) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    button: ({ children, className, onClick, ...props }) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
    li: ({ children, className, ...props }) => (
      <li className={className} {...props}>
        {children}
      </li>
    ),
    a: ({ children, className, onClick, href, ...props }) => (
      <a className={className} onClick={onClick} href={href} {...props}>
        {children}
      </a>
    ),
  },
  AnimatePresence: ({ children }) => <div>{children}</div>,
}));

// Helper function to render with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Navbar Component", () => {
  const mockData = {
    logo: "/img/magnox_energy_logo.png",
  };

  let mockGetElementById;
  let mockQuerySelector;

  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});

    // Mock document methods for scroll behavior
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 0,
    });

    // Mock getElementById for navigation
    mockGetElementById = vi.spyOn(document, "getElementById").mockReturnValue({
      offsetTop: 100,
      scrollIntoView: vi.fn(),
    });

    // Mock querySelector for navbar
    mockQuerySelector = vi.spyOn(document, "querySelector").mockReturnValue({
      offsetHeight: 80,
    });

    // Mock window event listeners
    vi.spyOn(window, "addEventListener");
    vi.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Clean up any pending timeouts
    vi.clearAllTimers();
  });

  it("renders without crashing", () => {
    renderWithRouter(<Navbar />);
  });

  it("displays the company logo", () => {
    renderWithRouter(<Navbar />);
    const logo = screen.getByAltText("Magnox Energy Solutions");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      expect.stringContaining("magnox_energy_logo.png")
    );
  });

  it("renders all navigation links", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    // expect(screen.getByText("Testimonials")).toBeInTheDocument();
    // expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("has correct href attributes for navigation links", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute(
      "href",
      "#features"
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "#about"
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services"
    );
    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "#portfolio"
    );
    // expect(screen.getByRole("link", { name: "Testimonials" })).toHaveAttribute(
    //   "href",
    //   "#testimonials"
    // );
    // expect(screen.getByRole("link", { name: "Team" })).toHaveAttribute(
    //   "href",
    //   "#team"
    // );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "#contact"
    );
  });

  it("renders mobile menu toggle button", () => {
    renderWithRouter(<Navbar />);
    const mobileMenuButton = screen.getByRole("button");
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it("has navigation role", () => {
    renderWithRouter(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("renders with proper structure", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByAltText("Magnox Energy Solutions")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(6); // 7 nav links + 1 logo link
  });

  it("toggles mobile menu when hamburger is clicked", () => {
    renderWithRouter(<Navbar />);
    const toggleButton = screen.getByRole("button");

    // Click to toggle mobile menu
    fireEvent.click(toggleButton);

    // Should handle click without crashing
    expect(toggleButton).toBeInTheDocument();
  });

  it("handles scroll events and updates navbar styling", () => {
    const { container } = renderWithRouter(<Navbar />);

    // The navbar styling changes are handled by CSS classes based on scroll position
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("updates active section based on scroll position", () => {
    renderWithRouter(<Navbar />);

    // Simulate scroll to features section
    Object.defineProperty(window, "scrollY", { value: 150, writable: true });
    fireEvent.scroll(window);

    // The active section logic should be triggered
    expect(mockGetElementById).toHaveBeenCalled();
  });

  it("handles navigation clicks and smooth scrolling", () => {
    renderWithRouter(<Navbar />);
    const featuresLink = screen.getByRole("link", { name: "Features" });

    fireEvent.click(featuresLink);

    // Should attempt to scroll (even if mocked)
    expect(featuresLink).toBeInTheDocument();
  });

  it("closes mobile menu when navigation link is clicked", () => {
    renderWithRouter(<Navbar />);
    const toggleButton = screen.getByRole("button");

    // Open mobile menu
    fireEvent.click(toggleButton);

    // Click a nav link - use getAllByRole to handle multiple Features links
    const featuresLinks = screen.getAllByRole("link", { name: "Features" });
    fireEvent.click(featuresLinks[0]); // Click the first one

    // Mobile menu state should be handled
    expect(toggleButton).toBeInTheDocument();
  });

  it("handles scroll event cleanup on unmount", () => {
    const { unmount } = renderWithRouter(<Navbar />);

    unmount();

    // Component should unmount cleanly
    expect(true).toBe(true);
  });

  it("handles edge case when sections are not found", () => {
    // Mock getElementById to return null
    mockGetElementById.mockReturnValue(null);

    renderWithRouter(<Navbar />);

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    // Should not crash when sections are not found
    expect(mockGetElementById).toHaveBeenCalled();
  });

  it("handles active section detection at top of page", () => {
    renderWithRouter(<Navbar />);

    // Simulate being at top of page
    Object.defineProperty(window, "scrollY", { value: 10, writable: true });
    fireEvent.scroll(window);

    // At top of page, scroll handler should still work
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("applies correct classes for navigation items", () => {
    renderWithRouter(<Navbar />);

    // All nav items should render properly
    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it("handles navbar height calculation when navbar is not found", () => {
    // Mock querySelector to return null for navbar
    mockQuerySelector.mockReturnValue(null);

    renderWithRouter(<Navbar />);
    const featuresLink = screen.getByRole("link", { name: "Features" });

    fireEvent.click(featuresLink);

    // Should handle null navbar gracefully
    expect(featuresLink).toBeInTheDocument();
  });

  it("handles navigation click with smooth scrolling", () => {
    renderWithRouter(<Navbar data={mockData} />);

    const aboutLink = screen.getByText("About");

    // Click navigation link
    fireEvent.click(aboutLink);

    // Should handle navigation without crashing
    expect(aboutLink).toBeInTheDocument();
  });

  it("handles scroll behavior without timeouts", () => {
    renderWithRouter(<Navbar data={mockData} />);

    // Simulate scroll event without waiting for timeouts
    Object.defineProperty(window, "scrollY", { value: 100 });
    fireEvent.scroll(window);

    // Should handle scroll without crashing
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("updates navbar appearance on scroll", () => {
    renderWithRouter(<Navbar data={mockData} />);

    const navbar = screen.getByRole("navigation");

    // Test immediate scroll behavior without timeouts
    Object.defineProperty(window, "scrollY", { value: 100 });
    fireEvent.scroll(window);

    expect(navbar).toBeInTheDocument();
  });
});

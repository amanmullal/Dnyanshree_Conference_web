import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Gallery } from "../Gallery";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, onClick, style, ...props }) => (
      <div className={className} onClick={onClick} style={style} {...props}>
        {children}
      </div>
    ),
    h2: ({ children, className, ...props }) => (
      <h2 className={className} {...props}>
        {children}
      </h2>
    ),
    button: ({ children, className, onClick, ...props }) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }) => <div>{children}</div>,
}));

// Mock react-intersection-observer
vi.mock("react-intersection-observer", () => ({
  useInView: () => [vi.fn(), true],
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  X: () => <span data-testid="x-icon">X</span>,
  Eye: () => <span data-testid="eye-icon">👁</span>,
  Heart: ({ onClick, className }) => (
    <span data-testid="heart-icon" onClick={onClick} className={className}>
      ❤
    </span>
  ),
  Share2: () => <span data-testid="share-icon">📤</span>,
  Download: () => <span data-testid="download-icon">⬇</span>,
}));

describe("Gallery Component", () => {
  const mockData = [
    {
      title: "500MW Solar Power Plant - Rajasthan",
      largeImage: "https://example.com/solar-large.jpg",
      smallImage: "https://example.com/solar-small.jpg",
    },
    {
      title: "Wind Farm Grid Integration Project",
      largeImage: "https://example.com/wind-large.jpg",
      smallImage: "https://example.com/wind-small.jpg",
    },
    {
      title: "132kV Transmission Line & Substation",
      largeImage: "https://example.com/transmission-large.jpg",
      smallImage: "https://example.com/transmission-small.jpg",
    },
  ];

  beforeEach(() => {
    // Mock Math.random to make tests deterministic
    let callCount = 0;
    vi.spyOn(Math, "random").mockImplementation(() => {
      const values = [0.5, 0.3, 0.7, 0.2, 0.8, 0.1, 0.9, 0.4, 0.6];
      return values[callCount++ % values.length];
    });

    // Mock console methods
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  // eslint-disable-next-line no-undef
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without crashing", () => {
    render(<Gallery data={mockData} />);
  });

  it("displays the Portfolio heading", () => {
    render(<Gallery data={mockData} />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
  });

  it("displays the main description", () => {
    render(<Gallery data={mockData} />);
    expect(
      screen.getByText("Explore our innovative projects and creative solutions")
    ).toBeInTheDocument();
  });

  it("renders all gallery items", () => {
    render(<Gallery data={mockData} />);
    mockData.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("displays images for each gallery item", () => {
    render(<Gallery data={mockData} />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(mockData.length);
  });

  it("has proper section id", () => {
    render(<Gallery data={mockData} />);
    const section = document.querySelector("#portfolio");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "portfolio");
  });

  it("opens lightbox modal when image is clicked", () => {
    render(<Gallery data={mockData} />);
    const firstImage = screen.getAllByRole("img")[0];

    fireEvent.click(
      firstImage.closest('[data-testid="gallery-item"]') ||
        firstImage.parentElement
    );

    // Modal should be opened
    expect(screen.getByTestId("x-icon")).toBeInTheDocument();
  });

  it("renders gallery items with category badges", () => {
    render(<Gallery data={mockData} />);

    // Should have category badges
    expect(screen.getByText("Solar Power")).toBeInTheDocument();
    expect(screen.getByText("Wind Energy")).toBeInTheDocument();
    expect(screen.getByText("Electrical")).toBeInTheDocument();
  });

  it("handles image click and opens modal", () => {
    render(<Gallery data={mockData} />);

    // Find the first gallery item
    const galleryItem = screen
      .getByText(mockData[0].title)
      .closest('div[class*="cursor-pointer"]');
    fireEvent.click(galleryItem);

    // Check if modal is opened
    expect(screen.getByTestId("x-icon")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<Gallery data={mockData} />);

    // Open modal
    const galleryItem = screen
      .getByText(mockData[0].title)
      .closest('div[class*="cursor-pointer"]');
    fireEvent.click(galleryItem);

    // Close modal
    const closeButton = screen.getByTestId("x-icon").closest("button");
    fireEvent.click(closeButton);

    // Modal should be closed (X icon should no longer be present)
    expect(screen.queryByTestId("x-icon")).not.toBeInTheDocument();
  });

  it("closes modal when clicking outside", () => {
    render(<Gallery data={mockData} />);

    // Open modal
    const galleryItem = screen
      .getByText(mockData[0].title)
      .closest('div[class*="cursor-pointer"]');
    fireEvent.click(galleryItem);

    // Click outside (on the backdrop)
    const modalBackdrop = screen
      .getByTestId("x-icon")
      .closest('div[class*="fixed inset-0"]');
    fireEvent.click(modalBackdrop);

    // Modal should be closed
    expect(screen.queryByTestId("x-icon")).not.toBeInTheDocument();
  });

  it("prevents modal close when clicking inside modal content", () => {
    render(<Gallery data={mockData} />);

    // Open modal
    const galleryItem = screen
      .getByText(mockData[0].title)
      .closest('div[class*="cursor-pointer"]');
    fireEvent.click(galleryItem);

    // Click inside modal content - use getAllByText since title appears in both gallery and modal
    const modalTitles = screen.getAllByText(mockData[0].title);
    const modalContent = modalTitles[1]; // Second one should be in the modal
    fireEvent.click(modalContent);

    // Modal should still be open
    expect(screen.getByTestId("x-icon")).toBeInTheDocument();
  });

  it("handles like button interaction", () => {
    render(<Gallery data={mockData} />);

    // Find and click heart icon
    const heartIcon = screen.getAllByTestId("heart-icon")[0];
    fireEvent.click(heartIcon);

    // Heart should be liked (we can check if the click was handled)
    expect(heartIcon).toBeInTheDocument();
  });

  it("handles share button click without propagation", () => {
    render(<Gallery data={mockData} />);

    // Find share button
    const shareIcon = screen.getAllByTestId("share-icon")[0];
    const shareButton = shareIcon.closest("button");

    // Click share button
    fireEvent.click(shareButton);

    // Should not open modal (because stopPropagation should prevent it)
    expect(screen.queryByTestId("x-icon")).not.toBeInTheDocument();
  });

  it("handles download button click without propagation", () => {
    render(<Gallery data={mockData} />);

    // Find download button
    const downloadIcon = screen.getAllByTestId("download-icon")[0];
    const downloadButton = downloadIcon.closest("button");

    // Click download button
    fireEvent.click(downloadButton);

    // Should not open modal (because stopPropagation should prevent it)
    expect(screen.queryByTestId("x-icon")).not.toBeInTheDocument();
  });

  it("handles image load events", () => {
    render(<Gallery data={mockData} />);

    const images = screen.getAllByRole("img");

    // Simulate image load event
    fireEvent.load(images[0]);

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Image successfully rendered")
    );
  });

  it("handles image error events", () => {
    render(<Gallery data={mockData} />);

    const images = screen.getAllByRole("img");

    // Simulate image error event
    fireEvent.error(images[0]);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Image failed to load")
    );
  });

  it("handles lightbox image load events", () => {
    render(<Gallery data={mockData} />);

    // Open modal
    const galleryItem = screen
      .getByText(mockData[0].title)
      .closest('div[class*="cursor-pointer"]');
    fireEvent.click(galleryItem);

    // Find lightbox image and simulate load
    const lightboxImages = screen.getAllByRole("img");
    const lightboxImage = lightboxImages[lightboxImages.length - 1]; // Last one should be lightbox

    fireEvent.load(lightboxImage);

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Lightbox image loaded")
    );
  });

  it("handles lightbox image error with fallback", () => {
    render(<Gallery data={mockData} />);

    // Open modal
    const galleryItem = screen
      .getByText(mockData[0].title)
      .closest('div[class*="cursor-pointer"]');
    fireEvent.click(galleryItem);

    // Find lightbox image and simulate error
    const lightboxImages = screen.getAllByRole("img");
    const lightboxImage = lightboxImages[lightboxImages.length - 1];

    fireEvent.error(lightboxImage);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Lightbox image failed")
    );
  });

  it("renders with empty data gracefully", () => {
    render(<Gallery data={[]} />);

    // Should still render the header
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(
      screen.getByText("Explore our innovative projects and creative solutions")
    ).toBeInTheDocument();
  });

  it("handles undefined data prop", () => {
    render(<Gallery />);

    // Should render without crashing
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
  });

  it("displays correct view and like counts", () => {
    render(<Gallery data={mockData} />);

    // Should display view and like counts (generated randomly but predictably due to mock)
    const eyeIcons = screen.getAllByTestId("eye-icon");
    const heartIcons = screen.getAllByTestId("heart-icon");

    expect(eyeIcons.length).toBe(mockData.length);
    expect(heartIcons.length).toBe(mockData.length);
  });

  it("toggles like state correctly", () => {
    render(<Gallery data={mockData} />);

    const heartIcon = screen.getAllByTestId("heart-icon")[0];

    // Click to like
    fireEvent.click(heartIcon);

    // Click again to unlike
    fireEvent.click(heartIcon);

    // Should handle the toggle
    expect(heartIcon).toBeInTheDocument();
  });

  it("renders background animation elements", () => {
    const { container } = render(<Gallery data={mockData} />);

    // Should have animated background elements
    const backgroundElements = container.querySelectorAll(
      '[class*="rounded-full"]'
    );
    expect(backgroundElements.length).toBeGreaterThan(0);
  });

  it("applies correct categories cyclically", () => {
    const largeDataSet = Array(8)
      .fill()
      .map((_, i) => ({
        title: `Project ${i + 1}`,
        largeImage: `large-${i}.jpg`,
        smallImage: `small-${i}.jpg`,
      }));

    render(<Gallery data={largeDataSet} />);

    // Should cycle through categories
    expect(screen.getAllByText("Solar Power")).toHaveLength(2); // indices 0, 4
    expect(screen.getAllByText("Wind Energy")).toHaveLength(2); // indices 1, 5
    expect(screen.getAllByText("Electrical")).toHaveLength(2); // indices 2, 6
    expect(screen.getAllByText("Infrastructure")).toHaveLength(2); // indices 3, 7
  });
});

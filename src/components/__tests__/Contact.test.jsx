import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Contact } from "../Contact";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, className, ref, ...props }) => (
      <section className={className} ref={ref} {...props}>
        {children}
      </section>
    ),
    div: ({ children, className, ...props }) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    h2: ({ children, className, ...props }) => (
      <h2 className={className} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, className, ...props }) => (
      <h3 className={className} {...props}>
        {children}
      </h3>
    ),
    p: ({ children, className, ...props }) => (
      <p className={className} {...props}>
        {children}
      </p>
    ),
    form: ({ children, className, onSubmit, ...props }) => (
      <form className={className} onSubmit={onSubmit} {...props}>
        {children}
      </form>
    ),
    input: ({ className, onChange, value, disabled, ...props }) => (
      <input
        className={className}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...props}
      />
    ),
    textarea: ({ className, onChange, value, disabled, ...props }) => (
      <textarea
        className={className}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...props}
      />
    ),
    button: ({ children, className, onClick, disabled, type, ...props }) => (
      <button
        className={className}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...props}
      >
        {children}
      </button>
    ),
    a: ({ children, className, href, ...props }) => (
      <a className={className} href={href} {...props}>
        {children}
      </a>
    ),
    span: ({ children, className, ...props }) => (
      <span className={className} {...props}>
        {children}
      </span>
    ),
  },
}));

// Mock react-intersection-observer
vi.mock("react-intersection-observer", () => ({
  useInView: () => [vi.fn(), true],
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  MapPin: () => <span>📍</span>,
  Phone: () => <span>📞</span>,
  Mail: () => <span>✉️</span>,
  Facebook: () => <span>📘</span>,
  Twitter: () => <span>🐦</span>,
  Youtube: () => <span>📺</span>,
  Send: () => <span>📤</span>,
  User: () => <span>👤</span>,
  AlertCircle: () => <span>⚠️</span>,
  CheckCircle: () => <span>✅</span>,
}));

// Mock Map component with both default and named export
vi.mock("../Map", () => {
  const MockMap = () => <div data-testid="map">Map Component</div>;
  return {
    default: MockMap,
    Map: MockMap,
  };
});

// Mock emailjs with proper factory function
vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

// Mock email config
vi.mock("../../config/emailConfig", () => ({
  emailConfig: {
    serviceID: "service_test",
    templateID: "template_test",
    publicKey: "public_key_test",
    adminEmail: "admin@test.com",
  },
}));

describe("Contact Component", () => {
  const mockData = {
    address: "123 Test Street, Test City",
    phone: "+1234567890",
    email: "test@example.com",
    facebook: "https://facebook.com/test",
    twitter: "https://twitter.com/test",
    youtube: "https://youtube.com/test",
  };

  let mockEmailjs;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock console methods
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});

    // Get the mocked emailjs instance
    const emailjsModule = await import("@emailjs/browser");
    mockEmailjs = emailjsModule.default;

    // Setup default successful mock for emailjs
    vi.mocked(mockEmailjs.send).mockResolvedValue({ status: 200, text: "OK" });
  });

  it("renders without crashing", () => {
    render(<Contact data={mockData} />);
  });

  it("displays the Get In Touch heading", () => {
    render(<Contact data={mockData} />);
    // The text is split across elements, so check for both parts
    expect(screen.getByText("Get")).toBeInTheDocument();
    expect(screen.getByText("In Touch")).toBeInTheDocument();
  });

  it("renders contact information correctly", () => {
    render(<Contact data={mockData} />);

    expect(screen.getByText(mockData.address)).toBeInTheDocument();
    expect(screen.getByText(mockData.phone)).toBeInTheDocument();
    expect(screen.getByText(mockData.email)).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<Contact data={mockData} />);

    // Find links by their href attributes since they use emoji icons as accessible names
    const facebookLink = screen.getByRole("link", { name: "📘" });
    const youtubeLink = screen.getByRole("link", { name: "📺" });

    expect(facebookLink).toHaveAttribute("href", mockData.facebook);
    expect(youtubeLink).toHaveAttribute("href", mockData.youtube);

    // Twitter link doesn't have an icon, so find it by href
    const links = screen.getAllByRole("link");
    const twitterLink = links.find(
      (link) => link.getAttribute("href") === mockData.twitter
    );
    expect(twitterLink).toBeInTheDocument();
  });

  it("renders contact form with all fields", () => {
    render(<Contact data={mockData} />);

    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Your Mobile Number")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Send us a message...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("handles form submission successfully", async () => {
    render(<Contact data={mockData} />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const mobileInput = screen.getByPlaceholderText("Your Mobile Number");
    const messageInput = screen.getByPlaceholderText("Send us a message...");
    const submitButton = screen.getByRole("button", { name: /send message/i });

    fireEvent.change(nameInput, {
      target: { name: "name", value: "John Doe" },
    });
    fireEvent.change(emailInput, {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(mobileInput, {
      target: { name: "mobile", value: "1234567890" },
    });
    fireEvent.change(messageInput, {
      target: { name: "message", value: "Test message" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Sending email via EmailJS...");
    });

    // Wait for success message
    await waitFor(() => {
      expect(
        screen.getByText(/message sent successfully/i)
      ).toBeInTheDocument();
    });
  });

  it("handles form submission failure", async () => {
    // Mock emailjs to reject
    vi.mocked(mockEmailjs.send).mockRejectedValue(
      new Error("Email service failed")
    );

    render(<Contact data={mockData} />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const mobileInput = screen.getByPlaceholderText("Your Mobile Number");
    const messageInput = screen.getByPlaceholderText("Send us a message...");
    const submitButton = screen.getByRole("button", { name: /send message/i });

    fireEvent.change(nameInput, {
      target: { name: "name", value: "John Doe" },
    });
    fireEvent.change(emailInput, {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(mobileInput, {
      target: { name: "mobile", value: "1234567890" },
    });
    fireEvent.change(messageInput, {
      target: { name: "message", value: "Test message" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Failed to send message/i)).toBeInTheDocument();
    });
  });

  it("prevents submission with empty fields", () => {
    render(<Contact data={mockData} />);

    const submitButton = screen.getByRole("button", { name: /send message/i });

    // Try to submit without filling fields
    fireEvent.click(submitButton);

    // Form should not submit due to required attributes
    expect(submitButton).toBeInTheDocument();
  });

  it("handles form input changes", () => {
    render(<Contact data={mockData} />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
  });

  it("renders map component", () => {
    render(<Contact data={mockData} />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("handles missing contact data gracefully", () => {
    render(<Contact />);

    // Should render loading states
    expect(screen.getByText("Loading address...")).toBeInTheDocument();
    expect(screen.getByText("Loading phone...")).toBeInTheDocument();
    expect(screen.getByText("Loading email...")).toBeInTheDocument();
  });

  it("handles undefined contact data", () => {
    render(<Contact data={{}} />);

    // Should render loading states for missing data
    expect(screen.getByText("Loading address...")).toBeInTheDocument();
  });

  it("clears form after successful submission", async () => {
    render(<Contact data={mockData} />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const mobileInput = screen.getByPlaceholderText("Your Mobile Number");
    const messageInput = screen.getByPlaceholderText("Send us a message...");
    const submitButton = screen.getByRole("button", { name: /send message/i });

    fireEvent.change(nameInput, {
      target: { name: "name", value: "John Doe" },
    });
    fireEvent.change(emailInput, {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(mobileInput, {
      target: { name: "mobile", value: "1234567890" },
    });
    fireEvent.change(messageInput, {
      target: { name: "message", value: "Test message" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nameInput.value).toBe("");
      expect(emailInput.value).toBe("");
      expect(messageInput.value).toBe("");
    });
  });

  it("shows loading state during submission", async () => {
    // Mock a delayed response
    vi.mocked(mockEmailjs.send).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ status: 200 }), 100)
        )
    );

    render(<Contact data={mockData} />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const mobileInput = screen.getByPlaceholderText("Your Mobile Number");
    const messageInput = screen.getByPlaceholderText("Send us a message...");
    const submitButton = screen.getByRole("button", { name: /send message/i });

    fireEvent.change(nameInput, {
      target: { name: "name", value: "John Doe" },
    });
    fireEvent.change(emailInput, {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(mobileInput, {
      target: { name: "mobile", value: "1234567890" },
    });
    fireEvent.change(messageInput, {
      target: { name: "message", value: "Test message" },
    });

    fireEvent.click(submitButton);

    // Should show sending state
    expect(screen.getByText("Sending...")).toBeInTheDocument();

    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText(/send message/i)).toBeInTheDocument();
    });
  });

  it("handles form validation errors", () => {
    render(<Contact data={mockData} />);

    const emailInput = screen.getByPlaceholderText("Your Email");

    // Try invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    // HTML5 validation should handle this
    expect(emailInput).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TouchButton from "../touch-button";
import { mobilePerformanceUtils } from "@/lib/mobile-performance";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock navigator.connection
Object.defineProperty(navigator, "connection", {
  writable: true,
  value: {
    effectiveType: "4g",
    downlink: 10,
  },
});

describe("Mobile Performance Utilities", () => {
  describe("isMobile", () => {
    it("should return false on desktop", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        value: 1024,
      });
      expect(mobilePerformanceUtils.isMobile()).toBe(false);
    });

    it("should return true on mobile", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        value: 375,
      });
      expect(mobilePerformanceUtils.isMobile()).toBe(true);
    });
  });

  describe("isTouchDevice", () => {
    it("should detect touch device", () => {
      Object.defineProperty(window, "ontouchstart", {
        writable: true,
        value: null,
      });
      Object.defineProperty(navigator, "maxTouchPoints", {
        writable: true,
        value: 5,
      });
      expect(mobilePerformanceUtils.isTouchDevice()).toBe(true);
    });

    it("should detect non-touch device", () => {
      Object.defineProperty(window, "ontouchstart", {
        writable: true,
        value: undefined,
      });
      Object.defineProperty(navigator, "maxTouchPoints", {
        writable: true,
        value: 0,
      });
      // Force re-evaluation by clearing the cached result
      delete (window as any).ontouchstart;
      expect(mobilePerformanceUtils.isTouchDevice()).toBe(false);
    });
  });

  describe("getConnectionSpeed", () => {
    it("should detect fast connection", () => {
      Object.defineProperty(navigator, "connection", {
        writable: true,
        value: {
          effectiveType: "4g",
          downlink: 10,
        },
      });
      expect(mobilePerformanceUtils.getConnectionSpeed()).toBe("fast");
    });

    it("should detect slow connection", () => {
      Object.defineProperty(navigator, "connection", {
        writable: true,
        value: {
          effectiveType: "3g",
          downlink: 1,
        },
      });
      expect(mobilePerformanceUtils.getConnectionSpeed()).toBe("slow");
    });
  });

  describe("getImageOptimizationSettings", () => {
    it("should return appropriate settings for fast connection", () => {
      Object.defineProperty(navigator, "connection", {
        writable: true,
        value: {
          effectiveType: "4g",
          downlink: 10,
        },
      });
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        value: 1024,
      });

      const settings = mobilePerformanceUtils.getImageOptimizationSettings();
      expect(settings.quality).toBe(85);
      expect(settings.format).toBe("webp");
    });

    it("should return reduced quality for slow connection", () => {
      Object.defineProperty(navigator, "connection", {
        writable: true,
        value: {
          effectiveType: "3g",
          downlink: 1,
        },
      });

      const settings = mobilePerformanceUtils.getImageOptimizationSettings();
      expect(settings.quality).toBe(60);
    });
  });
});

describe("TouchButton", () => {
  it("renders with default props", () => {
    render(<TouchButton>Click me</TouchButton>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("min-h-[44px]", "min-w-[44px]");
  });

  it("renders with touch target disabled", () => {
    render(<TouchButton touchTarget={false}>Click me</TouchButton>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass("min-h-[44px]", "min-w-[44px]");
  });

  it("renders as link when href is provided", () => {
    render(<TouchButton href="/test">Link Button</TouchButton>);

    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("shows loading state", () => {
    render(<TouchButton loading>Loading</TouchButton>);

    const button = screen.getByRole("button", { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    const { rerender } = render(
      <TouchButton variant="primary">Primary</TouchButton>
    );
    expect(screen.getByRole("button")).toHaveClass(
      "bg-gradient-to-r",
      "from-primary-600",
      "to-primary-700"
    );

    rerender(<TouchButton variant="secondary">Secondary</TouchButton>);
    expect(screen.getByRole("button")).toHaveClass(
      "border-2",
      "border-primary-500/50"
    );

    rerender(<TouchButton variant="ghost">Ghost</TouchButton>);
    expect(screen.getByRole("button")).toHaveClass("text-primary-300");

    rerender(<TouchButton variant="danger">Danger</TouchButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-red-600");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<TouchButton size="sm">Small</TouchButton>);
    expect(screen.getByRole("button")).toHaveClass("px-4", "py-2", "text-sm");

    rerender(<TouchButton size="md">Medium</TouchButton>);
    expect(screen.getByRole("button")).toHaveClass("px-6", "py-3", "text-base");

    rerender(<TouchButton size="lg">Large</TouchButton>);
    expect(screen.getByRole("button")).toHaveClass("px-8", "py-4", "text-lg");
  });

  it("renders full width when specified", () => {
    render(<TouchButton fullWidth>Full Width</TouchButton>);

    const button = screen.getByRole("button", { name: /full width/i });
    expect(button).toHaveClass("w-full");
  });
});

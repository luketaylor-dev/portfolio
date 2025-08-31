import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InteractiveButton from "../interactive-button";

describe("InteractiveButton", () => {
  it("renders with default props", () => {
    render(<InteractiveButton>Click me</InteractiveButton>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "bg-gradient-to-r",
      "from-purple-600",
      "to-purple-700"
    );
  });

  it("renders as a link when href is provided", () => {
    render(<InteractiveButton href="/test">Link Button</InteractiveButton>);

    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("renders different variants correctly", () => {
    const { rerender } = render(
      <InteractiveButton variant="primary">Primary</InteractiveButton>
    );
    expect(screen.getByRole("button")).toHaveClass(
      "bg-gradient-to-r",
      "from-purple-600",
      "to-purple-700"
    );

    rerender(
      <InteractiveButton variant="secondary">Secondary</InteractiveButton>
    );
    expect(screen.getByRole("button")).toHaveClass(
      "border-2",
      "border-purple-500/50"
    );

    rerender(<InteractiveButton variant="ghost">Ghost</InteractiveButton>);
    expect(screen.getByRole("button")).toHaveClass("text-purple-300");
  });

  it("renders different sizes correctly", () => {
    const { rerender } = render(
      <InteractiveButton size="sm">Small</InteractiveButton>
    );
    expect(screen.getByRole("button")).toHaveClass("px-4", "py-2", "text-sm");

    rerender(<InteractiveButton size="md">Medium</InteractiveButton>);
    expect(screen.getByRole("button")).toHaveClass("px-6", "py-3", "text-base");

    rerender(<InteractiveButton size="lg">Large</InteractiveButton>);
    expect(screen.getByRole("button")).toHaveClass("px-8", "py-4", "text-lg");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(
      <InteractiveButton onClick={handleClick}>Click me</InteractiveButton>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state correctly", () => {
    render(<InteractiveButton loading>Loading</InteractiveButton>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    // Check for loading spinner
    const spinner = screen.getByRole("button").querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <InteractiveButton className="custom-class">Custom</InteractiveButton>
    );

    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("renders with children correctly", () => {
    render(
      <InteractiveButton>
        <span>Icon</span>
        Button Text
      </InteractiveButton>
    );

    expect(screen.getByRole("button")).toHaveTextContent("Icon");
    expect(screen.getByRole("button")).toHaveTextContent("Button Text");
  });

  it("handles disabled state correctly", () => {
    const handleClick = jest.fn();
    render(
      <InteractiveButton disabled onClick={handleClick}>
        Disabled
      </InteractiveButton>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50", "cursor-not-allowed");

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

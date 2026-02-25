import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../card";

describe("Card", () => {
  it("renders with default props", () => {
    render(<Card>Card content</Card>);

    const card = screen.getByText("Card content").closest("div");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("rounded-2xl", "border", "border-primary-800/50");
  });

  it("renders different variants correctly", () => {
    const { rerender } = render(<Card variant="default">Default</Card>);
    expect(screen.getByText("Default").closest("div")).toHaveClass(
      "bg-gradient-to-br",
      "from-neutral-900",
      "to-primary-900/20"
    );

    rerender(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText("Elevated").closest("div")).toHaveClass(
      "bg-gradient-to-br",
      "from-neutral-900",
      "to-primary-900/30"
    );

    rerender(<Card variant="outlined">Outlined</Card>);
    expect(screen.getByText("Outlined").closest("div")).toHaveClass(
      "bg-neutral-900/50",
      "border-2",
      "border-primary-500/30"
    );
  });

  it("applies hover effects when hover prop is true", () => {
    render(<Card hover>Hover Card</Card>);

    const card = screen.getByText("Hover Card").closest("div");
    expect(card).toHaveClass(
      "hover:border-primary-600/50",
      "hover:bg-primary-900/30",
      "hover:scale-105"
    );
  });

  it("applies custom className", () => {
    render(<Card className="custom-class">Custom</Card>);

    expect(screen.getByText("Custom").closest("div")).toHaveClass(
      "custom-class"
    );
  });

  it("renders with children correctly", () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Content</p>
      </Card>
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Title"
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies different padding sizes", () => {
    const { rerender } = render(<Card padding="sm">Small Padding</Card>);
    expect(screen.getByText("Small Padding").closest("div")).toHaveClass("p-4");

    rerender(<Card padding="md">Medium Padding</Card>);
    expect(screen.getByText("Medium Padding").closest("div")).toHaveClass(
      "p-6"
    );

    rerender(<Card padding="lg">Large Padding</Card>);
    expect(screen.getByText("Large Padding").closest("div")).toHaveClass("p-8");
  });

  it("combines multiple props correctly", () => {
    render(
      <Card variant="elevated" hover padding="lg" className="test-class">
        Combined Props
      </Card>
    );

    const card = screen.getByText("Combined Props").closest("div");
    expect(card).toHaveClass(
      "bg-gradient-to-br",
      "from-neutral-900",
      "to-primary-900/30",
      "border",
      "border-primary-600/50",
      "hover:border-primary-600/50",
      "hover:bg-primary-900/30",
      "hover:scale-105",
      "p-8",
      "test-class"
    );
  });
});

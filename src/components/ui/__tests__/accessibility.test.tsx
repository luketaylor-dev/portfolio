import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import InteractiveButton from "../interactive-button";
import Card from "../card";
import Badge from "../badge";
import Input from "../input";
import Textarea from "../textarea";

expect.extend(toHaveNoViolations);

describe("Accessibility Tests", () => {
  describe("InteractiveButton", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <InteractiveButton>Click me</InteractiveButton>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have accessibility violations when disabled", async () => {
      const { container } = render(
        <InteractiveButton disabled>Disabled Button</InteractiveButton>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have accessibility violations when loading", async () => {
      const { container } = render(
        <InteractiveButton loading>Loading Button</InteractiveButton>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have accessibility violations as link", async () => {
      const { container } = render(
        <InteractiveButton href="/test">Link Button</InteractiveButton>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Card", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<Card>Card content</Card>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have accessibility violations with heading", async () => {
      const { container } = render(
        <Card>
          <h2>Card Title</h2>
          <p>Card content</p>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Badge", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<Badge>Badge</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Input", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <Input label="Test Input" placeholder="Enter text" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have accessibility violations with error", async () => {
      const { container } = render(
        <Input
          label="Test Input"
          placeholder="Enter text"
          error="This field is required"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Textarea", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <Textarea label="Test Textarea" placeholder="Enter text" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should not have accessibility violations with error", async () => {
      const { container } = render(
        <Textarea
          label="Test Textarea"
          placeholder="Enter text"
          error="This field is required"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

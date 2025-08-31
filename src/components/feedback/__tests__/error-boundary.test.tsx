import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorBoundary, ErrorFallback } from "../error-boundary";

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>Normal content</div>;
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    // Suppress console.error for tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal content")).toBeInTheDocument();
  });

  it("renders error UI when there is an error", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We encountered an unexpected error. Please try refreshing the page."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /refresh page/i })
    ).toBeInTheDocument();
  });

  it("renders custom fallback when provided", () => {
    const CustomFallback = () => <div>Custom error message</div>;

    render(
      <ErrorBoundary fallback={<CustomFallback />}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("renders refresh button when there is an error", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByRole("button", { name: /refresh page/i });
    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton).toHaveTextContent("Refresh Page");
  });
});

describe("ErrorFallback", () => {
  it("renders with default error message when no error is provided", () => {
    render(<ErrorFallback />);

    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("We encountered an unexpected error. Please try again.")
    ).toBeInTheDocument();
  });

  it("renders with custom error message when error is provided", () => {
    const testError = new Error("Custom error message");
    render(<ErrorFallback error={testError} />);

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("renders reset button when resetError is provided", () => {
    const resetError = jest.fn();
    render(<ErrorFallback resetError={resetError} />);

    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("does not render reset button when resetError is not provided", () => {
    render(<ErrorFallback />);

    expect(
      screen.queryByRole("button", { name: /try again/i })
    ).not.toBeInTheDocument();
  });

  it("calls resetError when try again button is clicked", () => {
    const resetError = jest.fn();
    render(<ErrorFallback resetError={resetError} />);

    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    tryAgainButton.click();

    expect(resetError).toHaveBeenCalledTimes(1);
  });

  it("renders go home button", () => {
    render(<ErrorFallback />);

    const goHomeButton = screen.getByRole("button", { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
    expect(goHomeButton).toHaveTextContent("Go Home");
  });
});

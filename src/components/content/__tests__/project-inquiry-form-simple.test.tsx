import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectInquiryForm from "../project-inquiry-form";

// Mock fetch
global.fetch = jest.fn();

describe("ProjectInquiryForm - Simple Tests", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders the form with step indicator", () => {
    render(<ProjectInquiryForm />);

    expect(screen.getByText("Contact Information")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("shows step 1 by default", () => {
    render(<ProjectInquiryForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
  });

  it("validates required fields in step 1", async () => {
    render(<ProjectInquiryForm />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });

  it("moves to step 2 when step 1 is valid", async () => {
    render(<ProjectInquiryForm />);

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Project Overview")).toBeInTheDocument();
      expect(screen.getByText("VR Development")).toBeInTheDocument();
      expect(screen.getByText("EEG Visualization")).toBeInTheDocument();
    });
  });

  it("allows project type selection", async () => {
    render(<ProjectInquiryForm />);

    // Fill step 1 and move to step 2
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Project Overview")).toBeInTheDocument();
    });

    // Select VR Development
    const vrDevelopmentRadio = screen.getByDisplayValue("vr-development");
    fireEvent.click(vrDevelopmentRadio);

    expect(vrDevelopmentRadio).toBeChecked();
  });

  it("allows going back to previous steps", async () => {
    render(<ProjectInquiryForm />);

    // Move to step 2
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Project Overview")).toBeInTheDocument();
    });

    // Go back to step 1
    fireEvent.click(screen.getByText("Previous"));

    await waitFor(() => {
      expect(screen.getByText("Contact Information")).toBeInTheDocument();
      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    });
  });

  it("submits form successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ProjectInquiryForm />);

    // Fill step 1
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Project Overview")).toBeInTheDocument();
    });

    // Fill step 2
    fireEvent.click(screen.getByDisplayValue("vr-development"));
    const timelineSelect = screen.getByRole("combobox", { name: /timeline/i });
    const budgetSelect = screen.getByRole("combobox", {
      name: /budget range/i,
    });

    fireEvent.change(timelineSelect, {
      target: { value: "1-2-months" },
    });
    fireEvent.change(budgetSelect, {
      target: { value: "5k-15k" },
    });
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Project Details")).toBeInTheDocument();
    });

    // Fill step 3
    fireEvent.change(screen.getByLabelText(/project title/i), {
      target: { value: "VR Game Project" },
    });
    fireEvent.change(screen.getByLabelText(/project description/i), {
      target: {
        value:
          "A detailed description of the VR game project with specific requirements and goals.",
      },
    });
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(
        screen.getByText("Additional Information", { selector: "h3" })
      ).toBeInTheDocument();
    });

    // Submit form
    fireEvent.click(screen.getByText("Send Project Inquiry"));

    await waitFor(() => {
      expect(
        screen.getByText("Project inquiry sent successfully!")
      ).toBeInTheDocument();
    });
  });
});

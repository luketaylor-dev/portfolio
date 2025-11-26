"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Upload, X } from "lucide-react";
import { InteractiveButton, Input, Textarea, Card } from "@/components/ui";

interface ProjectInquiryData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  timeline: string;
  budgetRange: string;
  projectTitle: string;
  description: string;
  requirements: string;
  referenceLinks: string;
  additionalInfo: string;
}

interface ProjectInquiryFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function ProjectInquiryForm({
  onSuccess,
  onError,
}: ProjectInquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState<ProjectInquiryData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    timeline: "",
    budgetRange: "",
    projectTitle: "",
    description: "",
    requirements: "",
    referenceLinks: "",
    additionalInfo: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Project options
  const projectTypes = [
    {
      value: "vr-development",
      label: "VR Development",
      description: "Virtual reality experiences and applications",
    },
    {
      value: "eeg-visualization",
      label: "EEG Visualization",
      description: "Brainwave data visualization and analysis",
    },
    {
      value: "game-development",
      label: "Game Development",
      description: "Unity games and interactive experiences",
    },
    {
      value: "mobile-app",
      label: "Mobile App",
      description: "Mobile applications with Unity",
    },
    {
      value: "interactive-installation",
      label: "Interactive Installation",
      description: "Interactive exhibits and installations",
    },
    {
      value: "other",
      label: "Other",
      description: "Custom Unity development project",
    },
  ];

  const timelineOptions = [
    {
      value: "1-2-weeks",
      label: "1-2 weeks",
      description: "Quick turnaround needed",
    },
    {
      value: "1-2-months",
      label: "1-2 months",
      description: "Standard project timeline",
    },
    {
      value: "3-6-months",
      label: "3-6 months",
      description: "Complex project development",
    },
    {
      value: "6-plus-months",
      label: "6+ months",
      description: "Long-term project",
    },
    {
      value: "flexible",
      label: "Flexible",
      description: "Timeline can be discussed",
    },
  ];

  const budgetRanges = [
    {
      value: "under-5k",
      label: "Under $5,000",
      description: "Small project or prototype",
    },
    {
      value: "5k-15k",
      label: "$5,000 - $15,000",
      description: "Medium complexity project",
    },
    {
      value: "15k-50k",
      label: "$15,000 - $50,000",
      description: "Complex project",
    },
    {
      value: "50k-plus",
      label: "$50,000+",
      description: "Enterprise-level project",
    },
    {
      value: "discuss",
      label: "Let's discuss",
      description: "Budget to be determined",
    },
  ];

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        return value.trim().length >= 2
          ? null
          : "Name must be at least 2 characters";
      case "email":
        return validateEmail(value)
          ? null
          : "Please enter a valid email address";
      case "projectType":
        return value ? null : "Please select a project type";
      case "timeline":
        return value ? null : "Please select a timeline";
      case "budgetRange":
        return value ? null : "Please select a budget range";
      case "projectTitle":
        return value.trim().length >= 3
          ? null
          : "Project title must be at least 3 characters";
      case "description":
        return value.trim().length >= 20
          ? null
          : "Description must be at least 20 characters";
      case "requirements":
        return value.trim().length >= 10
          ? null
          : "Requirements must be at least 10 characters";
      default:
        return null;
    }
  };

  const validateStep = (step: number) => {
    const errors: string[] = [];

    switch (step) {
      case 1:
        if (!formData.name.trim()) errors.push("Name is required");
        if (!validateEmail(formData.email))
          errors.push("Valid email is required");
        break;
      case 2:
        if (!formData.projectType) errors.push("Project type is required");
        if (!formData.timeline) errors.push("Timeline is required");
        if (!formData.budgetRange) errors.push("Budget range is required");
        break;
      case 3:
        if (!formData.projectTitle.trim())
          errors.push("Project title is required");
        if (!formData.description.trim())
          errors.push("Project description is required");
        break;
    }

    return errors;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "text/plain",
      ];
      return file.size <= maxSize && validTypes.includes(file.type);
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      setError(errors[0] || "Validation error");
      return;
    }
    const newStep = Math.min(currentStep + 1, 4);
    setCurrentStep(newStep);
    setError(null);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent submission if not on step 4
    if (currentStep !== 4) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // Validate all required fields
    const errors = validateStep(1)
      .concat(validateStep(2))
      .concat(validateStep(3));
    if (errors.length > 0) {
      setError(errors[0] || "Validation error");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Add form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Add files
      uploadedFiles.forEach((file, index) => {
        formDataToSend.append(`file_${index}`, file);
      });

      const response = await fetch("/api/sendProjectInquiry", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitSuccessful(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          timeline: "",
          budgetRange: "",
          projectTitle: "",
          description: "",
          requirements: "",
          referenceLinks: "",
          additionalInfo: "",
        });
        setTouched({});
        setUploadedFiles([]);
        setCurrentStep(1);
        onSuccess?.();

        // Scroll to success message
        setTimeout(() => {
          successMessageRef.current?.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }, 100);
        
        // Hide success message after 10 seconds (increased from 5)
        setTimeout(() => setIsSubmitSuccessful(false), 10000);
      } else {
        throw new Error(result.error || "Failed to send project inquiry");
      }
    } catch (error) {
      console.error("Error sending project inquiry:", error);
      const errorMessage =
        "Failed to send project inquiry. Please try again or email me directly.";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? "bg-purple-600 text-white"
                : "bg-neutral-700 text-neutral-400"
            }`}
          >
            {step}
          </div>
          {step < 4 && (
            <div
              className={`w-12 h-1 mx-2 ${
                step < currentStep ? "bg-purple-600" : "bg-neutral-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Contact Information
        </h3>
        <p className="text-neutral-400">
          Let's start with your basic contact details
        </p>
      </div>

      <Input
        label="Full Name *"
        name="name"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        onBlur={() => handleBlur("name")}
        placeholder="Your full name"
        error={
          touched.name
            ? validateField("name", formData.name) || undefined
            : undefined
        }
        required
      />

      <Input
        label="Email Address *"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        onBlur={() => handleBlur("email")}
        placeholder="your.email@example.com"
        error={
          touched.email
            ? validateField("email", formData.email) || undefined
            : undefined
        }
        required
      />

      <Input
        label="Company (Optional)"
        name="company"
        value={formData.company || ""}
        onChange={(e) => handleInputChange("company", e.target.value)}
        placeholder="Your company or organization"
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Project Overview
        </h3>
        <p className="text-neutral-400">
          Tell us about your project requirements
        </p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-white mb-2 block">
            Project Type *
          </span>
          <div className="grid gap-3">
            {projectTypes.map((type) => (
              <label
                key={type.value}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.projectType === type.value
                    ? "border-purple-500 bg-purple-900/20"
                    : "border-neutral-700 hover:border-neutral-600"
                }`}
              >
                <input
                  type="radio"
                  name="projectType"
                  value={type.value}
                  checked={formData.projectType === type.value}
                  onChange={(e) =>
                    handleInputChange("projectType", e.target.value)
                  }
                  className="sr-only"
                />
                <div className="flex items-start gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                      formData.projectType === type.value
                        ? "border-purple-500 bg-purple-500"
                        : "border-neutral-500"
                    }`}
                  >
                    {formData.projectType === type.value && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">{type.label}</div>
                    <div className="text-sm text-neutral-400">
                      {type.description}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-white mb-2 block">
              Timeline *
            </span>
            <select
              value={formData.timeline}
              onChange={(e) => handleInputChange("timeline", e.target.value)}
              className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-purple-500 focus:outline-none"
              aria-label="Timeline"
            >
              <option value="">Select timeline</option>
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-white mb-2 block">
              Budget Range *
            </span>
            <select
              value={formData.budgetRange}
              onChange={(e) => handleInputChange("budgetRange", e.target.value)}
              className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-purple-500 focus:outline-none"
              aria-label="Budget Range"
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Project Details
        </h3>
        <p className="text-neutral-400">
          Provide more information about your project
        </p>
      </div>

      <Input
        label="Project Title *"
        name="projectTitle"
        value={formData.projectTitle}
        onChange={(e) => handleInputChange("projectTitle", e.target.value)}
        onBlur={() => handleBlur("projectTitle")}
        placeholder="What should we call your project?"
        error={
          touched.projectTitle
            ? validateField("projectTitle", formData.projectTitle) || undefined
            : undefined
        }
        required
      />

      <Textarea
        label="Project Description *"
        name="description"
        rows={4}
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        onBlur={() => handleBlur("description")}
        placeholder="Describe your project goals, objectives, and what you want to achieve..."
        error={
          touched.description
            ? validateField("description", formData.description) || undefined
            : undefined
        }
        required
      />

      <Textarea
        label="Technical Requirements"
        name="requirements"
        rows={3}
        value={formData.requirements}
        onChange={(e) => handleInputChange("requirements", e.target.value)}
        onBlur={() => handleBlur("requirements")}
        placeholder="Any specific technical requirements, platforms, or constraints..."
        error={
          touched.requirements
            ? validateField("requirements", formData.requirements) || undefined
            : undefined
        }
      />

      <Input
        label="Reference Links"
        name="referenceLinks"
        value={formData.referenceLinks}
        onChange={(e) => handleInputChange("referenceLinks", e.target.value)}
        placeholder="Links to similar projects, inspiration, or reference materials"
      />
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Additional Information
        </h3>
        <p className="text-neutral-400">
          Any final details or files you'd like to share with me
        </p>
      </div>

      <Textarea
        label="Additional Information"
        name="additionalInfo"
        rows={3}
        value={formData.additionalInfo}
        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
        placeholder="Any other information that might be helpful..."
      />

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-white mb-2 block">
            Reference Files (Optional)
          </span>
          <div className="border-2 border-dashed border-neutral-700 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.txt"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Files
            </button>
            <p className="text-sm text-neutral-400 mt-2">
              Images, PDFs, or text files (max 10MB each)
            </p>
          </div>
        </label>

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">Uploaded Files:</p>
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg"
              >
                <span className="text-sm text-neutral-300">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-neutral-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h4 className="font-medium text-blue-300 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• I'll review your project details within 24 hours</li>
          <li>• We'll schedule a call to discuss requirements in detail</li>
          <li>• I'll provide a detailed proposal and timeline</li>
          <li>• We'll agree on terms and get started!</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {renderStepIndicator()}

      {/* Success Message */}
      {isSubmitSuccessful && (
        <div 
          ref={successMessageRef}
          className="p-6 rounded-xl bg-green-900/20 border-2 border-green-500/50 text-green-300 flex items-center gap-3 mb-6 animate-fade-in shadow-lg shadow-green-500/20"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-lg">
              Project inquiry sent successfully!
            </p>
            <p className="text-green-400">
              I'll review your project details and get back to you within 24
              hours.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/50 text-red-300 flex items-center gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}

      <Card variant="default" className="p-8">
        <form onSubmit={handleSubmit} ref={formRef} noValidate>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </form>

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <InteractiveButton
              type="button"
              onClick={prevStep}
              variant="secondary"
              size="md"
            >
              Previous
            </InteractiveButton>
          )}

          <div className="flex gap-3 ml-auto">
            {currentStep < 4 ? (
              <InteractiveButton
                type="button"
                onClick={nextStep}
                variant="primary"
                size="md"
              >
                Next
              </InteractiveButton>
            ) : (
              <InteractiveButton
                type="button"
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.requestSubmit();
                  }
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
                variant="primary"
                size="lg"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="sr-only">Sending inquiry, please wait...</span>
                    Sending Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Project Inquiry
                  </>
                )}
              </InteractiveButton>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

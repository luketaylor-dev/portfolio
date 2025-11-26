"use client";
import { Send, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import React, { useRef, useState } from "react";
import { ResumeDownload } from "@/components/content";
import { FormErrorBoundary } from "@/components/feedback";
import {
  InteractiveButton,
  Input,
  Textarea,
  Card,
  Breadcrumbs,
} from "@/components/ui";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStartTime, setFormStartTime] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [mounted, setMounted] = useState(false);

  // Set form start time when user first interacts with the form
  const handleFirstInteraction = () => {
    if (formStartTime === null) {
      setFormStartTime(Date.now());
    }
  };

  // Handle honeypot field separately to avoid hydration issues
  const [honeypotValue, setHoneypotValue] = useState("");

  // Set mounted state to prevent hydration issues
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message: string) => {
    return message.trim().length >= 10;
  };

  // Form validation state
  const isFormValid =
    validateName(formData.name) &&
    validateEmail(formData.email) &&
    validateMessage(formData.message);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }

    // Track form start time
    handleFirstInteraction();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Check honeypot
      if (honeypotValue) {
        throw new Error("Bot detected");
      }

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          formStartTime,
          submitTime: Date.now(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setIsSubmitSuccessful(true);
      setFormData({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      
      // Scroll to success message
      setTimeout(() => {
        successMessageRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }, 100);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle key down for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Contact" }]} className="mb-8" />

      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
          Let's Connect
        </h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          Ready to bring your Unity project to life? Whether you're looking for
          EEG visualization, VR development, or game development expertise, I'm
          here to help. Let's discuss your vision and make it a reality.
        </p>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto">
        <Card className="p-8 space-y-8">
          {isSubmitSuccessful ? (
            <div 
              ref={successMessageRef}
              className="text-center space-y-6 animate-fade-in"
              role="alert"
              aria-live="polite"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center ring-4 ring-green-500/20">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  Message Sent Successfully!
                </h2>
                <p className="text-neutral-300">
                  Thank you for reaching out. I'll get back to you within 24
                  hours.
                </p>
              </div>
              <InteractiveButton
                onClick={() => setIsSubmitSuccessful(false)}
                variant="ghost"
                size="md"
              >
                Send Another Message
              </InteractiveButton>
            </div>
          ) : (
            <FormErrorBoundary>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
                className="space-y-6"
                noValidate
              >
                {/* Honeypot field - hidden from users */}
                {mounted && (
                  <input
                    type="text"
                    name="website"
                    value={honeypotValue}
                    onChange={(e) => setHoneypotValue(e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                )}

                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className={`${
                      touched.name && !validateName(formData.name)
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    aria-describedby={
                      touched.name && !validateName(formData.name)
                        ? "name-error"
                        : undefined
                    }
                  />
                  {touched.name && !validateName(formData.name) && (
                    <p id="name-error" className="text-sm text-red-400">
                      Name must be at least 2 characters long
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className={`${
                      touched.email && !validateEmail(formData.email)
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    aria-describedby={
                      touched.email && !validateEmail(formData.email)
                        ? "email-error"
                        : undefined
                    }
                  />
                  {touched.email && !validateEmail(formData.email) && (
                    <p id="email-error" className="text-sm text-red-400">
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, timeline, and any specific requirements..."
                    rows={6}
                    required
                    className={`${
                      touched.message && !validateMessage(formData.message)
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    aria-describedby={
                      touched.message && !validateMessage(formData.message)
                        ? "message-error"
                        : undefined
                    }
                  />
                  {touched.message && !validateMessage(formData.message) && (
                    <p id="message-error" className="text-sm text-red-400">
                      Message must be at least 10 characters long
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <InteractiveButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={!isFormValid || isSubmitting}
                    className="flex-1"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                        <span className="sr-only">Sending message, please wait...</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </InteractiveButton>
                </div>

                {/* Keyboard shortcut hint */}
                <p className="text-xs text-neutral-500 text-center">
                  Press Ctrl+Enter to submit
                </p>
              </form>
            </FormErrorBoundary>
          )}
        </Card>
      </section>

      {/* Alternative Contact Methods */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          <h2 className="text-2xl font-bold text-white">
            Prefer a Different Approach?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 text-center space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Download My Resume
              </h3>
              <p className="text-neutral-300 text-sm">
                Get a detailed overview of my experience and skills
              </p>
              <ResumeDownload variant="secondary" size="md" />
            </Card>
            <Card className="p-6 text-center space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Project Inquiry Form
              </h3>
              <p className="text-neutral-300 text-sm">
                For detailed project discussions and proposals
              </p>
              <InteractiveButton href="/inquire" variant="secondary" size="md">
                <ArrowRight className="w-4 h-4" />
                Start Inquiry
              </InteractiveButton>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-2xl font-bold text-white">
          Let's Build Something Amazing Together
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">
              Unity Development
            </h3>
            <p className="text-neutral-300 text-sm">
              Custom Unity solutions, performance optimization, and
              cross-platform development
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">
              VR & EEG Projects
            </h3>
            <p className="text-neutral-300 text-sm">
              Immersive VR experiences and brain-computer interface applications
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">
              Game Development
            </h3>
            <p className="text-neutral-300 text-sm">
              Free-to-play games, casino games, and interactive entertainment
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import { Send, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import {
  useRef,
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ResumeDownload } from "@/components/content";
import { FormErrorBoundary } from "@/components/feedback";
import { Text } from "@/components/atoms";
import {
  InteractiveButton,
  Input,
  Textarea,
  Card,
  Breadcrumbs,
} from "@/components/ui";
import { contactEmail } from "@/lib/navigation";

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
  useEffect(() => {
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
  const handleSubmit = async (e: FormEvent) => {
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
        const text = await response.text();
        let errorMessage = "Failed to send message";
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
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
  const handleKeyDown = (e: KeyboardEvent) => {
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
        <Text
          variant="heading1"
          as="h1"
          className="tracking-tight bg-gradient-to-r from-white via-primary-100 to-primary-300 bg-clip-text text-transparent"
        >
          Let's Connect
        </Text>
        <Text
          variant="paragraph"
          as="p"
          color="muted"
          className="text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Ready to bring your Unity project to life? Whether you're looking for
          EEG visualization, VR development, or game development expertise, I'm
          here to help. Let's discuss your vision and make it a           reality.
        </Text>
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
                <Text variant="heading3" as="h2">
                  Message Sent Successfully!
                </Text>
                <Text variant="paragraph" as="p" color="muted">
                  Thank you for reaching out. I'll get back to you within 24
                  hours.
                </Text>
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
                  <Text
                    as="label"
                    htmlFor="name"
                    variant="small"
                    className="block font-medium"
                  >
                    Name *
                  </Text>
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
                      <Text id="name-error" as="p" variant="small" color="error">
                      Name must be at least 2 characters long
                    </Text>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Text
                    as="label"
                    htmlFor="email"
                    variant="small"
                    className="block font-medium"
                  >
                    Email *
                  </Text>
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
                      <Text id="email-error" as="p" variant="small" color="error">
                      Please enter a valid email address
                    </Text>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Text
                    as="label"
                    htmlFor="message"
                    variant="small"
                    className="block font-medium"
                  >
                    Message *
                  </Text>
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
                      <Text id="message-error" as="p" variant="small" color="error">
                      Message must be at least 10 characters long
                    </Text>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <Text as="p" variant="paragraph" color="error">{error}</Text>
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
                <Text as="p" variant="mini" color="secondary" className="text-center">
                  Press Ctrl+Enter to submit
                </Text>
                <Text as="p" variant="small" color="secondary" className="text-center pt-2">
                  Or email me directly at{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-primary-300 hover:text-primary-200 transition-colors underline"
                    aria-label={`Email Luke Taylor at ${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                </Text>
              </form>
            </FormErrorBoundary>
          )}
        </Card>
      </section>

      {/* Alternative Contact Methods */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          <Text variant="heading3" as="h2">
            Prefer a Different Approach?
          </Text>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 text-center space-y-4">
              <Text variant="heading4" as="h3">
                Download My Resume
              </Text>
              <Text variant="small" as="p" color="muted">
                Get a detailed overview of my experience and skills
              </Text>
              <ResumeDownload variant="secondary" size="md" />
            </Card>
            <Card className="p-6 text-center space-y-4">
              <Text variant="heading4" as="h3">
                Project Inquiry Form
              </Text>
              <Text variant="small" as="p" color="muted">
                For detailed project discussions and proposals
              </Text>
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
        <Text variant="heading3" as="h2">
          Let's Build Something Amazing Together
        </Text>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Text variant="heading4" as="h3" className="text-primary-300">
              Unity Development
            </Text>
            <Text variant="small" as="p" color="muted">
              Custom Unity solutions, performance optimization, and
              cross-platform development
            </Text>
          </div>
          <div className="space-y-4">
            <Text variant="heading4" as="h3" className="text-primary-300">
              VR & EEG Projects
            </Text>
            <Text variant="small" as="p" color="muted">
              Immersive VR experiences and               brain-computer interface applications
            </Text>
          </div>
          <div className="space-y-4">
            <Text variant="heading4" as="h3" className="text-primary-300">
              Game Development
            </Text>
            <Text variant="small" as="p" color="muted">
              Free-to-play games, casino games, and               interactive entertainment
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
}

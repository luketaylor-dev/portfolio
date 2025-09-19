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

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
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
      case "message":
        return value.trim().length >= 10
          ? null
          : "Message must be at least 10 characters";
      default:
        return null;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    handleFirstInteraction(); // Set start time on first interaction
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleBlur = (field: string) => {
    handleFirstInteraction(); // Set start time on first interaction
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Spam protection checks
    const currentTime = Date.now();
    const timeSpent = formStartTime ? currentTime - formStartTime : 0;
    const minimumTime = 3000; // 3 seconds minimum

    // Check if honeypot field is filled (bots often fill all fields)
    if (honeypotValue.trim() !== "") {
      setError("Invalid submission detected. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Check if form was submitted too quickly (bots submit instantly)
    // Only check if we have a start time (user has interacted with form)
    if (formStartTime && timeSpent < minimumTime) {
      setError(
        "Please take a moment to review your message before submitting."
      );
      setIsSubmitting(false);
      return;
    }

    // Validate all fields
    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const messageError = validateField("message", formData.message);

    if (nameError || emailError || messageError) {
      setError(nameError || emailError || messageError);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          website: honeypotValue, // Include honeypot value for server validation
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitSuccessful(true);
        setFormData({ name: "", email: "", message: "" });
        setHoneypotValue(""); // Reset honeypot field
        setTouched({ name: false, email: false, message: false });
        // Hide success message after 5 seconds
        setTimeout(() => setIsSubmitSuccessful(false), 5000);
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError(
        "Failed to send message. Please try again or email me directly at luke@dibza.co.uk"
      );
    } finally {
      setIsSubmitting(false);
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
          Ready to bring your Unity project to life? Whether it's{" "}
          <a
            href="/projects?tags=VR"
            className="text-purple-300 hover:text-purple-200 transition-colors underline"
          >
            VR
          </a>
          ,{" "}
          <a
            href="/projects?tags=EEG"
            className="text-purple-300 hover:text-purple-200 transition-colors underline"
          >
            EEG visualization
          </a>
          , or{" "}
          <a
            href="/projects"
            className="text-purple-300 hover:text-purple-200 transition-colors underline"
          >
            game development
          </a>
          , I'm here to help turn your vision into reality. Let's discuss how we
          can work together.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Contact Form */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Send Me a Message</h2>
            <p className="text-neutral-400">
              Tell me about your project, ask questions, or just say hello. I'll
              get back to you within 24 hours.
            </p>
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300 mb-2">
                <strong>Have a detailed project?</strong>
              </p>
              <p className="text-xs text-purple-400 mb-3">
                Use my structured project inquiry form for better project
                planning and faster response times.
              </p>
              <InteractiveButton href="/inquire" variant="secondary" size="sm">
                Submit Project Inquiry
              </InteractiveButton>
            </div>
          </div>

          {/* Success Message */}
          {isSubmitSuccessful && (
            <div className="p-4 rounded-xl bg-green-900/20 border border-green-500/50 text-green-300 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="font-medium">Message sent successfully!</p>
                <p className="text-sm text-green-400">
                  I'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/50 text-red-300 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <p className="font-medium">Error sending message</p>
                <p className="text-sm text-red-400">{error}</p>
              </div>
            </div>
          )}

          <FormErrorBoundary>
            <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
              <Input
                label="Name *"
                name="user_name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="Your name"
                error={
                  touched.name
                    ? validateField("name", formData.name) || undefined
                    : undefined
                }
                required
              />

              <Input
                label="Email *"
                name="user_email"
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

              <Textarea
                label="Message *"
                name="message"
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                error={
                  touched.message
                    ? validateField("message", formData.message) || undefined
                    : undefined
                }
                required
              />

              {/* Honeypot field - hidden from users but visible to bots */}
              {mounted && (
                <div className="absolute left-[-9999px] opacity-0 pointer-events-none">
                  <Input
                    label="Website"
                    name="website"
                    type="text"
                    value={honeypotValue}
                    onChange={(e) => setHoneypotValue(e.target.value)}
                    placeholder="Leave this empty"
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
              )}

              <InteractiveButton
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {isSubmitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </InteractiveButton>

              {isSubmitSuccessful && (
                <div className="p-4 rounded-xl bg-green-900/20 border border-green-500/30 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="font-medium text-green-300">
                      Message Sent Successfully!
                    </p>
                    <p className="text-sm text-green-400">
                      I'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </FormErrorBoundary>
        </section>

        {/* Contact Info & CTA */}
        <section className="space-y-8">
          {/* What I Do */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              What I Specialize In
            </h2>
            <div className="space-y-4">
              <Card variant="default">
                <h3 className="font-semibold text-white mb-2">
                  EEG Visualization
                </h3>
                <p className="text-neutral-400 text-sm">
                  Transform brainwave data into stunning, interactive visual
                  experiences for research, education, and entertainment.
                </p>
              </Card>

              <Card variant="default">
                <h3 className="font-semibold text-white mb-2">
                  VR Development
                </h3>
                <p className="text-neutral-400 text-sm">
                  Create immersive virtual reality experiences that transport
                  users to new worlds and provide unforgettable interactions.
                </p>
              </Card>

              <Card variant="default">
                <h3 className="font-semibold text-white mb-2">
                  Game Development
                </h3>
                <p className="text-neutral-400 text-sm">
                  Build high-performance free-to-play and casino games with
                  engaging gameplay loops and scalable architectures.
                </p>
              </Card>
            </div>
          </div>

          {/* Why Choose Me */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Why Work With Me?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-neutral-300 text-sm">
                  <strong className="text-white">Proven Experience:</strong>{" "}
                  Years of Unity development across multiple domains
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-neutral-300 text-sm">
                  <strong className="text-white">Technical Excellence:</strong>{" "}
                  Clean, maintainable code and optimized performance
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-neutral-300 text-sm">
                  <strong className="text-white">
                    Collaborative Approach:
                  </strong>{" "}
                  Open communication and feedback throughout the process
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-neutral-300 text-sm">
                  <strong className="text-white">Innovation Focus:</strong>{" "}
                  Always exploring new technologies and pushing boundaries
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Card variant="default" className="text-center space-y-4">
            <h3 className="text-xl font-bold text-white">
              Ready to Get Started?
            </h3>
            <p className="text-neutral-300 text-sm">
              Let's discuss your project requirements and create something
              amazing together.
            </p>
            <InteractiveButton href="/projects" variant="primary" size="md">
              View My Work
              <ArrowRight className="w-4 h-4" />
            </InteractiveButton>
          </Card>
        </section>
      </div>

      {/* Additional Info */}
      <section className="text-center space-y-6 py-16">
        <Card variant="default" className="rounded-3xl">
          <h2 className="text-3xl font-bold text-white">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Whether you have a fully formed concept or just a spark of an idea,
            I'm here to help bring it to life. Let's create an experience that
            users will love and remember.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <InteractiveButton href="/about" variant="secondary" size="md">
              Learn More About Me
            </InteractiveButton>
            <ResumeDownload variant="secondary" size="md" />
            <InteractiveButton href="/projects" variant="primary" size="md">
              See My Work
              <ArrowRight className="w-5 h-5" />
            </InteractiveButton>
          </div>
        </Card>
      </section>
    </div>
  );
}

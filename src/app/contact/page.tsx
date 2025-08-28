"use client";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current!);
      const data = {
        name: formData.get("user_name"),
        email: formData.get("user_email"),
        message: formData.get("message"),
      };

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitSuccessful(true);
        formRef.current?.reset();
        // Hide success message after 5 seconds
        setTimeout(() => setIsSubmitSuccessful(false), 5000);
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
          Let's Connect
        </h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          Ready to bring your Unity project to life? Whether it's VR, EEG
          visualization, or game development, I'm here to help turn your vision
          into reality. Let's discuss how we can work together.
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
          </div>

          <form onSubmit={onSubmit} className="space-y-6" ref={formRef}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                name="user_name"
                className="w-full rounded-xl bg-neutral-900/50 border border-purple-800/50 px-4 py-3 text-white placeholder-neutral-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                name="user_email"
                type="email"
                className="w-full rounded-xl bg-neutral-900/50 border border-purple-800/50 px-4 py-3 text-white placeholder-neutral-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                className="w-full rounded-xl bg-neutral-900/50 border border-purple-800/50 px-4 py-3 text-white placeholder-neutral-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                required
              />
            </div>

            <button
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

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
        </section>

        {/* Contact Info & CTA */}
        <section className="space-y-8">
          {/* What I Do */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              What I Specialize In
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent">
                <h3 className="font-semibold text-white mb-2">
                  EEG Visualization
                </h3>
                <p className="text-neutral-400 text-sm">
                  Transform brainwave data into stunning, interactive visual
                  experiences for research, education, and entertainment.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent">
                <h3 className="font-semibold text-white mb-2">
                  VR Development
                </h3>
                <p className="text-neutral-400 text-sm">
                  Create immersive virtual reality experiences that transport
                  users to new worlds and provide unforgettable interactions.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent">
                <h3 className="font-semibold text-white mb-2">
                  Game Development
                </h3>
                <p className="text-neutral-400 text-sm">
                  Build high-performance free-to-play and casino games with
                  engaging gameplay loops and scalable architectures.
                </p>
              </div>
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
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-purple-900/30 border border-purple-800/50 text-center space-y-4">
            <h3 className="text-xl font-bold text-white">
              Ready to Get Started?
            </h3>
            <p className="text-neutral-300 text-sm">
              Let's discuss your project requirements and create something
              amazing together.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      {/* Additional Info */}
      <section className="text-center space-y-6 py-16 rounded-3xl bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-purple-900/30 border border-purple-800/50">
        <h2 className="text-3xl font-bold text-white">
          Let's Build Something Amazing
        </h2>
        <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
          Whether you have a fully formed concept or just a spark of an idea,
          I'm here to help bring it to life. Let's create an experience that
          users will love and remember.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-500/50 rounded-xl font-medium text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
          >
            Learn More About Me
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            See My Work
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

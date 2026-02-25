import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { ProjectInquiryForm } from "@/components/content";

export const metadata: Metadata = generateMetadata(
  "Project Inquiry - Luke Taylor | Unity Development Consultation",
  "Submit a detailed project inquiry for Unity development, VR experiences, EEG visualization, or game development. Get a comprehensive proposal for your next project.",
  "/inquire"
);

export default function InquirePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-primary-100 to-primary-300 bg-clip-text text-transparent">
          Project Inquiry
        </h1>
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          Ready to start your Unity project? This detailed inquiry form helps me
          understand your requirements and provide you with the best possible
          proposal. Let's create something amazing together.
        </p>
      </section>

      {/* Project Inquiry Form */}
      <ProjectInquiryForm />
    </div>
  );
}

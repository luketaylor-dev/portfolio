import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { ProjectInquiryForm } from "@/components/content";
import { Text } from "@/components/atoms";

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
        <Text
          variant="heading1"
          as="h1"
          className="tracking-tight text-white"
        >
          Project Inquiry
        </Text>
        <Text
          variant="paragraph"
          as="p"
          color="muted"
          className="text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Ready to start your Unity project? This detailed inquiry form helps me
          understand your requirements and provide you with the best possible
          proposal. Let's create something amazing           together.
        </Text>
      </section>

      {/* Project Inquiry Form */}
      <ProjectInquiryForm />
    </div>
  );
}

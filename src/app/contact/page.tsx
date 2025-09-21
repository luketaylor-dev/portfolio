import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import ContactForm from "./contact-form";

export const metadata: Metadata = generateMetadata(
  "Contact Luke Taylor - Unity Developer Manchester | Get In Touch",
  "Contact Luke Taylor, a Manchester-based Unity Developer specializing in EEG visualization, VR development, and game development. Let's discuss your next project.",
  "/contact"
);

export default function ContactPage() {
  return <ContactForm />;
}

import { Quote } from "lucide-react";
import { Text } from "@/components/atoms";
import { Card } from "@/components/ui";

const testimonials = [
  {
    name: "Jake",
    role: "Founder/Director, Tatfindr",
    quote:
      "Luke has been a fantastic addition to the Tatfindr team, not only helping us build a quality product, but also contributing with additional insight, collaboration, and effort outside of his remit.",
  },
  {
    name: "Dave",
    role: "Founder/Director, Brainrave",
    quote:
      "Luke brought real technical depth to the Brainrave project, turning complex EEG integration into something that actually worked in the real world. Great communicator and a pleasure to work with.",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-24 space-y-12"
      aria-labelledby="testimonials-heading"
    >
      <div className="text-center space-y-2">
        <Text
          variant="heading2"
          as="h2"
          id="testimonials-heading"
          className="md:text-4xl"
        >
          What People Say
        </Text>
        <Text variant="paragraph" as="p" color="secondary">
          Feedback from clients and colleagues
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map(({ name, role, quote }) => (
          <Card key={name} variant="default" className="relative p-8 space-y-4">
            <Quote
              className="w-8 h-8 text-primary-500/30 absolute top-4 right-4"
              aria-hidden
            />
            <Text
              variant="paragraph"
              as="blockquote"
              className="text-lg italic text-neutral-300"
            >
              &ldquo;{quote}&rdquo;
            </Text>
            <Text
              variant="small"
              as="cite"
              className="not-italic text-primary-400"
            >
              — {name}, {role}
            </Text>
          </Card>
        ))}
      </div>
    </section>
  );
}

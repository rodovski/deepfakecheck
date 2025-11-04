import { ShieldCheckIcon, BoltIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: ShieldCheckIcon,
    title: "AI-Powered Detection",
    description: "Advanced machine learning algorithms analyze images for signs of manipulation and artificial generation with high accuracy.",
  },
  {
    icon: BoltIcon,
    title: "Instant Results",
    description: "Get comprehensive analysis results in seconds. No waiting, no queues - immediate feedback on image authenticity.",
  },
  {
    icon: LockClosedIcon,
    title: "Privacy-Focused",
    description: "Your images are processed securely and never stored. Complete privacy and confidentiality guaranteed.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Powerful Detection Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Industry-leading AI technology to protect you from digital deception
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 text-center hover-elevate"
                data-testid={`card-feature-${index}`}
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

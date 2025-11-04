import { CloudArrowUpIcon, CpuChipIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const steps = [
  {
    icon: CloudArrowUpIcon,
    number: "01",
    title: "Upload Image",
    description: "Drag and drop or select any image file from your device",
  },
  {
    icon: CpuChipIcon,
    number: "02",
    title: "AI Analysis",
    description: "Our advanced algorithms scan for deepfake indicators and manipulation",
  },
  {
    icon: ChartBarIcon,
    number: "03",
    title: "Get Results",
    description: "Receive detailed analysis with confidence scores and explanations",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple three-step process to verify image authenticity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="text-center"
                data-testid={`step-${index}`}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute top-0 right-0 text-6xl font-bold text-primary/10 font-display -z-10">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/AI_neural_network_background_cf8dd719.png";

interface HeroSectionProps {
  onUploadClick: () => void;
}

export default function HeroSection({ onUploadClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <Badge 
          variant="outline" 
          className="mb-6 text-sm backdrop-blur-md bg-white/10 border-white/20 text-white"
          data-testid="badge-powered-by"
        >
          Powered by Sightengine AI
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
          Verify Image Authenticity
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Detect deepfakes and AI-generated content instantly with advanced machine learning technology
        </p>
        
        <Button
          size="lg"
          onClick={onUploadClick}
          className="text-lg px-8 py-6 backdrop-blur-md bg-primary/90 hover:bg-primary border-2 border-primary-border shadow-lg"
          data-testid="button-upload-cta"
        >
          Analyze Image Now
        </Button>
      </div>
    </section>
  );
}

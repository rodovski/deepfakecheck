import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import UploadZone from "@/components/UploadZone";
import ResultsDisplay, { type AnalysisResult } from "@/components/ResultsDisplay";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const uploadRef = useRef<HTMLDivElement>(null);

  const handleUploadClick = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name);
    setIsProcessing(true);
    
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        confidence: Math.floor(Math.random() * 30) + 70,
        verdict: Math.random() > 0.3 ? 'authentic' : 'deepfake',
        details: [
          { label: 'Face Detection', value: Math.random() > 0.5 ? 'Natural' : 'Synthetic' },
          { label: 'Manipulation Score', value: `${Math.random() > 0.5 ? 'Low' : 'High'} (${(Math.random() * 0.5).toFixed(2)})` },
          { label: 'AI Generation', value: Math.random() > 0.6 ? 'Not Detected' : 'Possible' },
          { label: 'Image Quality', value: Math.random() > 0.5 ? 'High' : 'Medium' },
        ],
        timestamp: new Date().toISOString(),
        filename: file.name,
      };
      setResult(mockResult);
      setIsProcessing(false);
    }, 2000);
  };

  const handleAnalyzeAnother = () => {
    setResult(null);
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <HeroSection onUploadClick={handleUploadClick} />

      <section ref={uploadRef} className="py-20 px-6" id="upload">
        {result ? (
          <ResultsDisplay result={result} onAnalyzeAnother={handleAnalyzeAnother} />
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                Upload Your Image
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Drop any image to instantly analyze it for deepfake indicators
              </p>
            </div>
            <UploadZone onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </>
        )}
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}

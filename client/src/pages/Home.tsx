import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import ResultsDisplay, { type AnalysisResult } from "@/components/ResultsDisplay";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {result ? (
          <ResultsDisplay result={result} onAnalyzeAnother={handleAnalyzeAnother} />
        ) : (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl font-bold mb-2 font-display">
                DeepFakeCheck
              </h1>
            </div>
            <UploadZone onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </div>
        )}
      </div>
    </div>
  );
}

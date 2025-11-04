import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import ResultsDisplay, { type AnalysisResult } from "@/components/ResultsDisplay";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    console.log('File selected:', file.name);
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');

      if (!response.ok) {
        let errorMessage = 'Failed to analyze image';
        if (isJson) {
          const error = await response.json();
          errorMessage = error.error || error.details || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = isJson ? await response.json() : {};
      setResult(data);
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnalyzeAnother = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-40">
        {result ? (
          <ResultsDisplay result={result} onAnalyzeAnother={handleAnalyzeAnother} />
        ) : (
          <div className="w-full max-w-xl">
            <div className="text-center mb-8 space-y-6">
              <h1 className="text-5xl font-normal text-foreground/90 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                DeepFakeCheck
              </h1>
              <p className="text-lg text-muted-foreground font-normal">
                Verify image authenticity with AI
              </p>
            </div>
            <UploadZone onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </div>
        )}
      </div>
    </div>
  );
}

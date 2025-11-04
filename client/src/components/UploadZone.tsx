import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

export default function UploadZone({ onFileSelect, isProcessing = false }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          isDragging 
            ? 'border-primary bg-primary/5 scale-102' 
            : 'border-border hover-elevate'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        data-testid="upload-zone"
      >
        <CloudArrowUpIcon className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
        
        <h3 className="text-2xl font-semibold mb-3">
          {isProcessing ? 'Analyzing...' : 'Upload Image to Analyze'}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          Drag and drop your image here, or click to browse
        </p>
        
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
          data-testid="input-file"
          disabled={isProcessing}
        />
        
        <Button
          asChild
          variant="outline"
          size="lg"
          disabled={isProcessing}
          data-testid="button-browse"
        >
          <label htmlFor="file-input" className="cursor-pointer">
            Browse Files
          </label>
        </Button>
        
        <p className="text-sm text-muted-foreground mt-4">
          Supports JPG, PNG, WEBP (max 10MB)
        </p>
      </div>
    </div>
  );
}

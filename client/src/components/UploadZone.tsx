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
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragging 
            ? 'border-primary bg-primary/5 scale-102' 
            : 'border-border hover-elevate'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        data-testid="upload-zone"
      >
        <CloudArrowUpIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        
        <p className="text-muted-foreground mb-4">
          {isProcessing ? 'Analyzing...' : 'Drag and drop an image or click to browse'}
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
          size="lg"
          disabled={isProcessing}
          data-testid="button-browse"
        >
          <label htmlFor="file-input" className="cursor-pointer">
            Choose File
          </label>
        </Button>
      </div>
    </div>
  );
}

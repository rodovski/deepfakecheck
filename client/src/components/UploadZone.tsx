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
        className={`border rounded-md p-8 text-center transition-all shadow-[0_1px_4px_rgba(0,0,0,0.08)] ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-border bg-muted/30 hover-elevate'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        data-testid="upload-zone"
      >
        <CloudArrowUpIcon className="w-9 h-9 mx-auto mb-4 text-muted-foreground" />
        
        <p className="text-base text-muted-foreground mb-6 font-normal">
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
          disabled={isProcessing}
          data-testid="button-browse"
          className="font-medium"
        >
          <label htmlFor="file-input" className="cursor-pointer">
            Choose File
          </label>
        </Button>
      </div>
    </div>
  );
}

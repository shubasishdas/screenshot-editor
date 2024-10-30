import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './Button';

interface ScreenshotPreviewProps {
  screenshot: string;
  gradient: string;
  onNewScreenshot: () => void;
  onSave: () => void;
}

export function ScreenshotPreview({ screenshot, gradient, onNewScreenshot, onSave }: ScreenshotPreviewProps) {
  return (
    <div className="space-y-6">
      <div className={`relative rounded-lg overflow-hidden p-12 ${gradient}`}>
        <img 
          src={screenshot} 
          alt="Screenshot" 
          className="w-full shadow-xl rounded-lg"
        />
      </div>
      
      <div className="flex justify-between items-center">
        <Button onClick={onNewScreenshot} variant="secondary">
          New Screenshot
        </Button>
        <Button onClick={onSave}>
          <Download className="w-4 h-4 mr-2" />
          Save with Gradient
        </Button>
      </div>
    </div>
  );
}
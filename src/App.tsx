import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from './components/Button';
import { ScreenshotPreview } from './components/ScreenshotPreview';
import { GradientEditor } from './components/GradientEditor';
import { captureScreen, generateFinalImage } from './utils/screenshot';

export default function App() {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [gradient, setGradient] = useState('bg-gradient-to-r from-rose-400 to-orange-300');

  const handleCapture = async () => {
    try {
      const image = await captureScreen();
      setScreenshot(image);
      setIsEditing(true);
    } catch (err) {
      console.error('Failed to capture screenshot:', err);
    }
  };

  const handleSave = async () => {
    if (!screenshot) return;

    try {
      const finalImage = await generateFinalImage(screenshot, gradient);
      
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.download = `screenshot-${timestamp}.png`;
      link.href = finalImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to save screenshot:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Screenshot Editor</h1>
          <p className="text-gray-600">Capture, customize, and share your screenshots with beautiful gradients</p>
        </div>

        {!screenshot ? (
          <div className="flex flex-col items-center justify-center space-y-6 p-12 border-2 border-dashed border-gray-300 rounded-xl">
            <Camera className="w-16 h-16 text-gray-400" />
            <Button onClick={handleCapture}>
              Take Screenshot
            </Button>
            <p className="text-sm text-gray-500">Click to capture your screen</p>
          </div>
        ) : (
          <ScreenshotPreview
            screenshot={screenshot}
            gradient={gradient}
            onNewScreenshot={() => setScreenshot(null)}
            onSave={handleSave}
          />
        )}
      </div>

      <GradientEditor
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        gradient={gradient}
        onGradientChange={setGradient}
      />
    </div>
  );
}
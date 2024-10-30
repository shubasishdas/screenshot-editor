export async function captureScreen(): Promise<string> {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    
    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        resolve(true);
      };
    });

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    
    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Error capturing screenshot:', err);
    throw err;
  }
}

const colorMap: Record<string, string> = {
  rose: '#f43f5e',
  orange: '#f97316',
  violet: '#8b5cf6',
  fuchsia: '#d946ef',
  cyan: '#06b6d4',
  blue: '#3b82f6',
  emerald: '#10b981',
  teal: '#14b8a6',
  pink: '#ec4899',
  purple: '#a855f7',
  yellow: '#facc15',
  green: '#22c55e',
  indigo: '#6366f1'
};

export function generateFinalImage(screenshot: string, gradient: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    const img = new Image();
    img.onload = () => {
      // Add padding around the screenshot
      const padding = 100;
      canvas.width = img.width + (padding * 2);
      canvas.height = img.height + (padding * 2);

      // Extract color names from gradient class
      const fromColor = gradient.match(/from-(\w+)-\d+/)?.[1] || 'rose';
      const toColor = gradient.match(/to-(\w+)-\d+/)?.[1] || 'orange';

      // Create and draw gradient
      const gradientObj = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradientObj.addColorStop(0, colorMap[fromColor]);
      gradientObj.addColorStop(1, colorMap[toColor]);
      ctx.fillStyle = gradientObj;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw screenshot in the center
      ctx.drawImage(img, padding, padding);

      // Add a subtle shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;

      resolve(canvas.toDataURL('image/png'));
    };
    img.src = screenshot;
  });
}
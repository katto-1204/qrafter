import QRCode from 'qrcode';

export type QRContentType = 'url' | 'text' | 'wifi' | 'email' | 'social' | 'multilink' | 'countdown';

export type QRDotStyle = 'square' | 'rounded' | 'dots' | 'diamond' | 'glitch' | 'stripe';
export type QREyeFrameStyle = 'square' | 'rounded' | 'circle' | 'leaf' | 'diamond';
export type QREyeBallStyle = 'square' | 'rounded' | 'circle' | 'leaf' | 'diamond' | 'star';
export type QRMaskShape = 'none' | 'circle' | 'heart' | 'star';

export interface QRDesign {
  fgColor: string;
  bgColor: string;
  dotStyle: QRDotStyle;
  eyeFrameStyle: QREyeFrameStyle;
  eyeBallStyle: QREyeBallStyle;
  eyeFrameColor?: string;
  eyeBallColor?: string;
  maskShape: QRMaskShape;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  logoUrl?: string;
  labelText: string;
  labelColor: string;
  showLabel: boolean;
  // New features
  gradientEnabled: boolean;
  gradientColor: string;
  gradientType: 'linear' | 'radial';
  shadowEnabled: boolean;
  shadowColor: string;
  glowEnabled: boolean;
  glowColor: string;
  patternBg?: string;
}

export const defaultDesign: QRDesign = {
  fgColor: '#1e40af',
  bgColor: '#ffffff',
  dotStyle: 'square',
  eyeFrameStyle: 'square',
  eyeBallStyle: 'square',
  maskShape: 'none',
  errorCorrectionLevel: 'M',
  labelText: 'Scan Me!',
  labelColor: '#1e40af',
  showLabel: true,
  gradientEnabled: false,
  gradientColor: '#3b82f6',
  gradientType: 'linear',
  shadowEnabled: false,
  shadowColor: 'rgba(0,0,0,0.2)',
  glowEnabled: false,
  glowColor: 'rgba(59,130,246,0.3)',
};

export const colorPalettes = [
  { name: 'Royal Blue', fg: '#1e40af', bg: '#ffffff', label: '#1e40af' },
  { name: 'Ocean', fg: '#0369a1', bg: '#f0f9ff', label: '#0369a1' },
  { name: 'Emerald', fg: '#047857', bg: '#ffffff', label: '#047857' },
  { name: 'Sunset', fg: '#c2410c', bg: '#fff7ed', label: '#c2410c' },
  { name: 'Purple', fg: '#7c3aed', bg: '#ffffff', label: '#7c3aed' },
  { name: 'Midnight', fg: '#1e293b', bg: '#ffffff', label: '#1e293b' },
  { name: 'Rose', fg: '#be123c', bg: '#fff1f2', label: '#be123c' },
  { name: 'Classic', fg: '#000000', bg: '#ffffff', label: '#000000' },
];

export function buildWifiString(ssid: string, password: string, encryption: string): string {
  return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
}

export function buildEmailString(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildSmsString(phone: string, message: string): string {
  return `sms:${phone}?body=${encodeURIComponent(message)}`;
}

export function buildSmsStringFromSocial(phone: string, message: string): string {
  return `sms:${phone}?body=${encodeURIComponent(message)}`;
}

export function buildCallString(phone: string): string {
  return `tel:${phone}`;
}

export const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', prefix: 'https://facebook.com/' },
  { id: 'instagram', name: 'Instagram', prefix: 'https://instagram.com/' },
  { id: 'twitter', name: 'Twitter/X', prefix: 'https://x.com/' },
  { id: 'linkedin', name: 'LinkedIn', prefix: 'https://linkedin.com/in/' },
  { id: 'tiktok', name: 'TikTok', prefix: 'https://tiktok.com/@' },
  { id: 'youtube', name: 'YouTube', prefix: 'https://youtube.com/@' },
  { id: 'spotify', name: 'Spotify', prefix: 'https://open.spotify.com/user/' },
  { id: 'whatsapp', name: 'WhatsApp', prefix: 'https://wa.me/' },
  { id: 'telegram', name: 'Telegram', prefix: 'https://t.me/' },
];

export async function generateQRDataURL(
  content: string,
  design: QRDesign,
  size: number = 300
): Promise<string> {
  const canvas = await generateQRCanvas(content, design, size);
  return canvas.toDataURL('image/png');
}

export async function generateQRCanvas(
  content: string,
  design: QRDesign,
  size: number = 600
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const qr = QRCode.create(content || 'https://qrafted.app', {
    errorCorrectionLevel: design.errorCorrectionLevel,
  });

  const modules = qr.modules;
  const count = modules.size;
  const moduleSize = size / count;

  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = design.bgColor;
  ctx.fillRect(0, 0, size, size);

  // Apply Mask Clip
  if (design.maskShape !== 'none') {
    ctx.beginPath();
    const center = size / 2;
    if (design.maskShape === 'circle') {
      ctx.arc(center, center, size / 2, 0, Math.PI * 2);
    } else if (design.maskShape === 'heart') {
      const topCurveHeight = size * 0.3;
      ctx.moveTo(center, size * 0.9);
      ctx.bezierCurveTo(center, size * 0.8, 0, size * 0.6, 0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, center, 0, center, topCurveHeight);
      ctx.bezierCurveTo(center, 0, size, 0, size, topCurveHeight);
      ctx.bezierCurveTo(size, size * 0.6, center, size * 0.8, center, size * 0.9);
    } else if (design.maskShape === 'star') {
      const spikes = 5;
      const outerRadius = size / 2;
      const innerRadius = size / 4;
      let rot = Math.PI / 2 * 3;
      let x = center;
      let y = center;
      let step = Math.PI / spikes;

      ctx.moveTo(center, center - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = center + Math.cos(rot) * outerRadius;
        y = center + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = center + Math.cos(rot) * innerRadius;
        y = center + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(center, center - outerRadius);
    }
    ctx.closePath();
    ctx.clip();

    // Fill background inside clip
    ctx.fillStyle = design.bgColor;
    ctx.fill();
  }

  // Setup fill
  if (design.gradientEnabled) {
    let gradient;
    if (design.gradientType === 'linear') {
      gradient = ctx.createLinearGradient(0, 0, size, size);
    } else {
      gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    }
    gradient.addColorStop(0, design.fgColor);
    gradient.addColorStop(1, design.gradientColor);
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = design.fgColor;
  }

  // Shadow/Glow effects
  if (design.shadowEnabled) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = design.shadowColor;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  } else if (design.glowEnabled) {
    ctx.shadowBlur = 15;
    ctx.shadowColor = design.glowColor;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  // Draw modules
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (!modules.get(r, c)) continue;

      const s = moduleSize; // module size
      const x = c * s;
      const y = r * s;

      // Eye Detection Logic (Finder Patterns are 7x7 at corners)
      const isTopLeftEye = r < 7 && c < 7;
      const isTopRightEye = r < 7 && c >= count - 7;
      const isBottomLeftEye = r >= count - 7 && c < 7;

      if (isTopLeftEye || isTopRightEye || isBottomLeftEye) {
        let relR = r;
        let relC = c;
        if (isTopRightEye) relC = c - (count - 7);
        if (isBottomLeftEye) relR = r - (count - 7);

        // Only draw the COMPONENT when we hit the top-left of its area
        // Frame: 7x7 area
        if (relR === 0 && relC === 0) {
          ctx.fillStyle = design.eyeFrameColor || design.fgColor;
          drawEyePart(ctx, x, y, s * 7, design.eyeFrameStyle, true);
        }
        // Ball: 3x3 area
        else if (relR === 2 && relC === 2) {
          ctx.fillStyle = design.eyeBallColor || design.fgColor;
          drawEyePart(ctx, x, y, s * 3, design.eyeBallStyle, false);
        }

        // Skip all modules in eye area (we handled frame/ball above)
        continue;
      }

      // Restore foreground for normal modules
      if (design.gradientEnabled) {
        let gradient;
        if (design.gradientType === 'linear') {
          gradient = ctx.createLinearGradient(0, 0, size, size);
        } else {
          gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        }
        gradient.addColorStop(0, design.fgColor);
        gradient.addColorStop(1, design.gradientColor);
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = design.fgColor;
      }

      // Draw normal modules
      switch (design.dotStyle) {
        case 'dots':
          ctx.beginPath();
          ctx.arc(x + s / 2, y + s / 2, s / 2 * 0.8, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'rounded':
          ctx.beginPath();
          const r_size = s * 0.4;
          ctx.roundRect(x + 0.5, y + 0.5, s - 1, s - 1, r_size);
          ctx.fill();
          break;
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(x + s / 2, y);
          ctx.lineTo(x + s, y + s / 2);
          ctx.lineTo(x + s / 2, y + s);
          ctx.lineTo(x, y + s / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case 'glitch':
          ctx.fillRect(x, y + s * 0.2, s * 0.8, s * 0.6);
          break;
        case 'stripe':
          ctx.fillRect(x + s * 0.1, y, s * 0.2, s);
          ctx.fillRect(x + s * 0.7, y, s * 0.2, s);
          break;
        default: // square
          ctx.fillRect(x, y, s, s);
          break;
      }
    }
  }

  return canvas;
}

/**
 * Helper to draw parts of the QR eyes with specific shapes
 */
function drawEyePart(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, style: QREyeFrameStyle | QREyeBallStyle, isFrame: boolean) {
  const r = s * 0.2;
  const dotSize = s / (isFrame ? 7 : 3);

  ctx.beginPath();

  const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number, style: any) => {
    switch (style) {
      case 'circle':
        ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
        break;
      case 'rounded':
        ctx.roundRect(x, y, s, s, s * 0.25);
        break;
      case 'leaf':
        ctx.moveTo(x + s, y);
        ctx.quadraticCurveTo(x + s, y + s, x, y + s);
        ctx.lineTo(x, y + s / 2);
        ctx.quadraticCurveTo(x, y, x + s, y);
        ctx.closePath();
        break;
      case 'diamond':
        ctx.moveTo(x + s / 2, y);
        ctx.lineTo(x + s, y + s / 2);
        ctx.lineTo(x + s / 2, y + s);
        ctx.lineTo(x, y + s / 2);
        ctx.closePath();
        break;
      case 'star':
        const spikes = 5;
        const outer = s / 2;
        const inner = s / 4;
        let rot = Math.PI / 2 * 3;
        let cx = x + s / 2;
        let cy = y + s / 2;
        let step = Math.PI / spikes;
        ctx.moveTo(cx, cy - outer);
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
          rot += step;
          ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
          rot += step;
        }
        ctx.closePath();
        break;
      default: // square
        ctx.rect(x, y, s, s);
    }
  };

  if (isFrame) {
    // Use even-odd to create the hole (7x7 outer, 5x5 inner)
    drawShape(ctx, x, y, s, style);

    // Counter-clockwise rectangle for the hole
    const holeSize = dotSize * 5;
    const holeOffset = dotSize;
    ctx.moveTo(x + holeOffset + holeSize, y + holeOffset);
    ctx.lineTo(x + holeOffset, y + holeOffset);
    ctx.lineTo(x + holeOffset, y + holeOffset + holeSize);
    ctx.lineTo(x + holeOffset + holeSize, y + holeOffset + holeSize);
    ctx.closePath();

    ctx.fill('evenodd');
  } else {
    drawShape(ctx, x, y, s, style);
    ctx.fill();
  }
}

export function downloadQR(canvas: HTMLCanvasElement, format: string, design: QRDesign) {
  const finalCanvas = document.createElement('canvas');
  const labelHeight = design.showLabel && design.labelText ? 60 : 0;
  finalCanvas.width = canvas.width;
  finalCanvas.height = canvas.height + labelHeight;

  const ctx = finalCanvas.getContext('2d')!;

  // Handle transparency for PNG
  if (format === 'png') {
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
  } else {
    ctx.fillStyle = design.bgColor;
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  }

  ctx.drawImage(canvas, 0, 0);

  if (design.showLabel && design.labelText) {
    ctx.fillStyle = design.labelColor;
    ctx.font = `bold ${Math.round(canvas.width / 15)}px 'Inter', sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(design.labelText, finalCanvas.width / 2, canvas.height + (labelHeight * 0.7));
  }

  let mimeType = 'image/png';
  let ext = 'png';
  if (format === 'jpg') { mimeType = 'image/jpeg'; ext = 'jpg'; }

  const link = document.createElement('a');
  link.download = `qrafted-qr.${ext}`;
  link.href = finalCanvas.toDataURL(mimeType, 1.0);
  link.click();
}

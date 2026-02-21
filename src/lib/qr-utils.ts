import QRCode from 'qrcode';

export type QRContentType = 'url' | 'text' | 'wifi' | 'email' | 'sms' | 'call' | 'social';

export type QRDotStyle = 'square' | 'rounded' | 'dots' | 'diamond';

export interface QRDesign {
  fgColor: string;
  bgColor: string;
  dotStyle: QRDotStyle;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  logoUrl?: string;
  labelText: string;
  labelColor: string;
  showLabel: boolean;
}

export const defaultDesign: QRDesign = {
  fgColor: '#1e40af',
  bgColor: '#ffffff',
  dotStyle: 'square',
  errorCorrectionLevel: 'M',
  labelText: 'Scan Me!',
  labelColor: '#1e40af',
  showLabel: true,
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
  if (!content) return '';
  
  return QRCode.toDataURL(content, {
    width: size,
    margin: 2,
    color: {
      dark: design.fgColor,
      light: design.bgColor,
    },
    errorCorrectionLevel: design.errorCorrectionLevel,
  });
}

export async function generateQRCanvas(
  content: string,
  design: QRDesign,
  size: number = 600
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  
  await QRCode.toCanvas(canvas, content || 'https://qrafted.app', {
    width: size,
    margin: 2,
    color: {
      dark: design.fgColor,
      light: design.bgColor,
    },
    errorCorrectionLevel: design.errorCorrectionLevel,
  });

  return canvas;
}

export function downloadQR(canvas: HTMLCanvasElement, format: string, design: QRDesign) {
  const finalCanvas = document.createElement('canvas');
  const labelHeight = design.showLabel && design.labelText ? 40 : 0;
  finalCanvas.width = canvas.width;
  finalCanvas.height = canvas.height + labelHeight;
  
  const ctx = finalCanvas.getContext('2d')!;
  ctx.fillStyle = design.bgColor;
  ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  ctx.drawImage(canvas, 0, 0);

  if (design.showLabel && design.labelText) {
    ctx.fillStyle = design.labelColor;
    ctx.font = `bold 20px 'Space Grotesk', sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(design.labelText, finalCanvas.width / 2, canvas.height + 28);
  }

  let mimeType = 'image/png';
  let ext = 'png';
  if (format === 'jpg') { mimeType = 'image/jpeg'; ext = 'jpg'; }
  if (format === 'svg') { mimeType = 'image/png'; ext = 'png'; } // fallback

  const link = document.createElement('a');
  link.download = `qrafted-qr.${ext}`;
  link.href = finalCanvas.toDataURL(mimeType, 1.0);
  link.click();
}

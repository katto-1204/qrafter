import { useState, useEffect, useCallback } from 'react';
import { QRDesign, QRContentType, defaultDesign, generateQRDataURL } from '@/lib/qr-utils';

export function useQRCode() {
  const [contentType, setContentType] = useState<QRContentType>('url');
  const [content, setContent] = useState('https://');
  const [design, setDesign] = useState<QRDesign>(defaultDesign);
  const [previewUrl, setPreviewUrl] = useState('');

  const updateDesign = useCallback((updates: Partial<QRDesign>) => {
    setDesign(prev => ({ ...prev, ...updates }));
  }, []);

  const resetDesign = useCallback(() => {
    setDesign(defaultDesign);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (content && content.length > 0) {
        try {
          const url = await generateQRDataURL(content, design, 400);
          setPreviewUrl(url);
        } catch {
          setPreviewUrl('');
        }
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [content, design]);

  return {
    contentType,
    setContentType,
    content,
    setContent,
    design,
    updateDesign,
    resetDesign,
    previewUrl,
  };
}

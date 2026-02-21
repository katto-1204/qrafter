import { useState, useEffect, useCallback } from 'react';
import { QRDesign, QRContentType, defaultDesign, generateQRDataURL } from '@/lib/qr-utils';

export function useQRCode() {
  const [contentType, setContentType] = useState<QRContentType>('url');
  const [content, setContent] = useState('https://');
  const [design, setDesign] = useState<QRDesign>(defaultDesign);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isValidContent, setIsValidContent] = useState(true);

  const updateDesign = useCallback((updates: Partial<QRDesign>) => {
    setDesign(prev => ({ ...prev, ...updates }));
  }, []);

  const resetDesign = useCallback(() => {
    setDesign(defaultDesign);
  }, []);

  // Function to validate content
  const validateContent = useCallback((content: string): boolean => {
    if (!content.trim()) {
      return false;
    }
    
    // For URL content type, check if it's a valid URL
    if (contentType === 'url') {
      try {
        new URL(content.startsWith('http') ? content : `https://${content}`);
        return true;
      } catch {
        return false;
      }
    }
    
    // For other content types, just check if it's not empty
    return content.trim().length > 0;
  }, [contentType]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const isValid = validateContent(content);
      setIsValidContent(isValid);
      
      if (isValid && content && content.length > 0) {
        try {
          const url = await generateQRDataURL(content, design, 400);
          setPreviewUrl(url);
        } catch {
          setPreviewUrl('');
        }
      } else {
        setPreviewUrl('');
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [content, design, validateContent]);

  return {
    contentType,
    setContentType,
    content,
    setContent,
    design,
    updateDesign,
    resetDesign,
    previewUrl,
    isValidContent,
    validateContent,
  };
}

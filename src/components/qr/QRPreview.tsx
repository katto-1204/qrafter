import { QRDesign } from '@/lib/qr-utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmbedGenerator from './EmbedGenerator';
import DownloadModal from './DownloadModal';

interface QRPreviewProps {
  previewUrl: string;
  design: QRDesign;
  content: string;
}

export default function QRPreview({ previewUrl, design, content }: QRPreviewProps) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative glass p-4 rounded-xl shadow-2xl overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="QR Code Preview"
              className="w-64 h-64 rounded-lg"
            />
          ) : (
            <div className="w-64 h-64 rounded-lg bg-secondary flex items-center justify-center">
              <p className="text-muted-foreground text-sm text-center px-4">
                Enter content to generate your QR code
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center gap-3">
        <Button onClick={() => setIsDownloadOpen(true)} className="gradient-bg gap-2 group">
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          Export QR
        </Button>
        <EmbedGenerator previewUrl={previewUrl} />
      </div>

      <DownloadModal
        open={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        content={content}
        design={design}
      />

      {design.showLabel && design.labelText && (
        <motion.p
          className="text-lg font-semibold"
          style={{ color: design.labelColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {design.labelText}
        </motion.p>
      )}
    </div>
  );
}

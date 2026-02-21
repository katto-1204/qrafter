import { QRDesign } from '@/lib/qr-utils';
import { motion } from 'framer-motion';

interface QRPreviewProps {
  previewUrl: string;
  design: QRDesign;
}

export default function QRPreview({ previewUrl, design }: QRPreviewProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative glass-strong rounded-2xl p-8 animate-pulse-glow"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Generated QR Code"
            className="w-64 h-64 rounded-lg"
          />
        ) : (
          <div className="w-64 h-64 rounded-lg bg-secondary flex items-center justify-center">
            <p className="text-muted-foreground text-sm text-center px-4">
              Enter content to generate your QR code
            </p>
          </div>
        )}
      </motion.div>

      {design.showLabel && design.labelText && (
        <motion.p
          className="text-lg font-semibold"
          style={{ color: design.labelColor }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {design.labelText}
        </motion.p>
      )}
    </div>
  );
}

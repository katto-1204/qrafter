import { QRDesign } from '@/lib/qr-utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Download, RotateCcw, Code, QrCode, Sparkles } from 'lucide-react';
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
    <div className="flex flex-col items-center gap-6 w-full">
      {/* QR Code Display */}
      <div className="relative group w-full flex justify-center">
        {/* Glow Effect */}
        <div className="absolute -inset-4 gradient-bg rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
        
        {/* QR Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="p-5 bg-white rounded-2xl shadow-elevated border border-slate-100">
            {previewUrl ? (
              <motion.img
                key={previewUrl}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={previewUrl}
                alt="QR Code Preview"
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-xl"
              />
            ) : (
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-200">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <QrCode className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-muted-foreground text-sm text-center px-6 leading-relaxed">
                  Enter content to generate your QR code
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button 
          onClick={() => setIsDownloadOpen(true)} 
          disabled={!previewUrl}
          className="w-full sm:w-auto gradient-bg text-white font-semibold gap-2 group h-11 px-6 shadow-glow hover:shadow-glow-lg transition-all duration-300"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce-gentle" />
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

      {/* Label Display */}
      {design.showLabel && design.labelText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p
            className="text-lg font-semibold"
            style={{ color: design.labelColor }}
          >
            {design.labelText}
          </p>
        </motion.div>
      )}
    </div>
  );
}

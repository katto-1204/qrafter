import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileImage, FileText, Image, CheckCircle2, Sparkles } from 'lucide-react';
import { QRDesign, generateQRCanvas, downloadQR } from '@/lib/qr-utils';
import { motion } from 'framer-motion';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
  content: string;
  design: QRDesign;
}

const formats = [
  { id: 'png', label: 'PNG', icon: FileImage, desc: 'Best for web & social media', color: 'from-blue-500 to-cyan-500' },
  { id: 'jpg', label: 'JPG', icon: Image, desc: 'Smaller file size, compressed', color: 'from-emerald-500 to-teal-500' },
  { id: 'svg', label: 'SVG', icon: FileText, desc: 'Vector format, scalable', color: 'from-purple-500 to-violet-500' },
];

export default function DownloadModal({ open, onClose, content, design }: DownloadModalProps) {
  const handleDownload = async (format: string) => {
    try {
      const canvas = await generateQRCanvas(content, design, 800);
      downloadQR(canvas, format, design);
      onClose();
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-slate-200 sm:max-w-md p-0 overflow-hidden">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              <span className="gradient-text flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Download QR Code
              </span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-3">
          {formats.map(({ id, label, icon: Icon, desc, color }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Button
                variant="outline"
                onClick={() => handleDownload(id)}
                className="w-full flex items-center justify-start gap-4 h-auto py-4 px-4 border-slate-200 hover:bg-slate-50 hover:border-primary/30 transition-all rounded-xl group"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-foreground">{label}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </div>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            High resolution export at 800x800 pixels
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

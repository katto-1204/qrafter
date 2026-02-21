import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileImage, FileText, Image } from 'lucide-react';
import { QRDesign, generateQRCanvas, downloadQR } from '@/lib/qr-utils';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
  content: string;
  design: QRDesign;
}

const formats = [
  { id: 'png', label: 'PNG', icon: FileImage, desc: 'Best for web' },
  { id: 'jpg', label: 'JPG', icon: Image, desc: 'Compressed' },
  { id: 'svg', label: 'PDF/SVG', icon: FileText, desc: 'Print-ready (PNG fallback)' },
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
      <DialogContent className="glass-strong border-border/50 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="gradient-text">Download QR Code</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {formats.map(({ id, label, icon: Icon, desc }) => (
            <Button
              key={id}
              variant="outline"
              onClick={() => handleDownload(id)}
              className="flex items-center justify-start gap-3 h-auto py-4 border-border hover:bg-primary/10 hover:border-primary/30 transition-all"
            >
              <Icon className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
              <Download className="w-4 h-4 ml-auto text-muted-foreground" />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

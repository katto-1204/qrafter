import { useState } from 'react';
import { useQRCode } from '@/hooks/useQRCode';
import ContentTabs from '@/components/qr/ContentTabs';
import DesignPanel from '@/components/qr/DesignPanel';
import QRPreview from '@/components/qr/QRPreview';
import GitHubStarModal from '@/components/qr/GitHubStarModal';
import DownloadModal from '@/components/qr/DownloadModal';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Generator() {
  const { contentType, setContentType, content, setContent, design, updateDesign, resetDesign, previewUrl } = useQRCode();
  const [showGitHub, setShowGitHub] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const handleDownloadClick = () => {
    setShowGitHub(true);
  };

  const handleGitHubContinue = () => {
    setShowGitHub(false);
    setShowDownload(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold gradient-text">Qrafted</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetDesign}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadClick}
              disabled={!previewUrl}
              className="gradient-bg text-primary-foreground font-semibold hover:opacity-90"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8">
          {/* Left: Config */}
          <div className="space-y-8 order-2 lg:order-1">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-bg text-primary-foreground text-xs font-bold flex items-center justify-center">1</span>
                Choose Content
              </h2>
              <div className="glass rounded-xl p-6">
                <ContentTabs
                  contentType={contentType}
                  setContentType={setContentType}
                  setContent={setContent}
                />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-bg text-primary-foreground text-xs font-bold flex items-center justify-center">2</span>
                Design Your QR
              </h2>
              <div className="glass rounded-xl p-6">
                <DesignPanel design={design} updateDesign={updateDesign} />
              </div>
            </motion.section>
          </div>

          {/* Right: Preview */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="glass rounded-2xl p-8 flex flex-col items-center gap-6"
            >
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Live Preview</h3>
              <QRPreview previewUrl={previewUrl} design={design} />
              <Button
                onClick={handleDownloadClick}
                disabled={!previewUrl}
                className="w-full gradient-bg text-primary-foreground font-semibold hover:opacity-90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <GitHubStarModal
        open={showGitHub}
        onClose={() => setShowGitHub(false)}
        onContinue={handleGitHubContinue}
      />
      <DownloadModal
        open={showDownload}
        onClose={() => setShowDownload(false)}
        content={content}
        design={design}
      />
    </div>
  );
}

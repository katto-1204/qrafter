import { useState } from 'react';
import { useQRCode } from '@/hooks/useQRCode';
import ContentTabs from '@/components/qr/ContentTabs';
import DesignPanel from '@/components/qr/DesignPanel';
import QRPreview from '@/components/qr/QRPreview';
import GitHubStarModal from '@/components/qr/GitHubStarModal';
import DownloadModal from '@/components/qr/DownloadModal';
import LiveScanner from '@/components/qr/LiveScanner';
import BatchExport from '@/components/qr/BatchExport';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, Sparkles, ChevronRight, LayoutGrid, Scan, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export default function Generator() {
  const { contentType, setContentType, content, setContent, design, updateDesign, resetDesign, previewUrl, isValidContent, validateContent } = useQRCode();
  const [showGitHub, setShowGitHub] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const handleDownloadClick = () => {
    if (!isValidContent || !content.trim()) {
      toast({
        title: "⚠️ Link Required",
        description: "Please enter a link or content first before generating.",
        variant: "destructive",
      });
      return;
    }
    // Show the GitHub star modal first before allowing download
    setShowGitHub(true);
  };

  const handleGitHubContinue = () => {
    setShowGitHub(false);
    // Only show download modal if content is valid
    if (isValidContent && content.trim()) {
      setShowDownload(true);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="fixed inset-0 mesh-gradient opacity-40 pointer-events-none" />
      
      {/* Header */}
      <header className="glass border-b-0 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-secondary">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 gradient-bg rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-soft">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-lg font-bold text-foreground hidden sm:block">Qrafted</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <LiveScanner />
            <BatchExport design={design} />
            <div className="h-5 w-px bg-border mx-1 hidden sm:block" />
            <Button
              variant="ghost"
              size="sm"
              onClick={resetDesign}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Left Column: Steps 1 & 2 */}
          <div className="flex-1 space-y-10 max-w-3xl w-full">

            {/* Step 1: Content */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Choose Your Content</h2>
                  <p className="text-sm text-muted-foreground">Select what your QR code will link to</p>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <ContentTabs
                  contentType={contentType}
                  setContentType={setContentType}
                  setContent={setContent}
                />
              </div>
            </motion.section>

            {/* Step 2: Design */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Design Your QR</h2>
                  <p className="text-sm text-muted-foreground">Customize colors, shapes and style</p>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <DesignPanel design={design} updateDesign={updateDesign} validateContent={validateContent} content={content} />
              </div>
            </motion.section>

          </div>

          {/* Right Column: Step 3 Preview (Sticky) */}
          <div className="w-full lg:w-[380px] lg:sticky lg:top-24">
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Download</h2>
                  <p className="text-sm text-muted-foreground">Export your QR code</p>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col items-center gap-6">
                  <QRPreview
                    previewUrl={previewUrl}
                    design={design}
                    content={content}
                    isValidContent={isValidContent}
                    validateContent={validateContent}
                    onGenerateClick={handleDownloadClick}
                  />

                  <div className="w-full pt-6 border-t border-slate-100">
                    <Button
                      onClick={handleDownloadClick}
                      disabled={!isValidContent || !content.trim()}
                      className="w-full h-14 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-5 h-5" />
                      <span>Generate QR</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-700">Vector Ready</span>
                      <p className="text-[10px] text-slate-500">SVG format</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <Scan className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-700">High Res</span>
                      <p className="text-[10px] text-slate-500">1000px export</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
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

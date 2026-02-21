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
import { Download, RotateCcw, Sparkles, ChevronRight, LayoutGrid } from 'lucide-react';
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
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* Header */}
      <header className="border-b border-border/40 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">Qrafted</span>
          </Link>
          <div className="flex items-center gap-3">
            <LiveScanner />
            <BatchExport design={design} />
            <div className="h-6 w-px bg-slate-200 mx-1" />
            <Button
              variant="outline"
              size="sm"
              onClick={resetDesign}
              className="text-slate-600 hover:text-slate-900 border-slate-200"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left Column: Steps 1 & 2 */}
          <div className="flex-1 space-y-12 max-w-4xl">

            {/* Step 1: Content */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-xl z-10">1</div>
              <div className="absolute left-[15px] top-8 bottom-[-48px] w-0.5 bg-slate-100" />

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Complete the content</h2>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <ContentTabs
                    contentType={contentType}
                    setContentType={setContentType}
                    setContent={setContent}
                  />
                </div>
              </div>
            </motion.section>

            {/* Step 2: Design */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-xl z-10">2</div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Design your QR</h2>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                  <DesignPanel design={design} updateDesign={updateDesign} />
                </div>
              </div>
            </motion.section>

          </div>

          {/* Right Column: Step 3 Preview (Sticky) */}
          <div className="w-full lg:w-[400px] lg:sticky lg:top-28">
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative pl-12 lg:pl-0"
            >
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-xl z-10 lg:hidden">3</div>

              <div className="space-y-6">
                <div className="hidden lg:flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-xl">3</div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Download your QR</h2>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 flex flex-col items-center gap-8">
                  <QRPreview
                    previewUrl={previewUrl}
                    design={design}
                    content={content}
                  />

                  <div className="w-full pt-6 border-t border-slate-100">
                    <Button
                      onClick={handleDownloadClick}
                      disabled={!previewUrl}
                      className="w-full h-14 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group transition-all"
                    >
                      <span>Download QR</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Aesthetic Upgrade Pills */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">Vector Format</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">High Res</span>
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

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, Heart, Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface GitHubStarModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function GitHubStarModal({ open, onClose, onContinue }: GitHubStarModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-slate-200 sm:max-w-md p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative p-8 pb-6 text-center overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="relative mb-6"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-black flex items-center justify-center shadow-lg">
              <Star className="w-10 h-10 text-white fill-white/30" />
            </div>
          </motion.div>

          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold">
              <span className="text-foreground">Support Qrafted</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base">
              If you enjoy using Qrafted, please consider starring our repository!
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Action buttons */}
        <div className="p-6 pt-2 space-y-4">
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            href="https://github.com/katto-1204/qrafter.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl bg-black text-white font-semibold shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 group"
          >
            <Github className="w-5 h-5" />
            Star on GitHub
            <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              onClick={onContinue}
              className="w-full text-muted-foreground hover:text-foreground group"
            >
              Continue to download
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            Made with love for the open-source community
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

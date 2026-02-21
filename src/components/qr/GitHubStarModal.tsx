import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface GitHubStarModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function GitHubStarModal({ open, onClose, onContinue }: GitHubStarModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            <span className="gradient-text">Support Qrafted</span>
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            If you enjoy using Qrafted, please consider starring our GitHub repository!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Star className="w-16 h-16 text-primary fill-primary/20" />
          </motion.div>

          <a
            href="https://github.com/qrafted/qrafted"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            <Star className="w-5 h-5" />
            Star on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>

          <Button
            variant="ghost"
            onClick={onContinue}
            className="text-muted-foreground hover:text-foreground"
          >
            Continue to download →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

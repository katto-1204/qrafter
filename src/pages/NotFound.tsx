import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background elements */}
      <div className="fixed inset-0 mesh-gradient opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 max-w-md"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="mb-8"
        >
          <span className="text-[150px] sm:text-[180px] font-black gradient-text leading-none">
            404
          </span>
        </motion.div>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
          <Search className="w-8 h-8 text-slate-400" />
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button className="gradient-bg text-white font-semibold gap-2 shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 h-12 px-6">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link to="/generator">
            <Button variant="outline" className="border-slate-200 hover:bg-slate-50 gap-2 h-12 px-6">
              <Sparkles className="w-4 h-4" />
              Create QR Code
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-sm text-muted-foreground">Qrafted - Free QR Code Generator</p>
      </div>
    </div>
  );
};

export default NotFound;

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, QrCode, Palette, Download, Zap, Shield, Globe } from 'lucide-react';

const features = [
  { icon: QrCode, title: 'Multiple Formats', desc: 'URL, Text, Wi-Fi, Email, Social Media and more' },
  { icon: Palette, title: 'Full Customization', desc: 'Colors, shapes, labels, and error correction levels' },
  { icon: Download, title: 'Free Downloads', desc: 'PNG, JPG, and SVG exports at high resolution' },
  { icon: Zap, title: 'Instant Preview', desc: 'See changes in real-time as you design' },
  { icon: Shield, title: 'Error Correction', desc: 'Choose reliability levels for maximum scannability' },
  { icon: Globe, title: 'Social Presets', desc: 'Quick QR codes for all major social platforms' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <header className="border-b border-border/30 glass sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold gradient-text">Qrafted</span>
          </div>
          <Link to="/generator">
            <Button className="gradient-bg text-primary-foreground font-semibold hover:opacity-90">
              Create QR Code
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 lg:py-36">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              Free & Open Source QR Generator
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Craft Beautiful</span>
              <br />
              <span className="gradient-text">QR Codes</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Generate stunning, fully customizable QR codes for your website, Wi-Fi, social media, and more. No sign-up required.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/generator">
                <Button size="lg" className="gradient-bg text-primary-foreground font-semibold text-lg px-8 py-6 hover:opacity-90 hover:scale-105 transition-all">
                  <QrCode className="w-5 h-5 mr-2" />
                  Start Creating
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating QR illustration */}
          <motion.div
            className="mt-16 inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <div className="w-48 h-48 glass-strong rounded-2xl p-6 glow-border mx-auto">
              <QrCode className="w-full h-full text-primary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful features, zero cost.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 hover:glow-border transition-all group"
              >
                <f.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-border rounded-2xl p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Create?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start generating custom QR codes in seconds.
            </p>
            <Link to="/generator">
              <Button size="lg" className="gradient-bg text-primary-foreground font-semibold text-lg px-8 py-6 hover:opacity-90">
                Generate Your QR Code
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Qrafted. Free & Open Source QR Code Generator.</p>
        </div>
      </footer>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, QrCode, Palette, Download, Zap, Shield, Globe, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

const features = [
  { 
    icon: QrCode, 
    title: 'Multiple Formats', 
    desc: 'URL, Text, Wi-Fi, Email, Social Media and more',
    gradient: 'from-red-500 to-rose-600'
  },
  { 
    icon: Palette, 
    title: 'Full Customization', 
    desc: 'Colors, shapes, labels, and error correction levels',
    gradient: 'from-blue-500 to-indigo-600'
  },
  { 
    icon: Download, 
    title: 'Free Downloads', 
    desc: 'PNG, JPG, and SVG exports at high resolution',
    gradient: 'from-sky-500 to-blue-600'
  },
  { 
    icon: Zap, 
    title: 'Instant Preview', 
    desc: 'See changes in real-time as you design',
    gradient: 'from-rose-500 to-red-600'
  },
  { 
    icon: Shield, 
    title: 'Error Correction', 
    desc: 'Choose reliability levels for maximum scannability',
    gradient: 'from-indigo-500 to-blue-600'
  },
  { 
    icon: Globe, 
    title: 'Social Presets', 
    desc: 'Quick QR codes for all major social platforms',
    gradient: 'from-blue-600 to-sky-500'
  },
];

const stats = [
  { value: '100%', label: 'Free Forever' },
  { value: '6+', label: 'Content Types' },
  { value: 'HD', label: 'Export Quality' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background elements */}
      <div className="fixed inset-0 mesh-gradient opacity-60 pointer-events-none" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Nav */}
      <header className="glass sticky top-0 z-50 border-b-0">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 gradient-bg rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-soft">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-foreground">Qrafted</span>
          </Link>
          <Link to="/generator">
            <Button className="bg-black text-white font-semibold px-5 shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300">
              Create QR Code
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        {/* Glow effects */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium text-foreground mb-8 shadow-soft">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Free & Open Source QR Generator
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-balance">
                <span className="text-foreground">Create Beautiful</span>
                <br />
                <span className="gradient-text">QR Codes</span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Design stunning, fully customizable QR codes for your website, Wi-Fi, social media, and more. 
                No sign-up required, completely free.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link to="/generator">
                  <Button size="lg" className="bg-black text-white font-bold text-lg px-8 h-14 shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 group">
                    <QrCode className="w-5 h-5 mr-2" />
                    Start Creating
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 sm:gap-12">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating QR illustration */}
            <motion.div
              className="mt-16 inline-block"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <div className="relative">
                <div className="absolute -inset-4 gradient-bg rounded-3xl blur-2xl opacity-30" />
                <div className="relative w-56 h-56 glass-card rounded-3xl p-6 glow-border">
                  <QrCode className="w-full h-full text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Star className="w-3.5 h-3.5" />
              Features
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Powerful features to create professional QR codes, completely free.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-6 h-full card-hover">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 gradient-bg rounded-3xl blur-2xl opacity-20" />
            <div className="relative glass-card rounded-3xl p-12 lg:p-16 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <CheckCircle2 className="w-4 h-4" />
                No signup required
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Create Your QR Code?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                Start generating custom QR codes in seconds. It's free, fast, and beautiful.
              </p>
              <Link to="/generator">
                <Button size="lg" className="bg-black text-white font-bold text-lg px-10 h-14 shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 group">
                  Generate Your QR Code
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-foreground">Qrafted</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Free & Open Source QR Code Generator
          </p>
        </div>
      </footer>
    </div>
  );
}

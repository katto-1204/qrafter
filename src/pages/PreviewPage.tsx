import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Timer, Calendar, Clock, ArrowRight, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function PreviewPage() {
    const [searchParams] = useSearchParams();
    const dataHex = searchParams.get('d') || '';

    const [viewData, setViewData] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        try {
            if (dataHex) {
                setViewData(JSON.parse(atob(dataHex)));
            }
        } catch (e) {
            console.error('Failed to decode data', e);
        }
    }, [dataHex]);

    useEffect(() => {
        if (viewData?.type === 'countdown' && viewData.targetDate) {
            const timer = setInterval(() => {
                const now = new Date().getTime();
                const target = new Date(viewData.targetDate).getTime();
                const diff = target - now;

                if (diff > 0) {
                    setTimeLeft({
                        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((diff % (1000 * 60)) / 1000),
                    });
                } else {
                    clearInterval(timer);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [viewData]);

    if (!viewData) return null;

    return (
        <div className="min-h-screen bg-background flex flex-col items-center py-12 sm:py-20 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 mesh-gradient opacity-50 pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8 relative z-10"
            >
                {/* Header */}
                <div className="flex flex-col items-center gap-5 text-center">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.4 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full blur-xl opacity-40" />
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 p-[2px] shadow-lg">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                {viewData.type === 'countdown' ? (
                                    <Timer className="w-10 h-10 text-primary" />
                                ) : (
                                    <Layers className="w-10 h-10 text-primary" />
                                )}
                            </div>
                        </div>
                    </motion.div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                            {viewData.name || 'Qrafted Preview'}
                        </h1>
                        {viewData.type === 'countdown' && viewData.description && (
                            <p className="text-muted-foreground">{viewData.description}</p>
                        )}
                    </div>
                </div>

                {/* Content */}
                {viewData.type === 'countdown' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Countdown Grid */}
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.minutes },
                                { label: 'Sec', value: timeLeft.seconds },
                            ].map((unit, i) => (
                                <motion.div
                                    key={unit.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="glass-card p-4 rounded-2xl text-center"
                                >
                                    <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                                        {unit.value.toString().padStart(2, '0')}
                                    </div>
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                                        {unit.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Date info */}
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <p className="text-sm font-medium">
                                {new Date(viewData.targetDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <div className="space-y-3">
                        {(viewData.links || []).map((link: any, i: number) => (
                            <motion.a
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                href={link.url.startsWith('http') ? link.url : link.url.startsWith('www') ? `https://${link.url}` : `https://${link.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="glass-card rounded-xl p-5 flex items-center justify-between gap-4 card-hover group">
                                    <span className="font-semibold text-foreground">{link.title}</span>
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-8"
                >
                    <Link to="/generator">
                        <Button className="w-full h-12 bg-black text-white font-semibold shadow-lg hover:bg-gray-800 hover:scale-[1.01] transition-all duration-300 group">
                            Create Your Own QR Code
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-8 text-center"
                >
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <div className="w-5 h-5 rounded bg-black flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        Created with Qrafted
                    </Link>
                </motion.footer>
            </motion.div>
        </div>
    );
}

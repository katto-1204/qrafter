import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Timer, Calendar } from 'lucide-react';
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
        <div className="min-h-screen bg-background flex flex-col items-center py-16 px-4">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8 relative z-10 text-center"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full gradient-bg p-0.5 shadow-lg">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            {viewData.type === 'countdown' ? <Timer className="w-10 h-10 text-primary" /> : <Sparkles className="w-10 h-10 text-primary" />}
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold gradient-text">{viewData.name || 'Qrafted Preview'}</h1>
                </div>

                {viewData.type === 'countdown' ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.minutes },
                                { label: 'Sec', value: timeLeft.seconds },
                            ].map((unit, i) => (
                                <div key={i} className="glass-strong p-4 rounded-xl border border-border/50">
                                    <div className="text-2xl font-bold text-primary">{unit.value}</div>
                                    <div className="text-[10px] uppercase tracking-tighter text-muted-foreground">{unit.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <p className="text-sm font-medium">{new Date(viewData.targetDate).toLocaleDateString()}</p>
                        </div>
                        <p className="text-muted-foreground">{viewData.description}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {(viewData.links || []).map((link: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <a
                                    href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full py-8 text-lg glass-strong border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all group flex items-center justify-between px-8"
                                    >
                                        <span className="font-semibold">{link.title}</span>
                                        <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                )}

                <footer className="pt-12 text-sm text-muted-foreground">
                    <p>Created with Qrafted</p>
                </footer>
            </motion.div>
        </div>
    );
}

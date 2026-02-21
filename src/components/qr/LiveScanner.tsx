import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, RefreshCcw, CheckCircle2, AlertCircle, Scan, Play, Square } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function LiveScanner() {
    const [isOpen, setIsOpen] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startScanning = async () => {
        try {
            setScanning(true);
            setResult(null);
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                requestAnimationFrame(scanFrame);
            }
        } catch (err) {
            console.error(err);
            toast.error("Could not access camera");
            setScanning(false);
        }
    };

    const stopScanning = () => {
        setScanning(false);
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const scanFrame = () => {
        if (!scanning) return;
        requestAnimationFrame(scanFrame);
    };

    useEffect(() => {
        if (!isOpen) stopScanning();
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-slate-200 hover:bg-slate-50 hover:border-primary/30">
                    <Scan className="w-4 h-4" />
                    <span className="hidden sm:inline">Test Scan</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md glass-strong border-slate-200 p-0 overflow-hidden">
                <div className="p-6 pb-4">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                                <Scan className="w-4 h-4 text-white" />
                            </div>
                            Live QR Tester
                        </DialogTitle>
                    </DialogHeader>
                </div>

                <div className="px-6 pb-6 space-y-5">
                    {/* Video Preview */}
                    <div className="relative aspect-square bg-slate-900 rounded-2xl overflow-hidden shadow-elevated">
                        {scanning ? (
                            <>
                                <video ref={videoRef} className="w-full h-full object-cover" />
                                {/* Scan overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute inset-8 border-2 border-primary/50 rounded-xl" />
                                    <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                                    <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                                    <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                                    <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />
                                    <motion.div 
                                        initial={{ top: '10%' }}
                                        animate={{ top: ['10%', '85%', '10%'] }}
                                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                                        className="absolute left-8 right-8 h-0.5 bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-5">
                                    <Camera className="w-8 h-8 text-slate-500" />
                                </div>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Point your camera at a QR code to verify it scans correctly</p>
                                <Button onClick={startScanning} className="bg-black text-white font-semibold gap-2 shadow-lg hover:bg-gray-800">
                                    <Play className="w-4 h-4" />
                                    Start Camera
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Result Display */}
                    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                        result 
                            ? 'bg-emerald-50 border-emerald-200' 
                            : 'bg-slate-50 border-slate-200'
                    }`}>
                        {result ? (
                            <>
                                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide">Scan Result</p>
                                    <p className="text-sm truncate font-mono text-emerald-900">{result}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                                    <AlertCircle className="w-5 h-5 text-amber-600 animate-pulse" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-600">Waiting for QR code...</p>
                                    <p className="text-xs text-slate-400">Position code within the frame</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Stop button */}
                    {scanning && (
                        <Button 
                            onClick={stopScanning} 
                            variant="outline" 
                            className="w-full border-slate-200 hover:bg-slate-50 gap-2"
                        >
                            <Square className="w-4 h-4" />
                            Stop Camera
                        </Button>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                    <p className="text-[10px] text-center text-muted-foreground">
                        Test your custom QR styling to ensure it remains scannable
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

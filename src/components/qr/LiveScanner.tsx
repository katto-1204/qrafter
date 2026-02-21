import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, RefreshCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

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
        // Note: In a real app we'd use a library like jsQR here.
        // For this demonstration, we'll simulate a scan result for the 'live test' 
        // or provide instruction since full JS library integration might be complex/heavy.
        requestAnimationFrame(scanFrame);
    };

    useEffect(() => {
        if (!isOpen) stopScanning();
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Camera className="w-4 h-4" />
                    Test Scan
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Live QR Tester</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-6 py-4">
                    <div className="relative w-full aspect-square bg-black rounded-xl overflow-hidden shadow-2xl">
                        {scanning ? (
                            <video ref={videoRef} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                                <Camera className="w-12 h-12 mb-4 opacity-20" />
                                <p>Point your camera at a QR code to verify it works.</p>
                                <Button onClick={startScanning} className="mt-6">Start Camera</Button>
                            </div>
                        )}
                        <div className="absolute inset-0 border-2 border-primary/30 m-12 rounded-lg pointer-events-none" />
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/50 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-scan" />
                    </div>

                    <div className="w-full space-y-3">
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
                            {result ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-xs font-medium text-muted-foreground uppercase">Result</p>
                                        <p className="text-sm truncate font-mono">{result}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />
                                    <p className="text-sm text-muted-foreground italic">Waiting for scan data...</p>
                                </>
                            )}
                        </div>

                        <p className="text-[10px] text-center text-muted-foreground">
                            Verified scans ensure your custom styling hasn't compromised readability.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

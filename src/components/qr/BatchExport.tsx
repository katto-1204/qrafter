import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Files, Download, Plus, Trash2, CheckCircle2, Layers, Loader2 } from 'lucide-react';
import { QRDesign, generateQRCanvas, downloadQR } from '@/lib/qr-utils';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface BatchExportProps {
    design: QRDesign;
}

export default function BatchExport({ design }: BatchExportProps) {
    const [items, setItems] = useState<{ id: number; content: string }[]>([
        { id: 1, content: '' }
    ]);
    const [processing, setProcessing] = useState(false);

    const addItem = () => setItems([...items, { id: Date.now(), content: '' }]);
    const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));
    const updateItem = (id: number, content: string) =>
        setItems(items.map(i => i.id === id ? { ...i, content } : i));

    const handleBatchDownload = async () => {
        setProcessing(true);
        for (const item of items) {
            if (item.content) {
                const canvas = await generateQRCanvas(item.content, design, 1000);
                downloadQR(canvas, 'png', design);
            }
        }
        setProcessing(false);
    };

    const validItems = items.filter(i => i.content.trim()).length;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-slate-200 hover:bg-slate-50 hover:border-primary/30">
                    <Layers className="w-4 h-4" />
                    <span className="hidden sm:inline">Batch</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg glass-strong border-slate-200 p-0 overflow-hidden">
                <div className="p-6 pb-4">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                                <Files className="w-4 h-4 text-white" />
                            </div>
                            Batch QR Generation
                        </DialogTitle>
                    </DialogHeader>
                </div>

                <div className="px-6 pb-6 space-y-5">
                    {/* Items list */}
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                        <AnimatePresence mode="popLayout">
                            {items.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    layout
                                    className="flex gap-3 items-center group"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-500 shrink-0">
                                        {i + 1}
                                    </div>
                                    <Input
                                        value={item.content}
                                        onChange={(e) => updateItem(item.id, e.target.value)}
                                        placeholder="Enter URL or content..."
                                        className="flex-1 h-11 bg-slate-50 border-slate-200 focus:border-primary rounded-xl"
                                    />
                                    {items.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeItem(item.id)}
                                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-10 w-10 rounded-xl shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Add button */}
                    <Button
                        variant="outline"
                        onClick={addItem}
                        className="w-full h-12 border-dashed border-2 hover:bg-slate-50 flex gap-2 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Row
                    </Button>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${validItems > 0 ? 'text-emerald-500' : 'text-slate-300'}`} />
                        <p className="text-xs text-muted-foreground">
                            {validItems} item{validItems !== 1 ? 's' : ''} ready
                        </p>
                    </div>
                    <Button
                        onClick={handleBatchDownload}
                        disabled={processing || validItems === 0}
                        className="bg-black text-white font-semibold gap-2 shadow-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                Download All
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

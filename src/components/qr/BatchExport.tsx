import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Files, Download, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { QRDesign, generateQRCanvas, downloadQR } from '@/lib/qr-utils';
import { Input } from '@/components/ui/input';

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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Files className="w-4 h-4" />
                    Batch Export
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Batch QR Generation</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-2 items-start">
                                <Input
                                    value={item.content}
                                    onChange={(e) => updateItem(item.id, e.target.value)}
                                    placeholder="Enter URL or content..."
                                    className="bg-secondary flex-1"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeItem(item.id)}
                                    className="text-muted-foreground hover:text-destructive h-10 w-10 shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        onClick={addItem}
                        className="w-full border-dashed flex gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Row
                    </Button>

                    <div className="pt-4 border-t border-border flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                            Designs will use your current global styles.
                        </p>
                        <Button
                            onClick={handleBatchDownload}
                            disabled={processing || items.length === 0}
                            className="gradient-bg gap-2"
                        >
                            {processing ? "Generating..." : (
                                <>
                                    <Download className="w-4 h-4" />
                                    Download ZIP (Simulation)
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

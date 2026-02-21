import { QRDesign, colorPalettes } from '@/lib/qr-utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Palette, Shapes, Shield, Type, Sparkles, RotateCcw } from 'lucide-react';

interface DesignPanelProps {
  design: QRDesign;
  updateDesign: (updates: Partial<QRDesign>) => void;
}

export default function DesignPanel({ design, updateDesign }: DesignPanelProps) {
  return (
    <Tabs defaultValue="shape" className="w-full">
      <TabsList className="bg-secondary p-1 grid grid-cols-4 gap-1 h-12">
        <TabsTrigger value="frame" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">Frame</TabsTrigger>
        <TabsTrigger value="shape" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">Shape</TabsTrigger>
        <TabsTrigger value="logo" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">Logo</TabsTrigger>
        <TabsTrigger value="level" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">Level</TabsTrigger>
      </TabsList>

      <TabsContent value="frame" className="space-y-5 mt-6">
        <div className="p-8 border-2 border-dashed border-border rounded-xl text-center">
          <p className="text-muted-foreground text-sm">Frame customization options (Standard, Phone, Scan-to-pay) coming soon.</p>
        </div>
      </TabsContent>

      <TabsContent value="shape" className="space-y-6 mt-6">
        <div className="space-y-4">
          <Label className="text-sm font-bold">Shape style</Label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {(['square', 'rounded', 'dots', 'diamond', 'glitch', 'stripe'] as const).map(style => (
              <button
                key={style}
                onClick={() => updateDesign({ dotStyle: style })}
                className={`aspect-square rounded-lg border-2 flex items-center justify-center p-2 transition-all ${design.dotStyle === style ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-secondary hover:border-muted-foreground'
                  }`}
              >
                <div className="w-full h-full bg-foreground rounded-sm" style={{
                  clipPath: style === 'dots' ? 'circle(50%)' :
                    style === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                      style === 'rounded' ? 'inset(0 round 20%)' : 'none'
                }} />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Border colour</Label>
              <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-lg border border-border">
                <input type="color" className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer" value={design.fgColor} onChange={e => updateDesign({ fgColor: e.target.value })} />
                <span className="text-xs font-mono">{design.fgColor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Background colour</Label>
              <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-lg border border-border">
                <input type="color" className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer" value={design.bgColor} onChange={e => updateDesign({ bgColor: e.target.value })} />
                <span className="text-xs font-mono">{design.bgColor}</span>
                <Button variant="ghost" size="sm" className="ml-auto h-7 text-[10px] gap-1 px-2" onClick={() => updateDesign({ fgColor: design.bgColor, bgColor: design.fgColor })}>
                  <RotateCcw className="w-3 h-3" /> Invert
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <Label className="text-sm font-bold">Border style</Label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {(['square', 'rounded', 'circle', 'leaf', 'diamond'] as const).map(style => (
              <button
                key={style}
                onClick={() => updateDesign({ eyeFrameStyle: style })}
                className={`aspect-square rounded-lg border-2 flex items-center justify-center p-2 transition-all ${design.eyeFrameStyle === style ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-secondary hover:border-muted-foreground'
                  }`}
              >
                <div className="w-full h-full border-2 border-foreground bg-transparent" style={{
                  borderRadius: style === 'circle' ? '50%' :
                    style === 'rounded' ? '25%' :
                      style === 'leaf' ? '0 50% 0 50%' : '0'
                }} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <Label className="text-sm font-bold">Center style</Label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {(['square', 'rounded', 'circle', 'leaf', 'diamond', 'star'] as const).map(style => (
              <button
                key={style}
                onClick={() => updateDesign({ eyeBallStyle: style })}
                className={`aspect-square rounded-lg border-2 flex items-center justify-center p-2 transition-all ${design.eyeBallStyle === style ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-secondary hover:border-muted-foreground'
                  }`}
              >
                <div className="w-full h-full bg-foreground" style={{
                  borderRadius: style === 'circle' ? '50%' :
                    style === 'rounded' ? '25%' :
                      style === 'leaf' ? '0 50% 0 50%' : '0'
                }} />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Eye Frame Color</Label>
              <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-lg border border-border">
                <input type="color" className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer" value={design.eyeFrameColor || design.fgColor} onChange={e => updateDesign({ eyeFrameColor: e.target.value })} />
                <span className="text-xs font-mono">{design.eyeFrameColor || design.fgColor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Eye Ball Color</Label>
              <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-lg border border-border">
                <input type="color" className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer" value={design.eyeBallColor || design.fgColor} onChange={e => updateDesign({ eyeBallColor: e.target.value })} />
                <span className="text-xs font-mono">{design.eyeBallColor || design.fgColor}</span>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="logo" className="space-y-5 mt-6">
        <div className="p-8 border-2 border-dashed border-border rounded-xl text-center">
          <p className="text-muted-foreground text-sm">Logo upload and placement coming soon.</p>
        </div>
      </TabsContent>

      <TabsContent value="level" className="space-y-6 mt-6">
        <div className="space-y-4">
          <Label className="text-sm font-bold">Error Correction Level</Label>
          <div className="grid grid-cols-2 gap-3">
            {([
              { level: 'L' as const, desc: '7% recovery', label: 'Low' },
              { level: 'M' as const, desc: '15% recovery', label: 'Medium' },
              { level: 'Q' as const, desc: '25% recovery', label: 'Quartile' },
              { level: 'H' as const, desc: '30% recovery', label: 'High' },
            ]).map(({ level, desc, label }) => (
              <button
                key={level}
                onClick={() => updateDesign({ errorCorrectionLevel: level })}
                className={`p-4 rounded-xl text-left transition-all border-2 ${design.errorCorrectionLevel === level ? 'border-primary bg-primary/5 ring-2 ring-primary/10' : 'border-secondary hover:border-muted-foreground'
                  }`}
              >
                <div className="font-bold text-sm">Level {level} ({label})</div>
                <div className="text-[10px] text-muted-foreground mt-1">{desc}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Higher correction levels ensure scannability even with damage or logos, but increase code density.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

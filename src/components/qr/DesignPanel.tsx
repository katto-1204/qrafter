import { QRDesign, colorPalettes } from '@/lib/qr-utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Palette, Shapes, Shield, Type, Sparkles, RotateCcw, Frame, Image, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface DesignPanelProps {
  design: QRDesign;
  updateDesign: (updates: Partial<QRDesign>) => void;
}

export default function DesignPanel({ design, updateDesign }: DesignPanelProps) {
  return (
    <Tabs defaultValue="shape" className="w-full">
      <TabsList className="w-full bg-slate-100 p-1.5 rounded-xl grid grid-cols-4 gap-1 h-auto">
        <TabsTrigger 
          value="frame" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-soft rounded-lg py-2.5 text-sm font-medium transition-all"
        >
          <Frame className="w-4 h-4 mr-1.5" />
          Frame
        </TabsTrigger>
        <TabsTrigger 
          value="shape" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-soft rounded-lg py-2.5 text-sm font-medium transition-all"
        >
          <Shapes className="w-4 h-4 mr-1.5" />
          Shape
        </TabsTrigger>
        <TabsTrigger 
          value="logo" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-soft rounded-lg py-2.5 text-sm font-medium transition-all"
        >
          <Image className="w-4 h-4 mr-1.5" />
          Logo
        </TabsTrigger>
        <TabsTrigger 
          value="level" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-soft rounded-lg py-2.5 text-sm font-medium transition-all"
        >
          <Shield className="w-4 h-4 mr-1.5" />
          Level
        </TabsTrigger>
      </TabsList>

      <TabsContent value="frame" className="space-y-5 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Frame className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-muted-foreground text-sm font-medium">Frame customization coming soon</p>
          <p className="text-muted-foreground text-xs mt-1">Standard, Phone, Scan-to-pay frames</p>
        </motion.div>
      </TabsContent>

      <TabsContent value="shape" className="space-y-8 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Shapes className="w-4 h-4 text-muted-foreground" />
            Dot Style
          </Label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(['square', 'rounded', 'dots', 'diamond', 'glitch', 'stripe'] as const).map(style => (
              <button
                key={style}
                onClick={() => updateDesign({ dotStyle: style })}
                className={`relative aspect-square rounded-xl border-2 flex items-center justify-center p-3 transition-all duration-200 group ${
                  design.dotStyle === style 
                    ? 'border-primary bg-primary/5 shadow-soft' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-full h-full bg-foreground rounded-sm transition-transform group-hover:scale-110" style={{
                  clipPath: style === 'dots' ? 'circle(50%)' :
                    style === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                      style === 'rounded' ? 'inset(0 round 20%)' : 'none'
                }} />
                {design.dotStyle === style && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground">Foreground Color</Label>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="relative">
                  <input 
                    type="color" 
                    className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer overflow-hidden" 
                    value={design.fgColor} 
                    onChange={e => updateDesign({ fgColor: e.target.value })} 
                  />
                </div>
                <span className="text-sm font-mono text-muted-foreground flex-1">{design.fgColor}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground">Background Color</Label>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="relative">
                  <input 
                    type="color" 
                    className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer overflow-hidden" 
                    value={design.bgColor} 
                    onChange={e => updateDesign({ bgColor: e.target.value })} 
                  />
                </div>
                <span className="text-sm font-mono text-muted-foreground flex-1">{design.bgColor}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs gap-1.5 px-2 hover:bg-white" 
                  onClick={() => updateDesign({ fgColor: design.bgColor, bgColor: design.fgColor })}
                >
                  <RotateCcw className="w-3 h-3" /> Swap
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 pt-6 border-t border-slate-100"
        >
          <Label className="text-sm font-semibold text-foreground">Corner Frame Style</Label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {(['square', 'rounded', 'circle', 'leaf', 'diamond'] as const).map(style => (
              <button
                key={style}
                onClick={() => updateDesign({ eyeFrameStyle: style })}
                className={`relative aspect-square rounded-xl border-2 flex items-center justify-center p-3 transition-all duration-200 group ${
                  design.eyeFrameStyle === style 
                    ? 'border-primary bg-primary/5 shadow-soft' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-full h-full border-2 border-foreground bg-transparent transition-transform group-hover:scale-110" style={{
                  borderRadius: style === 'circle' ? '50%' :
                    style === 'rounded' ? '25%' :
                      style === 'leaf' ? '0 50% 0 50%' : '0'
                }} />
                {design.eyeFrameStyle === style && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 pt-6 border-t border-slate-100"
        >
          <Label className="text-sm font-semibold text-foreground">Corner Center Style</Label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(['square', 'rounded', 'circle', 'leaf', 'diamond', 'star'] as const).map(style => (
              <button
                key={style}
                onClick={() => updateDesign({ eyeBallStyle: style })}
                className={`relative aspect-square rounded-xl border-2 flex items-center justify-center p-3 transition-all duration-200 group ${
                  design.eyeBallStyle === style 
                    ? 'border-primary bg-primary/5 shadow-soft' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-full h-full bg-foreground transition-transform group-hover:scale-110" style={{
                  borderRadius: style === 'circle' ? '50%' :
                    style === 'rounded' ? '25%' :
                      style === 'leaf' ? '0 50% 0 50%' : '0'
                }} />
                {design.eyeBallStyle === style && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground">Corner Frame Color</Label>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input 
                  type="color" 
                  className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer overflow-hidden" 
                  value={design.eyeFrameColor || design.fgColor} 
                  onChange={e => updateDesign({ eyeFrameColor: e.target.value })} 
                />
                <span className="text-sm font-mono text-muted-foreground">{design.eyeFrameColor || design.fgColor}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground">Corner Center Color</Label>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input 
                  type="color" 
                  className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer overflow-hidden" 
                  value={design.eyeBallColor || design.fgColor} 
                  onChange={e => updateDesign({ eyeBallColor: e.target.value })} 
                />
                <span className="text-sm font-mono text-muted-foreground">{design.eyeBallColor || design.fgColor}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </TabsContent>

      <TabsContent value="logo" className="space-y-5 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Image className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-muted-foreground text-sm font-medium">Logo upload coming soon</p>
          <p className="text-muted-foreground text-xs mt-1">Add your brand logo to the center</p>
        </motion.div>
      </TabsContent>

      <TabsContent value="level" className="space-y-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <Label className="text-sm font-semibold text-foreground">Error Correction Level</Label>
            <div className="group relative">
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Higher levels allow more damage tolerance
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {([
              { level: 'L' as const, desc: '7% recovery', label: 'Low', color: 'bg-blue-500' },
              { level: 'M' as const, desc: '15% recovery', label: 'Medium', color: 'bg-emerald-500' },
              { level: 'Q' as const, desc: '25% recovery', label: 'Quartile', color: 'bg-amber-500' },
              { level: 'H' as const, desc: '30% recovery', label: 'High', color: 'bg-rose-500' },
            ]).map(({ level, desc, label, color }) => (
              <button
                key={level}
                onClick={() => updateDesign({ errorCorrectionLevel: level })}
                className={`relative p-5 rounded-xl text-left transition-all duration-200 border-2 ${
                  design.errorCorrectionLevel === level 
                    ? 'border-primary bg-primary/5 shadow-soft' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white font-bold text-sm`}>
                    {level}
                  </div>
                  <div className="font-semibold text-foreground">{label}</div>
                </div>
                <div className="text-xs text-muted-foreground">{desc}</div>
                {design.errorCorrectionLevel === level && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Higher correction levels ensure scannability even with damage or logos, but increase code density and complexity.
            </p>
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}

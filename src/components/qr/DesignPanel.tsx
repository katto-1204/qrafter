import { QRDesign, colorPalettes, QRFrameStyle } from '@/lib/qr-utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Palette, Shapes, Shield, Type, Sparkles, RotateCcw, Frame, Image, CheckCircle2, Info, Upload, Trash2, Smartphone, Circle, Square, RectangleHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface DesignPanelProps {
  design: QRDesign;
  updateDesign: (updates: Partial<QRDesign>) => void;
  validateContent?: (content: string) => boolean;
  content?: string;
}

export default function DesignPanel({ design, updateDesign, validateContent, content }: DesignPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateDesign({ logoUrl: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateDesign({ logoUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDesignUpdate = (updates: Partial<QRDesign>) => {
    // Check if content is valid before updating design
    if (content && validateContent && !validateContent(content)) {
      toast({
        title: "⚠️ Link Required",
        description: "Please enter a link or content first before changing design elements.",
        variant: "destructive",
      });
      return;
    }
    updateDesign(updates);
  };

  const frameStyles: { id: QRFrameStyle; label: string; icon: React.ElementType }[] = [
    { id: 'none', label: 'None', icon: Square },
    { id: 'simple', label: 'Simple', icon: RectangleHorizontal },
    { id: 'rounded', label: 'Rounded', icon: RectangleHorizontal },
    { id: 'badge', label: 'Badge', icon: RectangleHorizontal },
    { id: 'phone', label: 'Phone', icon: Smartphone },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'business', label: 'Business', icon: RectangleHorizontal },
    { id: 'social', label: 'Social', icon: RectangleHorizontal },
    { id: 'scan', label: 'Scan Pay', icon: RectangleHorizontal },
    { id: 'gift', label: 'Gift', icon: RectangleHorizontal },
  ];

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

      <TabsContent value="frame" className="space-y-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Frame className="w-4 h-4 text-muted-foreground" />
            Frame Style
          </Label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {frameStyles.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleDesignUpdate({ frameStyle: id })}
                className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-2 transition-all duration-200 group ${
                  design.frameStyle === id
                    ? 'border-primary bg-primary/5 shadow-soft'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <Icon className="w-5 h-5 mb-1 text-foreground" />
                <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
                {design.frameStyle === id && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {design.frameStyle !== 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-6 border-t border-slate-100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-3">
                <Label className="text-xs font-medium text-muted-foreground">Frame Color</Label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input
                    type="color"
                    className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer overflow-hidden"
                    value={design.frameColor}
                    onChange={e => handleDesignUpdate({ frameColor: e.target.value })}
                  />
                  <span className="text-sm font-mono text-muted-foreground">{design.frameColor}</span>
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-medium text-muted-foreground">Accent Color</Label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input
                    type="color"
                    className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer overflow-hidden"
                    value={design.frameAccentColor}
                    onChange={e => handleDesignUpdate({ frameAccentColor: e.target.value })}
                  />
                  <span className="text-sm font-mono text-muted-foreground">{design.frameAccentColor}</span>
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-medium text-muted-foreground">Frame Text</Label>
                <Input
                  value={design.frameText}
                  onChange={e => handleDesignUpdate({ frameText: e.target.value })}
                  placeholder="SCAN ME"
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        )}
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
                onClick={() => handleDesignUpdate({ dotStyle: style })}
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
                    onChange={e => handleDesignUpdate({ fgColor: e.target.value })} 
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
                    onChange={e => handleDesignUpdate({ bgColor: e.target.value })} 
                  />
                </div>
                <span className="text-sm font-mono text-muted-foreground flex-1">{design.bgColor}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs gap-1.5 px-2 hover:bg-white" 
                  onClick={() => handleDesignUpdate({ fgColor: design.bgColor, bgColor: design.fgColor })}
                >
                  <RotateCcw className="w-3 h-3" /> Swap
                </Button>
              </div>
            </div>
          </div>

          {/* Gradient Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 pt-6 border-t border-slate-100"
          >
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                Gradient Effect
              </Label>
              <Switch
                checked={design.gradientEnabled}
                onCheckedChange={v => handleDesignUpdate({ gradientEnabled: v })}
              />
            </div>
            
            {design.gradientEnabled && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-xs font-medium text-muted-foreground">Gradient Type</Label>
                    <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                      <button
                        onClick={() => handleDesignUpdate({ gradientType: 'linear' })}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                          design.gradientType === 'linear'
                            ? 'bg-white text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Linear
                      </button>
                      <button
                        onClick={() => handleDesignUpdate({ gradientType: 'radial' })}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                          design.gradientType === 'radial'
                            ? 'bg-white text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Radial
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-xs font-medium text-muted-foreground">Gradient Color</Label>
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <input
                        type="color"
                        className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer overflow-hidden"
                        value={design.gradientColor}
                        onChange={e => handleDesignUpdate({ gradientColor: e.target.value })}
                      />
                      <span className="text-sm font-mono text-muted-foreground flex-1">{design.gradientColor}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                  <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Gradient effect will be applied to the QR code dots. The primary color blends into the gradient color.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
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
                onClick={() => handleDesignUpdate({ eyeFrameStyle: style })}
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
                onClick={() => handleDesignUpdate({ eyeBallStyle: style })}
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
                  onChange={e => handleDesignUpdate({ eyeFrameColor: e.target.value })} 
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
                  onChange={e => handleDesignUpdate({ eyeBallColor: e.target.value })} 
                />
                <span className="text-sm font-mono text-muted-foreground">{design.eyeBallColor || design.fgColor}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </TabsContent>

      <TabsContent value="logo" className="space-y-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Image className="w-4 h-4 text-muted-foreground" />
            Center Logo
          </Label>
          
          {design.logoUrl ? (
            <div className="space-y-4">
              <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center">
                <img
                  src={design.logoUrl}
                  alt="Logo preview"
                  className="w-24 h-24 object-contain rounded-xl"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={removeLogo}
                  className="absolute top-3 right-3 h-8 w-8 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-medium text-muted-foreground">Logo Size: {design.logoSize}px</Label>
                <Slider
                  value={[design.logoSize]}
                  onValueChange={([v]) => handleDesignUpdate({ logoSize: v })}
                  min={30}
                  max={120}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50 cursor-pointer hover:bg-slate-100/50 hover:border-slate-300 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-foreground text-sm font-medium">Click to upload logo</p>
              <p className="text-muted-foreground text-xs mt-1">PNG, JPG, SVG up to 2MB</p>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              For best results, use error correction level "High" when adding a logo. This ensures your QR remains scannable.
            </p>
          </div>
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
                onClick={() => handleDesignUpdate({ errorCorrectionLevel: level })}
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

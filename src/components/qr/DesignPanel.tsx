import { QRDesign, colorPalettes } from '@/lib/qr-utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Shapes, Shield, Type, Sparkles } from 'lucide-react';

interface DesignPanelProps {
  design: QRDesign;
  updateDesign: (updates: Partial<QRDesign>) => void;
}

const presetColors = [
  '#1e40af', '#3b82f6', '#7c3aed', '#ec4899', '#f97316',
  '#eab308', '#10b981', '#06b6d4', '#000000', '#ffffff',
];

export default function DesignPanel({ design, updateDesign }: DesignPanelProps) {
  return (
    <Tabs defaultValue="palette" className="w-full">
      <TabsList className="w-full bg-secondary grid grid-cols-5 h-auto p-1">
        <TabsTrigger value="palette" className="flex items-center gap-1.5 text-xs py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          <Sparkles className="w-3.5 h-3.5" /> Presets
        </TabsTrigger>
        <TabsTrigger value="color" className="flex items-center gap-1.5 text-xs py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          <Palette className="w-3.5 h-3.5" /> Color
        </TabsTrigger>
        <TabsTrigger value="shape" className="flex items-center gap-1.5 text-xs py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          <Shapes className="w-3.5 h-3.5" /> Shape
        </TabsTrigger>
        <TabsTrigger value="level" className="flex items-center gap-1.5 text-xs py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          <Shield className="w-3.5 h-3.5" /> Level
        </TabsTrigger>
        <TabsTrigger value="text" className="flex items-center gap-1.5 text-xs py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          <Type className="w-3.5 h-3.5" /> Text
        </TabsTrigger>
      </TabsList>

      {/* Palette Presets */}
      <TabsContent value="palette" className="space-y-4 mt-4">
        <Label className="text-muted-foreground text-sm">Color Palette Presets</Label>
        <div className="grid grid-cols-2 gap-2">
          {colorPalettes.map(palette => (
            <button
              key={palette.name}
              onClick={() => updateDesign({ fgColor: palette.fg, bgColor: palette.bg, labelColor: palette.label })}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${design.fgColor === palette.fg && design.bgColor === palette.bg
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border hover:border-muted-foreground bg-card'
                }`}
            >
              <div className="flex gap-1">
                <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: palette.fg }} />
                <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: palette.bg }} />
              </div>
              <span className="text-sm font-medium text-foreground">{palette.name}</span>
            </button>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="color" className="space-y-5 mt-4">
        <div className="space-y-3">
          <Label className="text-muted-foreground text-sm">QR Foreground</Label>
          <div className="flex flex-wrap gap-2">
            {presetColors.map(color => (
              <button
                key={color}
                onClick={() => updateDesign({ fgColor: color })}
                className={`w-8 h-8 rounded-lg border-2 transition-all ${design.fgColor === color ? 'border-primary scale-110 shadow-md' : 'border-border hover:border-muted-foreground'
                  }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={design.fgColor}
              onChange={e => updateDesign({ fgColor: e.target.value })}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <Input
              value={design.fgColor}
              onChange={e => updateDesign({ fgColor: e.target.value })}
              className="bg-secondary border-border font-mono text-sm"
            />
          </div>
        </div>

        {/* Gradient Section */}
        <div className="space-y-4 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Label className="text-muted-foreground text-sm">Gradient Fill</Label>
            <Switch
              checked={design.gradientEnabled}
              onCheckedChange={v => updateDesign({ gradientEnabled: v })}
            />
          </div>
          {design.gradientEnabled && (
            <div className="space-y-3 pl-4 border-l-2 border-primary/30">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider">Secondary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={design.gradientColor}
                  onChange={e => updateDesign({ gradientColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <Input
                  value={design.gradientColor}
                  onChange={e => updateDesign({ gradientColor: e.target.value })}
                  className="bg-secondary border-border font-mono text-xs h-8"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateDesign({ gradientType: 'linear' })}
                  className={`flex-1 py-1 px-2 rounded text-xs transition-all ${design.gradientType === 'linear' ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-secondary text-muted-foreground'}`}
                >
                  Linear
                </button>
                <button
                  onClick={() => updateDesign({ gradientType: 'radial' })}
                  className={`flex-1 py-1 px-2 rounded text-xs transition-all ${design.gradientType === 'radial' ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-secondary text-muted-foreground'}`}
                >
                  Radial
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t border-border/50">
          <Label className="text-muted-foreground text-sm">Background Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={design.bgColor}
              onChange={e => updateDesign({ bgColor: e.target.value })}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <Input
              value={design.bgColor}
              onChange={e => updateDesign({ bgColor: e.target.value })}
              className="bg-secondary border-border font-mono text-sm"
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shape" className="space-y-5 mt-4">
        <div className="space-y-3">
          <Label className="text-muted-foreground text-sm">Module Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {(['square', 'rounded', 'dots', 'diamond'] as const).map(style => (
              <button
                key={style}
                onClick={() => updateDesign({ dotStyle: style })}
                className={`p-3 rounded-lg text-sm font-medium capitalize transition-all border ${design.dotStyle === style
                  ? 'bg-primary/20 text-primary border-primary/40 shadow-inner'
                  : 'bg-secondary text-muted-foreground border-transparent hover:border-border'
                  }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Effects Section */}
        <div className="space-y-4 pt-2 border-t border-border/50">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Clipping Mask</Label>
            <div className="grid grid-cols-4 gap-2">
              {(['none', 'circle', 'heart', 'star'] as const).map(shape => (
                <button
                  key={shape}
                  onClick={() => updateDesign({ maskShape: shape })}
                  className={`p-2 rounded-lg text-[10px] font-medium capitalize transition-all border ${design.maskShape === shape
                      ? 'bg-primary/20 text-primary border-primary/40 shadow-inner'
                      : 'bg-secondary text-muted-foreground border-transparent hover:border-border'
                    }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Shadow Effect</Label>
              <p className="text-[10px] text-muted-foreground">Adds depth to modules</p>
            </div>
            <Switch
              checked={design.shadowEnabled}
              onCheckedChange={v => updateDesign({ shadowEnabled: v, glowEnabled: v ? false : design.glowEnabled })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Glow Effect</Label>
              <p className="text-[10px] text-muted-foreground">Outer luminescence</p>
            </div>
            <Switch
              checked={design.glowEnabled}
              onCheckedChange={v => updateDesign({ glowEnabled: v, shadowEnabled: v ? false : design.shadowEnabled })}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="level" className="space-y-5 mt-4">
        <div className="space-y-3">
          <Label className="text-muted-foreground text-sm">Error Correction Level</Label>
          <div className="grid grid-cols-2 gap-2">
            {([
              { level: 'L' as const, desc: '7% recovery' },
              { level: 'M' as const, desc: '15% recovery' },
              { level: 'Q' as const, desc: '25% recovery' },
              { level: 'H' as const, desc: '30% recovery' },
            ]).map(({ level, desc }) => (
              <button
                key={level}
                onClick={() => updateDesign({ errorCorrectionLevel: level })}
                className={`p-3 rounded-lg text-left transition-all ${design.errorCorrectionLevel === level
                  ? 'bg-primary/20 text-primary glow-border'
                  : 'bg-secondary text-muted-foreground hover:bg-surface-hover'
                  }`}
              >
                <div className="font-semibold text-sm">Level {level}</div>
                <div className="text-xs opacity-70">{desc}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Higher levels allow more damage before the QR becomes unreadable. Use H if adding a logo.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="text" className="space-y-5 mt-4">
        <div className="flex items-center justify-between">
          <Label className="text-muted-foreground text-sm">Show Label</Label>
          <Switch
            checked={design.showLabel}
            onCheckedChange={v => updateDesign({ showLabel: v })}
          />
        </div>
        {design.showLabel && (
          <>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Label Text</Label>
              <Input
                value={design.labelText}
                onChange={e => updateDesign({ labelText: e.target.value })}
                placeholder="Scan Me!"
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">Label Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={design.labelColor}
                  onChange={e => updateDesign({ labelColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <Input
                  value={design.labelColor}
                  onChange={e => updateDesign({ labelColor: e.target.value })}
                  className="bg-secondary border-border font-mono text-sm"
                />
              </div>
            </div>
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}

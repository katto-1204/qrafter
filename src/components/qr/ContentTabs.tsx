import { QRContentType, socialPlatforms, buildWifiString, buildEmailString, buildSmsString, buildCallString } from '@/lib/qr-utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Globe, Type, Wifi, Mail, MessageSquare, Phone, Share2, Layers, Plus, Trash2, GripVertical, Link2, AtSign, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const contentTypes: { id: QRContentType; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'url', label: 'Website', icon: Globe, color: 'from-red-500 to-red-600' },
  { id: 'text', label: 'Text', icon: Type, color: 'from-slate-600 to-gray-700' },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi, color: 'from-yellow-500 to-amber-600' },
  { id: 'email', label: 'Email', icon: Mail, color: 'from-orange-500 to-red-500' },
  { id: 'social', label: 'Social', icon: Share2, color: 'from-amber-500 to-yellow-500' },
  { id: 'multilink', label: 'Multi-Link', icon: Layers, color: 'from-red-600 to-orange-500' },
];

interface ContentTabsProps {
  contentType: QRContentType;
  setContentType: (type: QRContentType) => void;
  setContent: (content: string) => void;
}

export default function ContentTabs({ contentType, setContentType, setContent }: ContentTabsProps) {
  const [url, setUrl] = useState('https://');
  const [text, setText] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiEnc, setWifiEnc] = useState('WPA');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubj, setEmailSubj] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [socialPlatform, setSocialPlatform] = useState(socialPlatforms[0].id);
  const [socialHandle, setSocialHandle] = useState('');

  // Multilink state
  const [multiLinks, setMultiLinks] = useState<{ title: string; url: string }[]>([
    { title: 'My Website', url: 'https://' }
  ]);
  const [multiName, setMultiName] = useState('My Links');

  const updateContent = (type?: QRContentType) => {
    const t = type || contentType;
    switch (t) {
      case 'url': setContent(url); break;
      case 'text': setContent(text); break;
      case 'wifi': setContent(buildWifiString(wifiSsid, wifiPass, wifiEnc)); break;
      case 'email': setContent(buildEmailString(emailTo, emailSubj, emailBody)); break;
      case 'social': {
        const p = socialPlatforms.find(s => s.id === socialPlatform);
        setContent((p?.prefix || '') + socialHandle);
        break;
      }
      case 'multilink': {
        const data = { type: 'multilink', name: multiName, links: multiLinks };
        const encoded = btoa(JSON.stringify(data));
        const host = window.location.origin;
        setContent(`${host}/view?d=${encoded}`);
        break;
      }
      case 'countdown': {
        const data = { type: 'countdown', name: multiName, targetDate: text, description: socialHandle };
        const encoded = btoa(JSON.stringify(data));
        const host = window.location.origin;
        setContent(`${host}/view?d=${encoded}`);
        break;
      }
    }
  };

  useEffect(() => {
    updateContent();
  }, [url, text, wifiSsid, wifiPass, wifiEnc, emailTo, emailSubj, emailBody, socialPlatform, socialHandle, multiLinks, multiName, contentType]);

  const handleTypeChange = (type: QRContentType) => {
    setContentType(type);
  };

  const addLink = () => {
    setMultiLinks([...multiLinks, { title: '', url: 'https://' }]);
  };

  const removeLink = (index: number) => {
    const fresh = [...multiLinks];
    fresh.splice(index, 1);
    setMultiLinks(fresh);
  };

  const updateLink = (index: number, updates: { title?: string; url?: string }) => {
    const fresh = [...multiLinks];
    if (updates.url) {
      // Auto-add https:// if not present and doesn't start with www
      if (!updates.url.startsWith('http') && !updates.url.startsWith('www') && updates.url.trim() !== '') {
        updates.url = `https://${updates.url}`;
      }
    }
    fresh[index] = { ...fresh[index], ...updates };
    setMultiLinks(fresh);
  };

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div className="flex flex-wrap gap-2">
        {contentTypes.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => handleTypeChange(id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              contentType === id
                ? 'bg-white text-foreground shadow-soft border border-slate-200'
                : 'bg-slate-50 text-muted-foreground hover:bg-slate-100 border border-transparent'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
              <Icon className="w-3.5 h-3.5 text-white" />
            </div>
            {label}
            {contentType === id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl border-2 border-primary/30"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content inputs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={contentType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {contentType === 'url' && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Link2 className="w-4 h-4 text-muted-foreground" />
                Website URL
              </Label>
              <Input
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="h-12 bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl text-base"
              />
              <p className="text-xs text-muted-foreground">Enter the full URL including https://</p>
            </div>
          )}

          {contentType === 'text' && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Type className="w-4 h-4 text-muted-foreground" />
                Your Message
              </Label>
              <Textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Enter your message here..."
                className="min-h-[140px] bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl text-base resize-none"
              />
              <p className="text-xs text-muted-foreground">{text.length} characters</p>
            </div>
          )}

          {contentType === 'wifi' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-sm text-amber-700 font-medium">Scanning this QR will auto-connect devices to your Wi-Fi</p>
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                  Network Name (SSID)
                </Label>
                <Input
                  value={wifiSsid}
                  onChange={e => setWifiSsid(e.target.value)}
                  placeholder="My Home WiFi"
                  className="h-12 bg-slate-50 border-slate-200 focus:border-primary rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  Password
                </Label>
                <Input
                  type="password"
                  value={wifiPass}
                  onChange={e => setWifiPass(e.target.value)}
                  placeholder="Enter password"
                  className="h-12 bg-slate-50 border-slate-200 focus:border-primary rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Security Type</Label>
                <Select value={wifiEnc} onValueChange={setWifiEnc}>
                  <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl">
                    <SelectValue placeholder="Encryption" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="WPA">WPA/WPA2</SelectItem>
                    <SelectItem value="WEP">WEP</SelectItem>
                    <SelectItem value="nopass">None (Open)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {contentType === 'email' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <AtSign className="w-4 h-4 text-muted-foreground" />
                  Recipient Email
                </Label>
                <Input
                  value={emailTo}
                  onChange={e => setEmailTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="h-12 bg-slate-50 border-slate-200 focus:border-primary rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Subject Line</Label>
                <Input
                  value={emailSubj}
                  onChange={e => setEmailSubj(e.target.value)}
                  placeholder="Email subject"
                  className="h-12 bg-slate-50 border-slate-200 focus:border-primary rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Message Body</Label>
                <Textarea
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  placeholder="Write your message..."
                  className="min-h-[100px] bg-slate-50 border-slate-200 focus:border-primary rounded-xl resize-none"
                />
              </div>
            </div>
          )}

          {contentType === 'social' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Platform</Label>
                <Select value={socialPlatform} onValueChange={setSocialPlatform}>
                  <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {socialPlatforms.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <AtSign className="w-4 h-4 text-muted-foreground" />
                  Username / Handle
                </Label>
                <Input
                  value={socialHandle}
                  onChange={e => setSocialHandle(e.target.value)}
                  placeholder="your_username"
                  className="h-12 bg-slate-50 border-slate-200 focus:border-primary rounded-xl"
                />
              </div>
            </div>
          )}

          {contentType === 'multilink' && (
            <div className="space-y-5">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Profile Title</Label>
                <Input
                  value={multiName}
                  onChange={e => setMultiName(e.target.value)}
                  placeholder="My Links"
                  className="h-12 bg-slate-50 border-slate-200 focus:border-primary rounded-xl font-semibold"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Your Links</Label>
                <div className="space-y-3">
                  {multiLinks.map((link, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200 group relative hover:border-slate-300 transition-colors"
                    >
                      <Input
                        value={link.title}
                        onChange={e => updateLink(i, { title: e.target.value })}
                        placeholder="Link Title (e.g. Portfolio, Blog, Shop)"
                        className="bg-white border-slate-200 h-10 font-medium rounded-lg"
                      />
                      <Input
                        value={link.url}
                        onChange={e => updateLink(i, { url: e.target.value })}
                        placeholder="https://example.com or www.example.com"
                        className="bg-white border-slate-200 h-9 text-sm text-muted-foreground rounded-lg"
                      />
                      {multiLinks.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLink(i)}
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={addLink}
                  className="w-full h-12 border-dashed border-2 hover:bg-slate-50 flex gap-2 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Another Link
                </Button>
              </div>
            </div>
          )}

          {/* Countdown Section */}
          {contentType === 'countdown' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Event Name</Label>
                <Input
                  value={multiName}
                  onChange={e => setMultiName(e.target.value)}
                  placeholder="My Awesome Event"
                  className="h-12 bg-slate-50 border-slate-200 focus:border-primary rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Target Date</Label>
                <Input
                  type="datetime-local"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="h-12 bg-slate-50 border-slate-200 focus:border-primary rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Short Description</Label>
                <Textarea
                  value={socialHandle}
                  onChange={e => setSocialHandle(e.target.value)}
                  placeholder="What are we counting down to?"
                  className="min-h-[80px] bg-slate-50 border-slate-200 focus:border-primary rounded-xl resize-none"
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

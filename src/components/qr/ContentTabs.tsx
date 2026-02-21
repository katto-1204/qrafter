import { QRContentType, socialPlatforms, buildWifiString, buildEmailString, buildSmsString, buildCallString } from '@/lib/qr-utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Globe, Type, Wifi, Mail, MessageSquare, Phone, Share2, Layers, Plus, Trash2, GripVertical } from 'lucide-react';
import { useState, useEffect } from 'react';

const contentTypes: { id: QRContentType; label: string; icon: React.ElementType }[] = [
  { id: 'url', label: 'Website', icon: Globe },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'multilink', label: 'Multi-Link', icon: Layers },
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
    { title: 'My Portfolio', url: 'https://' }
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
    fresh[index] = { ...fresh[index], ...updates };
    setMultiLinks(fresh);
  };

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div className="flex flex-wrap gap-2">
        {contentTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleTypeChange(id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${contentType === id
              ? 'bg-primary/20 text-primary border-primary/40 shadow-inner'
              : 'bg-secondary text-muted-foreground border-transparent hover:border-border hover:text-foreground'
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content inputs */}
      <div className="space-y-4">
        {contentType === 'url' && (
          <div className="space-y-2">
            <Label className="text-muted-foreground">Website URL</Label>
            <Input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-secondary border-border focus:border-primary"
            />
          </div>
        )}

        {contentType === 'text' && (
          <div className="space-y-2">
            <Label className="text-muted-foreground">Your Text</Label>
            <Textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter your message..."
              className="bg-secondary border-border focus:border-primary min-h-[120px]"
            />
          </div>
        )}

        {contentType === 'wifi' && (
          <div className="space-y-3">
            <Label className="text-muted-foreground">Network Credentials</Label>
            <Input
              value={wifiSsid}
              onChange={e => setWifiSsid(e.target.value)}
              placeholder="Network Name"
              className="bg-secondary mb-2"
            />
            <Input
              type="password"
              value={wifiPass}
              onChange={e => setWifiPass(e.target.value)}
              placeholder="Password"
              className="bg-secondary mb-2"
            />
            <Select value={wifiEnc} onValueChange={setWifiEnc}>
              <SelectTrigger className="bg-secondary">
                <SelectValue placeholder="Encryption" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {contentType === 'email' && (
          <div className="space-y-3">
            <Input
              value={emailTo}
              onChange={e => setEmailTo(e.target.value)}
              placeholder="recipient@example.com"
              className="bg-secondary"
            />
            <Input
              value={emailSubj}
              onChange={e => setEmailSubj(e.target.value)}
              placeholder="Subject line"
              className="bg-secondary"
            />
            <Textarea
              value={emailBody}
              onChange={e => setEmailBody(e.target.value)}
              placeholder="Message body..."
              className="bg-secondary min-h-[100px]"
            />
          </div>
        )}

        {contentType === 'social' && (
          <div className="space-y-3">
            <Select value={socialPlatform} onValueChange={setSocialPlatform}>
              <SelectTrigger className="bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {socialPlatforms.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={socialHandle}
              onChange={e => setSocialHandle(e.target.value)}
              placeholder="Username / Handle"
              className="bg-secondary"
            />
          </div>
        )}

        {contentType === 'multilink' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Profile Title</Label>
              <Input
                value={multiName}
                onChange={e => setMultiName(e.target.value)}
                placeholder="My Links"
                className="bg-secondary font-semibold"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-muted-foreground">Links List</Label>
              {multiLinks.map((link, i) => (
                <div key={i} className="flex flex-col gap-2 p-3 rounded-lg bg-secondary/50 border border-border group relative">
                  <Input
                    value={link.title}
                    onChange={e => updateLink(i, { title: e.target.value })}
                    placeholder="Link Title (e.g. Portfolio)"
                    className="bg-transparent border-0 h-8 font-medium focus-visible:ring-0 px-0"
                  />
                  <Input
                    value={link.url}
                    onChange={e => updateLink(i, { url: e.target.value })}
                    placeholder="https://..."
                    className="bg-transparent border-0 h-6 text-xs text-muted-foreground focus-visible:ring-0 px-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLink(i)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-8 w-8 text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addLink}
                className="w-full border-dashed border-2 hover:bg-secondary flex gap-2"
              >
                <Plus className="w-4 h-4" /> Add Another Link
              </Button>
            </div>
          </div>
        )}
        {/* Countdown Section */}
        {contentType === 'countdown' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Event Name</Label>
              <Input
                value={multiName}
                onChange={e => setMultiName(e.target.value)}
                placeholder="My Awesome Event"
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Target Date</Label>
              <Input
                type="datetime-local"
                value={text}
                onChange={e => setText(e.target.value)}
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Short Description</Label>
              <Textarea
                value={socialHandle}
                onChange={e => setSocialHandle(e.target.value)}
                placeholder="What are we counting down to?"
                className="bg-secondary h-20"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

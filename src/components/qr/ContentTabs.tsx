import { QRContentType, socialPlatforms, buildWifiString, buildEmailString, buildSmsString, buildCallString } from '@/lib/qr-utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Globe, Type, Wifi, Mail, MessageSquare, Phone, Share2 } from 'lucide-react';
import { useState } from 'react';

const contentTypes: { id: QRContentType; label: string; icon: React.ElementType }[] = [
  { id: 'url', label: 'Website', icon: Globe },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'call', label: 'Call', icon: Phone },
  { id: 'social', label: 'Social', icon: Share2 },
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
  const [smsPhone, setSmsPhone] = useState('');
  const [smsMsg, setSmsMsg] = useState('');
  const [callPhone, setCallPhone] = useState('');
  const [socialPlatform, setSocialPlatform] = useState(socialPlatforms[0].id);
  const [socialHandle, setSocialHandle] = useState('');

  const handleTypeChange = (type: QRContentType) => {
    setContentType(type);
    updateContent(type);
  };

  const updateContent = (type?: QRContentType) => {
    const t = type || contentType;
    switch (t) {
      case 'url': setContent(url); break;
      case 'text': setContent(text); break;
      case 'wifi': setContent(buildWifiString(wifiSsid, wifiPass, wifiEnc)); break;
      case 'email': setContent(buildEmailString(emailTo, emailSubj, emailBody)); break;
      case 'sms': setContent(buildSmsString(smsPhone, smsMsg)); break;
      case 'call': setContent(buildCallString(callPhone)); break;
      case 'social': {
        const p = socialPlatforms.find(s => s.id === socialPlatform);
        setContent((p?.prefix || '') + socialHandle);
        break;
      }
    }
  };

  const handleInputChange = (setter: (v: string) => void, value: string, type?: QRContentType) => {
    setter(value);
    setTimeout(() => updateContent(type), 0);
  };

  // Force update content when values change
  const handleUrlChange = (v: string) => { setUrl(v); setContent(v); };
  const handleTextChange = (v: string) => { setText(v); setContent(v); };
  const handleWifiChange = (ssid: string, pass: string, enc: string) => {
    setContent(buildWifiString(ssid, pass, enc));
  };
  const handleEmailChange = (to: string, subj: string, body: string) => {
    setContent(buildEmailString(to, subj, body));
  };

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div className="flex flex-wrap gap-2">
        {contentTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleTypeChange(id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              contentType === id
                ? 'bg-primary/20 text-primary glow-border'
                : 'bg-secondary text-muted-foreground hover:bg-surface-hover hover:text-foreground'
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
              onChange={e => handleUrlChange(e.target.value)}
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
              onChange={e => handleTextChange(e.target.value)}
              placeholder="Enter your message..."
              className="bg-secondary border-border focus:border-primary min-h-[120px]"
            />
          </div>
        )}

        {contentType === 'wifi' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Network Name (SSID)</Label>
              <Input
                value={wifiSsid}
                onChange={e => { setWifiSsid(e.target.value); handleWifiChange(e.target.value, wifiPass, wifiEnc); }}
                placeholder="MyNetwork"
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Password</Label>
              <Input
                type="password"
                value={wifiPass}
                onChange={e => { setWifiPass(e.target.value); handleWifiChange(wifiSsid, e.target.value, wifiEnc); }}
                placeholder="••••••••"
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Encryption</Label>
              <Select value={wifiEnc} onValueChange={v => { setWifiEnc(v); handleWifiChange(wifiSsid, wifiPass, v); }}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {contentType === 'email' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Email Address</Label>
              <Input
                value={emailTo}
                onChange={e => { setEmailTo(e.target.value); handleEmailChange(e.target.value, emailSubj, emailBody); }}
                placeholder="hello@example.com"
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Subject</Label>
              <Input
                value={emailSubj}
                onChange={e => { setEmailSubj(e.target.value); handleEmailChange(emailTo, e.target.value, emailBody); }}
                placeholder="Subject line"
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Message</Label>
              <Textarea
                value={emailBody}
                onChange={e => { setEmailBody(e.target.value); handleEmailChange(emailTo, emailSubj, e.target.value); }}
                placeholder="Your message..."
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
          </div>
        )}

        {contentType === 'sms' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Phone Number</Label>
              <Input
                value={smsPhone}
                onChange={e => { setSmsPhone(e.target.value); setContent(buildSmsString(e.target.value, smsMsg)); }}
                placeholder="+1234567890"
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Message</Label>
              <Textarea
                value={smsMsg}
                onChange={e => { setSmsMsg(e.target.value); setContent(buildSmsString(smsPhone, e.target.value)); }}
                placeholder="Your message..."
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
          </div>
        )}

        {contentType === 'call' && (
          <div className="space-y-2">
            <Label className="text-muted-foreground">Phone Number</Label>
            <Input
              value={callPhone}
              onChange={e => { setCallPhone(e.target.value); setContent(buildCallString(e.target.value)); }}
              placeholder="+1234567890"
              className="bg-secondary border-border focus:border-primary"
            />
          </div>
        )}

        {contentType === 'social' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Platform</Label>
              <Select value={socialPlatform} onValueChange={v => {
                setSocialPlatform(v);
                const p = socialPlatforms.find(s => s.id === v);
                setContent((p?.prefix || '') + socialHandle);
              }}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {socialPlatforms.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Username / Handle</Label>
              <Input
                value={socialHandle}
                onChange={e => {
                  setSocialHandle(e.target.value);
                  const p = socialPlatforms.find(s => s.id === socialPlatform);
                  setContent((p?.prefix || '') + e.target.value);
                }}
                placeholder="yourhandle"
                className="bg-secondary border-border focus:border-primary"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

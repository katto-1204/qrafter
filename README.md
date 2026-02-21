# Qrafted 🎨

**Qrafted** is a beautiful, professional, and open-source QR code generator designed for modern creators. Build stunning, fully customizable QR codes for websites, Wi-Fi, social media, and more—instantly and for free.

![Hero Banner](https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=1200&h=400)

## ✨ Features

- 🌈 **Full Customization**: Modify colors, patterns, and eye styles to match your brand.
- 🖼️ **Multiple Formats**: Generate QR codes for URLs, Raw Text, Wi-Fi, Email, and major Social Media platforms.
- ⚡ **Instant Preview**: See your design changes in real-time as you refine your QR code.
- 💾 **High-Quality Exports**: Download your creations in PNG, JPG, or SVG formats.
- 🛡️ **Reliability**: Adjustable error correction levels (L, M, Q, H) to ensure maximum scannability even on complex backgrounds.
- 🌓 **Modern UI**: A sleek, responsive interface with Dark and Light mode support.

## 🚀 Tech Stack

- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **QR Engine**: [qrcode](https://www.npmjs.com/package/qrcode)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/qr-painter.git
   cd qr-painter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
src/
├── components/
│   ├── qr/             # QR-specific logic and UI components
│   └── ui/             # Reusable shadcn/ui components
├── hooks/              # Custom React hooks (e.g., useQRCode)
├── lib/               # Utility functions and configurations
├── pages/              # Application views (Index, Generator, NotFound)
├── App.tsx             # Main application component & Routing
└── main.tsx            # Entry point
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [katto-1204](https://github.com/katto-1204)

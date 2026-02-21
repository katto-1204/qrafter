# Qrafted

Qrafted is a professional, open-source QR code generator designed for modern creators. The application enables the creation of fully customizable QR codes for websites, Wi-Fi networks, social media platforms, and more, providing an efficient and cost-free solution.

![Project Banner](public/IMAGES/image.png)

## Core Features

- **Full Customization**: Modify colors, patterns, and eye styles to align with brand requirements.
- **Support for Multiple Formats**: Generate QR codes for URLs, Raw Text, Wi-Fi, Email, and major Social Media platforms.
- **Real-time Preview**: Observe design modifications instantly during the creation process.
- **High-Resolution Exports**: Download generated QR codes in PNG, JPG, or SVG formats.
- **Reliability and Scannability**: Support for adjustable error correction levels (L, M, Q, H) to ensure scanning success on diversas backgrounds.
- **Professional Interface**: A responsive and sophisticated user interface with integrated Light and Dark mode support.

## Technical Specifications

- **Framework**: React with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Animations**: Framer Motion
- **QR Engine**: qrcode
- **Iconography**: Lucide React

## Getting Started

### Prerequisites

- Node.js (Version 18 or higher)
- Supported package managers: npm, yarn, pnpm, or bun

### Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/qr-painter.git
   cd qr-painter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```

4. **Prepare for production**:
   ```bash
   npm run build
   ```

## Repository Structure

```text
src/
├── components/
│   ├── qr/             # Core logic and specialized UI components for QR generation
│   └── ui/             # Standardized reusable UI components
├── hooks/              # Custom application-specific React hooks
├── lib/                # Utility functions and library configurations
├── pages/              # Application views including Generator and Index pages
├── App.tsx             # Main routing and application core
└── main.tsx            # Application entry point
```

## License

This project is open-source and released under the [MIT License](LICENSE).

---

Developed by [katto-1204](https://github.com/katto-1204)

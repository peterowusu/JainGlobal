# Jain Global - Hedge Fund Landing Page

A gamified, interactive landing page for Jain Global, a multi-strategy global hedge fund. Built with modern web technologies, this application showcases investment strategies, performance metrics, global presence, and provides an engaging experience for potential investors.

![Jain Global](https://img.shields.io/badge/AUM-$12.9B-gold?style=for-the-badge)
![Strategies](https://img.shields.io/badge/Strategies-6-blue?style=for-the-badge)
![Tech](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react)

## 🌟 Key Features

### Investment Strategies
- **6 Core Strategies** ordered by AUM allocation:
  - Fundamental Equity (30% AUM)
  - Equity Arbitrage (20% AUM)
  - Rates & Macro (15% AUM)
  - Commodities (13% AUM)
  - Credit (12% AUM)
  - Systematic (12% AUM)

### Interactive Mini-Games
Each strategy features an educational game with 2025 market data:
- **Stock Picking Challenge** - Select undervalued stocks based on P/E ratios and growth
- **Spread Trading Game** - Identify optimal arbitrage opportunities
- **Bond Evaluation** - Choose bonds with best risk-adjusted returns (6.2% AAA, 7.8% BBB)
- **Macro Prediction** - Predict bond price movements based on Fed policy
- **Commodity Trading** - Trade based on real market events (Middle East tensions, global uncertainty)
- **Systematic Optimizer** - Tune risk tolerance and momentum parameters

### Gamification Features
- **Points System** - Earn 0-100 points per game based on performance
- **Animated Counters** - Performance metrics count up smoothly when scrolled into view
- **Confetti Effects** - Celebration animations on success (300 pieces)
- **Achievement Badges** - Gold badges with trophy icons
- **Portfolio Allocation Game** - Interactive sliders with real-time risk analysis
- **Sound Effects** - Hover and click sounds for enhanced engagement

### Visual Enhancements
- **Video Backgrounds** - Auto-playing loops on Hero, Strategies, and Contact sections
- **Interactive Map** - Live OpenStreetMap with clickable markers for 5 global offices
- **Particle Animations** - Custom brand-colored particles with glow effects
- **Framer Motion** - Smooth animations throughout
- **Gradient Dialogs** - Enhanced game popups with glowing borders

## 🚀 Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Component library built on Radix UI
- **Framer Motion** - Animation library
- **React Leaflet** - Interactive maps
- **TanStack Query** - Server state management
- **Wouter** - Lightweight routing

### Backend
- **Express.js** - Web server
- **TypeScript** - Type safety
- **PostgreSQL** - Database (via Neon)
- **Drizzle ORM** - Type-safe database queries

### Key Libraries
- React Hook Form + Zod - Form validation
- React Confetti - Celebration animations
- Lucide React - Icons
- date-fns - Date utilities

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd jain-global
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with:
SESSION_SECRET=your-session-secret
DATABASE_URL=your-postgresql-url
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:5000](http://localhost:5000) in your browser

## 🎮 Usage

### Navigation
- Click navigation items in the header to jump to sections
- Enjoy sound effects on hover and click interactions

### Strategy Games
1. Scroll to the Investment Strategies section
2. Click "Play Game" on any strategy card
3. Complete the interactive challenge
4. Earn points based on performance
5. See your total points in the header badge

### Interactive Map
- Click office markers or cards to zoom to locations
- View detailed office information in popups

### Portfolio Game
- Navigate to "Who We Are" section
- Adjust strategy allocation sliders
- Aim for balanced diversification (25% each)
- Earn "Portfolio Master!" achievement

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/      # Page sections
│   │   │   └── ui/            # Reusable UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities
│   │   └── pages/             # Page components
│   └── index.html
├── server/
│   ├── index.ts               # Express server
│   ├── routes.ts              # API routes
│   └── storage.ts             # Storage interface
├── shared/
│   └── schema.ts              # Shared types & schemas
└── attached_assets/           # Video and image assets
```

## 🎨 Design System

- **Colors**: Custom brand palette with dark theme
- **Typography**: Font Serif for headings, system fonts for body
- **Animations**: Framer Motion for smooth transitions
- **Particles**: Brand colors (#3d474d, #4d748b, #373431, #bfc8ff)

## 📊 Performance Metrics

- **AUM**: $12.9B (143% growth from $5.3B initial)
- **Sharpe Ratio**: 1.87
- **Max Drawdown**: -3.1%
- **Products Traded**: 2,500+

## 🌍 Global Presence

- **New York** - Headquarters (Global Strategy & Operations)
- **London** - European Hub (European Markets & Credit)
- **Hong Kong** - Asia Pacific (Asian Equities & FX)
- **Singapore** - Southeast Asia (Systematic Strategies)
- **Houston** - Energy Hub (Commodities & Energy)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run db:push      # Sync database schema
npm run db:studio    # Open Drizzle Studio
```

## 📝 API Routes

- `POST /api/contact` - Submit contact form
- `GET /api/contact-requests` - Retrieve contact submissions (admin)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

- Investment strategy data sourced from [Fintel](https://fintel.io/i/jain-global-llc-9969)
- Market data reflects 2025 conditions
- Video assets from stock footage libraries

## 📞 Contact

For inquiries about Jain Global investments, use the contact form on the website or visit our offices.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

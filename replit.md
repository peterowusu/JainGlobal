# Jain Global - Hedge Fund Landing Page

## Overview

Jain Global is a gamified landing page for a multi-strategy global hedge fund. The application showcases the firm's leadership, investment strategies, performance metrics, global presence, and provides an investor contact form. Built as a modern single-page application with interactive elements and animations to engage potential investors.

The project uses a full-stack TypeScript architecture with React on the frontend and Express on the backend, featuring a PostgreSQL database for storing contact requests.

## Recent Changes

**Color Palette (Updated: October 4, 2025)**
- Updated entire app color scheme to custom brand colors
- #4d748b (hsl(202, 29%, 42%)) - Blue-gray for primary interactive elements
- #3d474d (hsl(203, 12%, 27%)) - Dark gray for cards and muted backgrounds
- #373431 (hsl(30, 6%, 20%)) - Darker brown-gray for main background
- #bfc8ff (hsl(232, 100%, 87%)) - Light lavender for text and accents
- All CSS variables and components updated for consistent brand identity

**Performance Data (Updated: September 30, 2025)**
- Assets Under Management: $12.9B (current) - Source: [Fintel](https://fintel.io/i/jain-global-llc-9969)
- Startup AUM: $5.3 billion
- AUM growth represents ~143% increase from initial assets

**Hero Section**
- Video background implemented: `3765497499-preview_1759195304479.mp4`
- Auto-playing, looping video with dark overlay for text readability
- Maintains all particle animations and gamified effects

**Contact/Investor Section**
- Video background implemented: `3817291797-preview_1759197631629.mp4`
- Auto-playing, looping video with dark overlay for text readability
- Creates engaging visual experience for investor inquiries

**International Presence Map**
- Upgraded to live interactive OpenStreetMap using React Leaflet
- Clickable markers for all 5 global offices (New York, London, Hong Kong, Singapore, Houston)
- Clicking markers or office cards zooms map to exact location with smooth animation
- Popups display full addresses and office details
- No API key required (uses OpenStreetMap tiles)

**Investment Strategies Section (Updated: October 4, 2025)**
- Video background implemented: `3736384793-preview_1759209683934.mp4`
- Auto-playing, looping video with dark overlay for text readability
- **6 Core Strategies Ordered by AUM Allocation**:
  1. **Fundamental Equity (30% AUM)**: Long-term investments in undervalued companies with strong growth potential
  2. **Equity Arbitrage (20% AUM)**: Exploiting price discrepancies between related equity securities
  3. **Rates & Macro (15% AUM)**: Interest rate movements and macroeconomic trends
  4. **Commodities (13% AUM)**: Physical goods and derivative contracts
  5. **Credit (12% AUM)**: Corporate and sovereign debt opportunities
  6. **Systematic (12% AUM)**: Quantitative models and algorithms for trading
- **Interactive Mini-Games with 2025 Market Data**: Each strategy card displays AUM badge and "Play Game" button:
  - **Fundamental Equity**: Stock picking with 2025 stocks (AI Tech Inc, Regional Bank vs Retail Giant, Legacy Auto)
  - **Equity Arbitrage**: Spread trading game identifying optimal arbitrage opportunities
  - **Credit**: Bond evaluation with higher 2025 yields (6.2% AAA, 7.8% BBB, 4.8% Treasury)
  - **Rates & Macro**: Fed rate cut scenario prediction (2025 inflation environment)
  - **Commodities**: Trading simulator with current events (Middle East tensions, global uncertainty, harvest forecasts)
  - **Systematic**: Algorithm optimizer tuning risk tolerance and momentum parameters
- **Enhanced Game Dialogs**: Larger 4xl windows, gradient backgrounds, animated trophy icons, glowing selection effects
- **Points System**: Games award 0-100 points based on performance, displayed in header badge with trophy icon
- **Quiz**: Strategy knowledge quiz awards 50 points for correct answer
- **Confetti**: 300-piece colorful celebration on game success

**Target Audience Section (Updated: October 4, 2025)**
- **Accredited Investors** tab displays video: `3712412343-preview_1759598514784.mp4`
- **Institutional Investors** tab displays video: `3765088793-preview_1759271170526.mp4`
- **Financial Advisors** tab displays video: `3754833691-preview_1759597722090.mp4`
- All three tabs now feature auto-playing, looping videos for engaging presentation

**Enhanced Gamification Features (Updated: October 4, 2025)**
- **Animated Number Counters**: Performance metrics ($12.9B, 1.87, -3.1%, 2,500+) count up smoothly when scrolled into view with easing animation and proper comma formatting
- **Confetti Effects**: Celebration animations trigger on quiz success and balanced portfolio achievements
- **Portfolio Allocation Mini-Game**: Interactive game in Who We Are carousel with 4 strategy sliders (Equities, Credit, Macro, Systematic), real-time validation, risk analysis, and visual feedback
- **Achievement Badges**: Gold "Portfolio Master!" badge appears with trophy icon when users create a well-balanced portfolio (25% each strategy)
- **Custom Particle Colors**: Particle background uses brand colors (#3d474d, #4d748b, #373431, #bfc8ff), variable sizes (1-3px), and glow effects
- **Interactive Sound Effects**: Hover and click sounds on navigation items for enhanced engagement

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for animations and interactive effects
- Custom "New York" style variant from Shadcn

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management
- React Hook Form with Zod for form validation
- Custom hooks for sound effects (`use-sound.tsx`) and mobile detection (`use-mobile.tsx`)

**Design Patterns**
- Component-based architecture with clear separation between UI components (`/components/ui`) and page sections (`/components/sections`)
- Single-page application with smooth scrolling navigation between sections
- Gamified interactions including sound effects, particle animations, and hover states
- Responsive design with mobile-first approach

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- ESM module system throughout
- Custom Vite middleware integration for development HMR

**API Design**
- RESTful endpoints under `/api` prefix
- Two main endpoints:
  - `POST /api/contact` - Submit contact form
  - `GET /api/contact-requests` - Retrieve all contact submissions (admin)
- JSON request/response format with Zod validation
- Comprehensive error handling with typed responses

**Storage Layer**
- Interface-based storage abstraction (`IStorage`)
- In-memory implementation (`MemStorage`) for development/demo
- Designed for easy migration to PostgreSQL via Drizzle ORM
- UUID-based entity identifiers

### Data Storage

**Database Technology**
- Configured for PostgreSQL via Neon serverless driver
- Drizzle ORM for type-safe database queries
- Schema-first approach with TypeScript types generated from database schema

**Schema Design**
- `users` table: Basic user authentication structure (id, username, password)
- `contact_requests` table: Investor contact form submissions
  - Fields: id, name, email, investorType, message, createdAt
  - Stores qualified lead information from potential investors

**Migration Strategy**
- Drizzle Kit for schema migrations
- Migration files stored in `/migrations` directory
- Environment-based database URL configuration

### External Dependencies

**UI & Animation Libraries**
- Radix UI: Accessible component primitives (dialogs, dropdowns, povers, etc.)
- Framer Motion: Animation and gesture library for interactive elements
- React Confetti: Celebration animations for gamification features
- Embla Carousel: Touch-friendly carousel component
- Lucide React: Icon library
- React Leaflet: Interactive map component for global office locations

**Data & Validation**
- Zod: Runtime type validation for forms and API
- Drizzle Zod: Generate Zod schemas from Drizzle tables
- TanStack Query: Async state management

**Database & Session**
- @neondatabase/serverless: Serverless PostgreSQL driver
- Drizzle ORM: Type-safe database queries
- connect-pg-simple: PostgreSQL session store (configured but not actively used)

**Development Tools**
- Replit-specific plugins for dev banner, cartographer, and error overlay
- TSX for running TypeScript directly in development
- ESBuild for production bundling

**Styling & Utilities**
- Tailwind CSS: Utility-first styling
- class-variance-authority: Type-safe variant styling
- clsx & tailwind-merge: Conditional class composition
- date-fns: Date manipulation
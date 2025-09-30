# Jain Global - Hedge Fund Landing Page

## Overview

Jain Global is a gamified landing page for a multi-strategy global hedge fund. The application showcases the firm's leadership, investment strategies, performance metrics, global presence, and provides an investor contact form. Built as a modern single-page application with interactive elements and animations to engage potential investors.

The project uses a full-stack TypeScript architecture with React on the frontend and Express on the backend, featuring a PostgreSQL database for storing contact requests.

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
- Embla Carousel: Touch-friendly carousel component
- Lucide React: Icon library

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
# DeepFake Detection Tool

## Overview

DeepFakeCheck is an AI-powered web application that enables users to verify image authenticity and detect deepfakes. Users upload images through a drag-and-drop interface, which are then analyzed using the Sightengine AI API to determine if they have been manipulated or artificially generated. The application provides instant, detailed analysis results with confidence scores and explanations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React with TypeScript using Vite as the build tool

**Routing:** Wouter for client-side routing (lightweight alternative to React Router)

**State Management:**
- TanStack Query (React Query) for server state management and API data fetching
- Local React state for UI interactions
- Query client configured with no automatic refetching or stale time for optimal control

**UI Component System:**
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- "New York" style variant selected
- Custom theme system supporting light/dark modes with CSS variables

**Design System:**
- Typography: Inter for UI/body text, Space Grotesk for headlines
- Color system: Neutral base with HSL color format for easy theming
- Custom elevation system using CSS variables (--elevate-1, --elevate-2)
- Responsive breakpoints following Tailwind defaults

**Key UI Patterns:**
- Hero section with background image and call-to-action
- Drag-and-drop file upload zone with visual feedback states
- Results display with verdict indicators (authentic/deepfake/uncertain)
- Feature cards showcasing capabilities
- "How It Works" step-by-step section

### Backend Architecture

**Server Framework:** Express.js running on Node.js

**API Structure:**
- Single `/api/analyze` POST endpoint for image analysis
- FormData/multipart uploads handled via Multer middleware
- File size limit: 10MB
- Image-only file type validation

**File Upload Processing:**
- Multer with in-memory storage (no disk persistence)
- Files buffered in memory and forwarded to external API
- No local file storage for privacy

**External API Integration:**
- Sightengine AI API for deepfake detection
- Credentials stored in environment variables (SIGHTENGINE_API_USER, SIGHTENGINE_API_SECRET)
- Images sent as FormData to Sightengine endpoint
- Response transformed and returned to client

**Development Environment:**
- Vite dev server with HMR (Hot Module Replacement)
- Custom middleware mode integration with Express
- Replit-specific plugins for error overlay and development banners

**Production Build:**
- Vite builds frontend to `dist/public`
- esbuild bundles backend to `dist` directory
- Static file serving in production mode

### Data Storage Solutions

**Current Implementation:** In-memory storage using a Map-based system

**User Storage Interface:**
- Defined storage interface (IStorage) with CRUD methods
- MemStorage implementation for development
- User schema defined but not actively used in current feature set

**Database Configuration:**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless driver (@neondatabase/serverless)
- Schema location: `shared/schema.ts`
- Migration output: `./migrations`

**Schema Design:**
- Users table with UUID primary key
- Username/password fields defined
- Zod validation schemas using drizzle-zod integration

**Note:** The application currently uses in-memory storage for the core deepfake detection feature. Database infrastructure is configured but not utilized in the main user flow, suggesting potential for future expansion with user accounts and analysis history.

### Authentication and Authorization

**Current State:** No authentication implemented

The codebase includes user schema and storage interfaces, but authentication is not active in the current implementation. The deepfake detection feature operates without requiring user accounts.

## External Dependencies

### Third-Party Services

**Sightengine AI API:**
- Core service for deepfake detection and image manipulation analysis
- Requires API credentials (user ID and secret key)
- Analyzes images for AI generation indicators, manipulation, and authenticity
- Credentials accessed via environment variables

### Database

**Neon Database (PostgreSQL):**
- Serverless PostgreSQL provider
- Connection via DATABASE_URL environment variable
- Managed through Drizzle ORM
- Currently configured but not actively used for core features

### UI Libraries and Components

**Radix UI:** Headless component primitives for accessible UI components including dialogs, dropdowns, toasts, popovers, tabs, accordions, and more

**Shadcn/ui:** Pre-built component library built on Radix UI with Tailwind styling

**Heroicons:** Icon library for React (used for feature icons and UI elements)

**Lucide React:** Additional icon library

### Development Tools

**Replit Platform Integration:**
- @replit/vite-plugin-runtime-error-modal for error handling
- @replit/vite-plugin-cartographer for development features
- @replit/vite-plugin-dev-banner for development environment indicators

### Build and Development

**Vite:** Frontend build tool and dev server

**esbuild:** Backend bundler for production builds

**TypeScript:** Type safety across frontend and backend

**Drizzle Kit:** Database migration and schema management tool

**PostCSS with Autoprefixer:** CSS processing pipeline
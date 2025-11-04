# Design Guidelines: Deepfake Detection Tool

## Design Approach

**Selected Framework:** Hybrid approach combining Material Design principles with security-focused product patterns (inspired by verification tools like Vercel, GitHub Security features, and AI safety platforms)

**Core Principles:**
- Professional credibility and trust-building
- Clear, immediate feedback on analysis results
- Seamless upload-to-results user journey
- Authoritative presentation of security information

## Typography System

**Font Families:**
- Primary: Inter (via Google Fonts) - for UI elements, body text
- Display: Space Grotesk (via Google Fonts) - for headlines, numbers

**Type Scale:**
- Hero Headline: text-5xl md:text-6xl, font-bold
- Section Headers: text-3xl md:text-4xl, font-bold
- Subsections: text-xl md:text-2xl, font-semibold
- Body Text: text-base md:text-lg
- Labels/Captions: text-sm
- Results/Stats: text-4xl md:text-6xl, font-bold (Space Grotesk)

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20 for consistency
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Container gaps: gap-6 to gap-12
- Card margins: space-y-6 to space-y-8

**Container Strategy:**
- Page container: max-w-6xl mx-auto px-6
- Upload section: max-w-3xl centered
- Results section: max-w-5xl for detailed analysis

## Page Structure

### Hero Section (80vh min)
- Large background image showing AI/technology theme (neural networks, digital patterns, or abstract tech imagery)
- Prominent headline: "Verify Image Authenticity" or "Deepfake Detection Made Simple"
- Subheadline explaining the tool's purpose
- Primary CTA button with blurred background overlay
- Trust indicators: "Powered by Sightengine AI" badge

### Upload Interface Section
**Main Upload Zone:**
- Large drag-and-drop area (min-h-96) with dashed border
- Center-aligned icon (cloud upload from Heroicons)
- Clear instruction text
- File type indicators (JPG, PNG, WEBP accepted)
- Alternative "Browse Files" button
- Maximum file size notation

**Upload States:**
- Default: Subtle border animation on hover
- Active drag: Border emphasis with scale transformation
- Processing: Progress indicator with percentage
- Error: Clear error messaging with retry option

### Results Display Section
**Two-Column Layout (desktop):**

**Left Column (Analysis Summary):**
- Large confidence score display (0-100%)
- Visual indicator (gauge chart or progress ring)
- Primary verdict badge ("Authentic" / "Potential Deepfake" / "Uncertain")
- Timestamp of analysis

**Right Column (Detailed Breakdown):**
- List-style detailed findings
- Individual detection metrics with labels
- Technical indicators from API response
- Explanation text for each metric

**Action Bar:**
- "Analyze Another Image" button
- "Download Report" secondary action
- "Share Results" option

### Features Section
**Three-Column Grid (desktop, single column mobile):**
- Feature card: AI-Powered Detection
- Feature card: Instant Results
- Feature card: Privacy-Focused Processing

Each card includes:
- Icon (Heroicons: ShieldCheck, Bolt, LockClosed)
- Title
- Brief description (2-3 lines)

### How It Works Section
**Numbered Steps (horizontal timeline):**
- Step 1: Upload Image
- Step 2: AI Analysis
- Step 3: Get Results
Each step with icon, title, and description

### Footer
- Links: About, API Documentation, Privacy Policy, Terms
- Social proof: "X,000+ images analyzed"
- Contact information
- Secondary CTA for API access

## Component Library

### Icons
**Library:** Heroicons (via CDN)
**Key Icons:**
- CloudArrowUp (upload)
- ShieldCheck (verification)
- ExclamationTriangle (warnings)
- CheckCircle (success)
- XCircle (rejection)
- ChartBar (analysis)

### Buttons
**Primary CTA:**
- Large size: px-8 py-4
- Rounded: rounded-lg
- Font: text-lg font-semibold
- Shadow: shadow-lg with hover lift

**Secondary Actions:**
- Medium size: px-6 py-3
- Outlined style with border
- Rounded: rounded-md

**Blurred Overlay Buttons (Hero):**
- backdrop-blur-md
- Semi-transparent background
- Distinct hover state with increased blur

### Cards
**Upload Card:**
- Border: border-2 border-dashed
- Padding: p-12
- Rounded: rounded-xl
- Hover: Transform scale-102

**Result Cards:**
- Solid borders: border
- Shadow: shadow-md
- Padding: p-6 to p-8
- Rounded: rounded-lg

**Feature Cards:**
- Minimal design
- Icon at top
- Padding: p-6
- Subtle hover elevation

### Progress Indicators
**Analysis Progress:**
- Linear progress bar with percentage
- Circular spinner for indeterminate states
- Smooth transitions

**Confidence Meter:**
- Semi-circular gauge or linear bar
- Clear threshold markers (High/Medium/Low confidence)
- Distinct visual treatment for warning states

## Images

### Hero Image
**Placement:** Full-width background for hero section
**Description:** High-quality abstract visualization of AI/neural networks - interconnected nodes, digital patterns, or futuristic technology theme in cool tones. Should convey sophistication and advanced technology without being overly complex.

### Feature Section Images (optional)
**Placement:** Small supporting icons or illustrations within feature cards
**Description:** Simple line illustrations showing upload process, analysis workflow, and security concepts

## Animations

**Minimal, purposeful only:**
- Upload zone: Subtle scale on hover (scale-102)
- Button hovers: Slight elevation increase
- Results appear: Fade-in with slight upward movement
- Progress indicators: Smooth loading states

**No scroll-based or continuous animations**

## Accessibility
- Clear focus states on all interactive elements
- High contrast for text and results
- Alt text for all images
- Keyboard navigation support
- ARIA labels for upload zone and results

## Responsive Behavior
- Mobile: Single column, full-width upload zone
- Tablet: Two-column results layout
- Desktop: Multi-column features, optimized upload interface
- Maintain generous spacing across all breakpoints
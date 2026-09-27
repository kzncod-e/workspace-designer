# monis.rent — Interactive Workspace Designer

> **Live Product Demo & Developer Assessment Submission**  
> Built for the [Desent Solutions](https://www.desent.io/coding-test-2) Developer Challenge for client **[monis.rent](https://monis.rent)** — office equipment rentals for digital nomads and tech startups in Bali.

---

## 🌴 Overview

When digital nomads land in Canggu, Ubud, or Seminyak, setting up an ergonomic workstation shouldn't involve scrolling through dull product spreadsheets or assembling flatpack furniture. **monis.rent** allows remote founders, software engineers, and creators to visually design and rent their complete dream workspace with zero deposit, free island-wide villa delivery, and complete white-glove assembly.

This application provides a **tactile, visual workspace configurator** where users select desks, ergonomic seating, external displays, studio lighting, audio, and tropical decor, immediately watching their setup come to life in a layered, interactive Bali studio preview with instant monthly lease pricing and a streamlined checkout flow.

---

## ✨ Key Features

1. **Interactive 3D WebGL Workspace Preview (The Centerpiece)**
   - **React Three Fiber & Three.js Engine**: Fully interactive 3D scene built with `@react-three/fiber`. Users can freely orbit, tilt, and zoom around their workspace.
   - **Drag-and-Drop Positioning**: Powered by `@react-three/drei`'s `PivotControls`, users can reposition monitors and accessories in 3D space.
   - **Bali Lighting & Atmosphere Switcher**:
     - ☀️ **Daylight**: Morning Balinese sunlight with `apartment` environment mapping.
     - 🌅 **Sunset**: Golden hour amber warmth with rich dusk sky hues and softer directional lighting.
     - 🌙 **Midnight**: Deep slate focus mode with realistic monitor screen glow, backlights, and radiant desk lamp illumination cones.
   - **Fullscreen Mode**: Native Fullscreen API integration for an immersive, edge-to-edge 3D configuration experience.

2. **Curated Preset Configurations (1-Click Setup)**
   - **The Nomad Essential**: Solid Oak Desk + Ergonomic Mesh Chair + 27" 4K Display + ScreenBar + Bali Monstera (€120/mo).
   - **Senior Dev Powerhouse**: Motorized Walnut Standing Desk + 34" Curved Ultrawide (144Hz) + 75% Mechanical Keyboard + Aluminum Laptop Riser + Studio Reference Monitors (€177/mo).
   - **Executive Luxury Suite**: Executive Sit-Stand Walnut Desk + Cognac Vegan Nappa Leather Recliner + Dual 27" 4K Displays on Gas-Spring Arm + Brass Artisan Lamp + Fiddle Leaf Fig (€217/mo).
   - **Zen Villa Minimalist**: Sustainable Bamboo Desk + Hygge Wool Lounge Chair + 27" 4K Display + Artisan Brass Lamp + Monstera (€127/mo).

3. **Complete Product Catalog**
   - **Desks**: Minimal European Oak, Dual-Motor Executive Standing Desk (with digital OLED height keypad and 4 presets), Bamboo Nomad Studio Desk (with embedded Qi wireless charger), and Nordic Birch Compact Desk.
   - **Chairs**: Breathable Elastomeric Mesh Task Chair, Executive Cognac Leather Recliner, Hygge Danish Wool Swivel Lounge, and Active Motion Sit-Stand Wobble Stool.
   - **Displays**: 27" 4K Ultra-Sharp with 90W USB-C Power Delivery, 34" Curved Ultrawide (1440p 144Hz) with split-canvas preview, and Dual 27" 4K Workstation Duo on an articulated desk arm.
   - **Lighting & Sound**: Minimalist ScreenBar LED lamp, Mid-Century Warm Brass Artisan Lamp, Bi-Amplified Studio Reference Monitors on acoustic isolation wedges, and Spatial 360° Soundbar.
   - **Ergonomic Gear & Decor**: Custom 75% Gasket-Mount Mechanical Keyboard, Ergonomic Split Alice Keyboard with walnut palm rest, Sculpted Aluminum Laptop Stand, Living Bali Monstera Deliciosa, Architectural Fiddle Leaf Fig tree, and Merino Wool & Leather Desk Pad.

4. **Dynamic Transparent Pricing Engine**
   - Instant calculation of monthly equipment rental totals.
   - **Flexible Lease Duration Tiers**:
     - `1 Month`: Flexible Nomad Lease
     - `3 Months`: 5% Discount (Standard Villa Term)
     - `6 Months`: 10% Discount (Seasonal Residency)
     - `12 Months`: 15% Discount (Startup Long-Term Hub)
   - Real-time savings indicator, transparent zero-deposit policy, and free delivery guarantee.

5. **Review & Checkout Flow (Optimized for Bali)**
   - Dedicated slide-out review Sheet breaking down all selected items with individual pricing and specifications.
   - Digital Nomad Delivery Form: Full Name, WhatsApp Number (the primary communication channel in Bali), Email, Bali Area selector (Canggu, Seminyak, Pererenan, Ubud, Sanur, Uluwatu), Villa Address, and preferred delivery date.
   - **Celebration Confirmation Dialog**: Triggers confetti animation, generates a unique order reference (e.g. `MN-BALI-8942`), confirms delivery timeframe, and offers a **1-click text receipt download** for travel expense reimbursement.

6. **Robust State Persistence & URL Synchronization**
   - **Zustand Store**: Lightweight client-side state management with safe `localStorage` synchronization.
   - **URL Syncing**: The complete workspace setup is automatically encoded into compressed URL parameters (e.g. `?d=desk-minimal-oak&c=chair-ergo-mesh&a=acc-monitor-27`). Teams can copy their URL to share their exact setup with their finance department.
   - **Multi-Instance Support**: Users can add multiple identical accessories (e.g. up to 3 monitors or plants), dynamically represented in the 3D space and summary.
   - Reset Confirmation Alert Dialog to prevent accidental setup loss.

---

## 🛠 Tech Stack & Rationale

| Technology | Purpose | Why It Was Chosen |
|---|---|---|
| **Next.js 16 (App Router)** | Framework | Industry standard for modern web applications. Provides server components, fast page loads, automatic asset optimization, and seamless Vercel deployment. |
| **TypeScript** | Language | End-to-end type safety across product data, workspace state, rental pricing, and UI props. Eliminates runtime errors and provides self-documenting code. |
| **Tailwind CSS v4** | Styling | Rapid utility-first styling with modern OKLCH color spaces, custom design tokens, fluid container queries, and minimal bundle footprint. |
| **shadcn/ui** | Component System | Accessible, unstyled, composable primitives (Cards, Badges, Buttons, Tabs, Sheets, Dialogs, Tooltips, Checkboxes, AlertDialogs, Separators). Customized heavily to create a bespoke European architectural aesthetic rather than a stock demo look. |
| **Three.js & R3F** | 3D Rendering | `@react-three/fiber` and `@react-three/drei` provide a highly interactive WebGL 3D canvas with OrbitControls, PivotControls, and Environment mapping for immersive workspace previews. |
| **Zustand** | State Management | Lightweight (<1kB), hook-based state management without provider boilerplate. Seamless persistence middleware and clean action dispatching. |
| **Motion (`motion/react`)** | Animations | Smooth hardware-accelerated spring animations for card selection, hover states, layout changes, and interactive tag presence. |
| **Lucide React** | Iconography | Consistent, modern, light-weight stroke icons matching the refined European startup design language. |
| **Canvas Confetti** | Delight / Micro-interaction | Lightweight, dependency-free celebration effect upon workspace rental confirmation. |

---

## 📐 Architecture & Directory Structure

The application follows a clean, modular component architecture:

```
workspace-designer/
├── app/
│   ├── globals.css                # Custom theme variables, OKLCH color tokens, base styles
│   ├── layout.tsx                 # Root layout, Geist typography, SEO meta, TooltipProvider, Sonner
│   └── page.tsx                   # Main entry point mounting WorkspaceBuilder
├── components/
│   ├── checkout/
│   │   ├── checkout-summary.tsx   # Slide-out Sheet for equipment review & Bali delivery form
│   │   └── confirmation-dialog.tsx# Post-rental confirmation dialog with confetti & receipt export
│   ├── products/
│   │   ├── accessory-card.tsx     # Compact toggle card for multi-select accessories
│   │   ├── product-card.tsx       # Primary card for desks & chairs with selection ribbons & specs
│   │   └── product-selector.tsx   # Categorized tabs, curated preset template buttons, filter layout
│   ├── ui/                        # shadcn/ui components (card, button, sheet, dialog, tabs, etc.)
│   └── workspace/
│       ├── preview/
│       │   └── three-scene.tsx       # WebGL Canvas, OrbitControls, 3D placeholder meshes, PivotControls
│       ├── workspace-builder.tsx  # Master layout coordinator, responsive grid, header, mobile bar
│       ├── workspace-preview.tsx  # Interactive visual centerpiece wrapping ThreeScene with lighting toggles & fullscreen API
│       ├── workspace-summary.tsx  # Real-time pricing calculator, lease duration picker, reset dialog
│       └── lifestyle-extras.tsx   # Curated add-ons tailored for digital nomads
├── data/
│   └── products.ts                # Strongly-typed catalog data for all desks, chairs, accessories & presets
├── lib/
│   ├── store.ts                   # Zustand store with actions and localStorage persistence
│   ├── utils.ts                   # Class merging utility (clsx + tailwind-merge)
│   └── workspace.ts               # Pricing math, discount formulas, order reference generator
└── types/
    ├── product.ts                 # Product, ProductCategory, PresetTemplate types
    └── workspace.ts               # WorkspaceState, DeliveryDetails, ConfirmedOrder types
```

---

## 🎨 UX & Product Design Decisions

1. **Visual-First Configurator vs. Boring Catalog**:
   - Rather than forcing users to click through disconnected product pages, the **Live Visual Workspace Preview** remains pinned as the visual centerpiece. Every click instantly updates the canvas in real time.
2. **European Warm Architectural Minimalism**:
   - Monis.rent caters to European, Australian, and American remote workers in Bali. We rejected generic bootstrap styling and harsh dark neon themes in favor of warm stone, natural wood tones (`#D4A373`), muted slate, and fresh tropical emerald accents (`#10B981`).
3. **Balinese Atmosphere Modes (Daylight / Sunset / Midnight)**:
   - Remote workers in Bali experience diverse working environments—from early morning sunshine to deep midnight coding sessions. The atmosphere toggle lets users envision their setup across times of day.
4. **Curated 1-Click Presets**:
   - Decision fatigue is common when configuring 10+ items. Four curated presets ("The Nomad Essential", "Senior Dev Powerhouse", "Executive Suite", "Zen Minimalist") provide instant starting points that can be further tailored.
5. **WhatsApp-First Delivery in Bali**:
   - Phone calls and formal postal addresses often fail in Indonesian villas. WhatsApp is universally used in Bali for villa deliveries and pin-drop location sharing. The checkout form places WhatsApp and villa landmarks front and center.
6. **Downloadable Expense Receipt**:
   - Digital nomads frequently expense co-working and office rentals to their company or client. The confirmation modal includes a 1-click formatted receipt download with order reference and lease terms.

---

## ⚖️ Trade-offs & Deliberate Simplifications

1. **Live 3D Rendering vs Static Images**:
   - *Decision*: Transitioned from SVG layouts to a full WebGL 3D environment using React Three Fiber.
   - *Rationale*: A 3D model viewer provides a vastly superior user experience, allowing them to orbit, tilt, and view their exact configuration from any angle. It feels significantly more premium.
2. **Mock Payment vs. Real Stripe Processing**:
   - *Decision*: Implemented the complete end-to-end checkout experience with order confirmation, verification, and receipt generation without live Stripe payment gateway credentials.
   - *Rationale*: monis.rent operates on local delivery verification where nomads inspect the equipment upon villa setup before recurring invoicing begins.
3. **Fixed Slot Categories (e.g. 1 Desk, 1 Chair) vs. Multi-Room Setup**:
   - *Decision*: Configured for an individual workstation setup with quantity multipliers for accessories (up to 3 monitors/plants), rather than full multi-desk office floor planning.
   - *Rationale*: Best matches the core use case of individual nomads and remote teams renting personalized workstations.

---

## 🚀 Improvements With More Time

1. **Custom glTF Models**: Replace the primitive 3D placeholder geometries (Boxes/Cylinders) with actual `.gltf`/`.glb` photorealistic product models.
2. **Live Villa Inventory & Calendar Availability**: Real-time inventory sync tracking stock in Canggu vs. Ubud warehouses and calendar date picker disabling booked-out dates.
3. **Stripe / Midtrans Indonesia Payment Integration**: Direct credit card and Indonesian QRIS payment processing for automated monthly recurring subscription billing.
4. **Custom Villa Dimensions Checker**: Augmented Reality (WebXR) preview allowing nomads to view the desk in their actual villa room using their smartphone camera.

---

## 📋 Evaluation Checklist (Hiring Manager Review)

- [x] **Desk Selection**: 4 distinctive desks with realistic pricing, materials, specifications, and images.
- [x] **Chair Selection**: 4 distinctive ergonomic chairs with breathable mesh, cognac leather, and active motion options.
- [x] **Accessories**: 9 categorized accessories across monitors, lighting, audio, decor, and ergonomic gear.
- [x] **Visual Workspace Preview**: Layered WebGL 3D preview powered by React Three Fiber with dynamic lighting modes, fullscreen API, and multiple accessory rendering.
- [x] **State Persistence**: Setup seamlessly syncs with both `localStorage` and URL query parameters for easy sharing.
- [x] **Summary & Checkout**: Full itemized review view, flexible lease duration discounts, Bali villa delivery form, and confirmation dialog with celebration confetti.
- [x] **Responsive**: Polished desktop layout with sticky preview and dedicated mobile floating action bar.
- [x] **Clean Architecture & Types**: Strict TypeScript, Zustand state management with safe localStorage persistence, and separated component hierarchy.
- [x] **Build & Lint**: Zero ESLint errors or warnings, builds statically with Next.js Turbopack.

---

## 💻 Local Development & Build

```bash
# Navigate to project
cd workspace-designer

# Install dependencies
npm install

# Run dev server
npm run dev

# Run lint checks
npm run lint

# Run production build
npm run build

# Start production server
npm start
```

Deployed and optimized for 1-click deployment on [Vercel](https://vercel.com).

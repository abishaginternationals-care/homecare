# Abishag Home Health — Project Structure Guide

This document provides a comprehensive overview of the Abishag project architecture. It is designed to help developers and AI assistants understand the purpose of each file and the overall design philosophy of the application.

## 🏗️ Technical Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS (globals.css)
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## 📂 Directory Structure & File Descriptions

### 🚀 Root Configuration
| File | Description |
| :--- | :--- |
| `package.json` | Project dependencies, scripts, and metadata. |
| `tailwind.config.ts` | Tailwind CSS configuration (fonts, colors, and custom themes). |
| `next.config.mjs` | Next.js configuration for image domains, optimization, and redirects. |
| `globals.d.ts` | Global TypeScript type definitions. |
| `README.md` | General project overview and setup instructions. |

### 📱 `app/` (The Core Application)
The `app` directory follows the Next.js App Router pattern.

| Path | File | Description |
| :--- | :--- | :--- |
| `layout.tsx` | Root Layout | Global wrapper containing the Navigation and Footer. Defines the HTML structure and Google Fonts. |
| `page.tsx` | Homepage | The main landing page. Integrates Hero, Services Preview, Why Choose Us, and Reviews. |
| `globals.css` | Global Styles | **Critical File:** Contains the brand color palette, global typography, custom keyframe animations, and utility classes. |
| `actions.ts` | Server Actions | Handles backend logic for reviews (fetching from/saving to database). |
| `about/page.tsx` | About Us | Company mission, vision, and core values. |
| `services/page.tsx` | Services Listing | A comprehensive grid of all 15+ healthcare services. |
| `services/[slug]/` | `page.tsx` | **Dynamic Service Page:** Renders specific details for a service based on its slug from `servicesData`. |
| `blog/page.tsx` | Blog / News | Latest updates and healthcare advice articles. |
| `contact/page.tsx` | Contact Us | Inquiries and appointment booking form. |

### 🧩 `app/components/` (Reusable UI)
| Component | Description |
| :--- | :--- |
| `Navigation.tsx` | Sticky navbar with transparent-to-solid scroll transition and mobile menu. |
| `Footer.tsx` | Branded footer with quick links and contact info. |
| `CinematicHero.tsx` | Homepage hero with high-contrast cross-fading slides and visible text overlays. |
| `ServiceRowReveal.tsx` | A container that reveals children (service cards) with a float-up animation when scrolled into view. |
| `Card3D.tsx` | A wrapper that adds 3D tilt effects to cards using Framer Motion. |
| `AnimatedBackground.tsx` | Fixed background layer with slow-moving, performant CSS orbs (no blurs or filters that cause lag). |
| `ChatAssistant.tsx` | A floating "Care Guide" chat widget (conditional logic based). |
| `IntroAnimation.tsx` | A premium, one-time-per-session path-trace logo reveal animation. |
| `PremiumEmoji.tsx` | A utility for rendering branded, colored Lucide icons in consistent frames. |
| `StatsCounter.tsx` | Animated number counters for performance metrics (Patients served, etc.). |
| `MagneticButton.tsx` | An interactive button wrapper that "pulls" towards the cursor. |

### 📊 `app/data/` & `app/hooks/`
| Path | Description |
| :--- | :--- |
| `app/data/services.tsx` | **Source of Truth:** Contains the array of all 15 services (title, description, icon, image path). |
| `app/hooks/useScrollReveal.ts` | A custom hook that applies the `.visible` class to elements with reveal classes when scrolled. |

---

## 🎨 Visual Identity & Rules
When modifying this project, adhere to these strictly established rules:

1.  **Professionalism First:** Avoid "gimmicky" or overly clinical medical animations. 
2.  **No Heartbeats:** All ECG/Heartbeat widgets and animations have been purged. Use `Stethoscope`, `HeartHandshake`, or `ShieldCheck` icons instead.
3.  **High Contrast:** Hero text must always be clearly legible. Use the layered overlays and text shadows defined in `CinematicHero.tsx`.
4.  **Performance:** Avoid heavy CSS `backdrop-filter: blur()` over 8px. Use pre-rendered gradients or solid colors where possible to prevent scrolling lag.
5.  **Color Palette:** Use the CSS variables defined in `globals.css` (Brand Brown: `#3D1A0A`, Brand Green: `#6AB04C`).

---

## 🤖 GPT Context for AI Assistants
- **Style:** Clean, Minimalist, Premium, Healthcare-Professional.
- **Component Logic:** Prefer `Framer Motion` for animations over raw CSS animations for complex transitions.
- **Data Binding:** Always use `servicesData` from `app/data/services.tsx` for any list-related UI to ensure consistency.

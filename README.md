# Emran Ali — Premium Wildlife & Nature Photography Portfolio

An international-quality photography portfolio website designed and architected for **Emran Ali**, Wildlife & Nature Photographer based in Thakurgaon, Bangladesh.

Combines fine-art editorial craftsmanship, natural storytelling, avian biodiversity documentation, limited-edition fine art prints, and image licensing opportunities.

---

## 🎨 Visual Identity & Creative Direction

- **Editorial Style**: Minimal, fine-art museum aesthetic inspired by international masters (Khaldoon Aldway, Jonathan Gardner, KatSnaps, Anirudh Vild).
- **Color Palette**:
  - Warm Off-White (`#F7F6F2`): Primary canvas & editorial paper feel
  - Natural Sand (`#E9E6DE`): Secondary sections & split narrative backgrounds
  - Deep Charcoal (`#252721`): Primary typography
  - Muted Gray (`#77776F`): Captions, dates & secondary labels
  - Natural Olive (`#777B65`): Subtle botanical accent
  - Dark Cinematic (`#20221E`): Fullscreen lightbox, hero & dark photo showcases
- **Typography**:
  - Headings: `Cormorant Garamond` (Classic serif with italic accents)
  - Body: `DM Sans` (Clean, contemporary, highly readable sans-serif)
- **Ambient Soundscape**:
  - Built-in Web Audio API nature synthesizer (gentle morning river breeze & sporadic soft birdsong).
  - Strictly defaults to **Muted** with a toggle in the navigation header.

---

## 🧭 Information Architecture (10 Public Pages)

1. **Home (`/`)**:
   - Section 01: Minimal Editorial Navigation with wordmark & sound toggle
   - Section 02: Cinematic Hero with subtle zoom, Kanchenjunga dawn view, and quote
   - Section 03: "Behind the Lens" Photographer introduction with geographic context
   - Section 04: "Moments From The Wild" Asymmetric Selected Works gallery
   - Section 05: Curated Photography Categories (Birds, Wildlife, Nature, Macro)
   - Section 06: Featured Journal Story ("Chasing the First Light of Kanchenjunga")
   - Section 07: Conservation Preview ("Protecting the Beauty We Capture")
   - Section 08: About Preview ("Behind Every Frame, There Is a Story")
   - Section 09: Verified Recognition & clearly identified demo placeholders
   - Section 10: Fine Art Prints & Licensing CTA
   - Section 11: "Letters From The Wild" Minimalist newsletter subscription
   - Section 12: Footer with Thakurgaon coordinates, ethics code & navigation

2. **Portfolio (`/portfolio`)**:
   - Asymmetric staggered editorial masonry gallery
   - Category filtering (All Works, Birds, Wildlife, Nature & Landscapes, Macro)
   - Fullscreen Lightbox with technical EXIF specifications, zoom, and deep-dive links

3. **Photograph Detail Page (`/photographs/[slug]`)**:
   - Large stage presentation
   - Full EXIF details (Camera, lens, focal length, aperture, shutter speed, ISO)
   - Behind-the-lens narrative & field notes
   - Previous / Next adjacent navigation
   - Print inquiry & Licensing CTA links
   - Related photographic works
   - Structured `ImageObject` JSON-LD schema

4. **About (`/about`)**:
   - Comprehensive biographical essay
   - Why wildlife photography & non-intrusive field philosophy
   - Field arsenal & specialized camera gear
   - Primary subject corridors across Bangladesh
   - Verified honors and awards

5. **Journal (`/journal`)**:
   - Magazine-style photography essays & field notes
   - Featured expedition banner
   - Reading time, publication dates, and geographic locations

6. **Journal Article Detail (`/journal/[slug]`)**:
   - Long-form editorial storytelling
   - Field quotes, callouts, and supporting captioned photographs
   - Continuation links to related essays
   - Structured `Article` JSON-LD schema

7. **Conservation (`/conservation`)**:
   - Three key ecological pillars: Avian Corridors, Grassland Carnivores (Bengal Fox), and Living Watersheds
   - Field focus case studies
   - The Wildlife Photographer's Ethical Commitment code

8. **Conservation Story Detail (`/conservation/[slug]`)**:
   - In-depth case study investigation
   - The Challenge vs. The Role of Visual Evidence
   - Direct field observations checklist and call to action

9. **Prints & Licensing (`/prints`)**:
   - **Section A: Fine Art Prints**: Hahnemühle 100% cotton rag specs, UltraChrome archival pigments, embossed certificates, available edition sizes, and "Price on Request" model.
   - **Section B: Image Licensing**: Editorial, commercial, and digital broadcast rights.
   - Interactive client-validated inquiry dossier form.

10. **Contact (`/contact`)**:
    - Direct contact details & Thakurgaon studio coordinates
    - Remote field schedule turnaround notice
    - Client-side validated collaboration & inquiry form

---

## 📁 Architecture & File Structure

```
emran-ali-photography/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Homepage (All 12 sections)
│   │   ├── layout.tsx                   # Root Layout with SEO, Navbar & Footer
│   │   ├── globals.css                  # Custom styling & animations
│   │   ├── portfolio/page.tsx           # Full Gallery with category filters
│   │   ├── photographs/[slug]/page.tsx  # Dedicated photograph story page
│   │   ├── about/page.tsx               # Biography, philosophy & gear
│   │   ├── journal/page.tsx             # Journal & Field Notes hub
│   │   ├── journal/[slug]/page.tsx      # Individual long-form article
│   │   ├── conservation/page.tsx        # Conservation mission & pillars
│   │   ├── conservation/[slug]/page.tsx # Detailed conservation case study
│   │   ├── prints/page.tsx              # Prints (Sec A) & Licensing (Sec B)
│   │   ├── contact/page.tsx             # Contact & inquiry form
│   │   ├── robots.ts                    # SEO Robots metadata
│   │   ├── sitemap.ts                   # Dynamic XML Sitemap generator
│   │   └── not-found.tsx                # Custom 404 page
│   ├── components/
│   │   ├── forms/                       # Contact, Licensing & Newsletter forms
│   │   ├── gallery/                     # Asymmetric editorial gallery grid
│   │   ├── layout/                      # Footer
│   │   ├── navigation/                  # Navbar with mobile menu drawer
│   │   ├── photography/                 # Fullscreen Lightbox modal
│   │   └── ui/                          # Web Audio Ambient Sound Toggle
│   ├── data/
│   │   ├── photographer.ts              # Emran Ali profile & biography
│   │   ├── navigation.ts                # Header & footer navigation items
│   │   ├── categories.ts                # 4 photography collections
│   │   ├── photographs.ts               # 16+ curated photographs with EXIF
│   │   ├── journal.ts                   # 4 in-depth field note essays
│   │   ├── conservation.ts              # 3 detailed conservation stories
│   │   ├── prints.ts                    # Fine art print editions & licenses
│   │   ├── awards.ts                    # Verified accolades & demo notices
│   │   ├── testimonials.ts              # Curator reflections
│   │   └── site-settings.ts             # SEO defaults, email, coordinates
│   ├── types/                           # Strongly typed TypeScript schemas
│   └── lib/
│       ├── data-access/                 # Reusable async query getters
│       ├── seo/                         # OpenGraph & JSON-LD helpers
│       └── utils/                       # Class merge & date formatting
```

---

## 🚀 Running the Project

```bash
# 1. Navigate to the project directory
cd /home/rakib/.gemini/antigravity/scratch/emran-ali-photography

# 2. Run the development server
npm run dev

# 3. Open in browser:
http://localhost:3000

# 4. Production Build Test
npm run build
npm run start
```

---

## 🔮 Future Phase Compatibility

The project was constructed following strict Phase 1 standards:

- **Zero backend or mock APIs**: Pure static TypeScript architecture.
- **Data-Access Layer Isolation**: Components fetch data via `getPhotographs()`, `getPhotographBySlug()`, `getJournalArticles()`, etc. In Phase 2, these can be pointed directly to PostgreSQL / Drizzle ORM / Cloudflare R2 without rewriting the frontend UI components.

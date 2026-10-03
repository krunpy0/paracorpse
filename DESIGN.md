---
name: PARACORPSE
description: Industrial metal band official website and content management system
colors:
  bg-pure: "#000000"
  bg-primary: "#060606"
  bg-secondary: "#0d0d0e"
  bg-tertiary: "#141416"
  bg-surface: "#1a1a1c"
  text-primary: "#f5f5f3"
  text-secondary: "#a8a8a6"
  text-muted: "#8e8e8c"
  text-inverse: "#060606"
  border-subtle: "rgba(255, 255, 255, 0.08)"
  border-medium: "rgba(255, 255, 255, 0.18)"
  border-strong: "rgba(255, 255, 255, 0.35)"
  signal-white: "#ffffff"
  signal-dot: "#e2e2e0"
typography:
  display:
    fontFamily: "Dirty Stains, Unbounded, sans-serif"
    fontSize: "clamp(2.25rem, 6.6vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Unbounded, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Unbounded, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, 'SF Mono', Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "56px"
  3xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.signal-white}"
    textColor: "{colors.bg-pure}"
  card-secondary:
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.none}"
    padding: "48px 40px"
---

# Design System: PARACORPSE

## Overview

**Creative North Star: "Monolithic Industrial Brutalism (Clean, Authentic, Functional)"**

PARACORPSE is an uncompromising digital presence for a modern metal and nu-metal band born in Miass, South Ural. The aesthetic balances raw brutalist weight with clean, high-precision architectural restraint. Rather than mimicking generic neon-accented cyber-metal tropes or cluttered grunge graphics, the interface delivers a cold, monolithic physical presence: dark obsidian surfaces, razor-sharp architectural borders, distressed metal typography, and stark monochrome contrast.

Crucially, **the website and CMS represent a real metal band and real musicians—NOT a sci-fi laboratory, military bunker, or secret-agency apparatus.** All interface copy, navigation, buttons, and statuses must use clear, standard English and straightforward UI patterns, free from pseudo-technical jargon, artificial bracketed codes, or fake telemetry blocks.

The visual experience leads with an atmospheric curtain reveal. The monolithic hero chamber sits pinned in space, gradually sliding beneath an architectural obsidian content sheet upon scrolling. Depth is established through disciplined tonal steps, feathered radial vignettes, and an omnipresent physical film-grain layer that gives digital pixels the tactile grit of 35mm stage photography.

Color is treated as a rare, organic phenomenon. Interface elements never employ saturated synthetic accents; emotional hue enters purely through stage photography, raw portraits, and rehearsal video textures. When interaction occurs, the system responds with crisp, high-velocity kinetic transitions and stark white inversion.

**Key Characteristics:**
- **Monolithic Obsidian Void**: Surfaces descend from pitch black `#000000` to `#060606`, accented solely by stepped shades of graphite and raw steel.
- **Dual Typographic Tension**: Contrast between raw, distressed metal lettering (`Dirty Stains`) and severe high-precision mono labels (`JetBrains Mono`).
- **Tactile Analog Grain**: A persistent overlay of SVG fractal noise that breaks digital sterility.
- **Architectural Edge Discipline**: Strict `0px` radius on all primary cards, buttons, and frames; borders are hairline indicators (`1px`) of state and boundary.
- **Tactile State Inversion**: High-contrast interaction where primary buttons and active indicators switch instantly between deep graphite and pure signal white.

## Colors

The palette is strictly monochromatic and tonal, built on low-reflectance carbon surfaces, steel boundaries, and incandescent signal white.

### Primary
- **Signal White** (`#ffffff`): The apex focal state. Reserved strictly for primary call-to-action buttons, active navigation links, and high-priority headings on hover.
- **Text Stark White** (`#f5f5f3`): The normative reading baseline for high-visibility headings, logo typography, and primary button resting backgrounds.

### Secondary
- **Text Secondary Silver** (`#a0a09e`): Used for section subtitles, body prose, band biographies, and inactive navigation links.
- **Text Muted Graphite** (`#5c5c5a`): Reserved for technical telemetry, audition requirements, metadata tags, and copyright strings.

### Neutral
- **Void Black** (`#000000`): The base canvas behind the hero chamber, photo letterboxes, and scrollbar tracks.
- **Obsidian Primary** (`#060606`): The standard surface background for the content sheet and all primary page sections.
- **Graphite Secondary** (`#0d0d0e`): The resting background for recruitment cards, member dossier panels, and contact cards.
- **Steel Tertiary** (`#141416`): The resting background for social channel chips and elevated hover states on cards.
- **Charcoal Surface** (`#1a1a1c`): The highest elevation resting state, used for interactive item hover highlights.
- **Border Subtle** (`rgba(255, 255, 255, 0.08)`): Base divider hairline between sections, headers, and metadata rows.
- **Border Medium** (`rgba(255, 255, 255, 0.18)`): Structural perimeter for unhovered cards, photo frames, and button outlines.
- **Border Strong** (`rgba(255, 255, 255, 0.35)`): Hover and focus indicator for cards, active news rows, and focused controls.

### Named Rules
**The Absolute Monolith Rule.** Zero decorative chromatic color accents are permitted on public UI chrome. No synthetic blues, purples, or neon greens. Chromatic color belongs exclusively to photography, documentary video, and live stage lighting.

**The Inversion Contrast Rule.** Primary action triggers invert the polarity of the surface. A dark card hosts a white button (`#f5f5f3` with `#060606` text), which intensifies to pure `#ffffff` with `#000000` text on hover.

**The Hairline Boundary Rule.** Borders must never exceed `1px` in width. Density and separation are created by modulating opacity (`0.08` → `0.18` → `0.35`), never by thickening lines.

## Typography

**Display Font:** `Dirty Stains` (custom OTF) with fallback to `Unbounded`, sans-serif.
**Headline Font:** `Unbounded`, -apple-system, BlinkMacSystemFont, sans-serif.
**Body Font:** `Inter`, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif.
**Label / Telemetry Font:** `JetBrains Mono`, 'SF Mono', Consolas, monospace.

**Character:** A deliberate collision between primal, distressed metal subculture energy (`Dirty Stains`), heavy industrial geometric weight (`Unbounded`), neutral editorial clarity (`Inter`), and disciplined cold telemetry (`JetBrains Mono`).

### Hierarchy
- **Display (Hero Monolith)** (`weight: 400`, `size: clamp(2.25rem, 6.6vw, 6.5rem)`, `line-height: 0.95`, `letter-spacing: 0.02em`): The primary brand wordmark in the hero portal, rendered in uppercase with subtle ambient luminescence (`drop-shadow: 0 0 50px rgba(255, 255, 255, 0.15)`).
- **Headline (Section Titles)** (`weight: 900`, `size: clamp(2rem, 5vw, 3.5rem)`, `line-height: 1.0`, `letter-spacing: -0.02em`): Full-width section markers (`NEWS`, `JOIN A BAND`, `ABOUT US`, `CONTACT US`).
- **Title (News Headlines & Card Names)** (`weight: 800` in Unbounded or `weight: 400` in Dirty Stains, `size: clamp(1.6rem, 3.2vw, 2.6rem)`, `line-height: 1.12`, `letter-spacing: -0.015em`): News titles and audition vacancy titles (`GUITARIST`, `VOCALIST`).
- **Body (Lead Manifesto & Bios)** (`weight: 400-500`, `size: 1rem` / `1.15rem`, `line-height: 1.6-1.65`, `max-width: 85-90ch`): Editorial descriptions, manifesto statements, and musician biographies.
- **Label / UI Controls & Metadata** (`weight: 500-600`, `size: 0.72rem - 0.85rem`, `line-height: 1.4`, `letter-spacing: 0.12em - 0.2em`, `text-transform: uppercase`): Short metadata, publication dates, audition requirements list items, button labels, and navigation tabs.

### Named Rules
**The Brutalist Casing Rule.** All display headlines, vacancy titles, section markers, metadata tags, navigation links, and primary CTA buttons must be set in full `UPPERCASE`. Editorial body paragraphs and member bios remain in standard mixed case for unhindered readability.

**The Monospace Microcopy Rule.** Action buttons, dates, audition requirements, form inputs, and status labels are rendered in `JetBrains Mono` with uppercase tracking (`0.12em` to `0.2em`). This is strictly a font pairing choice—it must NEVER be used to justify robotic jargon, pseudo-military protocol text, coordinate codes, or square brackets.

## Layout

The spatial model is built around a full-width monolithic frame with generous architectural gutters.

- **Global Container:** Maximum width of `1400px` (`max-width: 1400px`), centered horizontally (`margin: 0 auto`).
- **Horizontal Paddings:** `2.5rem` (`40px`) on standard viewports, reducing to `1.25rem` (`20px`) on mobile viewports (`< 768px`).
- **Vertical Section Rhythm:** Sections are separated by `5rem` (`80px`) vertical breathing room and unified by hairline bottom dividers (`1px solid var(--border-subtle)`).
- **Curtain Hero Architecture:**
  - Sticky hero portal chamber pinned at `top: 0`, occupying `100vh` (`100dvh`).
  - Monolithic logo smoothly translates (`transform: translateY(...)`) and fades (`opacity`) with scroll progress.
  - The content sheet rises from below with high z-index (`z-index: 10`), casting a soft elevation shadow (`box-shadow: 0 -30px 60px rgba(0, 0, 0, 0.7)`) and a feathered `140px` top gradient.
- **Grid Systems:**
  - **Recruitment Cards:** 2-column balanced grid (`grid-template-columns: 1fr 1fr; gap: 2.5rem;`), collapsing to a single column on viewports `<= 960px`.
  - **Band Dossier:** 2-column grid (`grid-template-columns: repeat(2, 1fr); gap: 2.5rem;`), collapsing to a single column on viewports `<= 860px`.
  - **Contact Matrix:** 2-column split between official social channels and direct inquiry dossier (`gap: 3rem;`), collapsing to 1 column on `< 960px`.
  - **Footer Matrix:** 4-column telemetry grid, collapsing to 2 columns on tablet and 1 column on mobile.

## Elevation & Depth

Depth is established through physical atmospheric layering, tonal stepped surfaces, and lighting rather than artificial drop shadows.

Surfaces rest flat against the background plane (`0px` resting elevation). Depth manifests through four specific layers:
1. **Background Canvas (`z-index: 1`)**: Pinned concert background with radial vignette (`radial-gradient(circle, rgba(6,6,6,0.2) 0%, rgba(6,6,6,0.95) 100%)`).
2. **Ascending Content Sheet (`z-index: 10`)**: The solid obsidian sheet with top shadow `0 -30px 60px rgba(0, 0, 0, 0.7)`.
3. **Persistent Navigation Glass (`z-index: 100`)**: Frosted navigation bar with `rgba(6, 6, 6, 0.92)` and `backdrop-filter: blur(16px)`.
4. **Physical Film Grain (`z-index: 999`)**: Fixed viewport overlay with SVG fractal noise at `opacity: 0.032` and `mix-blend-mode: overlay`, guaranteeing tactile screen texture across all viewports.

### Shadow Vocabulary
- **Hero Ambient Glow** (`filter: drop-shadow(0 0 50px rgba(255, 255, 255, 0.15))`): Diffuse white radiance behind the central band wordmark.
- **Content Sheet Crest** (`box-shadow: 0 -30px 60px rgba(0, 0, 0, 0.7)`): Heavy atmospheric shadow separating the rising content sheet from the hero chamber.
- **Modal Scrim** (`background: rgba(0, 0, 0, 0.88)`, `backdrop-filter: blur(8px)`): Immersive blackout scrim for focused modal dialogue.

### Named Rules
**The Tonal Layering Rule.** Standard cards, inputs, and tables never emit drop shadows. Elevation is communicated solely by stepping from `--bg-primary` (`#060606`) to `--bg-secondary` (`#0d0d0e`) to `--bg-tertiary` (`#141416`).

**The Grain Integrity Rule.** The physical film grain layer must never be disabled, hidden, or made interactive (`pointer-events: none`). It unifies photographic assets and flat CSS surfaces into a single physical medium.

## Shapes

The form language is unapologetically rectilinear and sharp.

- **Corner Radius:** Strictly `0px` on all major structural surfaces:
  - Buttons: `border-radius: 0px`
  - Cards: `border-radius: 0px`
  - Image frames: `border-radius: 0px`
  - Section dividers: `border-radius: 0px`
  - Telemetry badges / Pills: `border-radius: 2px` (microscopic soften only for readability)
  - Admin utility pills: `border-radius: 4px`
- **Borders:** Crisp `1px` continuous solid strokes.
  - Inactive / resting: `1px solid var(--border-medium)` (`rgba(255, 255, 255, 0.18)`).
  - Hover / active: `1px solid var(--border-strong)` (`rgba(255, 255, 255, 0.35)`).
- **Hairlines:** Thin structural rules separating titles from content blocks.

## Components

### Primary Button (`btn-primary`)
- **Shape:** Rectilinear block (`border-radius: 0px`), `1px solid var(--text-primary)`.
- **Primary Rest:** Solid high-contrast fill (`background: #f5f5f3; color: #060606;`).
- **Padding:** `0.9rem 1.75rem` (`14px 28px`).
- **Typography:** `JetBrains Mono`, `font-size: 0.8rem`, `font-weight: 600`, `letter-spacing: 0.12em`, uppercase.
- **Hover State:** Background lifts to `#ffffff`, text deepens to `#000000`, card shifts slightly upward (`transform: translateY(-1px)`).
- **Kinetic Transition:** `0.18s cubic-bezier(0.16, 1, 0.3, 1)`.

### Persistent Navigation Bar (`main-header`)
- **Structure:** Fixed `60px` height bar (`position: fixed; top: 0; left: 0; width: 100%`).
- **Surface:** `rgba(6, 6, 6, 0.92)` with `backdrop-filter: blur(16px)` and hairline bottom border.
- **Visibility:** Invisible while hero is at rest; fades in smoothly when `scrollProgress > 0.15`.
- **Nav Links:** `font-family: var(--font-logo)`, `font-size: 0.82rem`, `letter-spacing: 0.12em`, `color: var(--text-secondary)`.
  - **Hover:** Color brightens to `#ffffff`, underline reveals with `6px` offset.
  - **Active:** Pure white `#ffffff`, `font-weight: 600`.

### Recruitment Audition Card (`join-card`)
- **Structure:** Vertical flex container with 3-part layout (Headers, Sound & Requirements, Action CTA).
- **Surface:** `background: var(--bg-secondary)` (`#0d0d0e`), border `1px solid var(--border-medium)`.
- **Internal Padding:** `3rem 2.5rem` (`48px 40px`).
- **Role Title:** Rendered in `Dirty Stains` (`clamp(1.8rem, 2.8vw, 2.4rem)`).
- **Requirements List:** Vertical list with border-left hairline accent (`border-left: 1px solid var(--border-subtle)`), padding-left `1.25rem`.
- **Hover State:** Border transitions to `var(--border-strong)`, background brightens to `var(--bg-tertiary)` (`#141416`), lifts by `translateY(-2px)`.

### Member Dossier Card (`member-card`)
- **Structure:** Rectilinear card pairing an architectural photographic frame with a biography dossier.
- **Photo Frame:** Fixed height `380px` (`height: 380px`), `object-fit: cover`, `object-position: center 20%`.
- **Photo Overlay:** Bottom vertical gradient smoothly bleeding the portrait into the card's `#0d0d0e` body.
- **Hover State:** Image scales subtly (`transform: scale(1.03)`) with boosted contrast; card lifts `translateY(-2px)`.

### Rammstein-Style News Row (`rammstein-news-row`)
- **Structure:** Full-width editorial row (`1 per row`) with headline, publication context, and hidden photo drawer.
- **Padding:** `3rem 1.5rem` (`48px 24px`), border-bottom `1px solid var(--border-subtle)`.
- **Headline:** Bold Unbounded headline (`clamp(1.6rem, 3.2vw, 2.6rem)`).
- **Photo Drawer:** Hidden at rest (`max-height: 0; opacity: 0; overflow: hidden;`). On hover or keyboard focus, drawer smoothly glides open (`max-height: 500px; opacity: 1; transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1)`), displaying the news image with a subtle vignette.

### Social Channel Item (`social-item`)
- **Structure:** Horizontal split row with icon box, channel name, handle URL, and diagonal outbound arrow (`↗`).
- **Surface:** `background: var(--bg-tertiary)` (`#141416`), border `1px solid var(--border-subtle)`.
- **Icon Frame:** `42px x 42px` square with `#000000` fill and subtle `1px` border.
- **Hover State:** Translates horizontally (`transform: translateX(4px)`), border brightens, arrow shifts diagonally.

## Copywriting & Interface Clarity: Anti-Jargon & Anti-Clutter Rules

To ensure the interface feels like an authentic, high-impact rock/metal band platform and an efficient, intuitive CMS, strictly follow these core rules. **The brutalist aesthetic applies to visual styling (stark contrast, sharp 0px borders, film grain, raw typography)—it must NEVER be used as an excuse for incomprehensible text, pseudo-military jargon, bracket spam, or decorative UI clutter.**

### 1. Plain, Direct English Only (Zero Pseudo-Jargon, Military, or Sci-Fi Lore)
- Use standard, conversational, natural English for all buttons, navigation tabs, section headers, badges, and statuses.
- PARACORPSE is a real music band composed of musicians—**never simulate a secret military laboratory, an SCP Foundation terminal, or a futuristic cyber-surveillance apparatus.**
- **Strictly Banned Terms & What to Use Instead:**
  - ❌ `APPARATUS` / `ARCHIVAL APPARATUS` → Use `CMS`, `ADMIN`, or omit completely.
  - ❌ `DISENGAGE` → Use `LOG OUT` or `SIGN OUT`.
  - ❌ `AUTHENTICATE APPARATUS` → Use `LOG IN` or `SIGN IN`.
  - ❌ `PROTOCOL` (e.g., `ACCESS CREDENTIAL PROTOCOL`, `RECRUITMENT PROTOCOL`) → Use `INSTRUCTIONS`, `SETUP GUIDE`, `AUDITIONS`, or `JOIN`.
  - ❌ `CELL` (e.g., `MIASS CELL`) → Use clean geographical notation: `MIASS, RUSSIA` or `MIASS, SOUTH URAL`.
  - ❌ `DISPATCHES` / `TRANSMISSIONS` → Use standard `NEWS` or `UPDATES`.
  - ❌ `STATE SYNCHRONIZED WITH REPOSITORY` → Use `CHANGES SAVED` or `SYNCED WITH GITHUB`.
  - ❌ `DOSSIER` → Use `MEMBERS`, `BAND`, or `ABOUT`.
  - ❌ `UNIT 01 // STRINGS`, `UNIT 02 // VOICE` → Use `GUITARIST` / `GUITAR SECTION`, `VOCALIST` / `LEAD VOCALS`.

### 2. Zero Square Brackets `[...]` in UI Copy
- **Never wrap UI text, headers, badges, or statuses in square brackets.**
- Square brackets create ugly visual noise, look like unrendered template tags or command-line artifacts, and reduce readability.
- ❌ `[GIT-BASED CMS // ARCHIVAL APPARATUS]` → `PARACORPSE CMS`
- ❌ `[ACCESS CREDENTIAL PROTOCOL]:` → `HOW TO GET A TOKEN:`
- ❌ `[STATE SYNCHRONIZED WITH REPOSITORY]` → `ALL CHANGES SAVED`
- ❌ `[UNIT 01 // STRINGS]` → (Remove bracketed code completely; use clear role title)
- ❌ `[SECTION DISENGAGED // ENTIRELY HIDDEN FROM SITE]` → `Section hidden from site`

### 3. Zero Double Slashes `//` and Zero Index Prefixes
- **Do not prefix tabs, sections, or titles with numbers and slashes** (`01 //`, `02 //`, `03 //`, `UNIT 01 //`).
- **Do not use double slashes `//` as decorative text separators.**
- Navigation items must be clean, single-concept labels:
  - ❌ `01 // NEWS (1)` → `NEWS (1)`
  - ❌ `02 // RECRUITMENT` → `AUDITIONS` (or `JOIN`)
  - ❌ `03 // DOSSIER & MANIFESTO (2)` → `BAND & BIO (2)`
  - ❌ `04 // TELEMETRY & FOOTER` → `FOOTER & SOCIALS`
  - ❌ `05 // PIPELINE STATUS` → `DEPLOY STATUS`
- Section titles must be clean and unnumbered:
  - ❌ `01 // NEWS & DISPATCHES` → `NEWS`
  - ❌ `ARCHIVAL APPARATUS // CMS` → `CMS`
  - ❌ `RECRUITMENT PROTOCOL // MIASS CELL` → `MIASS, RUSSIA` or remove subtitle completely.

### 4. Zero Redundant Tag Chips, Badge Spam, and Decorative Blocks
- **No Tag Spam / Redundant Pill Chips:** Do not place rows of boxed pills or tag chips (`DROP TUNINGS (A/B)`, `INDUSTRIAL SOUND`, `METRONOME TIGHT`, `STAGE DRIVE`) on cards if those details are already covered in the card's description or requirements. Keep card layouts clean and uncluttered.
- **No Unnecessary Status / Count Badges:** Do not clutter card headers with unneeded badge pills like `2 POSITIONS OPEN` or `1 POSITION OPEN` unless specifically required by the product specs. The card title is self-sufficient.
- **No Bloated Subtitles or Pompous Filler:** If a title like `NEWS` or `CMS` is obvious, do not append verbose, pseudo-editorial filler like `EDITORIAL PRESS ENTRIES, RELEASES, AND STAGE DISPATCHES`. Either provide a crisp, one-line practical description or omit the subtitle entirely.

### 5. Minimal, Practical Microcopy (No Architecture Dumps)
- Keep helper instructions, form hints, and technical explanations concise, friendly, and practical.
- Never dump paragraphs explaining internal technical architectures, Git internals, or database absence into public UI screens.
  - ❌ `CENTRALIZED CONTENT REPOSITORY & ARCHIVAL APPARATUS. DIRECT COMMITS TO REPOSITORY WITHOUT INTERMEDIATE SERVERS OR EXTERNAL DATABASES.`
  - ✅ Replace with clean, functional microcopy: `Sign in with your GitHub Personal Access Token to manage site content.`

---

### UI Copy Transformation Reference (Circled Issues & Fixes)

| Original Circled Element (Banned) | Why It Is Prohibited | Required Clean Replacement |
| :--- | :--- | :--- |
| `ARCHIVAL APPARATUS // CMS` | Obscure pseudo-sci-fi jargon + `//` delimiter | `CMS` or `PARACORPSE CMS` |
| `DISENGAGE` | Faux-military term for a standard web action | `LOG OUT` or `SIGN OUT` |
| `01 //`, `02 //`, `03 //`, etc. | Artificial numbering and slash noise | Clean tab labels: `NEWS`, `AUDITIONS`, `BAND`, `FOOTER`, `DEPLOY` |
| `01 // NEWS & DISPATCHES` | Fake index prefix + pretentious word ("dispatches") | `NEWS` |
| `EDITORIAL PRESS ENTRIES, RELEASES, AND STAGE DISPATCHES` | Redundant, verbose pseudo-bureaucratic subhead | Removed or concise: `Band announcements and press releases.` |
| `[STATE SYNCHRONIZED WITH REPOSITORY]` | Square brackets + robotic technical jargon | `ALL CHANGES SAVED` or `SYNCED WITH GITHUB` |
| `[GIT-BASED CMS // ARCHIVAL APPARATUS]` | Brackets + `//` + "apparatus" | Removed or simple badge: `PARACORPSE CMS` |
| `CENTRALIZED CONTENT REPOSITORY & ARCHIVAL APPARATUS. DIRECT COMMITS...` | Cluttered technical architecture whitepaper text | Short hint: `Sign in with your GitHub token to edit site content.` |
| `AUTHENTICATE APPARATUS ->` | Cryptic sci-fi phrasing on a login button | `LOG IN ->` or `SIGN IN ->` |
| `[ACCESS CREDENTIAL PROTOCOL]:` | Brackets + pseudo-military "protocol" | `HOW TO GET A TOKEN:` or `TOKEN INSTRUCTIONS:` |
| `RECRUITMENT PROTOCOL // MIASS CELL` | "Protocol", "cell", and `//` slashes | Clean subtitle: `MIASS, RUSSIA` or omitted |
| `[UNIT 01 // STRINGS]`, `[UNIT 02 // VOICE]` | Brackets, "Unit 01", tactical military jargon | Removed entirely (the card name `GUITAR` / `VOCALS` is sufficient) |
| `2 POSITIONS OPEN`, `1 POSITION OPEN` | Redundant pill badge cluttering card headers | Removed (or simply included in role description if needed) |
| `DROP TUNINGS (A/B)  INDUSTRIAL SOUND...` chips | Repetitive chip row repeating text from the card body | Removed entirely (keep only the clean text description below) |

---

## Do's and Don'ts

### Do:
- **Do** maintain the monochromatic obsidian aesthetic across all public pages (`#000000` through `#1a1a1c`).
- **Do** enforce strict `0px` border-radius on all main buttons, cards, and image frames.
- **Do** use `Dirty Stains` for the band name, logo, and selected high-impact role headers; use `Unbounded` for clean display headlines.
- **Do** format all UI buttons, metadata labels, dates, and requirements in standard uppercase with `JetBrains Mono`.
- **Do** use plain, natural, standard English for all labels, navigation, buttons, and statuses (`LOG IN`, `LOG OUT`, `NEWS`, `AUDITIONS`, `SAVED`).
- **Do** keep UI clean, minimal, and content-focused, letting the band's music, photos, and news take center stage without unnecessary clutter.
- **Do** reserve high-contrast white button fills (`#f5f5f3` / `#ffffff`) for primary call-to-actions.
- **Do** preserve the global SVG film-grain layer (`0.032` opacity) to maintain physical analog grit.
- **Do** keep border widths at exactly `1px`, adjusting only their alpha opacity (`0.08`, `0.18`, `0.35`) for state transitions.

### Don't:
- **Don't** use pseudo-military, sci-fi, SCP-foundation, or robotic jargon ("apparatus", "protocol", "disengage", "cell", "telemetry", "dossier", "transmissions", "dispatches").
- **Don't** wrap UI copy, headers, badges, or statuses in square brackets (`[...]`).
- **Don't** prefix section titles, tab headers, or cards with numbers and double slashes (`01 //`, `02 //`, `UNIT 01 //`).
- **Don't** add decorative double slashes (`//`) anywhere as text delimiters.
- **Don't** clutter cards with redundant pill badges, chip rows, or tag groups (e.g. `DROP TUNINGS`, `METRONOME TIGHT`) that repeat body text.
- **Don't** add unnecessary counter badges (e.g. `2 POSITIONS OPEN`) to card headers.
- **Don't** write verbose technical essays or architecture dumps explaining Git or databases on UI screens.
- **Don't** introduce synthetic accent colors (neon cyan, neon purple, lime green) into the public website chrome.
- **Don't** use pill-shaped (`rounded-full`), bubbled (`rounded-xl`), or playful bubbly corners on structural components.
- **Don't** apply diffuse multi-color or heavy colored drop shadows to cards; rely strictly on tonal stepped obsidian backgrounds.
- **Don't** use low-contrast gray text on dark backgrounds below WCAG AA standards (minimum `#a0a09e` for body copy, `#f5f5f3` for critical titles).
- **Don't** add decorative iconography or emoji to metal titles; use minimal clean monochrome SVG icons with stroke-width `2px` or clean glyph arrows (`↗`, `↑`, `→`).

# FREEOPS — UI Review

**Audited:** 2026-06-09
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md present)
**Screenshots:** Provided — desktop (1280×900) and mobile (375×812) for Home, Servicios, Nosotros, Contacto

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Strong branded copy throughout; Formspree endpoint is a PLACEHOLDER — form is non-functional in production |
| 2. Visuals | 3/4 | Clear hierarchy and strong hero; DiagnosticoBar text hidden on mobile, missing visual divider between dual fixed bars |
| 3. Color | 3/4 | Palette is coherent but 20+ raw oklch() literals scattered across components bypass the token system |
| 4. Typography | 4/4 | Two-weight Geist system applied consistently; clamp() fluid sizes correct; no rogue sizes found |
| 5. Spacing | 3/4 | Generally consistent; arbitrary `min-h-[44px]` and inline `padding: '13px 16px'` deviate from scale |
| 6. Experience Design | 2/4 | Form has sending/success/error states but no inline validation, no field-level errors, no skeleton/loading states for scroll sections, and the Formspree endpoint is `PLACEHOLDER` |

**Overall: 18/24**

---

## Top 3 Priority Fixes

1. **Formspree PLACEHOLDER endpoint** — ContactForm always 404s on submit in any deployed environment; users who fill the form get a silent failure or the error state with no actionable path. Replace `'https://formspree.io/f/PLACEHOLDER'` in `src/controllers/useContactForm.ts:35` with the real form ID before any public launch.

2. **No inline field-level validation on ContactForm** — `noValidate` suppresses all browser validation but no custom messages are shown per field on blur. A user submitting with an invalid email gets no feedback until the whole form POST fails. Add per-field error state with messages tied to each input's `onBlur` handler; display errors below each field using the same `oklch(0.50 0.18 20)` error color already defined.

3. **Raw oklch() literals bypass the token system** — 20+ hardcoded `oklch(...)` values appear directly in component `style` props (Footer.tsx, HomePage.tsx, DiagnosticoBar.tsx, ContactoPage.tsx, NosotrosPage.tsx). A palette change requires hunting every file. Promote recurring values — `oklch(0.72 0.04 265)` (footer body text), `oklch(0.55 0.06 265)` (footer dimmed), `oklch(0.48 0.06 255)` (accent-dim), `oklch(0.28 0.09 263)` (navy border) — to named tokens in `index.css` under `@theme` (e.g. `--color-on-brand-dim`, `--color-brand-border`) and reference them via `var()`.

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**Strengths — brand voice is sharp and consistent:**
- Hero: "Automatización operativa." — clear, differentiated, no generic filler.
- Hero CTAs: "Diagnóstico gratuito →" / "Servicios" — directional, not generic "Learn More".
- Bottom bar CTA: "Pedilo gratis →" — conversational, on-brand.
- Servicios bottom: "No sabés por dónde empezar." — confronts objection directly.
- Nosotros manifesto: six paragraphs, editorial rhythm, no corporate boilerplate.
- Success state: "Lo recibimos. / Te respondemos en menos de 24 horas hábiles." — specific, not "Thank you for your message."
- Error state: "Error al enviar. Intentá de nuevo o escribinos a hola@freeops.ai" — gives an escape hatch. Good.
- 404 page: "[ERR.404] / Página no encontrada." — technically flavored, consistent with brand.

**Findings:**

WARNING — `CasosSection` (HomePage.tsx:424): "En construcción" badge appears next to the section heading, and all four case cards render blurred at opacity 0.6 with a "PRÓXIMAMENTE" label. This is the correct signal to visitors, but there is no explanation of when cases will be available or a softer CTA encouraging prospects to be first. The current copy "Sé el primer caso publicado →" is adequate but the blurred blur-treatment for four items creates a large dead zone on the page with no alternative action shown.

WARNING — `useContactForm.ts:35`: `'https://formspree.io/f/PLACEHOLDER'` is not copy per se, but the submit button says "Solicitar diagnóstico →" while the endpoint delivers no mail. This is a functional trust-breaking issue — not a copywriting failure, but it surfaces here because the CTA promises an action that cannot complete.

No generic "Submit", "Click Here", "Save", or "Cancel" labels were found. No "No data" or "Nothing here" placeholders found. Score holds at 3/4 for the PLACEHOLDER issue.

---

### Pillar 2: Visuals (3/4)

**Strengths from screenshots:**
- Home hero: giant fluid headline with two-color split ("Automatización" navy / "operativa." accent) creates an immediate, unambiguous focal point. ParticleCanvas provides depth without competing with content.
- Servicios: accordion list with numbered labels (SVC.01–05) creates scannability. The `+` toggle indicator is clear. Active state changes label to brand color — reinforces the selected row.
- Nosotros: narrow single-column layout (`max-w-4xl`) suits long-form manifesto reading. Rhythm between paragraphs is clean.
- Contacto: two-column layout (form left, process steps right) is standard and unambiguous. Step numbers rendered in accent color aid scanning.
- Nav active underline animation (layoutId="nav-underline") is subtle and professional.
- Mobile: hamburger toggles to X correctly. Logo scales appropriately. Headline wraps cleanly.

**Findings:**

WARNING — DiagnosticoBar on mobile (audit-mob-home.jpeg): The fixed bottom bar only shows "Pedilo gratis →" with no accompanying label text (`hidden sm:block` hides the tagline). On a 375px screen the button floats without context — a user who hasn't read the hero copy cannot infer what they are requesting. Consider showing a 1-line label at `xs` or changing the button copy to "Diagnóstico gratis →" to be self-explanatory.

WARNING — Focus rings are declared on Button (`focus-visible:ring-2 focus-visible:ring-offset-2`) but `focus-visible:ring-{color}` is never specified. The ring color defaults to browser blue, which may clash with the warm cream background. Specify `focus-visible:ring-brand` or `focus-visible:ring-accent` to keep focus indicators on-brand.

WARNING — The custom cursor (`CustomCursor` component) suppresses the default cursor site-wide via `cursor: none` on `.cursor-active`. If the JS fails to mount (e.g. SSR, slow load), users lose the cursor entirely. The cursor class is applied in RootLayout, so timing is managed, but a race condition between paint and JS hydration is possible. No fallback `cursor: auto` is set as a safety net.

WARNING — Casos section: four blurred cards with no click affordance could be perceived as a rendering error on first view. Consider a smaller number of preview items or a different visual treatment (e.g. grayscale + lock icon) that more clearly signals "coming soon" rather than "content failed to load."

---

### Pillar 3: Color (3/4)

**Token system analysis:**

Properly tokenized in `@theme`:
- `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-border`
- `--color-muted`, `--color-text`, `--color-heading`
- `--color-brand`, `--color-brand-mid`, `--color-accent`, `--color-on-brand`

**Findings:**

WARNING — 20+ raw `oklch()` literals appear directly in component `style` props, bypassing the token system. Recurring instances:

| Literal | Usage | Files |
|---------|-------|-------|
| `oklch(0.72 0.04 265)` | Footer body text, DiagnosticoBar tagline | Footer.tsx:50,72,83; DiagnosticoBar.tsx:18 |
| `oklch(0.55 0.06 265)` | Footer section labels | Footer.tsx:30,40,64 |
| `oklch(0.48 0.06 255)` | Accent-dim (arrows, service links) | HomePage.tsx:243,285,302 |
| `oklch(0.28 0.09 263)` | Navy border in dark sections | HomePage.tsx:258,263,294; DiagnosticoBar.tsx:12 |
| `oklch(0.35 0.12 263)` | Large letter color in ServicesSection | HomePage.tsx:179 |
| `oklch(0.88 0.010 87)` | Service name color (navy canvas) | HomePage.tsx:270,278 |
| `oklch(0.78 0.025 87)` | Principle number color | NosotrosPage.tsx:205 |
| `oklch(0.62 0.04 87)` | Contact info labels | ContactoPage.tsx:124,145,160 |
| `oklch(0.58 0.12 255)` | CTA section accent line | HomePage.tsx:523 |
| `oklch(0.50 0.18 20)` | Error text (red) | ContactForm.tsx:155 |

The error red (`oklch(0.50 0.18 20)`) is used once without a token — this is particularly important as error colors have semantic meaning and should be centrally defined.

WARNING — Footer.tsx uses `oklch(0.36 0.06 263)` for `freeops.ai` domain label (line 100). This is a nearly invisible color against the navy footer background — verify contrast meets 4.5:1 for small text.

WARNING — `oklch(0.30 0.07 263)` used for the footer `borderTop` divider is defined inline (Footer.tsx:95). Should be `--color-brand-border` or similar.

Color distribution (60/30/10 rule): bg-cream dominates at roughly 70%, brand-navy used for header/footer/CTA sections at ~25%, accent blue appears sparingly for interactive elements and highlighted words. This is within acceptable range, no overuse detected.

---

### Pillar 4: Typography (4/4)

**System definition:**
- Font family: Geist Variable for all sans, Geist Mono Variable for technical labels and code.
- Utility classes: `.text-display` (wght 800, tracking -0.035em, lh 0.93) and `.text-headline` (wght 700, tracking -0.028em, lh 1.05) defined in index.css.
- Body: `font-sans`, wght 400, lh 1.6.

**Size usage (from screenshots and code):**
- Display: `clamp(2.4rem, 8.5vw, 8.5rem)` — hero H1
- Headline: `clamp(2rem, 4.6vw, 5rem)` to `clamp(2rem, 5.5vw, 5.5rem)` — page H1s
- `font-bold text-xl md:text-2xl` — service names
- `text-base` — body paragraphs
- `text-sm` — supporting text, taglines, form labels
- `text-xs` — mono labels, tracking-widest uppercase section tags
- `font-mono text-xl` — toggle character (minor)

Three distinct size tiers (display, body, label) plus two intermediate promotional sizes — total of 5, slightly above the ideal 4 for a disciplined scale, but each size has a clear semantic role. No arbitrary `[1.3rem]` or `[17px]` values found in TSX.

Weight usage: 800 (display), 700 (headline), 600 (semibold emphasis), 500 (medium buttons and nav), 400 (body). Five weights technically, but 800/400 are the main contrast pair; 700/600/500 are deliberate intermediate stops, not random additions.

Tracking-widest uppercase mono labels are used consistently for section identifiers (`Servicios`, `Stack`, `Capacidades`, `Qué pasa después`) — this is a strong systemic pattern.

No rogue font-family assignments, no hardcoded `font-size` px values in TSX other than the `fontSize: 'max(1rem, 16px)'` for inputs (justified by iOS zoom prevention).

Score: 4/4. Typography is the most disciplined pillar.

---

### Pillar 5: Spacing (3/4)

**System:**
Tailwind v4 default spacing scale in use. No custom `--spacing-*` tokens defined in `@theme`.

**Findings:**

WARNING — `ContactForm.tsx:15`: `padding: '13px 16px'` is an inline arbitrary value. `13px` is not on Tailwind's 4px-based scale (the closest values are `12px / py-3` or `14px`). This means input height is slightly inconsistent with button height (`min-h-[44px]` + `py-3` = 44px minimum). Both use `min-h-[44px]` but the padding creates a subtle discrepancy. Replace with `py-3 px-4` (12px/16px) to align with the scale.

WARNING — `Button.tsx:14`: `min-h-[44px]` is a Tailwind arbitrary value. While 44px is a correct WCAG touch target, it should be expressible as `min-h-11` (44px on the Tailwind scale) to avoid the `[]` syntax.

WARNING — `RootLayout.tsx:24`: `paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))'` is a raw inline style mixing a design value (4rem) with a CSS env function. This is unavoidable for safe-area, but the `4rem` (64px) value should be documented — it ensures content clears the fixed DiagnosticoBar (which is `py-3` + button height ≈ 50px). The 14px of extra clearance is generous but not problematic.

WARNING — Footer.tsx: `pb-24` (96px) and `pt-16` (64px) for footer padding vs. page sections using `py-16` (64px), `py-20` (80px), `py-24` (96px), `py-28` (112px). The scale is loosely consistent but four different values for section vertical rhythm without a documented tier creates accumulating inconsistency as new sections are added.

NOTE — Inline `gap-12`, `gap-8`, `gap-16`, `gap-4`, `gap-6` appear across pages without a documented spacing tier for layout gaps. Not a critical issue at current scale, but worth systemizing before adding more pages.

Overall spacing is functional and mostly Tailwind-native. No `[37px]` or `[1.3rem]` arbitrary values were found in layout-critical contexts.

---

### Pillar 6: Experience Design (2/4)

**State coverage audit:**

| State | Present | Quality |
|-------|---------|---------|
| Form sending | Yes (`status === 'sending'` → button shows "Enviando...", disabled) | Good |
| Form success | Yes (replacement block: "Lo recibimos.") | Good |
| Form error (network) | Yes (inline message with email fallback) | Good |
| Field-level validation | No | BLOCKER |
| Loading states (page transitions) | No skeleton or spinner | Missing |
| 404 page | Yes | Good |
| Empty states | N/A (no list views with user data) | N/A |
| Disabled button states | Yes (opacity 0.45 on disabled prop) | Good |
| Confirmation on destructive actions | N/A | N/A |

**Findings:**

BLOCKER — `useContactForm.ts:35`: The Formspree endpoint URL contains the literal string `PLACEHOLDER`. Every form submission in any deployed environment returns a 404 from Formspree. The UI correctly enters `status === 'error'` and shows the error message, but the core user action (requesting a diagnosis) cannot complete. This is a task-completion failure. Fix: replace `PLACEHOLDER` with the actual Formspree form ID, or implement a backend route / alternative service (Resend, EmailJS, etc.).

WARNING — No field-level validation messages. `ContactForm.tsx` uses `noValidate` which suppresses browser validation, but no custom per-field error display is implemented. A user who tabs through and leaves `email` empty, or enters a malformed email, receives no immediate feedback — only a network-level failure after submission. Expected pattern: validate on `onBlur`, set per-field `error` state, render below the field with `role="alert"` or `aria-live="polite"`.

WARNING — No validation that the `area` select has been changed from its disabled default ("Seleccioná una opción"). `required` is set, but with `noValidate` active and no JS enforcement, the form can be submitted with `area = ""`. The `handleSubmit` sends whatever is in `formData` with no pre-flight check.

WARNING — No `aria-describedby` or `aria-invalid` on form fields. When errors do occur at the form level, screen reader users get no field-level association between the error and the input.

WARNING — DiagnosticoBar on mobile shows only the "Pedilo gratis →" button with no label text. At 375px the button sits without context copy because `hidden sm:block` suppresses the tagline. A user arriving on a product sub-page via direct link sees a floating button with no indication of what is free.

WARNING — No ErrorBoundary wrapping the router children. If ParticleCanvas or any page component throws a runtime error, the entire app tree unmounts. An `<ErrorBoundary>` around `<Outlet />` in RootLayout would catch and gracefully degrade.

WARNING — ParticleCanvas respects `prefers-reduced-motion` correctly (skips animation entirely on reduce). However, when reduced-motion is active and the canvas does not render, the hero section background becomes a flat cream rectangle with no visual texture. A static SVG or CSS pattern fallback would maintain the visual design intent.

---

## Files Audited

**CSS / Design Tokens:**
- `src/styles/index.css`

**Layout:**
- `src/views/layout/Nav.tsx`
- `src/views/layout/Footer.tsx`
- `src/views/layout/RootLayout.tsx`

**Pages:**
- `src/views/pages/HomePage.tsx`
- `src/views/pages/ServiciosPage.tsx`
- `src/views/pages/NosotrosPage.tsx`
- `src/views/pages/ContactoPage.tsx`

**Components:**
- `src/views/components/primitives/Button.tsx`
- `src/views/components/ContactForm.tsx`
- `src/views/components/DiagnosticoBar.tsx`
- `src/views/components/ParticleCanvas.tsx`
- `src/views/components/CustomCursor.tsx` (partial)

**Controllers:**
- `src/controllers/useContactForm.ts`

**App:**
- `src/App.tsx`

**Screenshots:**
- `public/audit-home.jpeg` — Desktop home hero
- `public/audit-servicios.jpeg` — Desktop Servicios page
- `public/audit-nosotros.jpeg` — Desktop Nosotros page
- `public/audit-contacto.jpeg` — Desktop Contacto page
- `public/audit-mob-home.jpeg` — Mobile home (375px)
- `public/audit-mob-contacto.jpeg` — Mobile Contacto (375px)

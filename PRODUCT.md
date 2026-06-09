# FREEOPS — Product Context

## What it is
FREEOPS is a B2B AI and automation studio based in Rosario, Santa Fe, Argentina.
Founded by Juan Andrés Carlini. The studio builds operational automation systems
for companies: replacing manual, repetitive work with reliable, documented systems.

## Register
Brand. This is a marketing landing page / studio site. Design IS the product.
Visitors form an impression and decide whether to contact FREEOPS.

## Audience
Primary: SMB and mid-market business owners, operations managers, and directors
in Argentina. They are evaluating vendors. Non-technical but intelligent.
They are suspicious of "AI hype" and respond to specificity, concrete ROI, and
evidence of real competence. They want to know: "can you solve my problem?"

Secondary: Technical leads who vet vendors before presenting to decision-makers.

## Purpose
Convert visitors into diagnostic leads. The site must:
1. Establish credibility and expertise in the first 5 seconds
2. Communicate the five service verticals clearly
3. Make the "free diagnostic" CTA feel low-friction and high-value
4. Differentiate FREEOPS from generic AI consultancies and freelancers

## Services (5 verticals)
1. Customer Ops (SVC.01) — customer support automation, chatbots, routing
2. Internal Ops (SVC.02) — internal workflow automation
3. Sales Ops (SVC.03) — CRM integrations, lead processing
4. Finance Ops (SVC.04) — invoice processing, financial reporting
5. Infra Ops (SVC.05) — infrastructure automation, monitoring

## Brand Voice
- Direct, declarative, in Spanish rioplatense
- No buzzwords: no "potenciar", "sinergia", "soluciones innovadoras", "transformación digital"
- Short sentences, concrete verbs: automatizamos, construimos, conectamos, eliminamos
- Differentiators: Sin overhead / Sin hype / Sin dependencias permanentes

## Key Messages
- "Sistemas que reemplazan trabajo manual repetitivo"
- "IA donde hay fricción real, no donde está de moda"
- "El sistema es tuyo: con documentación, handoff y capacitación"
- Diagnóstico gratuito: the no-commitment entry point

## Tone
Premium precision meets Argentine directness. Not corporate-stiff. Not startup-casual.
The tone of a specialist who knows exactly what they're doing and charges accordingly.

## Visual Direction
- Base: bone white / off-white (oklch(0.985 0.003 265))
- Brand color: deep navy (oklch(0.20 0.12 263) — #002157 equivalent)
- Accent: medium blue (oklch(0.52 0.18 255)) for interactive elements
- Display: Syne 700/800 (distinctive geometric grotesque)
- Body: Plus Jakarta Sans 400/500/600
- Mono: IBM Plex Mono (for labels/data)
- Motion: cursor-interactive hero (Basement Studio reference), smooth reveals
- Strategy: Committed — navy carries the brand identity

## Anti-References
- The founder's developer portfolio (dark terminal aesthetic — this is clearly different)
- Generic AI tool landing pages (cream bg, purple gradients, 3-column feature card grids)
- Corporate consulting sites (stiff, dense, no personality)
- Current FREEOPS site (too similar to the portfolio, generic industrial terminal look)

## Technical Constraints
- Vite 8 + React 19 + TypeScript strict + Tailwind v4 + React Router v7
- motion/react for all animations
- Self-hosted fonts via @fontsource
- MVC architecture: models/ controllers/ views/
- Deploy: dev on localhost, push to GitHub dev branch by user only

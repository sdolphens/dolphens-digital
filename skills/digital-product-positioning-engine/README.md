# Digital Product Positioning Engine — Claude Skill

A production-grade Claude Skill that turns weak, generic digital products into differentiated, high-converting offers.

This is not a copywriting toy. It is structured to behave like a paid senior positioning consultant: it diagnoses honestly, refuses to use marketing clichés, names specific buyers (not demographics), and ships a complete deliverable — positioning summary, differentiation analysis, 10 distinct angles, buyer psychology map, 5+ thumbnail concepts, 20 titles, full description rewrite, offer optimization, niche-gap analysis, and a psychological "why this sells" breakdown.

## Who it's for

- Etsy digital sellers
- Gumroad creators
- Notion / spreadsheet / Figma template makers
- AI prompt pack and AI tool sellers
- Solo creators building creator-monetization businesses

## What it does

Given a product (title, description, screenshots, price, platform, competitors), the skill produces a Full Positioning Audit covering:

1. Market Positioning Summary
2. Differentiation Analysis
3. 10+ High-Conversion Positioning Angles
4. Buyer Psychology Map
5. Thumbnail Psychology (5+ concepts)
6. 20 Title Variations across sophistication levels
7. Complete Product Description
8. Offer Optimization (bundles, pricing, upsells, bonuses, premium tier)
9. Niche Gap Analysis
10. "Why This Sells" psychological breakdown

It also supports **Targeted Modules** (single-section requests), **Critique-only** mode (no rewrites), **Comparison** mode (vs. specific competitors), and **Reposition / Pivot** mode (changing category or audience).

## Architecture

Progressive disclosure: the main `SKILL.md` is the entry point. Heavier domain reference files are loaded only when the request requires them.

```
digital-product-positioning-engine/
├── SKILL.md                                # Main entry (identity, rules, workflow, sections)
├── README.md                               # This file
├── references/
│   ├── intake-questionnaire.md             # Input collection structure
│   ├── analysis-framework.md               # 8-pass diagnostic engine
│   ├── output-template.md                  # Mandatory output structure
│   ├── anti-generic-safeguards.md          # Banned phrases + generic-pattern detector
│   ├── positioning-angles-library.md       # 7 families, 25+ angle archetypes
│   ├── buyer-psychology-frameworks.md      # JTBD + Maslow + identity/status overlay
│   ├── thumbnail-psychology.md             # Hierarchy, contrast, 6 click-triggers
│   ├── competitor-analysis.md              # How to extract positioning DNA
│   └── pricing-and-offer-design.md         # Tiering, bundles, anchors, premium-tier sketch
└── examples/
    ├── example-notion-template.md          # Full Audit (Notion productivity template)
    ├── example-etsy-printable.md           # Targeted Module (title + thumbnail only)
    └── example-prompt-pack.md              # Critique-only (commoditized category)
```

## Installation

### Claude Code

Copy the `digital-product-positioning-engine/` folder into one of:

- `~/.claude/skills/` (user-level, available across all projects)
- `<project>/.claude/skills/` (project-scoped)

The skill auto-loads when Claude detects a request matching its description.

### Claude.ai (Skills feature) / API

Upload the folder as a Skill via the Anthropic console or use the Files API to register `SKILL.md` plus the `references/` and `examples/` directories.

## Activation triggers

The skill self-activates when a user:

- Shares a product title, description, screenshot, or listing URL.
- Asks how to make a product stand out, convert better, or sell more.
- Requests positioning analysis, conversion copywriting, or thumbnail ideation.
- Wants an honest critique of why an offer feels generic.

You can also invoke it explicitly: *"Use the digital-product-positioning-engine skill on this product."*

## Design principles

- **Diagnose before prescribing.** No titles, thumbnails, or descriptions are written until the analysis passes are complete internally.
- **Specificity over scale.** Buyers are named situations, not demographics.
- **Honesty is a feature.** The skill is willing to recommend pulling a listing, raising a price, or declining to write a rewrite if the underlying offer is broken.
- **Anti-generic by design.** A self-check loop runs before every deliverable to strip clichés and category-default phrasing.
- **Progressive disclosure.** Domain references are pulled in only when needed, keeping the main context lean.

## Quality bar

A finished audit should:

- Be hand-off-able to a designer/copywriter the same day.
- Contain at least one observation the creator hadn't seen before.
- Make the creator say "yes, that's exactly who I'm trying to reach" — or "no, I want a different person", which is itself a useful pivot.
- Include at least one uncomfortable, obviously fair critique.

If the output reads like generic marketing AI fluff, the skill has failed the brief — the safeguard loop in `references/anti-generic-safeguards.md` is designed to catch this before delivery.

## License

Proprietary.

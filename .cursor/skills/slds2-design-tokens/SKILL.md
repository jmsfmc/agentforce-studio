---
name: slds2-design-tokens
description: Enforces Salesforce Lightning Design System (SLDS) 2 UI development with tokens and existing components only, and a single theme file for all visual customization. Use when building or editing Salesforce-style UI, Agentforce, or SLDS-based components.
---

# SLDS 2 UI Development

## Goal

Build Salesforce UI using **SLDS 2** with **existing SLDS components** and **design tokens** only. Any visual customization must live in **one dedicated theme file**.

## Non-negotiables

### 1. Always use SLDS 2 tokens and variables

- Use SLDS token variables for color, spacing, radius, typography, shadows, and motion.
- Do not hardcode hex values, pixel values, or arbitrary CSS values in components, except where the SLDS API explicitly requires a numeric value.

### 2. Always use existing components

- Prefer official SLDS components (or your internal SLDS wrapper library) over custom primitives.
- If a pattern exists in SLDS, use it. Do not recreate it.

### 3. All visual customization lives in one theme file

- Brand styling, density changes, color tweaks, typography changes, or component variant styling must go in: `src/theme/slds-theme.css`
- No component-level CSS overrides.
- No inline styles for appearance.
- No local CSS modules for visual tweaks.

### 4. No one-off CSS in components

- Components may use SLDS utility classes for layout and spacing where tokens back them.
- New CSS classes are allowed only as **structural hooks**, not for visuals.

## What is allowed in components

**You may use:** official SLDS component markup and APIs; SLDS utility classes for layout, spacing, and alignment; component props, variants, and slots; references to theme variables indirectly (not ad hoc styling).

**You must not use:** hardcoded values like `#0176d3`, `12px`, `margin: 10px`, or custom shadows; `style={{ ... }}` or inline `style=""` for appearance; local CSS files that change visuals; reimplementations of existing SLDS components.

## If SLDS does not have the exact component

1. Confirm no SLDS component or documented pattern exists.
2. Compose from smaller official SLDS components.
3. If still impossible, create a wrapper component that:
   - Uses SLDS tokens and classes.
   - Introduces **zero new visual CSS** outside the theme file.
   - Documents why it exists and what SLDS gap it fills.

## Theme file contract

**Single source of truth:** `src/theme/slds-theme.css`

**Responsibilities:** import SLDS token sets if required by your build system; define token overrides where needed; define approved "app variables" only as aliases of SLDS tokens.

**Suggested structure:**

1. Token overrides  
2. App aliases (must map directly to SLDS tokens)  
3. Component variant hooks (only if SLDS supports them via tokens or CSS vars)

**Rules:**

- Visual CSS may exist here, but only by referencing tokens.
- You may define aliases like `--app-radius-md`, but they must equal SLDS tokens, not raw values.
- Component-specific overrides are allowed only if token-driven and globally consistent.

## Code generation checklist (enforce before finalizing UI)

- [ ] Uses an SLDS component (or approved internal wrapper).
- [ ] Uses SLDS tokens, variables, or SLDS utilities.
- [ ] No inline styles for appearance.
- [ ] No new visual CSS outside `src/theme/slds-theme.css`.
- [ ] Any new variant is implemented via theme tokens or documented SLDS APIs.
- [ ] Accessibility, focus states, and keyboard navigation are preserved.

## Required output format when editing files

When implementing UI, state:

1. Which SLDS components were used and why.
2. Which token variables were referenced.
3. If a visual change was needed:
   - Show the change in `src/theme/slds-theme.css`.
   - Explain the token or variable mapping.
   - Confirm no other visual overrides were added.

## Expected file layout

```
src/
  theme/
    slds-theme.css   # Only place for visual styling
  components/
    ...              # Uses SLDS components, tokens, and utilities only
  styles/
    ...              # Optional, non-visual concerns only
```

## What to push back on

Block or refactor if you see:

- Any hex color, `rgb()`, or non-token color in component code.
- Any `px` spacing or sizing that could use SLDS utilities or tokens.
- Any inline styles that affect appearance.
- Any local stylesheet that changes visuals.
- Custom implementations of buttons, inputs, tooltips, modals, dropdowns, pills, badges, or cards when SLDS already provides them.

## Smallest reversible step principle

When uncertain, choose the smallest change that:

- Uses the closest existing SLDS component.
- Keeps styling strictly token-based.
- Moves brand differences into the theme file.
- Avoids introducing new abstractions.

Review theme file growth monthly and prune unused aliases.

## Additional resources

- Theme file skeleton and token override examples: [reference.md](reference.md)

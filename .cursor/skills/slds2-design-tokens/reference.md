# SLDS 2 Theme File Reference

## Theme file skeleton

Use this structure in `src/theme/slds-theme.css`. App aliases must map to SLDS tokens only.

```css
/* ============================================
   src/theme/slds-theme.css
   Single source of truth for visual styling.
   ============================================ */

/* 1. Imports (if required by your build) */
/* @import "@salesforce-ux/design-tokens/dist/index.css"; */

/* 2. Token overrides (brand or product-specific) */
:root {
  /* Example: override a semantic token if your brand requires it */
  /* --slds-g-color-background-alt: var(--slds-g-palette-neutral-95); */
}

/* 3. App aliases (must equal SLDS tokens, not raw values) */
:root {
  /* --app-radius-md: var(--slds-g-radius-medium); */
  /* --app-spacing-card: var(--slds-g-spacing-medium); */
}

/* 4. Component variant hooks (only if SLDS supports via tokens/CSS vars) */
/* Use sparingly; keep globally consistent and token-driven. */
```

## Token override example

Override only when necessary; prefer SLDS defaults.

```css
:root {
  /* Override semantic background for a branded surface */
  --slds-g-color-background-alt: var(--slds-g-palette-neutral-98);
}
```

## App alias rules

- **Allowed:** `--app-radius-md: var(--slds-g-radius-medium);`
- **Not allowed:** `--app-radius-md: 8px;` (raw value instead of token)

If the project has no token overrides or aliases yet, keep the theme file minimal and add only when a concrete brand or product requirement appears.

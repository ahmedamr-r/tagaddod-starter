# CSS Logical Properties for RTL Support

Complete reference for modern CSS logical properties that automatically adapt to text direction. Use these properties when implementing custom components to ensure proper RTL (Right-to-Left) support.

## Why Logical Properties?

Logical properties use direction-agnostic terms (`start`, `end`, `inline`, `block`) instead of physical directions (`left`, `right`, `top`, `bottom`). This allows layouts to automatically adapt when `document.dir` changes from `ltr` to `rtl`.

**Browser Support**: 96%+ (all modern browsers support logical properties as of 2024)

---

## Complete Property Mapping

### Margin Properties

| Physical Property | Logical Property | Description |
|-------------------|------------------|-------------|
| `margin-left` | `margin-inline-start` | Start of inline direction |
| `margin-right` | `margin-inline-end` | End of inline direction |
| `margin-top` | `margin-block-start` | Start of block direction |
| `margin-bottom` | `margin-block-end` | End of block direction |

**Example:**
```css
/* ❌ Physical (requires manual RTL handling) */
.element {
  margin-left: var(--t-space-400);
  margin-right: var(--t-space-200);
}

/* ✅ Logical (automatically adapts) */
.element {
  margin-inline-start: var(--t-space-400);
  margin-inline-end: var(--t-space-200);
}
```

### Padding Properties

| Physical Property | Logical Property | Description |
|-------------------|------------------|-------------|
| `padding-left` | `padding-inline-start` | Start of inline direction |
| `padding-right` | `padding-inline-end` | End of inline direction |
| `padding-top` | `padding-block-start` | Start of block direction |
| `padding-bottom` | `padding-block-end` | End of block direction |

**Example:**
```css
/* ❌ Physical */
.button {
  padding-left: var(--t-space-300);
  padding-right: var(--t-space-300);
  padding-top: var(--t-space-200);
  padding-bottom: var(--t-space-200);
}

/* ✅ Logical */
.button {
  padding-inline-start: var(--t-space-300);
  padding-inline-end: var(--t-space-300);
  padding-block-start: var(--t-space-200);
  padding-block-end: var(--t-space-200);
}

/* OR use shorthand */
.button {
  padding-inline: var(--t-space-300);
  padding-block: var(--t-space-200);
}
```

### Border Properties

| Physical Property | Logical Property | Description |
|-------------------|------------------|-------------|
| `border-left` | `border-inline-start` | Start of inline direction |
| `border-right` | `border-inline-end` | End of inline direction |
| `border-top` | `border-block-start` | Start of block direction |
| `border-bottom` | `border-block-end` | End of block direction |
| `border-left-width` | `border-inline-start-width` | Border width at inline start |
| `border-right-width` | `border-inline-end-width` | Border width at inline end |
| `border-left-color` | `border-inline-start-color` | Border color at inline start |
| `border-right-color` | `border-inline-end-color` | Border color at inline end |
| `border-left-style` | `border-inline-start-style` | Border style at inline start |
| `border-right-style` | `border-inline-end-style` | Border style at inline end |

**Example:**
```css
/* ❌ Physical */
.sidebar {
  border-right: 1px solid var(--t-color-border-secondary);
}

/* ✅ Logical */
.sidebar {
  border-inline-end: 1px solid var(--t-color-border-secondary);
}

/* Separate properties */
.card {
  border-inline-start-width: var(--t-border-width-25);
  border-inline-start-style: solid;
  border-inline-start-color: var(--t-color-border-primary);
}
```

### Position Properties (Inset)

| Physical Property | Logical Property | Description |
|-------------------|------------------|-------------|
| `left` | `inset-inline-start` | Start of inline direction |
| `right` | `inset-inline-end` | End of inline direction |
| `top` | `inset-block-start` | Start of block direction |
| `bottom` | `inset-block-end` | End of block direction |

**Example:**
```css
/* ❌ Physical */
.tooltip {
  position: absolute;
  left: 0;
  top: 100%;
}

/* ✅ Logical */
.tooltip {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 100%;
}

/* Shorthand */
.overlay {
  position: fixed;
  inset: 0; /* All sides */
}
```

### Text Alignment

| Physical Property | Logical Property | Description |
|-------------------|------------------|-------------|
| `text-align: left` | `text-align: start` | Align to start of inline direction |
| `text-align: right` | `text-align: end` | Align to end of inline direction |

**Example:**
```css
/* ❌ Physical */
.heading {
  text-align: left;
}

/* ✅ Logical */
.heading {
  text-align: start;
}
```

### Border Radius

| Physical Property | Logical Property | Description |
|-------------------|------------------|-------------|
| `border-top-left-radius` | `border-start-start-radius` | Block-start and inline-start corner |
| `border-top-right-radius` | `border-start-end-radius` | Block-start and inline-end corner |
| `border-bottom-left-radius` | `border-end-start-radius` | Block-end and inline-start corner |
| `border-bottom-right-radius` | `border-end-end-radius` | Block-end and inline-end corner |

**Example:**
```css
/* ❌ Physical */
.card {
  border-top-left-radius: var(--t-border-radius-200);
  border-top-right-radius: var(--t-border-radius-200);
}

/* ✅ Logical */
.card {
  border-start-start-radius: var(--t-border-radius-200);
  border-start-end-radius: var(--t-border-radius-200);
}

/* Note: For equal radii, use shorthand */
.card {
  border-radius: var(--t-border-radius-200);
  /* This works in all directions */
}
```

---

## Flexbox Logical Properties

Flexbox adapts automatically to direction changes in most cases, but understanding logical terminology helps.

### Flex Direction

```css
.container {
  display: flex;
  flex-direction: row; /* Inline axis */
  /* In LTR: left to right */
  /* In RTL: right to left */
}

.container {
  display: flex;
  flex-direction: row-reverse; /* Reversed inline axis */
  /* In LTR: right to left */
  /* In RTL: left to right */
}

.container {
  display: flex;
  flex-direction: column; /* Block axis */
  /* Always top to bottom */
}
```

### Justify Content (Main Axis)

```css
.container {
  display: flex;
  justify-content: flex-start;
  /* In LTR: Items align to left */
  /* In RTL: Items align to right */
}

.container {
  display: flex;
  justify-content: flex-end;
  /* In LTR: Items align to right */
  /* In RTL: Items align to left */
}

/* Preferred: Use start/end for clarity */
.container {
  display: flex;
  justify-content: start; /* Aligns to start of direction */
}

.container {
  display: flex;
  justify-content: end; /* Aligns to end of direction */
}
```

### Align Items (Cross Axis)

```css
.container {
  display: flex;
  align-items: flex-start; /* Top (in row direction) */
  align-items: flex-end;   /* Bottom (in row direction) */
  align-items: center;     /* Vertically centered */
  align-items: baseline;   /* Text baseline alignment */
  align-items: stretch;    /* Fill container (default) */
}
```

### Gap Property

The `gap` property is direction-agnostic and works perfectly with RTL:

```css
.container {
  display: flex;
  gap: var(--t-space-200);
  /* Spacing between items works in all directions */
}

.container {
  display: flex;
  row-gap: var(--t-space-300);
  column-gap: var(--t-space-200);
  /* Separate control for each axis */
}
```

### Flex Item Properties

```css
.item {
  margin-inline-start: auto;
  /* Pushes item to end of container in both LTR/RTL */
}

.item {
  margin-inline-end: auto;
  /* Pushes item to start of container in both LTR/RTL */
}
```

---

## Grid Logical Properties

CSS Grid works excellently with logical properties.

### Grid Template Columns/Rows

```css
.grid {
  display: grid;
  grid-template-columns: 250px 1fr;
  /* First column 250px, second column flexible */
  /* Automatically adapts to RTL: right column 250px in RTL */
}
```

### Grid Placement

```css
/* Named grid areas adapt automatically */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  /* Order reverses in RTL */
}

.sidebar {
  grid-area: sidebar;
  /* Automatically appears on correct side */
}
```

### Grid Item Positioning

```css
/* Column placement */
.item {
  grid-column-start: 1;
  grid-column-end: 3;
  /* In RTL, these positions reverse automatically */
}

/* Logical positioning */
.item {
  justify-self: start; /* Aligns to start of grid cell */
  justify-self: end;   /* Aligns to end of grid cell */
}
```

### Gap in Grid

```css
.grid {
  display: grid;
  gap: var(--t-space-400);
  /* Spacing between grid items works in all directions */
}

.grid {
  display: grid;
  row-gap: var(--t-space-400);
  column-gap: var(--t-space-300);
  /* Separate control */
}
```

---

## Common Patterns & Transformations

### Pattern 1: Sidebar Layout

```css
/* ❌ Physical - Requires manual RTL handling */
.layout {
  display: flex;
}

.sidebar {
  width: 250px;
  border-right: 1px solid var(--t-color-border-secondary);
  margin-right: var(--t-space-400);
}

:global([dir="rtl"]) .sidebar {
  border-right: none;
  border-left: 1px solid var(--t-color-border-secondary);
  margin-right: 0;
  margin-left: var(--t-space-400);
}

/* ✅ Logical - Automatic adaptation */
.layout {
  display: flex;
}

.sidebar {
  width: 250px;
  border-inline-end: 1px solid var(--t-color-border-secondary);
  margin-inline-end: var(--t-space-400);
}
/* No RTL-specific styles needed! */
```

### Pattern 2: Card with Icon

```css
/* ❌ Physical */
.card {
  display: flex;
  padding: var(--t-space-400);
}

.icon {
  margin-right: var(--t-space-300);
}

:global([dir="rtl"]) .icon {
  margin-right: 0;
  margin-left: var(--t-space-300);
}

/* ✅ Logical */
.card {
  display: flex;
  padding: var(--t-space-400);
  gap: var(--t-space-300);
  /* Gap handles spacing automatically */
}
```

### Pattern 3: Tooltip Positioning

```css
/* ❌ Physical */
.tooltip {
  position: absolute;
  left: 0;
  top: 100%;
}

:global([dir="rtl"]) .tooltip {
  left: auto;
  right: 0;
}

/* ✅ Logical */
.tooltip {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 100%;
}
```

### Pattern 4: Form Field

```css
/* ❌ Physical */
.formField {
  display: flex;
  align-items: center;
}

.label {
  margin-right: var(--t-space-200);
  text-align: left;
}

:global([dir="rtl"]) .label {
  margin-right: 0;
  margin-left: var(--t-space-200);
  text-align: right;
}

/* ✅ Logical */
.formField {
  display: flex;
  align-items: center;
  gap: var(--t-space-200);
}

.label {
  text-align: start;
}
```

### Pattern 5: Navigation Menu

```css
/* ❌ Physical */
.menu {
  display: flex;
}

.menuItem {
  padding-left: var(--t-space-300);
  padding-right: var(--t-space-300);
  border-left: 2px solid transparent;
}

.menuItem.active {
  border-left-color: var(--t-color-border-brand);
}

:global([dir="rtl"]) .menuItem {
  border-left: none;
  border-right: 2px solid transparent;
}

:global([dir="rtl"]) .menuItem.active {
  border-right-color: var(--t-color-border-brand);
}

/* ✅ Logical */
.menu {
  display: flex;
}

.menuItem {
  padding-inline: var(--t-space-300);
  border-inline-start: 2px solid transparent;
}

.menuItem.active {
  border-inline-start-color: var(--t-color-border-brand);
}
```

---

## When Logical Properties Are Not Enough

Some scenarios still require `:global([dir="rtl"])` selectors:

### Scenario 1: Directional Content

```css
/* Separator changes in RTL */
.separator::before {
  content: '/';
}

:global([dir="rtl"]) .separator::before {
  content: '\\';
}
```

### Scenario 2: Asymmetric Designs

```css
/* Design intentionally different in RTL */
.banner {
  background-position: right center;
}

:global([dir="rtl"]) .banner {
  background-position: left center;
}
```

### Scenario 3: Complex Transformations

```css
/* Rotation or transform adjustments */
.arrow {
  transform: rotate(0deg);
}

:global([dir="rtl"]) .arrow {
  transform: rotate(180deg);
}
```

---

## Shorthand Properties

Many logical properties have shorthand forms:

```css
/* Inline dimension (horizontal in LTR) */
.element {
  margin-inline: var(--t-space-200) var(--t-space-400);
  /* start: 200, end: 400 */
}

.element {
  padding-inline: var(--t-space-300);
  /* Both start and end: 300 */
}

/* Block dimension (vertical) */
.element {
  margin-block: var(--t-space-400) var(--t-space-200);
  /* start: 400, end: 200 */
}

/* Border shorthand */
.element {
  border-inline: 1px solid var(--t-color-border-primary);
  /* Both start and end borders */
}

.element {
  border-inline-start: 1px solid var(--t-color-border-secondary);
  /* Only start border */
}
```

---

## Migration Strategy

When converting existing components to logical properties:

### Step 1: Identify Directional Properties

Search for these patterns in your CSS:
- `left`, `right` (except in `border-radius`)
- `margin-left`, `margin-right`
- `padding-left`, `padding-right`
- `border-left`, `border-right`
- `text-align: left`, `text-align: right`

### Step 2: Replace with Logical Equivalents

Use the mapping tables above to replace physical with logical.

### Step 3: Test Both Directions

```javascript
// LTR mode
document.documentElement.dir = 'ltr';

// RTL mode
document.documentElement.dir = 'rtl';
```

Verify layout works correctly in both modes.

### Step 4: Remove RTL-Specific Overrides

If using logical properties correctly, most `:global([dir="rtl"])` selectors become unnecessary.

**Keep only for:**
- Directional content (separators, icons)
- Line-height trimming (pseudo-elements)
- Font family switching
- Intentional design differences

---

## Browser Support Notes

**Logical properties are well-supported:**
- Chrome/Edge: 87+ (Dec 2020)
- Firefox: 66+ (Mar 2019)
- Safari: 14.1+ (Apr 2021)

**Coverage**: 96%+ of global browser traffic (as of 2024)

**Fallback strategy**: For legacy browser support (if needed):

```css
.element {
  /* Fallback for old browsers */
  margin-left: var(--t-space-400);
  /* Modern logical property */
  margin-inline-start: var(--t-space-400);
}
```

Modern browsers use the logical property; legacy browsers use the physical fallback.

---

## Summary

**Key Principles:**

1. **Always prefer logical properties** over physical directions
2. **Use `gap` for spacing** in flex and grid layouts
3. **Use `start`/`end` instead of `left`/`right`** for text alignment
4. **Test in both LTR and RTL** to verify automatic adaptation
5. **Reserve `:global([dir="rtl"])`** for special cases only

**Quick Reference:**
- `left` → `inline-start`
- `right` → `inline-end`
- `top` → `block-start`
- `bottom` → `block-end`

**Benefits:**
- ✅ Automatic RTL adaptation
- ✅ Cleaner code (fewer RTL overrides)
- ✅ Future-proof (modern CSS standard)
- ✅ Better maintainability

For complete RTL implementation, combine logical properties with the line-height fix pattern from `line-height-fix-patterns.md`.

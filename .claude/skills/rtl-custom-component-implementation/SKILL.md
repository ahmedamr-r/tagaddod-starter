---
name: rtl-custom-component-implementation
description: Implement comprehensive RTL support for custom components (Shadcn/Antd/custom-built) that are NOT native to Tagaddod Design System. Provides 6-step workflow with line-height fix, CSS logical properties, layout mirroring, and design tokens. Use when adapting Tier 2-4 components or when user requests Arabic/RTL for custom components.
---

# RTL Implementation for Custom Components

**Complete RTL/LTR implementation workflow for Shadcn, Ant Design, and custom-built components**

---

## 📖 Overview

This skill provides comprehensive RTL (Right-to-Left) language support for custom components that are **NOT native to the Tagaddod Design System**. When you need to adapt external components or build custom components from scratch, this workflow ensures proper Arabic and Hebrew language support.

---

## 🎯 When to Use This Skill

Use this skill in these scenarios:

- **Tier 2 Implementation**: Adapting Shadcn components to Tagaddod with RTL support
- **Tier 3 Implementation**: Adapting Ant Design components to Tagaddod with RTL support
- **Tier 4 Implementation**: Building custom components from scratch that need RTL
- **After Tier 1 Fails**: Component NOT found in `.component-documentation/` directory
- **User Requests Arabic/RTL**: User explicitly requests Arabic language support or mentions RTL

**Integration with Component Discovery**:

This skill automatically activates after the 4-tier discovery workflow determines the component requires external implementation.

```
Tier 1: Check Tagaddod native (.component-documentation/) → NOT FOUND
    ↓
Tier 2: Search Shadcn component → FOUND
    ↓
🔴 ACTIVATE THIS SKILL → Apply RTL patterns to Shadcn component
```

---

## ⚠️ Important Note

**This skill is for CUSTOM components only** (Tier 2-4: Shadcn, Ant Design, custom-built).

For **native Tagaddod components** from `.component-documentation/`, use the **`rtl-auto-switching`** skill instead. Native components have built-in auto-switching and require zero manual configuration.

---

## 🔧 RTL Implementation Workflow (6 Steps)

Follow these steps in order for every custom component. Each step builds on the previous one to create comprehensive RTL support.

### Step 1: Component Foundation - Apply Line Height Fix

Implement the proven line-height fix pattern that ensures proper text rendering for both English and Arabic fonts.

**Detect RTL direction:**
```typescript
const isRTL = typeof document !== 'undefined' &&
  (document.dir === 'rtl' || document.documentElement.dir === 'rtl');
```

**Create line height style object:**
```typescript
const lineHeightStyle = {
  lineHeight: isRTL ? 'var(--t-line-height-arabic, 1.2)' : 'var(--t-line-height-english, 1.5)'
};
```

**Apply to ALL text elements:**
```typescript
<label style={lineHeightStyle}>Label text</label>
<span style={lineHeightStyle}>Content text</span>
<div className={styles.description} style={lineHeightStyle}>Description</div>
<p style={lineHeightStyle}>Paragraph text</p>
```

**Critical**: Apply `lineHeightStyle` to every element containing text. Missing even one text element will cause inconsistent rendering between English and Arabic modes.

**For complete implementation patterns**, read `references/line-height-fix-patterns.md` which contains:
- Full TypeScript patterns for all component types
- Complete CSS module implementation with pseudo-elements
- Implementation checklist
- Working examples ready to copy

### Step 2: Use CSS Logical Properties

Replace all directional CSS properties with logical equivalents that automatically adapt to text direction.

**Common replacements:**

| Old (Directional) | New (Logical) |
|-------------------|---------------|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `border-left` | `border-inline-start` |
| `border-right` | `border-inline-end` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `left: 0` | `inset-inline-start: 0` |
| `right: 0` | `inset-inline-end: 0` |

**Example transformation:**
```css
/* ❌ WRONG - Directional properties */
.component {
  margin-left: var(--t-space-400);
  padding-right: var(--t-space-200);
  border-left: 1px solid var(--t-color-border-primary);
  text-align: left;
}

/* ✅ CORRECT - Logical properties */
.component {
  margin-inline-start: var(--t-space-400);
  padding-inline-end: var(--t-space-200);
  border-inline-start: 1px solid var(--t-color-border-primary);
  text-align: start;
}
```

**For comprehensive mapping and browser support**, read `references/css-logical-properties.md`.

### Step 3: Implement RTL-Specific CSS Overrides

Add `:global([dir="rtl"])` selectors for RTL-specific styling adjustments and line-height trimming.

**Line-height trimming pattern:**
```css
.textElement {
  position: relative;
  line-height: 1.5;
}

/* Line height trim for English (smaller trim) */
.textElement::before,
.textElement::after {
  content: '';
  display: block;
  height: 0;
}

.textElement::before {
  margin-top: -0.15em;
}

.textElement::after {
  margin-bottom: -0.15em;
}

/* Line height trim for Arabic (larger trim) */
:global([dir="rtl"]) .textElement::before {
  margin-top: -0.25em;
}

:global([dir="rtl"]) .textElement::after {
  margin-bottom: -0.25em;
}
```

**RTL layout adjustments:**
```css
/* Border swapping */
.sidebar {
  border-right: 1px solid var(--t-color-border-secondary);
}

:global([dir="rtl"]) .sidebar {
  border-left: 1px solid var(--t-color-border-secondary);
  border-right: none;
}

/* Text alignment */
:global([dir="rtl"]) .content {
  text-align: right;
  font-family: var(--t-font-family-arabic);
}

/* Position adjustments */
.tooltip {
  left: 0;
}

:global([dir="rtl"]) .tooltip {
  left: auto;
  right: 0;
}
```

### Step 4: Handle Layout Mirroring

Ensure layout elements adapt correctly to RTL direction.

**Flexbox layouts:**
Most flexbox layouts adapt automatically, but verify these properties:
```css
.container {
  display: flex;
  justify-content: flex-start; /* Becomes flex-end in RTL */
  gap: var(--t-space-200); /* Works in all directions */
}
```

**Icon positioning:**
Prefix and suffix icons automatically swap positions in RTL mode. However, directional icons (arrows, chevrons) require manual selection:

```typescript
import { useTheme } from '@tagaddod-design/react';
import { IconArrowLeft, IconArrowRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// Inside component
const { isRTL } = useTheme();

// For "Next" action: arrow points in reading direction
const NextIcon = isRTL ? IconArrowLeft : IconArrowRight;
const NextChevron = isRTL ? IconChevronLeft : IconChevronRight;

// For "Back" action: arrow points against reading direction
const BackIcon = isRTL ? IconArrowRight : IconArrowLeft;
const BackChevron = isRTL ? IconChevronRight : IconChevronLeft;

<Button suffixIcon={<NextIcon />}>
  {isRTL ? 'التالي' : 'Next'}
</Button>
```

**Grid layouts:**
Use logical properties for grid placement:
```css
.gridItem {
  grid-column-start: 1;
  /* Automatically adapts in RTL */
}
```

### Step 5: Apply Tagaddod Design Tokens

Integrate design tokens for all styling to maintain visual consistency with the Tagaddod Design System.

**Mandatory token usage:**
```css
.customComponent {
  /* Colors */
  background-color: var(--t-color-surface-primary);
  color: var(--t-color-text-primary);
  border: var(--t-border-width-25) solid var(--t-color-border-secondary);

  /* Spacing */
  padding: var(--t-space-400);
  margin-inline-start: var(--t-space-200);
  gap: var(--t-space-300);

  /* Typography */
  font: var(--t-typography-body-md);

  /* Layout */
  border-radius: var(--t-border-radius-300);
}
```

**Never use hardcoded values:**
```css
/* ❌ WRONG */
.component {
  color: #333;
  padding: 16px;
  font-size: 14px;
  border-radius: 8px;
}

/* ✅ CORRECT */
.component {
  color: var(--t-color-text-primary);
  padding: var(--t-space-400);
  font: var(--t-typography-body-md);
  border-radius: var(--t-border-radius-200);
}
```

**For token selection guidance**, consult `.component-documentation/DesignTokens.mdx` which includes:
- Decision trees for token selection
- Complete token catalog
- Usage patterns and anti-patterns
- Component styling workflows

### Step 6: Verify Implementation

Test the component to ensure RTL support works correctly.

**Quick verification steps:**

1. **Test RTL switching:**
```javascript
// Switch to RTL in browser console
document.documentElement.dir = 'rtl';

// Switch back to LTR
document.documentElement.dir = 'ltr';
```

2. **Verify checklist:**
- [ ] Line-height style applied to all text elements
- [ ] CSS pseudo-element trimming implemented
- [ ] No `left/right` directional properties remain
- [ ] `:global([dir="rtl"])` selectors present for overrides
- [ ] All styling uses design tokens (no hardcoded values)
- [ ] Directional icons selected manually based on `isRTL`
- [ ] Layout mirrors correctly in RTL mode
- [ ] Text alignment correct (right in RTL, left in LTR)
- [ ] Borders appear on correct side
- [ ] Component visually consistent with Tagaddod components

3. **Test with actual Arabic content:**
```typescript
// Use Arabic text to verify rendering
const arabicText = "مرحبا بك في نظام التصميم";
```

---

## 🎨 Component Categories & RTL Patterns

Apply these patterns based on component category.

### Form Components (Input, Select, Checkbox, RadioButton)

**Key RTL considerations:**
- Label positioning (right-aligned in RTL)
- Input text direction (auto-adapts)
- Prefix/suffix icon swapping
- Error message alignment
- Help text positioning

**Example pattern:**
```typescript
<div className={styles.formField}>
  <label style={lineHeightStyle}>{label}</label>
  <input
    className={styles.input}
    style={lineHeightStyle}
    dir="auto" // Auto-detect text direction
  />
  {error && (
    <span className={styles.error} style={lineHeightStyle}>
      {error}
    </span>
  )}
</div>
```

```css
.formField {
  display: flex;
  flex-direction: column;
  gap: var(--t-space-200);
}

.input {
  padding-inline-start: var(--t-space-300);
  border: var(--t-border-width-25) solid var(--t-color-border-primary);
}

:global([dir="rtl"]) .input {
  text-align: right;
}
```

### Navigation Components (Menu, Breadcrumbs, Tabs)

**Key RTL considerations:**
- Menu item order reversal
- Breadcrumb separator flipping
- Tab list direction
- Active indicator positioning

**Example pattern:**
```css
.menuList {
  display: flex;
  gap: var(--t-space-200);
  /* Direction adapts automatically */
}

.breadcrumb {
  display: flex;
  align-items: center;
}

.separator::before {
  content: '/';
  margin-inline: var(--t-space-100);
}

:global([dir="rtl"]) .separator::before {
  content: '\\';
}
```

### Data Display (Table, Card, List)

**Key RTL considerations:**
- Column order reversal
- Card content flow
- List item alignment
- Header alignment

**Example pattern:**
```css
.card {
  display: flex;
  flex-direction: column;
  padding: var(--t-space-400);
  background: var(--t-color-surface-primary);
  border: var(--t-border-width-25) solid var(--t-color-border-secondary);
  border-radius: var(--t-border-radius-300);
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  /* Order automatically reverses in RTL */
}
```

### Layout Components (Grid, Flexbox Containers)

**Key RTL considerations:**
- Logical property usage throughout
- Auto-adapting layouts
- Grid placement

**Example pattern:**
```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: var(--t-space-400);
}

.sidebar {
  border-inline-end: var(--t-border-width-25) solid var(--t-color-border-secondary);
  /* Automatically appears on correct side */
}
```

### Interactive Components (Modal, Drawer, Dropdown)

**Key RTL considerations:**
- Header button positioning
- Close button placement
- Animation direction
- Overlay positioning

**Example pattern:**
```css
.modalHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--t-space-400);
}

.closeButton {
  margin-inline-start: auto;
  /* Always on the end side */
}

.drawer {
  position: fixed;
  inset-inline-end: 0;
  /* Automatically switches sides */
}
```

---

## 📋 Line Height Fix Pattern (Core Implementation)

The line-height fix is the most critical RTL implementation requirement. It ensures proper text rendering for both Outfit (English) and Tajawal (Arabic) fonts.

### TypeScript Implementation

```typescript
// At the top of component function
const isRTL = typeof document !== 'undefined' &&
  (document.dir === 'rtl' || document.documentElement.dir === 'rtl');

// Create line height style object
const lineHeightStyle = {
  lineHeight: isRTL ? 'var(--t-line-height-arabic, 1.2)' : 'var(--t-line-height-english, 1.5)'
};

// Apply to all text elements
return (
  <div className={styles.container}>
    <h2 className={styles.title} style={lineHeightStyle}>
      {title}
    </h2>
    <p className={styles.description} style={lineHeightStyle}>
      {description}
    </p>
    <label style={lineHeightStyle}>
      {label}
    </label>
    <span className={styles.badge} style={lineHeightStyle}>
      {badge}
    </span>
  </div>
);
```

### CSS Module Implementation

```css
/* General text element style */
.title {
  position: relative;
  line-height: 1.5;
  font: var(--t-typography-heading-md);
  color: var(--t-color-text-primary);
}

/* Line height trim for all languages */
.title::before,
.title::after {
  content: '';
  display: block;
  height: 0;
}

/* English font adjustment (smaller trim) */
.title::before {
  margin-top: -0.15em;
}

.title::after {
  margin-bottom: -0.15em;
}

/* Arabic font adjustment (larger trim) */
:global([dir="rtl"]) .title::before {
  margin-top: -0.25em;
}

:global([dir="rtl"]) .title::after {
  margin-bottom: -0.25em;
}

/* RTL text alignment */
:global([dir="rtl"]) .title {
  text-align: right;
  font-family: var(--t-font-family-arabic);
}
```

### Complete Example: Alert Component

```typescript
import React from 'react';
import clsx from 'clsx';
import styles from './Alert.module.css';

export const Alert = ({
  title,
  children,
  variant = 'info',
  className,
  ...props
}) => {
  // RTL detection
  const isRTL = typeof document !== 'undefined' &&
    (document.dir === 'rtl' || document.documentElement.dir === 'rtl');

  // Line height style
  const lineHeightStyle = {
    lineHeight: isRTL ? 'var(--t-line-height-arabic, 1.2)' : 'var(--t-line-height-english, 1.5)'
  };

  return (
    <div
      className={clsx(styles.container, styles[variant], className)}
      role="alert"
      {...props}
    >
      {title && (
        <h4 className={styles.title} style={lineHeightStyle}>
          {title}
        </h4>
      )}
      <div className={styles.content} style={lineHeightStyle}>
        {children}
      </div>
    </div>
  );
};
```

```css
/* Alert.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: var(--t-space-200);
  padding: var(--t-space-400);
  border-inline-start: 4px solid;
  border-radius: var(--t-border-radius-150);
  background-color: var(--t-color-surface-secondary);
}

.info {
  border-color: var(--t-color-border-info);
}

.title {
  font: var(--t-typography-label-md-semibold);
  color: var(--t-color-text-primary);
  position: relative;
  line-height: 1.5;
}

.title::before,
.title::after {
  content: '';
  display: block;
  height: 0;
}

.title::before {
  margin-top: -0.15em;
}

.title::after {
  margin-bottom: -0.15em;
}

:global([dir="rtl"]) .title::before {
  margin-top: -0.25em;
}

:global([dir="rtl"]) .title::after {
  margin-bottom: -0.25em;
}

:global([dir="rtl"]) .title {
  font-family: var(--t-font-family-arabic);
}

.content {
  font: var(--t-typography-body-md);
  color: var(--t-color-text-secondary);
  position: relative;
  line-height: 1.5;
}

.content::before,
.content::after {
  content: '';
  display: block;
  height: 0;
}

.content::before {
  margin-top: -0.15em;
}

.content::after {
  margin-bottom: -0.15em;
}

:global([dir="rtl"]) .content::before {
  margin-top: -0.25em;
}

:global([dir="rtl"]) .content::after {
  margin-bottom: -0.25em;
}

:global([dir="rtl"]) .content {
  font-family: var(--t-font-family-arabic);
}
```

**For additional examples and patterns**, read `references/line-height-fix-patterns.md`.

---

## 🔗 Integration with 4-Tier Discovery System

This workflow integrates seamlessly with the component discovery workflow documented in `.design-system-guides/COMPONENT-DISCOVERY-WORKFLOW.md`.

### Discovery Workflow Integration

```
User Requests Component
    ↓
Check Session Memory (has context cached?)
    ↓
Tier 1: Check Tagaddod native (.component-documentation/)
    ├─ FOUND → Use Tagaddod component (use rtl-auto-switching skill)
    └─ NOT FOUND → Continue to Tier 2
    ↓
Tier 2: Search Shadcn component
    ├─ FOUND → 🔴 ACTIVATE THIS SKILL → Apply RTL patterns
    └─ NOT FOUND → Continue to Tier 3
    ↓
Tier 3: Search Ant Design component
    ├─ FOUND → 🔴 ACTIVATE THIS SKILL → Apply RTL patterns
    └─ NOT FOUND → Continue to Tier 4
    ↓
Tier 4: Build custom component
    └─ BUILD → 🔴 ACTIVATE THIS SKILL → Apply RTL patterns
    ↓
Apply Design Tokens (DesignTokens.mdx)
    ↓
Component Complete
```

### Activation Triggers

Automatically activate this skill when:

1. **After Tier 1 check fails** - Component NOT in `.component-documentation/`
2. **User requests Arabic/RTL** - User mentions Arabic, RTL, or right-to-left
3. **External component selected** - Implementing from Shadcn, Ant Design, or custom
4. **During Tier 2-4 implementation** - Any non-Tagaddod component

### Workflow Execution Order

1. **Discovery** - Determine component source (Shadcn/Antd/Custom)
2. **Implementation** - Implement base component functionality
3. **🔴 RTL ACTIVATION** - Apply all 6 workflow steps from this skill
4. **Token Application** - Apply Tagaddod design tokens (if not done in step 5)
5. **Verification** - Test RTL switching and visual consistency
6. **Cache Context** - Store in session memory for future use

---

## ✅ Quick Reference Checklist

Use this checklist for every custom component implementation to ensure complete RTL support.

### Pre-Implementation
- [ ] Confirmed component NOT in `.component-documentation/` (Tier 1 failed)
- [ ] Identified component source (Shadcn/Antd/Custom)
- [ ] Read `references/line-height-fix-patterns.md`
- [ ] Read `references/css-logical-properties.md` if needed

### Implementation (Steps 1-6)
- [ ] **Step 1**: Line-height fix TypeScript pattern applied to all text elements
- [ ] **Step 1**: `isRTL` detection implemented
- [ ] **Step 1**: `lineHeightStyle` object created and applied
- [ ] **Step 2**: All `left/right` properties replaced with `inline-start/end`
- [ ] **Step 2**: Text alignment uses `start/end` instead of `left/right`
- [ ] **Step 3**: CSS pseudo-element trimming implemented (::before, ::after)
- [ ] **Step 3**: `:global([dir="rtl"])` selectors added for overrides
- [ ] **Step 4**: Directional icons handled manually with `useTheme()` hook
- [ ] **Step 4**: Layout mirroring verified (flexbox, grid)
- [ ] **Step 5**: All styling uses Tagaddod design tokens
- [ ] **Step 5**: No hardcoded colors, sizes, or spacing values
- [ ] **Step 6**: Component tested with `document.dir = 'rtl'`

### Verification
- [ ] Component renders correctly in LTR mode
- [ ] Component renders correctly in RTL mode
- [ ] Arabic font (Tajawal) applied in RTL
- [ ] English font (Outfit) applied in LTR
- [ ] Text alignment correct in both modes
- [ ] Borders appear on correct side in both modes
- [ ] Icons positioned correctly in both modes
- [ ] Layout mirrors properly in RTL
- [ ] No layout breaks when switching directions
- [ ] Visual consistency with Tagaddod native components

### Post-Implementation
- [ ] Component context cached in session memory
- [ ] Component documented for future reference
- [ ] RTL behavior tested with actual Arabic content

---

## 📚 References

This skill includes detailed reference documentation for implementation patterns.

### references/line-height-fix-patterns.md

Complete implementation patterns copied from the Tagaddod Design System's proven line-height fix guide. Contains:

- **Complete TypeScript patterns** for RTL detection and line-height application
- **Complete CSS module patterns** with pseudo-element trimming
- **Implementation checklist** for ensuring all text elements are covered
- **Full component example** (Alert component) ready to copy
- **All trim values** for English (-0.15em) and Arabic (-0.25em)

Read this file for copy-paste ready patterns when implementing any custom component.

### references/css-logical-properties.md

Comprehensive reference for modern CSS logical properties that automatically adapt to text direction. Contains:

- **Complete property mapping** from directional to logical equivalents
- **Flexbox logical properties** with RTL behavior
- **Grid logical properties** with placement examples
- **Browser support information** (96%+ modern browsers)
- **Before/after examples** showing transformations

Reference this file when converting external components (Shadcn/Antd) or building custom layouts.

---

## 💡 Summary

### The 6-Step Workflow

1. **Apply line-height fix** - TypeScript + CSS for English/Arabic rendering
2. **Use logical properties** - Replace `left/right` with `inline-start/end`
3. **Add RTL overrides** - `:global([dir="rtl"])` selectors + pseudo-element trimming
4. **Handle layout mirroring** - Flexbox, grid, directional icons
5. **Apply design tokens** - Tagaddod tokens for all styling
6. **Verify implementation** - Test LTR ↔ RTL switching

### Key Principles

- ✅ This skill is for **custom components only** (Tier 2-4)
- ✅ Native Tagaddod components use `rtl-auto-switching` skill (auto-switching)
- ✅ Always apply line-height fix to ALL text elements
- ✅ Use CSS logical properties instead of directional properties
- ✅ Design tokens for ALL styling (never hardcode)
- ✅ Test in both LTR and RTL modes

### Reference Files

Read `references/line-height-fix-patterns.md` for complete copy-paste ready patterns.

This skill ensures custom components match the RTL quality of native Tagaddod components.

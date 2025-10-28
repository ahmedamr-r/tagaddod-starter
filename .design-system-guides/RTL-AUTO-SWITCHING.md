# RTL Auto-Switching in Tagaddod Design System

**Last Updated**: 2025-10-19
**Status**: ✅ All components auto-switch automatically

---

## 🎯 Universal Rule

**ZERO manual configuration required.**

When you change `document.dir`, ALL components automatically switch their layout and text direction:

```javascript
// Switch to RTL → All components adapt automatically
document.documentElement.dir = 'rtl';

// Switch to LTR → All components adapt automatically
document.documentElement.dir = 'ltr';
```

**No props needed. No conditional rendering. Just use components normally.**

---

## 📋 Quick Reference Table

| Component | RTL Text | RTL Layout | Manual Config Needed |
|-----------|----------|------------|---------------------|
| **Sidebar** | ✅ Auto | ✅ Auto | ❌ None |
| **Drawer** | ✅ Auto | ✅ Auto | ❌ None |
| **TopBar** | ✅ Auto | ✅ Auto | ❌ None |
| **Modal** | ✅ Auto | ✅ Auto | ❌ None |
| **Pagination** | ✅ Auto | ✅ Auto | ❌ None |
| **Tabs** | ✅ Auto | ✅ Auto | ❌ None |
| **Table** | ✅ Auto | ✅ Auto | ❌ None |
| **Popover** | ✅ Auto | ✅ Auto | ❌ None |
| **Select** | ✅ Auto | ✅ Auto | ❌ None |
| **TextInput** | ✅ Auto | ✅ Auto | ❌ None |
| **Button** | ✅ Auto | N/A | ❌ None |
| **Badge** | ✅ Auto | N/A | ❌ None |
| **Card** | ✅ Auto | N/A | ❌ None |
| **Checkbox** | ✅ Auto | ✅ Auto | ❌ None |
| **All Others** | ✅ Auto | ✅ Auto | ❌ None |

**Exception**: Directional icons (arrows) require manual selection → [See Section](#-directional-icons-manual-selection-required)

---

## 🔍 How It Works

### Detection Pattern

All components use this standardized pattern:

```tsx
// Every component detects RTL automatically
const isRTL = typeof document !== 'undefined' &&
  (document.dir === 'rtl' || document.documentElement.dir === 'rtl');

// Apply appropriate line height for Arabic/English text
const lineHeightStyle = {
  lineHeight: isRTL ? 'var(--t-line-height-arabic, 1.2)' : 'var(--t-line-height-english, 1.5)'
};
```

### CSS Auto-Switching

Components use CSS selectors that automatically activate in RTL:

```css
/* English (LTR) layout */
.sidebar {
  border-right: 1px solid var(--t-color-border-secondary);
}

/* Arabic (RTL) layout - auto-applies when document.dir = "rtl" */
:global([dir="rtl"]) .sidebar {
  border-left: 1px solid var(--t-color-border-secondary);
  border-right: none;
}
```

---

## ✅ What Auto-Switches

### Text Direction & Typography
- ✅ **Font Family**: Outfit (English) ↔ Tajawal (Arabic)
- ✅ **Line Height**: 1.5 (English) ↔ 1.2 (Arabic)
- ✅ **Text Alignment**: left ↔ right
- ✅ **Text Trimming**: Optimized for each font

### Layout & Positioning
- ✅ **Sidebar Position**: Left side (LTR) ↔ Right side (RTL)
- ✅ **Drawer Opening**: Right side (LTR) ↔ Left side (RTL)
- ✅ **Pagination Order**: Prev/Next swap, numbers reverse
- ✅ **Table Columns**: Left-to-right ↔ Right-to-left
- ✅ **Form Labels**: Left-aligned ↔ Right-aligned
- ✅ **Modal Header**: Close button position swaps

### Spacing & Borders
- ✅ **Padding**: padding-left ↔ padding-right
- ✅ **Margin**: margin-left ↔ margin-right
- ✅ **Borders**: border-left ↔ border-right
- ✅ **Icons**: Prefix/suffix icon positions swap

### ❌ What You MUST Handle Manually

Only **directional icons** (arrows, chevrons pointing a direction) need manual selection:

```tsx
// ❌ WRONG - Arrow points wrong way in RTL
<Button suffixIcon={<IconArrowRight />}>Next</Button>

// ✅ CORRECT - Manually select based on direction
const { isRTL } = useTheme();
const NextIcon = isRTL ? IconArrowLeft : IconArrowRight;
<Button suffixIcon={<NextIcon />}>Next</Button>
```

---

## 📦 Component Behavior Reference

### Sidebar

**Behavior:**
- **RTL**: Appears on **RIGHT** side, Arabic text, right-to-left reading
- **LTR**: Appears on **LEFT** side, English text, left-to-right reading

**Usage:**
```tsx
// ✅ CORRECT - Auto-switches automatically
<Sidebar
  selectedItem="dashboard"
  menuItems={menuItems}
/>

// ❌ WRONG - Manual position NOT needed (auto-handled)
const isRTL = document.dir === 'rtl';
<Sidebar position={isRTL ? 'right' : 'left'} /> // Don't do this!
```

**What Switches:**
- Position: left → right
- Border: right border → left border
- Text alignment: left → right
- Font family: Outfit → Tajawal

---

### Drawer

**Behavior:**
- **RTL**: Opens from **LEFT** side (reading direction)
- **LTR**: Opens from **RIGHT** side

**Usage:**
```tsx
// ✅ CORRECT - Auto-switches automatically
<Drawer
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Settings"
>
  <DrawerContent />
</Drawer>

// ❌ WRONG - Position prop NOT needed
<Drawer position={isRTL ? 'left' : 'right'}> // Don't do this!
```

**What Switches:**
- Opening direction: right → left
- Header layout: mirrored
- Footer buttons: mirrored
- Back arrow icon: automatically selected

---

### TopBar

**Behavior:**
- **RTL**: Logo moves right, content flows right-to-left
- **LTR**: Logo on left, content flows left-to-right

**Usage:**
```tsx
// ✅ CORRECT - Auto-switches automatically
<TopBar
  showWarehouseDropdown={true}
  selectedWarehouse="Main Warehouse"
  centerContent={<SearchInput />}
/>
```

**What Switches:**
- Flexbox direction: row → row-reverse
- Start section alignment: flex-start → flex-end
- End section: right edge → left edge
- Hamburger menu: left → right

---

### Pagination

**Behavior:**
- **RTL**: Previous/Next buttons swap, page numbers reverse
- **LTR**: Standard left-to-right pagination

**Usage:**
```tsx
// ✅ CORRECT - Auto-switches automatically
<Pagination
  total={100}
  current={currentPage}
  pageSize={10}
  onChange={handlePageChange}
/>
```

**What Switches:**
- Button order: [Prev] [1][2][3] [Next] → [Next] [3][2][1] [Prev]
- Arrow icons: automatically selected
- Page number order: reversed
- Row count: label position swaps

---

### Modal

**Behavior:**
- **RTL**: Close button on left, content direction right-to-left
- **LTR**: Close button on right, content direction left-to-right

**Usage:**
```tsx
// ✅ CORRECT - Auto-switches automatically
<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Edit Profile"
>
  <ModalContent />
</Modal>
```

**What Switches:**
- Content direction via `dir` attribute
- Header button positions
- Footer button order
- Text alignment

---

### Tabs

**Behavior:**
- **RTL**: Tabs flow right-to-left, text aligned right
- **LTR**: Tabs flow left-to-right, text aligned left

**Usage:**
```tsx
// ✅ CORRECT - Auto-switches automatically
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
</Tabs>
```

**What Switches:**
- Direction via `dir` prop (auto-detected)
- Text alignment
- Active indicator position

---

### Table

**Behavior:**
- **RTL**: Columns flow right-to-left, headers aligned right
- **LTR**: Columns flow left-to-right, headers aligned left

**Usage:**
```tsx
// ✅ CORRECT - Auto-switches automatically
<Table
  data={data}
  columns={columns}
  showFilters={true}
/>
```

**What Switches:**
- Column order: reversed
- Header alignment: left → right
- Filter alignment
- Sort icons
- Pagination: auto-reverses

---

### Form Components (TextInput, Select, Checkbox, etc.)

**Behavior:**
- **RTL**: Labels on right, text flows right-to-left
- **LTR**: Labels on left, text flows left-to-right

**Usage:**
```tsx
// ✅ CORRECT - All auto-switch automatically
<TextInput
  label="Email"
  placeholder="Enter your email"
/>

<Select
  label="Country"
  options={countries}
/>

<Checkbox
  label="I agree to terms"
/>
```

**What Switches:**
- Label alignment: left → right
- Input text direction
- Prefix/suffix icons swap
- Error message alignment
- Help text alignment

---

### Popover & Tooltip

**Behavior:**
- **RTL/LTR**: Automatically positioned by Radix UI based on `dir` attribute

**Usage:**
```tsx
// ✅ CORRECT - Auto-switches automatically
<Popover
  side="bottom"  // User choice - not auto-switched
  align="end"    // Semantic - Radix UI handles RTL
  content={<PopoverContent />}
>
  <Button>Trigger</Button>
</Popover>
```

**Note:** `side` and `align` props are intentional user choices. Radix UI's underlying logic handles RTL positioning automatically.

---

## 🤖 AI Agent Guidelines

### ✅ DO THIS

```tsx
// Just use components - they auto-switch
import { Sidebar, Drawer, TopBar, Button } from '@tagaddod-design/react';

function App() {
  return (
    <>
      <TopBar />
      <Sidebar selectedItem="dashboard" />
      <Drawer open={isOpen}>Content</Drawer>
      <Button>Submit</Button>
    </>
  );
}

// To switch direction, just set document.dir
document.documentElement.dir = 'rtl'; // Everything switches to RTL
document.documentElement.dir = 'ltr'; // Everything switches to LTR
```

### ❌ DON'T DO THIS

```tsx
// ❌ Manual RTL detection NOT needed (components handle it)
const isRTL = document.dir === 'rtl';

// ❌ Manual position props NOT needed
<Sidebar position={isRTL ? 'right' : 'left'} />

// ❌ Manual direction props NOT needed
<Drawer position={isRTL ? 'left' : 'right'} />

// ❌ Conditional rendering NOT needed
{isRTL ? <ArabicComponent /> : <EnglishComponent />}
```

### ✅ EXCEPTION: Directional Icons

This is the **ONLY** thing you need to handle manually:

```tsx
import { useTheme } from '@tagaddod-design/react';
import { IconArrowLeft, IconArrowRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

function NavigationExample() {
  const { isRTL } = useTheme();

  // For "Next" action: arrow points in reading direction
  const NextIcon = isRTL ? IconArrowLeft : IconArrowRight;
  const NextChevron = isRTL ? IconChevronLeft : IconChevronRight;

  // For "Previous/Back" action: arrow points against reading direction
  const PrevIcon = isRTL ? IconArrowRight : IconArrowLeft;
  const BackChevron = isRTL ? IconChevronRight : IconChevronLeft;

  return (
    <>
      <Button suffixIcon={<NextIcon />}>
        {isRTL ? 'التالي' : 'Next'}
      </Button>

      <Button prefixIcon={<PrevIcon />}>
        {isRTL ? 'السابق' : 'Previous'}
      </Button>
    </>
  );
}
```

---

## 🎨 Directional Icons (Manual Selection Required)

### Why Manual Selection?

Directional icons (arrows, chevrons) indicate **direction of action**, not just layout. They must point in the **reading direction** for the current language.

**Example:** A "Next" button should:
- **English (LTR)**: Arrow points RIGHT (→) - direction of reading
- **Arabic (RTL)**: Arrow points LEFT (←) - direction of reading (Arabic reads right-to-left)

### Common Icon Patterns

#### "Next" / "Forward" / "Continue"

```tsx
// Arrow points in the reading direction
const NextIcon = isRTL ? IconArrowLeft : IconArrowRight;
const NextChevron = isRTL ? IconChevronLeft : IconChevronRight;

<Button variant="primary" suffixIcon={<NextIcon />}>
  {isRTL ? 'التالي' : 'Next'}
</Button>
```

#### "Previous" / "Back" / "Cancel"

```tsx
// Arrow points against the reading direction
const BackIcon = isRTL ? IconArrowRight : IconArrowLeft;
const BackChevron = isRTL ? IconChevronRight : IconChevronLeft;

<Button variant="outlined" prefixIcon={<BackIcon />}>
  {isRTL ? 'رجوع' : 'Back'}
</Button>
```

#### "Expand" / "Show More"

```tsx
// Chevron points in the reading direction
const ExpandIcon = isRTL ? IconChevronLeft : IconChevronRight;

<Button variant="plain" suffixIcon={<ExpandIcon />}>
  {isRTL ? 'المزيد' : 'More'}
</Button>
```

#### "Collapse" / "Show Less"

```tsx
// Chevron points against the reading direction
const CollapseIcon = isRTL ? IconChevronRight : IconChevronLeft;

<Button variant="plain" suffixIcon={<CollapseIcon />}>
  {isRTL ? 'أقل' : 'Less'}
</Button>
```

#### Non-Directional Icons

These icons do NOT need manual selection (they're not directional):

```tsx
// ✅ These are fine as-is (no RTL concern)
<Button prefixIcon={<IconHome />}>Home</Button>
<Button prefixIcon={<IconSettings />}>Settings</Button>
<Button prefixIcon={<IconUser />}>Profile</Button>
<Button prefixIcon={<IconSearch />}>Search</Button>
```

---

## 🧪 Testing RTL Switching

### Method 1: Direct DOM Manipulation

```javascript
// Test RTL
document.documentElement.dir = 'rtl';
document.documentElement.lang = 'ar';

// Test LTR
document.documentElement.dir = 'ltr';
document.documentElement.lang = 'en';
```

### Method 2: ThemeProvider (Recommended)

```tsx
import { ThemeProvider, useTheme } from '@tagaddod-design/react';

function App() {
  return (
    <ThemeProvider defaultDirection="rtl" defaultLocale="ar">
      <YourApp />
    </ThemeProvider>
  );
}

// Inside components, access theme context
function Component() {
  const { isRTL, direction, setDirection } = useTheme();

  // Toggle direction
  const toggleDirection = () => {
    setDirection(isRTL ? 'ltr' : 'rtl');
  };

  return <Button onClick={toggleDirection}>Toggle RTL</Button>;
}
```

### Method 3: Browser DevTools

1. Open DevTools (F12)
2. Console: `document.documentElement.dir = 'rtl'`
3. Watch all components switch automatically
4. Console: `document.documentElement.dir = 'ltr'`
5. Watch everything switch back

### Verification Checklist

Test each component in both directions:

- [ ] **Sidebar**: Appears on correct side (left in LTR, right in RTL)
- [ ] **Drawer**: Opens from correct side (right in LTR, left in RTL)
- [ ] **TopBar**: Content flows in correct direction
- [ ] **Pagination**: Prev/Next buttons in correct order
- [ ] **Modal**: Close button on correct side
- [ ] **Forms**: Labels aligned correctly
- [ ] **Tables**: Columns flow in correct direction
- [ ] **Text**: Proper font family (Outfit vs Tajawal)
- [ ] **Borders**: Appear on correct side
- [ ] **Spacing**: Proper padding/margin direction

---

## 🎯 ThemeProvider Integration

### Basic Setup

```tsx
import { ThemeProvider } from '@tagaddod-design/react';
import '@tagaddod-design/tokens/tokens.css';
import '@tagaddod-design/react/styles';

function Root() {
  return (
    <ThemeProvider
      defaultDirection="ltr"    // or "rtl"
      defaultLocale="en"        // or "ar"
      defaultTheme="tagaddod"   // or "greenpan"
    >
      <App />
    </ThemeProvider>
  );
}
```

### Accessing Theme Context

```tsx
import { useTheme } from '@tagaddod-design/react';

function Component() {
  const {
    isRTL,          // boolean: true if RTL
    direction,      // 'ltr' | 'rtl'
    setDirection,   // Function to change direction
    locale,         // 'en' | 'ar'
    setLocale,      // Function to change locale
    theme,          // 'tagaddod' | 'greenpan'
    setTheme        // Function to change theme
  } = useTheme();

  return (
    <div>
      <p>Current Direction: {direction}</p>
      <p>Is RTL: {isRTL ? 'Yes' : 'No'}</p>
      <Button onClick={() => setDirection(isRTL ? 'ltr' : 'rtl')}>
        Toggle Direction
      </Button>
    </div>
  );
}
```

### Why Use ThemeProvider?

**Benefits:**
- ✅ Centralized direction/locale/theme management
- ✅ Automatic document attribute updates
- ✅ Persistence to localStorage
- ✅ React hooks for accessing theme state
- ✅ Automatic locale ↔ direction synchronization

**Without ThemeProvider:**
- ⚠️ Manual `document.dir` manipulation
- ⚠️ No state management
- ⚠️ No persistence
- ⚠️ Manual synchronization needed

---

## 🚨 Common Mistakes

### Mistake 1: Manual Position Configuration

```tsx
// ❌ WRONG - Components auto-switch, don't do this!
const isRTL = document.dir === 'rtl';
<Sidebar position={isRTL ? 'right' : 'left'} />
```

**Solution:**
```tsx
// ✅ CORRECT - Just use the component
<Sidebar selectedItem="dashboard" />
```

---

### Mistake 2: Using Wrong Icons in RTL

```tsx
// ❌ WRONG - Arrow points wrong way in Arabic
<Button suffixIcon={<IconArrowRight />}>
  {isRTL ? 'التالي' : 'Next'}
</Button>
```

**Solution:**
```tsx
// ✅ CORRECT - Select arrow based on direction
const { isRTL } = useTheme();
const NextIcon = isRTL ? IconArrowLeft : IconArrowRight;

<Button suffixIcon={<NextIcon />}>
  {isRTL ? 'التالي' : 'Next'}
</Button>
```

---

### Mistake 3: Hardcoded Text Alignment

```tsx
// ❌ WRONG - Hardcoded alignment doesn't switch
<div style={{ textAlign: 'left' }}>
  {content}
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Use CSS that respects direction
<div style={{ textAlign: isRTL ? 'right' : 'left' }}>
  {content}
</div>

// OR BETTER - Let CSS handle it automatically
<div className={styles.content}> {/* CSS uses text-align: start */}
  {content}
</div>
```

---

### Mistake 4: Not Testing in RTL

```tsx
// ❌ WRONG - Only testing in English/LTR
// Component looks good in English, but breaks in Arabic
```

**Solution:**
```tsx
// ✅ CORRECT - Test in both directions
// 1. Test with English (LTR)
// 2. Switch to Arabic (RTL): document.documentElement.dir = 'rtl'
// 3. Verify layout, positioning, icons all work correctly
```

---

### Mistake 5: Mixing Manual and Auto RTL

```tsx
// ❌ WRONG - Inconsistent approach
const isRTL = document.dir === 'rtl';

// Some components manual
<Sidebar position={isRTL ? 'right' : 'left'} />

// Some components auto
<Drawer open={true}>Content</Drawer>
```

**Solution:**
```tsx
// ✅ CORRECT - Let ALL components auto-switch
<Sidebar selectedItem="dashboard" />
<Drawer open={true}>Content</Drawer>
```

---

## 📚 Additional Resources

### Documentation Files
- **This File**: Universal RTL auto-switching guide
- **CLAUDE.md**: AI agent instructions for RTL
- **Component .mdx Files**: Individual component RTL examples

### Code Locations
- **ThemeProvider**: `/packages/react/src/providers/ThemeProvider.tsx`
- **Design Tokens**: `/packages/tokens/src/`
- **Component Examples**: `/packages/react/src/components/`

### Storybook Examples
- All component stories include RTL examples
- Use direction switcher in Storybook toolbar
- Test components in both directions interactively

---

## ✨ Summary

### For AI Agents

**Remember this ONE rule:**

> **Just use components normally. They auto-switch based on `document.dir`. The ONLY exception is directional icons (arrows) - select these manually based on `isRTL`.**

### Three-Step Process

1. **Use components** → Zero configuration, they auto-switch
2. **Select directional icons** → Use `useTheme()` to choose arrow direction
3. **Test both directions** → Verify in LTR and RTL

That's it! 🎉

---

---

## 🔗 Custom Component RTL Implementation

**This guide covers native Tagaddod components only** (auto-switching behavior from `.component-documentation/`).

For **custom components** (Shadcn, Ant Design, or custom-built from Tier 2-4), RTL implementation requires manual setup with a comprehensive 6-step workflow.

### Use the Dedicated Skill

```
Skill: rtl-custom-component-implementation
```

This skill provides:

- **6-step RTL implementation workflow**
  1. Apply line-height fix (TypeScript + CSS patterns)
  2. Use CSS logical properties (margin-inline-start, padding-inline-end, etc.)
  3. Add RTL-specific overrides (`:global([dir="rtl"])` selectors)
  4. Handle layout mirroring (flexbox, grid, directional icons)
  5. Apply Tagaddod design tokens (colors, spacing, typography)
  6. Verify implementation (LTR ↔ RTL switching tests)

- **Reference Documentation**
  - `references/line-height-fix-patterns.md` - Copy-paste ready TypeScript + CSS patterns
  - `references/css-logical-properties.md` - Complete directional → logical property mapping

- **Component Category Patterns**
  - Form components (Input, Select, Checkbox)
  - Navigation components (Menu, Breadcrumbs, Tabs)
  - Data display (Table, Card, List)
  - Layout components (Grid, Flexbox)
  - Interactive components (Modal, Drawer, Dropdown)

- **Complete Integration**
  - Integrates with 4-tier component discovery workflow
  - Design token application guidance
  - Verification checklist

### When to Use Custom Implementation Skill

- After Tier 1 check fails (component NOT in `.component-documentation/`)
- Adapting Shadcn components to Tagaddod
- Adapting Ant Design components to Tagaddod
- Building custom components from scratch
- User explicitly requests Arabic/RTL for custom component

### Quick Comparison

| Component Type | Skill to Use | Configuration Required |
|----------------|--------------|------------------------|
| Native Tagaddod (Tier 1) | `rtl-auto-switching` | ❌ None - auto-switching |
| Shadcn (Tier 2) | `rtl-custom-component-implementation` | ✅ 6-step manual workflow |
| Ant Design (Tier 3) | `rtl-custom-component-implementation` | ✅ 6-step manual workflow |
| Custom-built (Tier 4) | `rtl-custom-component-implementation` | ✅ 6-step manual workflow |

---

**Questions or Issues?** Check CLAUDE.md or component documentation files.

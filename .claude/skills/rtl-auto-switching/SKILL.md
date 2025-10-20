---
name: rtl-auto-switching
description: Quick reference for RTL/LTR implementation patterns in Tagaddod Design System. Use when user asks about Arabic language support, RTL (right-to-left) direction, RTL layout, directional icons (arrows, chevrons), bilingual implementation, Hebrew support, or testing RTL switching. Explains which components auto-switch and which require manual configuration.
---

# RTL Auto-Switching Skill

**Purpose**: Quick reference for RTL/LTR implementation in Tagaddod Design System

---

## 🎯 Universal Rule

**ZERO manual configuration needed.** All components auto-switch based on `document.dir`.

```javascript
// Switch to RTL - everything adapts automatically
document.documentElement.dir = 'rtl';

// Switch to LTR - everything switches back
document.documentElement.dir = 'ltr';
```

---

## ✅ Correct Implementation Pattern

```tsx
import { Sidebar, Drawer, TopBar, Button, Pagination } from 'tagaddod-design-react';

function App() {
  // ✅ CORRECT - Just use components, they auto-switch
  return (
    <>
      <TopBar />
      <Sidebar selectedItem="dashboard" />
      <Drawer open={isOpen}>Content</Drawer>
      <Pagination total={100} current={1} />
    </>
  );
}
```

---

## ❌ Wrong Implementation Pattern

```tsx
// ❌ WRONG - Manual position configuration NOT needed
const isRTL = document.dir === 'rtl';

<Sidebar position={isRTL ? 'right' : 'left'} />  // Don't do this!
<Drawer position={isRTL ? 'left' : 'right'} />   // Don't do this!
```

---

## ⚠️ Exception: Directional Icons

The **ONLY** thing requiring manual selection is directional icons (arrows):

```tsx
import { useTheme } from 'tagaddod-design-react';
import { IconArrowLeft, IconArrowRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

function NavigationButtons() {
  const { isRTL } = useTheme();

  // "Next" action - arrow points in reading direction
  const NextIcon = isRTL ? IconArrowLeft : IconArrowRight;

  // "Back" action - arrow points against reading direction
  const BackIcon = isRTL ? IconArrowRight : IconArrowLeft;

  return (
    <>
      <Button prefixIcon={<BackIcon />}>
        {isRTL ? 'رجوع' : 'Back'}
      </Button>

      <Button suffixIcon={<NextIcon />}>
        {isRTL ? 'التالي' : 'Next'}
      </Button>
    </>
  );
}
```

---

## 📋 Component Auto-Switching Reference

| Component | RTL Text | RTL Layout | Manual Config? |
|-----------|----------|------------|----------------|
| Sidebar | ✅ Auto | ✅ Auto | ❌ None |
| Drawer | ✅ Auto | ✅ Auto | ❌ None |
| TopBar | ✅ Auto | ✅ Auto | ❌ None |
| Modal | ✅ Auto | ✅ Auto | ❌ None |
| Pagination | ✅ Auto | ✅ Auto | ❌ None |
| Tabs | ✅ Auto | ✅ Auto | ❌ None |
| Table | ✅ Auto | ✅ Auto | ❌ None |
| Forms | ✅ Auto | ✅ Auto | ❌ None |
| All Others | ✅ Auto | ✅ Auto | ❌ None |

**Exception**: Directional icons (arrows/chevrons) - manual selection required

---

## 🎨 Directional Icon Patterns

### "Next" / "Forward" / "Continue"
```tsx
const NextIcon = isRTL ? IconArrowLeft : IconArrowRight;
<Button suffixIcon={<NextIcon />}>Next</Button>
```

### "Previous" / "Back"
```tsx
const BackIcon = isRTL ? IconArrowRight : IconArrowLeft;
<Button prefixIcon={<BackIcon />}>Back</Button>
```

### "Expand" / "More"
```tsx
const ExpandIcon = isRTL ? IconChevronLeft : IconChevronRight;
<Button suffixIcon={<ExpandIcon />}>More</Button>
```

### "Collapse" / "Less"
```tsx
const CollapseIcon = isRTL ? IconChevronRight : IconChevronLeft;
<Button suffixIcon={<CollapseIcon />}>Less</Button>
```

### Non-Directional Icons (No RTL handling needed)
```tsx
// ✅ These are fine as-is
<Button prefixIcon={<IconHome />}>Home</Button>
<Button prefixIcon={<IconSettings />}>Settings</Button>
<Button prefixIcon={<IconUser />}>Profile</Button>
```

---

## 🧪 Testing RTL

### Method 1: Console (Quick Test)
```javascript
// Switch to RTL
document.documentElement.dir = 'rtl';

// Switch to LTR
document.documentElement.dir = 'ltr';
```

### Method 2: ThemeProvider (Recommended)
```tsx
import { ThemeProvider, useTheme } from 'tagaddod-design-react';

function App() {
  return (
    <ThemeProvider defaultDirection="rtl" defaultLocale="ar">
      <YourApp />
    </ThemeProvider>
  );
}

function ToggleButton() {
  const { isRTL, setDirection } = useTheme();

  return (
    <Button onClick={() => setDirection(isRTL ? 'ltr' : 'rtl')}>
      Toggle Direction
    </Button>
  );
}
```

---

## 🚨 Common Mistakes

### Mistake 1: Manual Position Configuration
```tsx
// ❌ WRONG
const isRTL = document.dir === 'rtl';
<Sidebar position={isRTL ? 'right' : 'left'} />

// ✅ CORRECT
<Sidebar selectedItem="dashboard" />
```

### Mistake 2: Wrong Directional Icons
```tsx
// ❌ WRONG - Arrow points wrong way in Arabic
<Button suffixIcon={<IconArrowRight />}>Next</Button>

// ✅ CORRECT - Select arrow based on direction
const NextIcon = isRTL ? IconArrowLeft : IconArrowRight;
<Button suffixIcon={<NextIcon />}>Next</Button>
```

### Mistake 3: Not Testing RTL
```tsx
// ❌ WRONG - Only testing in English
// Implement → Test in English only → Ship

// ✅ CORRECT - Test both directions
// Implement → Test English (LTR) → Test Arabic (RTL) → Ship
```

---

## 📚 Quick Reference

### What Auto-Switches
- ✅ Text direction (Arabic/English fonts)
- ✅ Layout positioning (left/right)
- ✅ Borders (left/right swap)
- ✅ Spacing (padding/margin swap)
- ✅ Text alignment

### What You Must Handle
- ⚠️ Directional icons only (arrows, chevrons pointing direction)

### How to Switch Direction
```javascript
document.documentElement.dir = 'rtl';  // Switch to RTL
document.documentElement.dir = 'ltr';  // Switch to LTR
```

### Using ThemeProvider
```tsx
const { isRTL, setDirection } = useTheme();
```

---

## 🔗 Full Documentation

For comprehensive RTL guide with detailed examples:
**Read**: `.design-system-guides/RTL-AUTO-SWITCHING.md`

Covers:
- Complete component behavior reference
- Advanced directional icon patterns
- ThemeProvider integration
- Testing strategies
- Common mistakes and solutions
- Component-by-component detailed guides

---

## 💡 Key Takeaways

1. **Components auto-switch** - Just use them normally
2. **Only exception** - Directional icons (manually select)
3. **No position props** - Components handle RTL positioning
4. **Test both directions** - English (LTR) and Arabic (RTL)
5. **Use ThemeProvider** - For centralized direction control

**Remember**: If you're manually configuring `position` props based on RTL, you're doing it wrong!

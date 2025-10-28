# Tagaddod Design System - Starter Template

A production-ready **React + TypeScript + Vite** template with **Tagaddod Design System** integration and **Claude Code AI assistance**.

This template is self-contained and ready to use as a standalone project.

---

## ✨ Features

- **🎨 Tagaddod Design System** - 33+ accessible React components
- **🤖 Claude AI Integration** - Automated component implementation via skills
- **📚 Component Documentation** - 33 comprehensive `.mdx` guides in `.component-documentation/`
- **🌐 RTL Support** - Built-in Arabic/English internationalization
- **⚡ Vite** - Lightning-fast development server
- **📘 TypeScript** - Full type safety
- **🎯 Design Tokens** - Consistent styling with CSS custom properties

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Installation

```bash
# Clone the repository (or download as ZIP)
git clone <your-repo-url>
cd template-test

# Install dependencies
npm install

# Start development server
npm run dev
```

Your app will be running at **http://localhost:5173**

---

## 📂 Project Structure

```
template-test/
├── .claude/                        # Claude Code AI skills
│   └── skills/
│       └── tagaddod-design-system.md  # Auto-reads component docs
├── .component-documentation/       # 33 component guides
│   ├── Button.mdx
│   ├── Table.mdx
│   ├── Modal.mdx
│   ├── DesignTokens.mdx
│   └── ... (30 more)
├── src/
│   ├── App.tsx                    # Main application
│   ├── main.tsx                   # Entry point with ThemeProvider
│   ├── components/ui/             # Component re-exports (optional)
│   └── lib/                       # Utilities (RTL, theme helpers)
├── scripts/
│   └── check-docs-sync.js         # Verify documentation completeness
├── CLAUDE.md                      # Claude Code instructions
├── WORKFLOW.md                    # Development workflow guide
└── package.json
```

---

## 🎯 Using Claude Code AI

This template includes a **specialized Claude skill** that automatically reads component documentation and generates correct implementations.

### How It Works

When you ask Claude Code to implement a component, it:

1. **Detects** the component name from your request
2. **Reads** `.component-documentation/[Component].mdx`
3. **Extracts** exact import patterns, props, and examples
4. **Generates** correct implementation code
5. **Applies** design tokens and RTL support automatically

### Example Usage

```
You: "I need a button with loading state"

Claude: [Reads .component-documentation/Button.mdx]
        [Generates implementation with loading prop]

import { Button } from '@tagaddod-design/react'

<Button variant="primary" loading={isLoading}>
  Submit
</Button>
```

### Available Components (33)

See `.component-documentation/` for complete list:

- **Forms**: Button, TextInput, Select, Checkbox, Switch, RangeSlider
- **Data**: Table, Badge, Avatar, Card, Calendar, DatePicker
- **Layout**: AspectRatio, Separator, Sidebar, Page
- **Navigation**: Tabs, Listbox, Pagination, TopBar
- **Overlays**: Modal, Drawer, Popover, Tooltip
- **Feedback**: Sonner (toasts)
- **Theming**: ThemeProvider, DesignTokens

---

## 🎨 Using Tagaddod Components

### Basic Usage

```tsx
import { Button, TextInput, Modal } from '@tagaddod-design/react'

function MyForm() {
  return (
    <div>
      <TextInput label="Email" type="email" placeholder="Enter email" />
      <Button variant="primary">Submit</Button>
    </div>
  )
}
```

### With RTL/Arabic Support

```tsx
import { ThemeProvider, Button } from '@tagaddod-design/react'

function App() {
  return (
    <ThemeProvider defaultDirection="rtl" defaultLocale="ar">
      <Button variant="primary">زر عربي</Button>
    </ThemeProvider>
  )
}
```

### Using Design Tokens

```tsx
// Custom styling with design tokens
<div style={{
  padding: 'var(--t-space-400)',
  backgroundColor: 'var(--t-color-fill-primary)',
  color: 'var(--t-color-text-primary)',
  borderRadius: 'var(--t-border-radius-medium)'
}}>
  Content
</div>
```

See `.component-documentation/DesignTokens.mdx` for complete token reference.

---

## 📜 Available Scripts

```bash
# Development
npm run dev           # Start dev server (port 5173)
npm run build         # Build for production
npm run preview       # Preview production build

# Code Quality
npm run lint          # Check code quality
npm run lint:fix      # Auto-fix linting issues
npm run type-check    # TypeScript type checking

# Documentation
npm run docs:check    # Verify component docs are synced
npm run docs:list     # List available documentation files
```

---

## 🧩 Claude Skill Reference

### Skill Location
`.claude/skills/tagaddod-design-system.md`

### What It Does
- **Reads** local component documentation automatically
- **Extracts** import patterns, props, and examples
- **Generates** correct implementations
- **Falls back** to Shadcn/Antd if component doesn't exist
- **Applies** design tokens for custom components
- **Supports** RTL/Arabic implementation

### Skill Workflow

```
User Request
    ↓
Detect Component Name
    ↓
Read .component-documentation/[Component].mdx
    ↓
Extract: Imports, Props, Examples
    ↓
Generate Implementation Code
    ↓
[If not found: Search Shadcn → Antd → Build Custom]
```

---

## 🌐 RTL/Internationalization

### Enable RTL Mode

```tsx
import { ThemeProvider } from '@tagaddod-design/react'

function App() {
  return (
    <ThemeProvider
      defaultDirection="rtl"    // 'ltr' or 'rtl'
      defaultLocale="ar"         // 'en' or 'ar'
      defaultBrand="tagaddod"
    >
      {/* Your app */}
    </ThemeProvider>
  )
}
```

### Automatic Features
- **Font switching**: Outfit (English) ↔ Tajawal (Arabic)
- **Text alignment**: Automatic right-to-left
- **Line heights**: Optimized for Arabic text
- **Layout mirroring**: Directional components flip

### Best Practices
```css
/* ✅ CORRECT - Logical properties */
margin-inline-start: var(--t-space-400);
text-align: start;

/* ❌ WRONG - Fixed directions */
margin-left: var(--t-space-400);
text-align: left;
```

---

## 🎨 Design Tokens

All styling uses **CSS custom properties** from Tagaddod Design System.

### Token Categories

**Colors:**
```css
var(--t-color-fill-primary)
var(--t-color-text-primary)
var(--t-color-border-primary)
```

**Spacing:**
```css
var(--t-space-0)      /* 0px */
var(--t-space-100)    /* 4px */
var(--t-space-400)    /* 16px */
var(--t-space-800)    /* 32px */
```

**Typography:**
```css
var(--t-typography-heading-large)
var(--t-typography-body-medium)
var(--t-font-family-primary)
var(--t-font-family-arabic)
```

**Layout:**
```css
var(--t-border-radius-medium)
var(--t-shadow-small)
```

See `.component-documentation/DesignTokens.mdx` for complete reference (200+ tokens).

---

## 📚 Documentation

### Component Documentation
All component documentation is in `.component-documentation/`:

```bash
# View available docs
npm run docs:list

# Verify docs are synced
npm run docs:check
```

Each `.mdx` file contains:
- Component API (props, types)
- Usage examples
- RTL/Arabic support
- Design token integration
- Accessibility guidelines

### Claude Code Guide
See `CLAUDE.md` for:
- Component documentation protocol
- Design token usage rules
- RTL implementation guidelines
- Modular component architecture

### Workflow Guide
See `WORKFLOW.md` for:
- Development workflow
- Claude skill usage
- Component implementation patterns
- Troubleshooting

---

## 🔗 Links

- **Design System Docs**: [Storybook](https://tagaddod-design-system.vercel.app/)
- **Repository**: [GitHub](https://github.com/ahmedamr-r/tagaddod-design-system)
- **npm Packages**: [@tagaddod-design/react](https://www.npmjs.com/package/@tagaddod-design/react)

---

## 💡 Tips

### For "Vibe Coders"
Ask Claude Code to implement components - it will automatically read the documentation and generate correct code.

### For Experienced Developers
Browse `.component-documentation/` to understand component APIs, then import directly:
```tsx
import { Component } from '@tagaddod-design/react'
```

### For Arabic/RTL Projects
1. Wrap app in `<ThemeProvider defaultDirection="rtl" defaultLocale="ar">`
2. Use logical CSS properties (`margin-inline-start` instead of `margin-left`)
3. Test both LTR and RTL modes

---

**Happy Coding! 🚀**

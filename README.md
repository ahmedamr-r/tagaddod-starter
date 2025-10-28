# Tagaddod Design System - Starter Template

A production-ready **React + TypeScript + Vite** template with **Tagaddod Design System** integration and **Claude Code AI assistance**.

This template is self-contained and ready to use for building modern web applications.

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
git clone https://github.com/YOUR-USERNAME/tagaddod-starter.git
cd tagaddod-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

Your app will be running at **http://localhost:5173**

---

## 📂 Project Structure

```
tagaddod-starter/
├── .claude/                        # Claude Code AI skills & workflows
│   ├── skills/
│   │   ├── tagaddod-design-system/    # Component implementation skill
│   │   ├── rtl-auto-switching/        # RTL reference skill
│   │   └── rtl-custom-component-implementation/  # RTL for custom components
│   ├── MANDATORY-WORKFLOWS.md      # Critical AI execution workflows
│   ├── AI-BEHAVIOR-RULES.md        # AI behavioral guidelines
│   └── SKILLS-INDEX.md             # Skills reference
├── .design-system-guides/          # Comprehensive system guides
│   ├── COMPONENT-DISCOVERY-WORKFLOW.md
│   ├── RTL-AUTO-SWITCHING.md
│   └── OVERLAY-SYSTEM-GUIDE.md
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

- **Forms**: Button, TextInput, Select, Checkbox, Switch, RangeSlider, RadioButton, DatePicker
- **Data**: Table, Badge, Avatar, Card, Calendar, Number
- **Layout**: AspectRatio, Separator, Sidebar, Page, ScrollArea
- **Navigation**: Tabs, Listbox, Pagination, TopBar
- **Overlays**: Modal, Drawer, Popover, Tooltip
- **Feedback**: Sonner (toasts)
- **Theming**: ThemeProvider, DesignTokens, Logo

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
  backgroundColor: 'var(--t-color-surface-primary)',
  color: 'var(--t-color-text-primary)',
  borderRadius: 'var(--t-border-radius-300)'
}}>
  Content
</div>
```

See `.component-documentation/DesignTokens.mdx` for complete token reference.

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
      defaultTheme="tagaddod"
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
var(--t-color-fill-brand-primary)
var(--t-color-text-primary)
var(--t-color-border-secondary)
var(--t-color-surface-primary)
```

**Spacing:**
```css
var(--t-space-0)      /* 0px */
var(--t-space-100)    /* 4px */
var(--t-space-200)    /* 8px */
var(--t-space-400)    /* 16px */
var(--t-space-800)    /* 32px */
```

**Typography:**
```css
var(--t-typography-heading-lg-semibold)
var(--t-typography-body-md-default)
var(--t-font-family-primary)     /* Outfit */
var(--t-font-family-arabic)      /* Tajawal */
```

**Layout:**
```css
var(--t-border-radius-150)    /* 6px */
var(--t-border-radius-300)    /* 12px */
var(--t-shadow-200)
```

See `.component-documentation/DesignTokens.mdx` for complete reference (113+ tokens).

---

## 💻 Development Workflow

### Basic Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Check code quality
npm run lint

# Auto-fix linting issues
npm run lint:fix

# TypeScript type checking
npm run type-check
```

### Documentation

```bash
# Verify component docs are synced
npm run docs:check

# List available documentation files
npm run docs:list
```

### Common Use Cases

**Create a form:**
```tsx
import { TextInput, Button } from '@tagaddod-design/react'

function LoginForm() {
  return (
    <form>
      <TextInput label="Email" type="email" required />
      <TextInput label="Password" type="password" required />
      <Button variant="primary" type="submit">Sign In</Button>
    </form>
  )
}
```

**Add a modal:**
```tsx
import { Modal, Button } from '@tagaddod-design/react'
import { useState } from 'react'

function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Modal open={isOpen} onOpenChange={setIsOpen} title="Confirm">
        <p>Are you sure?</p>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </Modal>
    </>
  )
}
```

**Show toast notifications:**
```tsx
import { toast, Toaster } from '@tagaddod-design/react'

// In your App.tsx
function App() {
  return (
    <>
      <Toaster />
      {/* Your app */}
    </>
  )
}

// In any component
function SaveButton() {
  const handleSave = async () => {
    try {
      await saveData()
      toast.success('Saved successfully!')
    } catch (error) {
      toast.error('Failed to save')
    }
  }

  return <Button onClick={handleSave}>Save</Button>
}
```

---

## 📦 Publishing to GitHub

### Step 1: Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. **Repository name**: `tagaddod-starter`
3. **Description**: `Production-ready starter template for Tagaddod Design System`
4. **Visibility**: Choose Public or Private
5. **IMPORTANT**: DO NOT check any of these:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license

   (We already have these files)

6. Click **"Create repository"**

### Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR-USERNAME/tagaddod-starter.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3: Verify

1. Refresh your GitHub repository page
2. You should see all files uploaded
3. The README.md should be displayed

### Optional: GitHub Settings

**Add Repository Topics:**
- `react`, `typescript`, `vite`, `design-system`, `tagaddod`, `starter-template`, `rtl-support`, `arabic`, `claude-code`

**Set as Template Repository:**
1. Go to Settings
2. Check ✅ "Template repository"
3. Save

Users can then create new repositories from this template with the "Use this template" button.

---

## 🧩 Claude Skill Reference

### Skill Location
`.claude/skills/tagaddod-design-system/`

### What It Does
- **Reads** local component documentation automatically
- **Extracts** import patterns, props, and examples
- **Generates** correct implementations
- **Falls back** to Shadcn MCP (or web search) if component doesn't exist
- **Applies** design tokens for custom components
- **Supports** RTL/Arabic implementation

### Skill Workflow

```
User Request
    ↓
Detect Component Name
    ↓
Check Session Memory (cache)
    ↓
Read .component-documentation/[Component].mdx (if needed)
    ↓
Extract: Imports, Props, Examples
    ↓
Generate Implementation Code
    ↓
[If not found: Try Shadcn MCP → Web Search → Build Custom]
```

### Additional Skills

- **rtl-auto-switching**: RTL behavior reference for native Tagaddod components
- **rtl-custom-component-implementation**: RTL support for custom components (Shadcn/Antd/custom-built)

---

## 📜 Available Scripts

```bash
# Development
npm start              # Start dev server (same as npm run dev)
npm run dev            # Start dev server (port 5173)
npm run build          # Build for production
npm run preview        # Preview production build

# Code Quality
npm run lint           # Check code quality
npm run lint:fix       # Auto-fix linting issues
npm run type-check     # TypeScript type checking

# Documentation
npm run docs:check     # Verify component docs are synced
npm run docs:list      # List available documentation files
```

---

## 📚 Documentation

### Component Documentation
All component documentation is in `.component-documentation/`:
- 33 component guides (.mdx files)
- Each contains: API, props, types, usage examples, RTL support, accessibility

### System Guides
Comprehensive guides in `.design-system-guides/`:
- **COMPONENT-DISCOVERY-WORKFLOW.md**: 4-tier component discovery system
- **RTL-AUTO-SWITCHING.md**: Complete RTL auto-switching guide
- **OVERLAY-SYSTEM-GUIDE.md**: Z-index and overlay nesting

### Claude Code Guide
See `CLAUDE.md` for:
- Mandatory workflows
- Component implementation protocol
- Design token usage rules
- RTL implementation guidelines
- Modular component architecture

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

### Best Practices

**DO ✅**
- Read component documentation first
- Use design tokens for all styling
- Ask Claude for help - it reads docs automatically
- Test RTL mode if building multilingual apps
- Use TypeScript types provided by components

**DON'T ❌**
- Don't hardcode colors, spacing, or fonts - use design tokens
- Don't create custom wrapper components - use components as-is
- Don't guess component props - read documentation
- Don't use fixed directions (`margin-left`) - use logical properties
- Don't skip ThemeProvider if using RTL

---

**Happy Coding! 🚀**

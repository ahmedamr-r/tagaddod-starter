# Tagaddod Design System Template

**Production-ready starter template for building applications with Tagaddod Design System**

This is a clean, minimal template that provides everything you need to start building applications with the Tagaddod Design System. It comes pre-configured with TypeScript, Vite, and comprehensive component documentation.

## 🎯 What's Included

1. **Pre-configured Vite + React + TypeScript setup** - Modern development environment ready to go
2. **Tagaddod Design System integration** - All 33+ components ready to use
3. **RTL/LTR support** - Built-in Arabic and English language support
4. **Component documentation** - Complete .mdx documentation for all components
5. **Claude AI skill** - Intelligent component implementation assistance
6. **Design tokens** - Access to full design system token library

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Monorepo Root                                              │
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                │
│  │  Packages    │         │ Verdaccio    │                │
│  │  /tokens     │────────▶│ Local NPM    │                │
│  │  /react      │ publish │ Registry     │                │
│  └──────────────┘         │ :4873        │                │
│                           └──────────────┘                │
│                                  │                          │
│                                  │ npm install              │
│                                  ▼                          │
│                           ┌──────────────┐                │
│                           │ apps/        │                │
│                           │ template-test│                │
│                           │ (This package)│               │
│                           └──────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Install Verdaccio (First Time Only)

```bash
npm install -g verdaccio
```

### 2. Start Verdaccio

In one terminal window, from the monorepo root:

```bash
yarn registry:start
```

This will start Verdaccio at `http://localhost:4873`

Visit the web UI: http://localhost:4873 (optional)

### 3. Build and Publish Packages

In another terminal window:

```bash
# Build all packages
yarn build

# Publish to local Verdaccio registry
yarn registry:publish
```

### 4. Install Dependencies in Template Test

```bash
cd apps/template-test
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

The app will open at http://localhost:3000

## 📋 Common Workflows

### Complete Testing Workflow

```bash
# Terminal 1: Start Verdaccio (keep running)
yarn registry:start

# Terminal 2: Make changes, build, and test
# 1. Edit components in packages/react
# 2. Build and publish
yarn build:react
yarn registry:publish

# 3. Update template-test package
yarn registry:update-test

# 4. See results
cd apps/template-test && npm run dev
```

### Quick Update Script

Use the automated workflow:

```bash
yarn registry:test-workflow
```

This runs: `build → publish → update template-test`

### Documentation Sync

Documentation is automatically synced when you build the React package. To manually sync:

```bash
cd packages/react
npm run copy-docs
```

For real-time documentation sync while developing:

```bash
# From monorepo root
yarn watch:docs
```

## 🔧 Configuration

### .npmrc

The `.npmrc` file forces this package to use Verdaccio instead of workspace links:

```ini
registry=http://localhost:4873/
@tagaddod-design:registry=http://localhost:4873/
```

### package.json Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run update:design-system` - Update design system packages from Verdaccio

## 📦 Available Design System Components

This package has access to all Tagaddod Design System components:

- **Form Controls**: Button, TextInput, Select, Checkbox, Switch, RangeSlider, DatePicker, Calendar
- **Layout**: AspectRatio, Separator, Card, Sidebar, TopBar
- **Data Display**: Avatar, Badge, Table, Logo
- **Navigation**: Tabs, Listbox, Pagination
- **Overlays**: Modal, Drawer, Popover, Tooltip
- **Feedback**: Sonner (notifications)

### Usage Example

```tsx
import { Button, Modal, Table } from '@tagaddod-design/react'
import '@tagaddod-design/react/styles'

function App() {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
    </div>
  )
}
```

## 🤖 AI Agent Integration

This package includes a comprehensive `CLAUDE.md` file with instructions for Claude Code agents, including:

- Component discovery protocol
- Design token usage guidelines
- RTL/Arabic support patterns
- Documentation-first development workflow

The `.component-documentation/` folder contains detailed MDX guides for all components.

## 🐛 Troubleshooting

### "Cannot find module @tagaddod-design/react"

**Solution**: Packages not published to Verdaccio yet.

```bash
# From monorepo root
yarn registry:publish
cd apps/template-test
npm install
```

### "Connection refused to localhost:4873"

**Solution**: Verdaccio is not running.

```bash
yarn registry:start
```

### Outdated package versions

**Solution**: Update to latest from Verdaccio.

```bash
cd apps/template-test
npm run update:design-system
```

### Documentation out of sync

**Solution**: Manually trigger documentation copy.

```bash
cd packages/react
npm run copy-docs
```

## 🔍 Differences from Production Template

This testing package differs from the published template in:

1. **Registry Configuration**: Uses local Verdaccio via `.npmrc`
2. **Documentation Source**: Synced automatically from monorepo
3. **Version Updates**: Uses `@latest` from local registry
4. **Git Tracking**: Excluded from repository (`.gitignore`)

## 📚 Additional Resources

- [Verdaccio Documentation](https://verdaccio.org/docs/what-is-verdaccio)
- [Tagaddod Design System Docs](https://tagaddod-design-system.vercel.app/)
- [Monorepo Root README](../../README.md)

## ⚠️ Important Notes

- **This package is for local testing only** - It is excluded from git
- **Verdaccio must be running** for npm install to work
- **Always build packages before publishing** to Verdaccio
- **Documentation syncs automatically** on React package build
- **Use exact versions** in package.json (configured in .npmrc)

## 🆘 Getting Help

If you encounter issues:

1. Check Verdaccio is running: `curl http://localhost:4873`
2. Verify packages are published: Visit http://localhost:4873 in browser
3. Check package versions: `npm view @tagaddod-design/react versions --registry http://localhost:4873`
4. Clear npm cache: `npm cache clean --force`
5. Reinstall: `rm -rf node_modules package-lock.json && npm install`

---

**Happy Testing! 🚀**

# Tagaddod Template - Development Workflow

Complete guide to building applications with the Tagaddod Design System template.

---

## Overview

This template provides everything you need to build production-ready React applications with:

- **33+ pre-built components** from Tagaddod Design System
- **Claude AI assistance** for automatic component implementation
- **Complete documentation** in `.component-documentation/` folder
- **RTL/Arabic support** built-in
- **Design tokens** for consistent styling

---

## Development Workflow

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Verify documentation is synced
npm run docs:check

# Start development server
npm run dev
```

Visit: **http://localhost:5173**

### 2. Building Your First Component

#### Option A: Ask Claude Code (Recommended)

Simply ask Claude to implement the component:

```
You: "I need a login form with email and password fields"

Claude: [Automatically invokes tagaddod-design-system skill]
        [Reads TextInput.mdx and Button.mdx]
        [Generates implementation with proper imports and props]
```

Claude will:
1. Read relevant documentation from `.component-documentation/`
2. Extract exact import patterns and props
3. Generate working code with proper TypeScript types
4. Apply design tokens for styling

#### Option B: Manual Implementation

1. **Check available components:**
   ```bash
   npm run docs:list
   ```

2. **Read component documentation:**
   Open `.component-documentation/TextInput.mdx` and `.component-documentation/Button.mdx`

3. **Import and use:**
   ```tsx
   import { TextInput, Button } from 'tagaddod-design-react'

   function LoginForm() {
     return (
       <div>
         <TextInput label="Email" type="email" required />
         <TextInput label="Password" type="password" required />
         <Button variant="primary">Sign In</Button>
       </div>
     )
   }
   ```

### 3. Adding Custom Styling

**Always use design tokens** for styling:

```tsx
<div style={{
  padding: 'var(--t-space-400)',
  backgroundColor: 'var(--t-color-fill-primary)',
  borderRadius: 'var(--t-border-radius-medium)',
  boxShadow: 'var(--t-shadow-small)'
}}>
  Your content
</div>
```

**Reference:** `.component-documentation/DesignTokens.mdx`

### 4. Implementing RTL/Arabic

For Arabic/RTL applications:

```tsx
// src/main.tsx
import { ThemeProvider } from 'tagaddod-design-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultDirection="rtl"
      defaultLocale="ar"
      defaultBrand="tagaddod"
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

**Features:**
- Auto font switch: Outfit (English) → Tajawal (Arabic)
- Auto text alignment
- Auto line height adjustment
- Auto layout mirroring

**Reference:** `.component-documentation/ThemeProvider.mdx`

---

## Common Use Cases

### Use Case 1: Data Table with Actions

Ask Claude:
```
"Create a user table with name, email columns and an edit button for each row"
```

Or implement manually using `.component-documentation/Table.mdx`:

```tsx
import { Table, Button } from 'tagaddod-design-react'

const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Email', accessor: 'email' },
  {
    header: 'Actions',
    accessor: 'id',
    cell: (value) => (
      <Button size="small" onClick={() => handleEdit(value)}>
        Edit
      </Button>
    )
  }
]

const data = [
  { id: 1, name: 'Ahmed', email: 'ahmed@example.com' },
  { id: 2, name: 'Sara', email: 'sara@example.com' }
]

<Table columns={columns} data={data} />
```

### Use Case 2: Modal Confirmation Dialog

Ask Claude:
```
"Add a delete confirmation modal with cancel and confirm buttons"
```

Or implement manually using `.component-documentation/Modal.mdx`:

```tsx
import { Modal, Button } from 'tagaddod-design-react'
import { useState } from 'react'

function DeleteButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button tone="critical" onClick={() => setIsOpen(true)}>
        Delete
      </Button>

      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this item?</p>
        <div style={{
          display: 'flex',
          gap: 'var(--t-space-200)',
          marginTop: 'var(--t-space-400)'
        }}>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button tone="critical" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  )
}
```

### Use Case 3: Form with Validation

Ask Claude:
```
"Create a registration form with name, email, password fields and validation"
```

Or implement manually:

```tsx
import { TextInput, Button } from 'tagaddod-design-react'
import { useState } from 'react'

function RegistrationForm() {
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    // Your validation logic
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        required
        error={errors.name}
      />
      <TextInput
        label="Email"
        type="email"
        required
        error={errors.email}
      />
      <TextInput
        label="Password"
        type="password"
        required
        error={errors.password}
      />
      <Button variant="primary" type="submit">
        Register
      </Button>
    </form>
  )
}
```

### Use Case 4: Toast Notifications

Ask Claude:
```
"Add toast notifications for success and error messages"
```

Or implement manually using `.component-documentation/Sonner.mdx`:

```tsx
import { toast, Toaster } from 'tagaddod-design-react'

// Add to App.tsx
function App() {
  return (
    <>
      <Toaster />
      {/* Your app content */}
    </>
  )
}

// Use in components
function SaveButton() {
  const handleSave = async () => {
    try {
      await saveData()
      toast.success('Data saved successfully!')
    } catch (error) {
      toast.error('Failed to save data')
    }
  }

  return <Button onClick={handleSave}>Save</Button>
}
```

---

## Claude Code Integration

### How Claude Skill Works

The `.claude/skills/tagaddod-design-system.md` skill provides:

1. **Automatic Documentation Reading**
   - Detects component name from your request
   - Reads `.component-documentation/[Component].mdx`
   - Extracts imports, props, and examples

2. **Intelligent Code Generation**
   - Uses exact patterns from documentation
   - Includes proper TypeScript types
   - Applies design tokens correctly

3. **Fallback Strategy**
   - If component doesn't exist: Search Shadcn
   - If not in Shadcn: Search Antd
   - If nowhere: Build custom with design tokens

### Example Interactions

```
You: "I need a sidebar navigation"
Claude: [Reads Sidebar.mdx]
        [Generates Sidebar with menu items]

You: "Make it support RTL"
Claude: [Reads ThemeProvider.mdx]
        [Adds RTL implementation]

You: "I need a date picker component"
Claude: [Reads DatePicker.mdx if exists]
        [OR searches Shadcn if not found]
        [Generates implementation with Tagaddod tokens]
```

### Asking for Help

**Good prompts:**
- "Create a button with loading state"
- "Add a table with sorting and filtering"
- "Implement a modal with form inside"
- "Build a dashboard layout with sidebar"

**Great prompts:**
- "Create a user table with name, email, role columns, edit/delete buttons, and pagination"
- "Build a login form with email/password, validation, and loading state on submit button"
- "أريد إنشاء نموذج تسجيل باللغة العربية مع دعم RTL" (I want to create a registration form in Arabic with RTL support)

---

## Available Components

See `.component-documentation/` for complete documentation (33 components):

### Forms (7)
- Button - Various variants, sizes, tones, loading states
- TextInput - Text fields with labels, errors, validation
- Select - Dropdown selections
- Checkbox - Single or grouped checkboxes
- RadioButton - Radio button groups
- Switch - Toggle switches
- RangeSlider - Slider for number ranges

### Data Display (7)
- Table - Sortable, filterable data tables
- Badge - Status indicators
- Avatar - User avatars with fallbacks
- Card - Content containers
- Number - Formatted number display
- Calendar - Date selection calendar
- DatePicker - Date picker with calendar

### Layout (4)
- AspectRatio - Maintain aspect ratios
- Separator - Dividers
- Sidebar - Navigation sidebars
- Page - Page layout wrapper

### Navigation (4)
- Tabs - Tabbed interfaces
- Listbox - List navigation
- Pagination - Page navigation
- TopBar - Top navigation bar

### Overlays (5)
- Modal - Dialog modals
- Drawer - Side panels
- Popover - Floating content
- Tooltip - Hover tooltips
- ScrollArea - Custom scrollbars

### Feedback (1)
- Sonner - Toast notifications

### Branding & Theming (5)
- Logo - Tagaddod logo
- TopBar - Branded top bar
- ThemeProvider - Theme management
- DesignTokens - Complete token reference

---

## Design Token Reference

### Quick Reference

```css
/* Colors */
--t-color-fill-primary
--t-color-fill-secondary
--t-color-fill-brand-primary
--t-color-text-primary
--t-color-text-secondary
--t-color-border-primary

/* Spacing (0, 100, 200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000, 2400, 3200) */
--t-space-0       /* 0px */
--t-space-400     /* 16px */
--t-space-800     /* 32px */

/* Typography */
--t-typography-heading-large
--t-typography-body-medium
--t-font-family-primary     /* Outfit */
--t-font-family-arabic      /* Tajawal */

/* Layout */
--t-border-radius-small
--t-border-radius-medium
--t-shadow-small
--t-shadow-medium
```

**Complete reference:** `.component-documentation/DesignTokens.mdx` (200+ tokens)

---

## Troubleshooting

### Issue: Component not rendering

**Solution:** Check import path
```tsx
// ✅ Correct
import { Button } from 'tagaddod-design-react'

// ❌ Wrong
import { Button } from 'tagaddod-design-react/components/Button'
```

### Issue: Styles not applied

**Solution:** Ensure styles are imported in `main.tsx`
```tsx
import 'tagaddod-design-react/styles'
```

### Issue: RTL not working

**Solution:** Wrap app in ThemeProvider
```tsx
import { ThemeProvider } from 'tagaddod-design-react'

<ThemeProvider defaultDirection="rtl" defaultLocale="ar">
  <App />
</ThemeProvider>
```

### Issue: TypeScript errors on component props

**Solution:** Check component documentation for correct prop types
```bash
# View component docs
code .component-documentation/Button.mdx
```

### Issue: Claude generates wrong component usage

**Solution:** Verify documentation is synced
```bash
npm run docs:check
```

If docs are missing, contact maintainers or check if component exists in design system.

---

## Best Practices

### DO ✅

- **Read component documentation** first (`.component-documentation/`)
- **Use design tokens** for all styling
- **Ask Claude for help** - it will read docs automatically
- **Test RTL mode** if building multilingual apps
- **Use TypeScript types** provided by components
- **Check docs sync** if component behavior is unexpected

### DON'T ❌

- **Don't hardcode colors, spacing, or fonts** - use design tokens
- **Don't create custom wrapper components** - use components as-is
- **Don't guess component props** - read documentation
- **Don't use fixed directions** (`margin-left`) - use logical properties (`margin-inline-start`)
- **Don't skip ThemeProvider** if using RTL

---

## Next Steps

1. ✅ Explore `.component-documentation/` folder
2. ✅ Ask Claude to implement your first component
3. ✅ Build a complete page using multiple components
4. ✅ Add RTL support if needed
5. ✅ Customize with design tokens
6. 🚀 Deploy your application

**Happy Building! 🎨**

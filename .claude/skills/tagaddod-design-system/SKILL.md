---
name: tagaddod-design-system
description: Implement Tagaddod Design System components by reading local documentation. Use when user requests UI components (buttons, modals, tables, forms, inputs, cards, navigation, overlays), React component implementation, or custom component creation. Provides exact import patterns, props, usage examples, and design token integration from .component-documentation/ folder. Also use for component styling questions and design token selection.
---

# Tagaddod Design System Component Implementation Skill

## Purpose

This skill helps Claude Code agents implement Tagaddod Design System components **correctly and consistently** by:

1. **Automatically reading** component documentation from `.component-documentation/` folder
2. **Extracting exact** import patterns, props, and usage examples
3. **Following established** design patterns and best practices
4. **Applying design tokens** for consistent styling
5. **Supporting RTL/Arabic** internationalization
6. **Falling back** to Shadcn/Antd when components don't exist

This skill is **self-contained** and works in the standalone template repository.

---

## ⚠️ MANDATORY: Verbalize Before Executing

**Before performing ANY Tier 1/2/3 search or implementation**:

1. **State out loud** (to user) which tier you're executing
2. **Show TodoWrite checklist** with current step highlighted
3. **Wait for tool results** before proceeding to next tier

### Example Verbalization:

```
"Kanban not found in Tagaddod documentation.

🔍 Executing **TIER 1: Shadcn Search**

Using tool: mcp__tavily-mcp__tavily-search
Query: 'shadcn kanban 2025 latest implementation react typescript'

⏳ Waiting for results..."

[Tool executes]

"✅ Tier 1 Results: Found Shadcn Kanban implementation at [URL]

Next: Extract patterns and apply Tagaddod design tokens."
```

**If Tier 1 fails:**

```
"❌ Tier 1 FAILED - No Shadcn Kanban found

🔍 Proceeding to **TIER 2: Ant Design Search**

Using tool: mcp__tavily-mcp__tavily-search
Query: 'antdesign kanban react 2025 best practices typescript'

⏳ Waiting for results..."
```

---

## 🚨 MANDATORY EXECUTION CHECKLIST - STOP POINTS

**CRITICAL**: When component NOT found in `.component-documentation/`, you MUST follow this checklist IN ORDER:

### ☑️ TIER 1: Search Shadcn (REQUIRED - DO NOT SKIP)

- [ ] **🚨 STOP HERE** - Execute search first
- [ ] **Tool**: `mcp__tavily-mcp__tavily-search`
- [ ] **Query**: `"shadcn [component] 2025 latest implementation react"`
- [ ] **Wait for results** - Do not proceed until search completes
- [ ] **Evaluate**:
  - ✅ If found → Extract component patterns + Apply Tagaddod design tokens
  - ❌ If NOT found → Proceed to Tier 2

### ☑️ TIER 2: Search Ant Design (REQUIRED - DO NOT SKIP)

- [ ] **🚨 STOP HERE** - Only if Tier 1 failed
- [ ] **Tool**: `mcp__tavily-mcp__tavily-search`
- [ ] **Query**: `"antdesign [component] react 2025 best practices"`
- [ ] **Wait for results** - Do not proceed until search completes
- [ ] **Evaluate**:
  - ✅ If found → Extract component patterns + Apply Tagaddod design tokens
  - ❌ If NOT found → Proceed to Tier 3

### ☑️ TIER 3: Build Custom Component (LAST RESORT ONLY)

- [ ] **🚨 STOP HERE** - Only if Tier 1 AND Tier 2 both failed
- [ ] **Tool**: `Read` - `.component-documentation/DesignTokens.mdx`
- [ ] **Navigate** to relevant Component Styling Workflow section
- [ ] **Follow** decision trees for token selection
- [ ] **Research**: `"react [component] best practices 2025 accessibility"`
- [ ] **Build** using selected tokens + modular architecture

**⚠️ WARNING**: Never skip Tier 1 or Tier 2. Always search external sources before building custom!

---

## 🚫 AUTOMATIC VIOLATION DETECTION

If you find yourself:

- ❌ Reading Card.mdx or Button.mdx before searching Shadcn/Antd
- ❌ Implementing custom component without web search
- ❌ Skipping TodoWrite checklist updates
- ❌ Not verbalizing which tier you're executing
- ❌ Proceeding to Tier 2 without completing Tier 1
- ❌ Using hardcoded values instead of design tokens

**STOP IMMEDIATELY** and:

1. **State**: "I detected a workflow violation"
2. **Identify**: Which step was skipped (e.g., "I skipped Tier 1 search")
3. **Correct**: Go back to skipped step
4. **Resume**: Follow proper sequence

### Example Self-Correction:

```
"STOP - I detected a workflow violation.

I jumped to reading Card.mdx without searching Shadcn or Ant Design first.

I skipped TIER 1 and TIER 2 in the Custom Component Discovery workflow.

Correcting now: Going back to execute Tier 1 search...

🔍 Executing **TIER 1: Shadcn Search**
Using tool: mcp__tavily-mcp__tavily-search
Query: 'shadcn kanban 2025 latest implementation react typescript'
⏳ Waiting for results..."
```

---

## Workflow

### Step 1: Component Request Detection

When a user requests a component implementation, detect the component name from the request:

**Examples:**
- "I need a button" → Button
- "Add a table with sorting" → Table
- "Create a modal dialog" → Modal
- "Show a toast notification" → Sonner
- "Add text input fields" → TextInput

### Step 2: Read Local Documentation

**ALWAYS** read the corresponding `.component-documentation/[ComponentName].mdx` file **FIRST** before implementing:

```bash
# Documentation file path pattern:
.component-documentation/Button.mdx
.component-documentation/Table.mdx
.component-documentation/Modal.mdx
.component-documentation/TextInput.mdx
.component-documentation/Sonner.mdx
# ... and 28 more components
```

**Available Components (33 total):**

- **Form Controls**: Button, TextInput, Select, Checkbox, RadioButton, Switch, RangeSlider
- **Data Display**: Table, Badge, Avatar, Card, Number, Calendar, DatePicker
- **Layout**: AspectRatio, Separator, Page, Sidebar
- **Navigation**: Tabs, Listbox, Pagination
- **Overlays**: Modal, Drawer, Popover, Tooltip, ScrollArea
- **Feedback**: Sonner (toasts)
- **Branding**: Logo, TopBar
- **Theming**: ThemeProvider
- **Styling**: DesignTokens

### Step 3: Extract Implementation Patterns

From the documentation file, extract:

1. **Import Statements** (exact syntax)
   ```tsx
   import { Button } from 'tagaddod-design-react'
   ```

2. **Props and TypeScript Interfaces**
   ```tsx
   interface ButtonProps {
     variant?: 'primary' | 'secondary' | 'outlined' | 'plain'
     tone?: 'default' | 'critical' | 'success'
     size?: 'small' | 'medium' | 'large'
     disabled?: boolean
     loading?: boolean
     // ... and more
   }
   ```

3. **Usage Examples**
   ```tsx
   <Button variant="primary" size="medium">
     Click Me
   </Button>
   ```

4. **RTL/Arabic Support** (if documented)
   ```tsx
   <ThemeProvider defaultDirection="rtl" defaultLocale="ar">
     <Button>زر عربي</Button>
   </ThemeProvider>
   ```

5. **Design Token Integration** (from DesignTokens.mdx)
   ```css
   /* Colors */
   var(--t-color-fill-primary)
   var(--t-color-text-primary)

   /* Spacing */
   var(--t-space-400)

   /* Typography */
   var(--t-typography-body-medium)
   ```

### Step 4: Generate Component Code

Use the **EXACT patterns** from the documentation to generate implementation code:

**Example Response:**
```tsx
// Based on documentation from .component-documentation/Button.mdx

import { Button } from 'tagaddod-design-react'

export function MyForm() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Submit
      </Button>
      <Button variant="secondary" size="medium">
        Cancel
      </Button>
    </div>
  )
}
```

### Step 5: Fallback Strategy (If Component NOT Found)

**⚠️ BEFORE PROCEEDING**: Review the [MANDATORY EXECUTION CHECKLIST](#-mandatory-execution-checklist---stop-points) above. You MUST follow Tier 1 → Tier 2 → Tier 3 in order.

If the component does **NOT** exist in `.component-documentation/`:

#### Tier 1: Search Shadcn
```
Use web search: "shadcn [component] 2025 latest implementation react"
Extract: Component structure, props, usage patterns
Apply: Tagaddod design tokens from .component-documentation/DesignTokens.mdx
```

#### Tier 2: Search Antd
```
Use web search: "antdesign [component] react 2025 best practices"
Extract: Component patterns, TypeScript integration
Apply: Tagaddod design tokens
```

#### Tier 3: Build Custom Component with Token Guidance

**CRITICAL**: When building custom components, **AUTOMATICALLY read DesignTokens.mdx for token selection guidance**.

**Workflow:**

```
1. Read .component-documentation/DesignTokens.mdx (navigate to relevant section)
2. Identify component type (button, card, form, modal, table, etc.)
3. Navigate to corresponding Component Styling Workflow section
4. Follow decision trees for token selection:
   - Text colors → Text Color Decision Tree (lines 78-145)
   - Backgrounds → Fill Color Decision Tree (lines 148-264)
   - Borders → Border Color Decision Tree (lines 266-338)
   - Spacing → Spacing Decision Tree (lines 341-399)
   - Typography → Typography Decision Tree (lines 402-508)
   - Border Radius → Border Radius Decision Tree (lines 511-554)

5. Apply tokens according to workflow:
   - Button Styling Workflow (lines 801-905)
   - Card Styling Workflow (lines 909-967)
   - Form Input Styling Workflow (lines 970-1064)
   - Modal/Dialog Styling Workflow (lines 1068-1106)
   - Table Styling Workflow (lines 1110-1147)
   - Badge Styling Workflow (lines 1151-1180)

6. Research best practices: "react [component] best practices 2025 accessibility"
7. Build custom component using selected tokens
8. Apply modular component architecture from CLAUDE.md guidelines
```

**Token Selection Example for Custom Button:**

```tsx
// 1. Read DesignTokens.mdx → Button Styling Workflow
// 2. Follow decision tree: button → brand → filled → states
// 3. Apply tokens:

.custom-button {
  background-color: var(--t-color-fill-brand);
  color: var(--t-color-text-on-fill);
  padding: var(--t-space-300) var(--t-space-400);
  border-radius: var(--t-border-radius-150);
  font: var(--t-typography-label-md-semibold);
  transition: var(--t-transition-soft);
}

.custom-button:hover {
  background-color: var(--t-color-fill-brand-hover);
  color: var(--t-color-text-on-fill-hover);
}
```

**Mandatory Rules for Tier 3:**
- ✅ ALWAYS read DesignTokens.mdx before applying any styling
- ✅ ALWAYS use semantic tokens (`--t-color-text-primary`)
- ❌ NEVER use primitive palettes (`--t-color-blue-500`)
- ❌ NEVER hardcode values (`#333`, `16px`)
- ✅ ALWAYS consult decision trees for token selection
- ✅ ALWAYS follow component styling workflows

---

## Critical Rules for AI Agents

### ✅ ALWAYS DO

1. **Read documentation FIRST** - Never guess component usage
2. **Use exact imports** - Follow documentation patterns exactly
3. **Apply design tokens** - Use `var(--t-*)` for all styling
4. **Support RTL** - Check ThemeProvider.mdx for Arabic/RTL requirements
5. **Follow TypeScript** - Use proper interfaces and types
6. **Check session memory** - Avoid re-reading docs if already in context

### ❌ NEVER DO

1. **DON'T guess props** - Always read documentation
2. **DON'T use hardcoded styles** - Use design tokens only
3. **DON'T skip RTL support** - Implement for Arabic when needed
4. **DON'T create wrappers** - Use components as-is
5. **DON'T ignore examples** - Follow documented patterns

---

## Design Tokens Integration

**MANDATORY for ALL styling tasks** (components, layouts, custom styles):

### Always Reference: `.component-documentation/DesignTokens.mdx`

**Token Categories:**

1. **Colors**
   ```css
   /* Fill colors */
   var(--t-color-fill-primary)
   var(--t-color-fill-secondary)
   var(--t-color-fill-brand-primary)

   /* Text colors */
   var(--t-color-text-primary)
   var(--t-color-text-secondary)
   var(--t-color-text-link)

   /* Border colors */
   var(--t-color-border-primary)
   var(--t-color-border-secondary)
   ```

2. **Spacing**
   ```css
   /* Scale: 0, 100, 200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000, 2400, 3200 */
   var(--t-space-0)      /* 0px */
   var(--t-space-100)    /* 4px */
   var(--t-space-200)    /* 8px */
   var(--t-space-400)    /* 16px */
   var(--t-space-800)    /* 32px */
   ```

3. **Typography**
   ```css
   var(--t-typography-heading-large)
   var(--t-typography-body-medium)
   var(--t-font-family-primary)
   var(--t-font-family-arabic)
   var(--t-line-height-english)
   var(--t-line-height-arabic)
   ```

4. **Layout**
   ```css
   var(--t-border-radius-small)
   var(--t-border-radius-medium)
   var(--t-shadow-small)
   var(--t-shadow-medium)
   ```

### Example: Using Design Tokens

```tsx
// ✅ CORRECT - Using design tokens
<div style={{
  padding: 'var(--t-space-400)',
  backgroundColor: 'var(--t-color-fill-primary)',
  color: 'var(--t-color-text-primary)',
  borderRadius: 'var(--t-border-radius-medium)',
  boxShadow: 'var(--t-shadow-small)'
}}>
  Content
</div>

// ❌ WRONG - Hardcoded values
<div style={{
  padding: '16px',
  backgroundColor: '#0066cc',
  color: '#333',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}}>
  Content
</div>
```

---

## Arabic/RTL Support Protocol

**When user requests Arabic language or RTL implementation:**

### 1. Read RTL Documentation
- `.component-documentation/ThemeProvider.mdx` - RTL setup patterns
- Component-specific `.mdx` files - Arabic/RTL sections

### 2. Implement ThemeProvider
```tsx
import { ThemeProvider } from 'tagaddod-design-react'

function App() {
  return (
    <ThemeProvider
      defaultDirection="rtl"
      defaultLocale="ar"
      defaultBrand="tagaddod"
    >
      {/* Your app content */}
    </ThemeProvider>
  )
}
```

### 3. Automatic RTL Features
When RTL is enabled, components automatically:
- Switch from Outfit (English) to Tajawal (Arabic) font
- Adjust text alignment (right-to-left)
- Apply appropriate line heights for Arabic
- Mirror directional layouts

### 4. Use Logical CSS Properties
```css
/* ✅ CORRECT - Logical properties */
margin-inline-start: var(--t-space-400);
margin-inline-end: var(--t-space-400);
text-align: start;

/* ❌ WRONG - Fixed directions */
margin-left: var(--t-space-400);
margin-right: var(--t-space-400);
text-align: left;
```

---

## Modular Component Architecture

**When creating custom components NOT in Tagaddod library:**

### Directory Structure
```
src/
├── components/
│   ├── ui/                    # Tagaddod re-exports
│   ├── custom/                # Custom components
│   │   ├── forms/             # Form-related
│   │   ├── layout/            # Layout components
│   │   ├── data-display/      # Data visualization
│   │   ├── navigation/        # Navigation
│   │   └── feedback/          # Feedback
│   └── composed/              # Complex composed components
```

### Atomic Design Principles
1. **Atomic components** - Single responsibility (buttons, inputs)
2. **Molecular components** - Composed from atoms (form fields, cards)
3. **Organism components** - Complex compositions (forms, tables, navbars)
4. **Pages** - Integrate organisms

### Example: Custom Form Field
```tsx
// src/components/custom/forms/FormField/FormField.tsx
import { TextInput } from 'tagaddod-design-react'

export interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div style={{ marginBottom: 'var(--t-space-400)' }}>
      <label style={{
        display: 'block',
        marginBottom: 'var(--t-space-200)',
        color: 'var(--t-color-text-primary)',
        fontSize: 'var(--t-typography-body-medium)'
      }}>
        {label} {required && <span style={{ color: 'var(--t-color-text-critical)' }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{
          display: 'block',
          marginTop: 'var(--t-space-100)',
          color: 'var(--t-color-text-critical)',
          fontSize: 'var(--t-typography-body-small)'
        }}>
          {error}
        </span>
      )}
    </div>
  )
}
```

---

## Session Memory Management

**Optimize token usage while maintaining accuracy:**

### When to Read Documentation
1. **First request** for a component in session → Read documentation
2. **Subsequent requests** for same component → Use cached knowledge
3. **Documentation updated** → Re-read to invalidate cache

### What to Cache
- Component props and interfaces
- Import patterns
- Usage examples
- RTL support requirements
- Design token mappings

### Example Workflow
```
User: "I need a Button"
Agent: [Reads .component-documentation/Button.mdx] → Cache context → Generate code

User: "Add another Button with loading state"
Agent: [Uses cached Button knowledge] → Generate code (NO re-read)

User: "Now I need a Table"
Agent: [Reads .component-documentation/Table.mdx] → Cache context → Generate code
```

---

## Common Implementation Patterns

### Pattern 1: Form with Validation
```tsx
import { Button, TextInput } from 'tagaddod-design-react'

function LoginForm() {
  return (
    <form style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--t-space-400)' }}>
        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div style={{ marginBottom: 'var(--t-space-400)' }}>
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <Button variant="primary" size="large" style={{ width: '100%' }}>
        Sign In
      </Button>
    </form>
  )
}
```

### Pattern 2: Data Table with Actions
```tsx
import { Table, Button } from 'tagaddod-design-react'

function UserTable() {
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (value) => (
        <Button size="small" variant="plain">Edit</Button>
      )
    }
  ]

  const data = [
    { id: 1, name: 'Ahmed', email: 'ahmed@example.com' },
    { id: 2, name: 'Sara', email: 'sara@example.com' }
  ]

  return <Table columns={columns} data={data} />
}
```

### Pattern 3: Modal Confirmation
```tsx
import { Modal, Button } from 'tagaddod-design-react'
import { useState } from 'react'

function DeleteConfirmation() {
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
          <Button tone="critical" onClick={() => {/* handle delete */}}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  )
}
```

---

## Troubleshooting

### Issue: Component not rendering
**Solution:** Check import path - use `tagaddod-design-react` not relative imports

### Issue: Styles not applied
**Solution:** Ensure `tagaddod-design-react/styles` is imported in main.tsx

### Issue: RTL not working
**Solution:** Wrap app in `<ThemeProvider defaultDirection="rtl">`

### Issue: TypeScript errors
**Solution:** Check component documentation for correct prop types

### Issue: Design tokens not working
**Solution:** Import design tokens CSS: `import 'tagaddod-design-react/styles'`

---

## Summary

This skill enables Claude Code agents to:

✅ **Read local documentation** from `.component-documentation/` folder
✅ **Extract exact patterns** for imports, props, and usage
✅ **Apply design tokens** for consistent styling
✅ **Support RTL/Arabic** internationalization
✅ **Fall back intelligently** to Shadcn/Antd/custom implementations
✅ **Cache knowledge** for token efficiency
✅ **Follow best practices** from Tagaddod Design System

**Result:** Accurate, consistent component implementations that match the design system perfectly, even for "vibe coders with no code knowledge."

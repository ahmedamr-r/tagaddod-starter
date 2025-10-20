# Overlay System - AI Agent Implementation Guide

**Version:** 1.0.0
**System Components:** Modal, Drawer, Popover, Tooltip, Select, DatePicker
**Documentation Type:** AI Agent Optimized

---

## 🚨 CRITICAL RULE FOR AI AGENTS 🚨

**THE OVERLAY SYSTEM IS AUTOMATIC - YOU DON'T NEED TO CONFIGURE IT!**

❌ **NEVER** manually set z-index values
❌ **NEVER** calculate z-index in your code
❌ **NEVER** import overlay context unless creating custom overlay components
✅ **ALWAYS** use components as-is - they handle nesting automatically

---

## Quick Navigation Index

### 📦 BASICS (Lines 50-150)
- How the System Works
- Z-Index Hierarchy
- When to Use Each Component

### 🎯 NESTING SCENARIOS (Lines 151-450)
- Drawer → Modal → Select (Complex Nesting)
- Table with Popover in Drawer
- Tabs with Overlays
- All Supported Combinations

### 🔧 FOR ADVANCED USERS ONLY (Lines 451-550)
- useDrawerContext Hook
- Creating Custom Overlay Components
- Edge Cases

### 🐛 TROUBLESHOOTING (Lines 551-650)
- Overlay Not Showing
- Z-Index Issues
- Common Mistakes

---

## How the Overlay System Works

The Tagaddod Design System uses **automatic z-index management** via React Context.

### The Simple Truth

```jsx
// ✅ THIS JUST WORKS - No configuration needed!
<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
  <Table data={products} columns={columns}>
    {/* Table uses Popover for filters */}
  </Table>

  <Modal open={modalOpen} onOpenChange={setModalOpen}>
    <Select options={options} />
    {/* Select dropdown appears on top - automatic! */}
  </Modal>
</Drawer>
```

**What happens automatically:**
1. Drawer detects it's open → sets context with base z-index (1020)
2. Modal detects it's inside Drawer → uses elevated z-index (1070)
3. Select detects it's inside Modal → uses maximum z-index (2147483647)
4. **You write zero z-index code!**

---

## Z-Index Hierarchy (Reference Only - Automatic)

You don't need to memorize this, but here's how it works:

```
NORMAL FLOW (No Nesting):
├─ Base content: 0
├─ Dropdown: 1000
├─ Popover: 1010
├─ Drawer: 1020
├─ Modal: 1050
├─ Toast: 1080
└─ Tooltip: 1090

INSIDE DRAWER (+50 offset):
├─ Drawer base: 1020
├─ Popover in Drawer: 1080
├─ Modal in Drawer: 1070 (uses --t-z-drawer-modal token)
└─ Select in Drawer Modal: 2147483647 (maximum)

INSIDE MODAL (+50 offset):
├─ Modal base: 1050
├─ Dropdown in Modal: 1060 (uses --t-z-modal-dropdown token)
└─ Select in Modal: 2147483647 (maximum)
```

**Design Tokens (Auto-Applied):**
```css
--t-z-base: 0
--t-z-dropdown: 1000
--t-z-popover: 1010
--t-z-drawer: 1020
--t-z-modal: 1050
--t-z-modal-dropdown: 1060
--t-z-drawer-modal: 1070
--t-z-toast: 1080
--t-z-tooltip: 1090
```

---

## Decision Tree: Which Component to Use?

```
Need overlay UI?
├─ Side panel with content?
│  └─ <Drawer> (z-index: 1020)
│
├─ Center dialog with actions?
│  └─ <Modal> (z-index: 1050)
│
├─ Small contextual info/menu?
│  └─ <Popover> (z-index: 1010)
│
├─ Dropdown selection?
│  └─ <Select> (z-index: 1000, or 2147483647 in modals)
│
├─ Tooltip on hover?
│  └─ <Tooltip> (z-index: 1090)
│
└─ Notification message?
   └─ <Sonner> (z-index: 1080)
```

---

## Complete Nesting Scenarios

### Scenario 1: Drawer → Table with Popover Filters

```jsx
// ✅ WORKS AUTOMATICALLY
function InventoryManagement() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Inventory">
      <Table
        data={products}
        columns={columns}
        showFilters={true}  // Uses Popover internally
        filterOptions={{
          category: {
            label: 'Category',
            type: 'select',  // Popover with dropdown
            options: categoryOptions
          },
          priceRange: {
            label: 'Price',
            type: 'rangeSlider'  // Popover with slider
          }
        }}
      />
    </Drawer>
  );
}
```

**What AI agents need to know:**
- Table filter buttons open Popovers
- Popovers automatically detect they're in Drawer
- Popovers appear above Drawer content (z-index: 1080)
- **Zero configuration required!**

---

### Scenario 2: Drawer → Modal → Select

```jsx
// ✅ PERFECT NESTING - All automatic
function EmployeeManagement() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [department, setDepartment] = useState('');

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>
        Open Employee List
      </Button>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Button onClick={() => setModalOpen(true)}>
          Add Employee
        </Button>

        {/* Modal automatically detects Drawer context */}
        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title="Add New Employee"
        >
          <div style={{ padding: 'var(--t-space-500)' }}>
            {/* Select automatically uses maximum z-index */}
            <Select
              label="Department"
              options={[
                { label: 'Engineering', value: 'eng' },
                { label: 'Sales', value: 'sales' },
                { label: 'Marketing', value: 'marketing' },
              ]}
              value={department}
              onChange={setDepartment}
              searchable
            />
          </div>
        </Modal>
      </Drawer>
    </>
  );
}
```

**Z-Index Flow (Automatic):**
1. Drawer overlay: 1019
2. Drawer content: 1020
3. Modal overlay: 1069 (Drawer z-index - 1)
4. Modal content: 1070 (--t-z-drawer-modal)
5. Select dropdown: 2147483647 (maximum, always on top)

---

### Scenario 3: Tabs → Modal/Drawer with Popover

```jsx
// ✅ ALL COMBINATIONS WORK
function ProductCatalog() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Tabs defaultValue="products">
      <TabsList>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="products">
        <Button onClick={() => setModalOpen(true)}>
          Add Product
        </Button>

        {/* Modal opens from TabsContent - works perfectly */}
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <Select label="Category" options={categories} />
          {/* Select dropdown appears on top */}
        </Modal>
      </TabsContent>

      <TabsContent value="analytics">
        {/* Can also use Drawer, Popover, etc. */}
      </TabsContent>
    </Tabs>
  );
}
```

---

### Scenario 4: Complex Real-World Example

```jsx
// ✅ DRAWER → TABS → TABLE → POPOVER → MODAL → SELECT
// Everything works without z-index configuration!

function ComplexDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Orders">
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Table
            data={pendingOrders}
            columns={columns}
            showFilters={true}  // Popover filters
            filterOptions={{
              status: {
                label: 'Status',
                type: 'select',  // Popover dropdown
                options: statusOptions
              }
            }}
            onRowClick={(row) => setDetailsModalOpen(true)}
          />

          {/* Modal from table row click */}
          <Modal
            open={detailsModalOpen}
            onOpenChange={setDetailsModalOpen}
            title="Order Details"
          >
            <Select
              label="Update Status"
              options={updateOptions}
              searchable  // Dropdown with search
            />
          </Modal>
        </TabsContent>
      </Tabs>
    </Drawer>
  );
}
```

**Layers (All Automatic):**
1. Base page
2. Drawer (1020)
3. Tabs (inside Drawer)
4. Table (inside Tabs)
5. Popover filters (1080 - above Drawer)
6. Modal from row click (1070)
7. Select dropdown in Modal (2147483647)

---

## ❌ COMMON AI AGENT MISTAKES

### Mistake 1: Manual Z-Index Configuration

```jsx
// ❌ WRONG - Don't do this!
<Modal
  open={modalOpen}
  onOpenChange={setModalOpen}
  style={{ zIndex: 9999 }}  // ❌ Manual z-index
>
  <Select options={options} />
</Modal>

// ✅ CORRECT - Let the system handle it
<Modal open={modalOpen} onOpenChange={setModalOpen}>
  <Select options={options} />
</Modal>
```

### Mistake 2: Using useDrawerContext When Not Needed

```jsx
// ❌ WRONG - Unnecessary complexity
import { useDrawerContext } from 'tagaddod-design-react';

function MyComponent() {
  const { isInsideDrawer } = useDrawerContext();

  return (
    <Modal
      open={open}
      style={{ zIndex: isInsideDrawer ? 1070 : 1050 }}  // ❌ Don't do this
    >
      Content
    </Modal>
  );
}

// ✅ CORRECT - Modal handles this automatically
function MyComponent() {
  return (
    <Modal open={open}>
      Content
    </Modal>
  );
}
```

### Mistake 3: Worrying About Nesting Depth

```jsx
// ✅ THIS WORKS - No matter how deep!
<Drawer>
  <Tabs>
    <TabsContent>
      <Table>
        {/* Table filter opens Popover */}
        <Modal>
          <Select />  {/* Always appears on top */}
        </Modal>
      </Table>
    </TabsContent>
  </Tabs>
</Drawer>
```

**AI Agent Rule:** If all components are from `tagaddod-design-react`, nesting just works. Don't overthink it!

---

## FOR ADVANCED USERS ONLY: useDrawerContext

**99% of AI agents will NEVER need this section. Skip unless creating custom overlay components.**

### When to Use (Rare Cases Only)

Only use `useDrawerContext` if you're creating a **custom overlay component** that needs z-index awareness.

```jsx
import { useDrawerContext } from 'tagaddod-design-react';

function CustomOverlayComponent() {
  const { isInsideDrawer, drawerZIndex } = useDrawerContext();

  // Only needed for custom components not in the design system
  const customZIndex = isInsideDrawer ? drawerZIndex + 10 : 1050;

  return (
    <div style={{ position: 'fixed', zIndex: customZIndex }}>
      Custom overlay content
    </div>
  );
}
```

**Built-in components that DON'T need this:**
- Modal ✅ (already context-aware)
- Popover ✅ (already context-aware)
- Select ✅ (uses maximum z-index)
- Tooltip ✅ (uses proper design token)
- DatePicker ✅ (inherits from internal components)

---

## Troubleshooting

### Issue: Overlay Not Showing

**Symptoms:**
- Modal/Drawer renders in DOM but not visible
- Popover appears behind other content
- Select dropdown hidden

**Diagnostic Steps:**

1. **Check if Portal is working:**
```jsx
// Open browser DevTools → Elements
// Look for component outside main app tree
// Should see: <div data-radix-portal>...</div>
```

2. **Verify z-index tokens exist:**
```jsx
// In browser console:
getComputedStyle(document.documentElement).getPropertyValue('--t-z-modal')
// Should return: "1050"
```

3. **Check for stacking context issues:**
```jsx
// Parent component creating stacking context?
// Look for: transform, opacity < 1, filter, etc.
<div style={{ transform: 'translateZ(0)' }}>  {/* ❌ Creates stacking context */}
  <Modal>...</Modal>  {/* May not escape */}
</div>
```

**Solution:** Use Portal-based components (Modal, Drawer, Popover) which render to `document.body` and escape stacking contexts.

---

### Issue: Tabs with Overlays

**Symptom:** Modal/Drawer opened from TabsContent appears behind content

**Solution:** This is already fixed! TabsContent uses transform animation which creates a stacking context, but Modal/Drawer/Popover use Portal and render outside TabsContent, so they work correctly.

```jsx
// ✅ WORKS CORRECTLY
<Tabs>
  <TabsContent value="tab1">
    <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
    <Modal open={modalOpen}>Content</Modal>
  </TabsContent>
</Tabs>
```

---

## Summary for AI Agents

1. **Overlays work automatically** - No z-index configuration needed
2. **Portal-based rendering** - Modal/Drawer/Popover render to document.body
3. **Context-aware z-index** - Components detect nesting and adjust automatically
4. **Design tokens used** - All z-index values come from design tokens
5. **Any nesting depth works** - Drawer → Tabs → Table → Modal → Select all layer correctly
6. **Zero manual configuration** - Just use the components as documented

**Golden Rule:** Trust the system. If you find yourself manually setting z-index values, you're doing it wrong!

---

**End of Overlay System Guide**
For component-specific documentation, see individual `.mdx` files.

# MANDATORY WORKFLOWS

This document contains **CRITICAL WORKFLOWS** that Claude Code MUST follow for every implementation task. These workflows have **STOP POINTS** and **CHECKPOINTS** to prevent skipping steps.

---

## 🚨 PRE-FLIGHT VERBALIZATION PROTOCOL

**MANDATORY**: Before implementing ANYTHING, Claude MUST verbally state to the user:

### Required Verbalization Template

```
You're asking me to: [1 sentence summary of request]

I will follow: [Workflow name from this document]

My execution plan:
- ✅ Step 1: [First action]
- 📋 Step 2: [Second action]
- 📋 Step 3: [Third action]
- 📋 Step 4: [Fourth action]

Checkpoint: Have I identified the correct workflow? ✅ YES
```

### Example Verbalization

> "You're asking me to add a Kanban board component.
>
> I will follow: **WORKFLOW #2 - Custom Component Discovery**
>
> My execution plan:
> - ✅ Step 1: Invoke tagaddod-design-system skill
> - 📋 Step 2: Check .component-documentation/ for Kanban
> - 📋 Step 3a: If NOT found → Search Shadcn (Tier 1)
> - 📋 Step 3b: If still not found → Search Antd (Tier 2)
> - 📋 Step 3c: If still not found → Read DesignTokens.mdx + Build custom (Tier 3)
>
> Checkpoint: Have I identified the correct workflow? ✅ YES
>
> Let me begin with Step 1..."

---

## WORKFLOW #1: Component Implementation (Tagaddod Library)

**When to use**: User requests a UI component (button, modal, table, form, etc.)

### ☑️ Execution Checklist

- [ ] **STEP 1: INVOKE SKILL**
  - Tool: `Skill` with command `"tagaddod-design-system"`
  - Wait for skill to load
  - Verbalize: "Invoking tagaddod-design-system skill..."

- [ ] **STEP 2: SKILL CHECKS DOCUMENTATION**
  - Skill reads `.component-documentation/[Component].mdx`
  - OR uses cached session memory if available
  - Verbalize: "Checking for [Component] documentation..."

- [ ] **STEP 3a: IF COMPONENT EXISTS**
  - Extract exact import patterns
  - Extract props and TypeScript interfaces
  - Extract usage examples
  - Extract RTL/design token requirements
  - Verbalize: "Found [Component] documentation. Implementing..."
  - **Proceed to Implementation**

- [ ] **STEP 3b: IF COMPONENT DOES NOT EXIST**
  - Verbalize: "[Component] not found in Tagaddod library"
  - **IMMEDIATELY switch to WORKFLOW #2 (Custom Component Discovery)**
  - ⚠️ **STOP HERE** - Do NOT implement custom component yet

### ✅ Success Criteria

- Component implemented using exact documented patterns
- Design tokens applied correctly
- RTL support included if needed
- TypeScript interfaces match documentation

---

## WORKFLOW #2: Custom Component Discovery

**When to use**: Component NOT found in `.component-documentation/` folder

### 🚨 CRITICAL RULES

1. **NEVER skip Tier 1 or Tier 2**
2. **ALWAYS search external sources before building custom**
3. **ALWAYS verbalize which tier you're executing**
4. **ALWAYS wait for search results before proceeding to next tier**

### ☑️ TIER 1: Search Shadcn (MANDATORY)

- [ ] **🛑 STOP HERE - Execute search first**
- [ ] **Verbalize**: "Component not in Tagaddod. Executing TIER 1: Shadcn search..."
- [ ] **TodoWrite**: Mark "Tier 1: Search Shadcn" as `in_progress`

#### Step 1a: Try Shadcn MCP First (Priority)
- [ ] **Tool**: `mcp__shadcn__*` (Shadcn MCP tools)
- [ ] **Action**: Query Shadcn component library via MCP
- [ ] **Wait for results** - DO NOT PROCEED until MCP query completes

#### Step 1b: Fallback to Web Search (If MCP Fails)
- [ ] **IF MCP unavailable/fails**: Proceed to web search
- [ ] **Tool**: `mcp__tavily-mcp__tavily-search` OR `WebSearch` OR `mcp__brave-search__*`
- [ ] **Query**: `"shadcn [component] 2025 latest implementation react typescript"`
- [ ] **Max Results**: 5
- [ ] **Wait for results** - DO NOT PROCEED until search completes

#### After Tier 1 Results:

- [ ] **IF FOUND** (relevant Shadcn component exists):
  - [ ] Verbalize: "✅ Tier 1 SUCCESS - Found Shadcn [component] at [URL]"
  - [ ] TodoWrite: Mark "Tier 1: Search Shadcn" as `completed`
  - [ ] Extract component patterns and structure
  - [ ] **Proceed to WORKFLOW #3 (Apply Design Tokens)**

- [ ] **IF NOT FOUND** (no relevant results):
  - [ ] Verbalize: "❌ Tier 1 FAILED - No Shadcn [component] found"
  - [ ] TodoWrite: Mark "Tier 1: Search Shadcn" as `completed`
  - [ ] **Proceed to TIER 2**

### ☑️ TIER 2: Search Ant Design (MANDATORY)

- [ ] **🛑 STOP HERE - Only proceed if Tier 1 failed**
- [ ] **Verbalize**: "Shadcn search failed. Executing TIER 2: Ant Design search..."
- [ ] **TodoWrite**: Mark "Tier 2: Search Ant Design" as `in_progress`
- [ ] **Tool**: `mcp__tavily-mcp__tavily-search`
- [ ] **Query**: `"antdesign [component] react 2025 best practices typescript"`
- [ ] **Max Results**: 5
- [ ] **Wait for results** - DO NOT PROCEED until search completes

#### After Tier 2 Results:

- [ ] **IF FOUND** (relevant Antd component exists):
  - [ ] Verbalize: "✅ Tier 2 SUCCESS - Found Ant Design [component] at [URL]"
  - [ ] TodoWrite: Mark "Tier 2: Search Ant Design" as `completed`
  - [ ] Extract component patterns and structure
  - [ ] **Proceed to WORKFLOW #3 (Apply Design Tokens)**

- [ ] **IF NOT FOUND** (no relevant results):
  - [ ] Verbalize: "❌ Tier 2 FAILED - No Ant Design [component] found"
  - [ ] TodoWrite: Mark "Tier 2: Search Ant Design" as `completed`
  - [ ] **Proceed to TIER 3**

### ☑️ TIER 3: Build Custom Component (LAST RESORT)

- [ ] **🛑 STOP HERE - Only proceed if BOTH Tier 1 AND Tier 2 failed**
- [ ] **Verbalize**: "Both Shadcn and Ant Design searches failed. Executing TIER 3: Custom component build..."
- [ ] **TodoWrite**: Mark "Tier 3: Build Custom Component" as `in_progress`

#### Mandatory Steps for Tier 3:

- [ ] **STEP 1: Read DesignTokens.mdx**
  - Tool: `Read`
  - Path: `.component-documentation/DesignTokens.mdx`
  - Navigate to relevant Component Styling Workflow section
  - Verbalize: "Reading DesignTokens.mdx for token selection guidance..."

- [ ] **STEP 2: Identify Component Type**
  - Determine: Is this a button, card, form input, modal, table, etc.?
  - Verbalize: "Component type identified as: [type]"

- [ ] **STEP 3: Follow Decision Trees**
  - Navigate to corresponding decision tree in DesignTokens.mdx:
    - Text colors → Text Color Decision Tree
    - Backgrounds → Fill Color Decision Tree
    - Borders → Border Color Decision Tree
    - Spacing → Spacing Decision Tree
    - Typography → Typography Decision Tree
  - Verbalize: "Following [decision tree name] for token selection..."

- [ ] **STEP 4: Research Best Practices**
  - Tool: `mcp__tavily-mcp__tavily-search`
  - Query: `"react [component] best practices 2025 accessibility"`
  - Extract accessibility patterns
  - Extract modern React patterns
  - Verbalize: "Researching accessibility and best practices..."

- [ ] **STEP 5: Build Component**
  - Use selected design tokens (NEVER hardcode values)
  - Apply modular architecture pattern
  - Include RTL support
  - Include accessibility features
  - Verbalize: "Building custom [component] with design tokens..."

- [ ] **STEP 6: Complete**
  - TodoWrite: Mark "Tier 3: Build Custom Component" as `completed`
  - Verbalize: "✅ Custom [component] completed with design tokens applied"

---

## WORKFLOW #3: Apply Design Tokens to External Components

**When to use**: After finding component in Shadcn or Ant Design (Tier 1/2 success)

### ☑️ Execution Checklist

- [ ] **STEP 1: Read DesignTokens.mdx**
  - Tool: `Read`
  - Path: `.component-documentation/DesignTokens.mdx`
  - Navigate to Component Styling Workflow section
  - Verbalize: "Applying Tagaddod design tokens to [Shadcn/Antd] component..."

- [ ] **STEP 2: Replace Hardcoded Values**
  - Colors: Replace hex/rgb with `var(--t-color-*)`
  - Spacing: Replace px values with `var(--t-space-*)`
  - Typography: Replace font sizes with `var(--t-typography-*)`
  - Borders: Replace with `var(--t-border-radius-*)` and `var(--t-border-width-*)`
  - Verbalize: "Replacing hardcoded values with design tokens..."

- [ ] **STEP 3: Add RTL Support (MANDATORY for Custom Components)**
  - **🚨 CRITICAL**: Invoke `rtl-custom-component-implementation` skill
  - Tool: `Skill` with command `"rtl-custom-component-implementation"`
  - Wait for skill to load
  - Verbalize: "Invoking RTL implementation skill for custom component..."
  - Skill will apply:
    - Line-height fix pattern (TypeScript + CSS)
    - CSS logical properties
    - RTL-specific overrides
    - Layout mirroring
    - Design token integration
  - Reference: `.design-system-guides/RTL-AUTO-SWITCHING.md` for context
  - Verbalize: "RTL support applied using proven patterns..."

- [ ] **STEP 4: Verify Token Usage**
  - Check: Are ALL styles using design tokens?
  - Check: No hardcoded colors, spacing, or typography?
  - Verbalize: "✅ All design tokens applied correctly"

---

## WORKFLOW #4: Design Token Selection

**When to use**: Styling ANY component (Tagaddod, external, or custom)

### ☑️ Quick Reference Checklist

- [ ] **What am I styling?**
  - [ ] Text → Use `--t-color-text-*` tokens
  - [ ] Button/Badge/Filled element → Use `--t-color-fill-*` tokens
  - [ ] Card/Panel/Surface → Use `--t-color-surface-*` tokens
  - [ ] Border → Use `--t-color-border-*` tokens
  - [ ] Spacing → Use `--t-space-*` tokens
  - [ ] Typography → Use `--t-typography-*` tokens

- [ ] **ALWAYS read decision tree FIRST**
  - Path: `.component-documentation/DesignTokens.mdx`
  - Navigate to relevant decision tree
  - Follow if-then logic

- [ ] **NEVER use these**:
  - ❌ Primitive palettes (`--t-color-blue-500`)
  - ❌ Hardcoded values (`#333`, `16px`)
  - ❌ Arbitrary colors or spacing

---

## ❌ COMMON MISTAKES & VIOLATIONS

### Violation #1: Skipping Online Searches

**What happened**:
- User requests component NOT in Tagaddod
- Claude immediately reads Card.mdx or Button.mdx
- Claude jumps to building custom component
- **Tier 1 and Tier 2 searches were NEVER executed**

**Correct behavior**:
- Check .component-documentation/ first
- If NOT found → Execute Tier 1 search (Shadcn)
- Wait for results
- If Tier 1 fails → Execute Tier 2 search (Antd)
- Only build custom if BOTH fail

### Violation #2: Not Verbalizing Workflow

**What happened**:
- Claude receives request
- Claude silently executes tools
- User has no visibility into which workflow is being followed

**Correct behavior**:
- State workflow name: "I will follow WORKFLOW #2: Custom Component Discovery"
- Show execution plan with TodoWrite
- Verbalize each tier: "Executing Tier 1: Shadcn search..."
- Report results: "✅ Tier 1 SUCCESS" or "❌ Tier 1 FAILED"

### Violation #3: Hardcoding Values Instead of Using Tokens

**What happened**:
- Claude builds custom component
- Uses `background: #f5f5f5` instead of `var(--t-color-surface-primary)`
- Uses `padding: 16px` instead of `var(--t-space-400)`

**Correct behavior**:
- ALWAYS read DesignTokens.mdx first
- ALWAYS use decision trees for token selection
- NEVER hardcode colors, spacing, or typography

### Violation #4: Forgetting TodoWrite Checklist

**What happened**:
- Claude executes workflow steps
- No TodoWrite updates
- User can't track progress

**Correct behavior**:
- Create TodoWrite checklist at start
- Update status for each step: `in_progress` → `completed`
- Show clear progress tracking

---

## ✅ WORKFLOW VERIFICATION CHECKLIST

**Before implementing, ask yourself**:

- [ ] Have I verbalized which workflow I'm following?
- [ ] Have I created a TodoWrite checklist?
- [ ] If component not in Tagaddod, have I searched Shadcn? (Tier 1)
- [ ] If Shadcn failed, have I searched Antd? (Tier 2)
- [ ] If both failed, have I read DesignTokens.mdx? (Tier 3)
- [ ] Am I using design tokens (not hardcoded values)?
- [ ] Have I waited for search results before proceeding to next tier?
- [ ] Have I verbalized tier results (success/failure)?

**If ANY answer is NO → STOP and correct**

---

## 🎯 Self-Correction Protocol

If you detect a violation:

1. **STOP IMMEDIATELY**
2. **State**: "I detected a workflow violation: [describe what was skipped]"
3. **Identify**: "I skipped [step name] in [workflow name]"
4. **Correct**: "Going back to execute [skipped step]..."
5. **Resume**: Continue from corrected step

**Example**:
> "STOP - I detected a workflow violation.
>
> I jumped to reading Card.mdx without searching Shadcn or Ant Design first.
>
> I skipped TIER 1 and TIER 2 in WORKFLOW #2 (Custom Component Discovery).
>
> Correcting now: Going back to execute Tier 1 search for Shadcn..."

---

## 📚 Reference Files

| Situation | Read This File |
|-----------|----------------|
| Component implementation | This file → WORKFLOW #1 |
| Component NOT in Tagaddod | This file → WORKFLOW #2 |
| Styling/token selection | `.component-documentation/DesignTokens.mdx` |
| RTL questions | `.design-system-guides/RTL-AUTO-SWITCHING.md` |
| RTL for custom components | Invoke `rtl-custom-component-implementation` skill |
| Z-index/overlay questions | `.design-system-guides/OVERLAY-SYSTEM-GUIDE.md` |
| Component discovery details | `.design-system-guides/COMPONENT-DISCOVERY-WORKFLOW.md` |
| AI behavior rules | `.claude/AI-BEHAVIOR-RULES.md` |

---

**Last Updated**: 2025-10-20
**Version**: 1.0.0

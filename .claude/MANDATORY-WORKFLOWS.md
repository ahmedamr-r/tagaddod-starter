# MANDATORY WORKFLOWS

This document contains **CRITICAL WORKFLOWS** that Claude Code MUST follow for every implementation task. These workflows have **STOP POINTS** and **CHECKPOINTS** to prevent skipping steps.

**For comprehensive details**, see `.design-system-guides/COMPONENT-DISCOVERY-WORKFLOW.md`

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

## WORKFLOW #2: Custom Component Discovery (4-Tier Fallback)

**When to use**: Component NOT found in `.component-documentation/` folder

### 🚨 CRITICAL RULES

1. **NEVER skip Tier 1 or Tier 2**
2. **ALWAYS search external sources before building custom**
3. **ALWAYS verbalize which tier you're executing**
4. **ALWAYS wait for search results before proceeding to next tier**

### ☑️ Quick Tier Checklist

**For detailed tier workflows, session caching strategy, token efficiency metrics, and practical examples:**

📖 **See**: `.design-system-guides/COMPONENT-DISCOVERY-WORKFLOW.md`
- Session Memory Management (lines 87-209)
- Complete Tier 1-4 Workflows (lines 211-583)
- Design Token Integration (lines 585-682)
- Practical Examples (lines 747-927)

#### TIER 1: Search Shadcn (MANDATORY)

- [ ] **🛑 STOP HERE - Execute search first**
- [ ] **Verbalize**: "Component not in Tagaddod. Executing TIER 1: Shadcn search..."
- [ ] **TodoWrite**: Mark "Tier 1: Search Shadcn" as `in_progress`
- [ ] **Step 1a**: Try Shadcn MCP First → Tool: `mcp__shadcn__*`
- [ ] **Step 1b**: Fallback to Web Search → Tool: `mcp__tavily-mcp__tavily-search` OR `WebSearch` OR `mcp__brave-search__*`
  - Query: `"shadcn [component] 2025 latest implementation react typescript"`
- [ ] **Wait for results** - DO NOT PROCEED until search completes
- [ ] **IF FOUND**: Extract patterns → Proceed to WORKFLOW #3 (Apply Tokens)
- [ ] **IF NOT FOUND**: Proceed to TIER 2

#### TIER 2: Search Ant Design (MANDATORY)

- [ ] **🛑 STOP HERE - Only proceed if Tier 1 failed**
- [ ] **Verbalize**: "Shadcn search failed. Executing TIER 2: Ant Design search..."
- [ ] **TodoWrite**: Mark "Tier 2: Search Ant Design" as `in_progress`
- [ ] **Tool**: `mcp__tavily-mcp__tavily-search`
- [ ] **Query**: `"antdesign [component] react 2025 best practices typescript"`
- [ ] **Wait for results** - DO NOT PROCEED until search completes
- [ ] **IF FOUND**: Extract patterns → Proceed to WORKFLOW #3 (Apply Tokens)
- [ ] **IF NOT FOUND**: Proceed to TIER 3

#### TIER 3: Build Custom Component (LAST RESORT)

- [ ] **🛑 STOP HERE - Only proceed if BOTH Tier 1 AND Tier 2 failed**
- [ ] **Verbalize**: "Both Shadcn and Ant Design searches failed. Executing TIER 3: Custom component build..."
- [ ] **TodoWrite**: Mark "Tier 3: Build Custom Component" as `in_progress`
- [ ] **STEP 1**: Read `.component-documentation/DesignTokens.mdx`
- [ ] **STEP 2**: Identify component type (button, card, form input, etc.)
- [ ] **STEP 3**: Follow decision trees for token selection
- [ ] **STEP 4**: Research best practices: `"react [component] best practices 2025 accessibility"`
- [ ] **STEP 5**: Build component using design tokens (NEVER hardcode)
- [ ] **STEP 6**: Apply modular architecture, RTL support, accessibility

---

## WORKFLOW #3: Apply Design Tokens to External Components

**When to use**: After finding component in Shadcn or Ant Design (Tier 1/2 success)

### ☑️ Execution Checklist

- [ ] **STEP 1**: Read `.component-documentation/DesignTokens.mdx`
  - Navigate to Component Styling Workflow section
  - Verbalize: "Applying Tagaddod design tokens to [Shadcn/Antd] component..."

- [ ] **STEP 2**: Replace Hardcoded Values
  - Colors: `#fff` → `var(--t-color-*)`
  - Spacing: `16px` → `var(--t-space-*)`
  - Typography: `14px` → `var(--t-typography-*)`
  - Borders: `8px` → `var(--t-border-radius-*)`

- [ ] **STEP 3**: Add RTL Support (MANDATORY for Custom Components)
  - **🚨 CRITICAL**: Invoke `rtl-custom-component-implementation` skill
  - Tool: `Skill` with command `"rtl-custom-component-implementation"`
  - Skill applies:
    - Line-height fix pattern (TypeScript + CSS)
    - CSS logical properties
    - RTL-specific overrides
    - Layout mirroring
    - Design token integration
  - Reference: `.design-system-guides/RTL-AUTO-SWITCHING.md` for context

- [ ] **STEP 4**: Verify Token Usage
  - Check: Are ALL styles using design tokens?
  - Check: No hardcoded colors, spacing, or typography?

---

## WORKFLOW #4: Design Token Selection

**When to use**: Styling ANY component (Tagaddod, external, or custom)

### ☑️ Quick Reference Checklist

**For complete token catalog, decision trees, and workflows:**

📖 **See**: `.component-documentation/DesignTokens.mdx`

- [ ] **What am I styling?**
  - Text → Use `--t-color-text-*` tokens
  - Button/Badge/Filled element → Use `--t-color-fill-*` tokens
  - Card/Panel/Surface → Use `--t-color-surface-*` tokens
  - Border → Use `--t-color-border-*` tokens
  - Spacing → Use `--t-space-*` tokens
  - Typography → Use `--t-typography-*` tokens

- [ ] **ALWAYS read decision tree FIRST**
  - Path: `.component-documentation/DesignTokens.mdx`
  - Navigate to relevant decision tree
  - Follow if-then logic

- [ ] **NEVER use these**:
  - ❌ Primitive palettes (`--t-color-blue-500`)
  - ❌ Hardcoded values (`#333`, `16px`)
  - ❌ Arbitrary colors or spacing

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
| Component NOT in Tagaddod | This file → WORKFLOW #2 (quick checklist) |
| **Detailed 4-tier workflow** | `.design-system-guides/COMPONENT-DISCOVERY-WORKFLOW.md` |
| Styling/token selection | `.component-documentation/DesignTokens.mdx` |
| RTL questions | `.design-system-guides/RTL-AUTO-SWITCHING.md` |
| RTL for custom components | Invoke `rtl-custom-component-implementation` skill |
| Z-index/overlay questions | `.design-system-guides/OVERLAY-SYSTEM-GUIDE.md` |
| AI behavior rules | `.claude/AI-BEHAVIOR-RULES.md` |

---

**Last Updated**: 2025-10-20
**Version**: 2.0.0 (Streamlined)

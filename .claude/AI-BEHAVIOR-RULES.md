# AI BEHAVIOR & EXECUTION RULES

This document defines **HOW** Claude Code should behave during task execution. These are meta-rules about thinking processes, not technical implementation details.

---

## 🎯 CORE PRINCIPLE: Think Out Loud

Claude MUST verbalize its thought process **BEFORE** and **DURING** execution. The user should always know:

1. What Claude is doing
2. Why Claude is doing it
3. Which workflow Claude is following
4. What Claude will do next

**Silent execution is NOT acceptable.**

---

## ⚠️ MANDATORY BEHAVIORS

### 1. Pre-Action Verbalization

**BEFORE taking ANY action**, Claude MUST state:

#### Required Elements:

- [ ] **What**: What the user is asking for (1 sentence summary)
- [ ] **How**: Which workflow will be followed (reference MANDATORY-WORKFLOWS.md)
- [ ] **Steps**: Numbered execution plan (use TodoWrite)
- [ ] **Checkpoint**: "Have I identified the correct workflow?"

#### Example:

```
You're asking me to: Add a Kanban board component

I will follow: WORKFLOW #2 - Custom Component Discovery (from MANDATORY-WORKFLOWS.md)

My steps:
1. ✅ Invoke tagaddod-design-system skill
2. 📋 Check .component-documentation/ for Kanban
3. 📋 If NOT found → Search Shadcn (Tier 1)
4. 📋 If Tier 1 fails → Search Antd (Tier 2)
5. 📋 If Tier 2 fails → Read DesignTokens.mdx + Build custom (Tier 3)

Checkpoint: Have I identified the correct workflow? ✅ YES

Beginning Step 1...
```

### 2. During-Action Progress Updates

**WHILE executing multi-step workflows**, Claude MUST provide progress updates:

#### At Each Step:

- [ ] **Announce** which step is starting
  - Example: "Now executing Step 2: Checking .component-documentation/ for Kanban..."
- [ ] **Update TodoWrite** to show current step as `in_progress`
- [ ] **Report results** after each step completes
  - Example: "✅ Step 2 complete: Kanban NOT found in documentation"
- [ ] **State next action** before proceeding
  - Example: "Next: Proceeding to Step 3 - Searching Shadcn..."

#### Example Flow:

```
Step 1: Invoking tagaddod-design-system skill...
[Tool executes]
✅ Step 1 complete: Skill loaded successfully

Step 2: Checking .component-documentation/ for Kanban...
[Tool executes]
✅ Step 2 complete: Kanban NOT found in Tagaddod library

Next: Proceeding to Step 3 - Tier 1 Search (Shadcn)

Step 3: Executing TIER 1 - Shadcn search...
Step 3a: Trying Shadcn MCP first...
Using tool: mcp__shadcn__* (Shadcn MCP)
Checking Shadcn component library via MCP...
[If MCP unavailable/fails]
Step 3b: Falling back to web search...
Using tool: mcp__tavily-mcp__tavily-search (or WebSearch or mcp__brave-search__)
Query: "shadcn kanban 2025 latest implementation react typescript"
Waiting for results...
[Tool executes]
✅ Tier 1 SUCCESS: Found Shadcn Kanban at [URL]

Next: Extract patterns and apply Tagaddod design tokens
```

### 3. Never Assume

Claude MUST ask for clarification when:

#### Scenarios Requiring Questions:

- [ ] **Workflow unclear**: Multiple workflows could apply
  - Ask: "Should I follow [Workflow A] or [Workflow B]?"
- [ ] **Multiple valid options**: More than one implementation approach
  - List options and ask user to choose
- [ ] **Documentation missing/incomplete**: Expected file doesn't exist
  - State clearly: "Expected file [path] not found. Should I proceed with [alternative]?"
- [ ] **User intent ambiguous**: Request could mean different things
  - Ask: "By [request], do you mean [option 1] or [option 2]?"

#### Example:

```
I found the Kanban component in both Shadcn and Ant Design.

Two options available:
1. Shadcn Kanban - More modern, uses @dnd-kit for drag-and-drop
2. Ant Design Kanban - More established, built-in features

Which would you prefer me to use as the foundation?
```

### 4. Workflow Adherence

Claude MUST follow numbered steps **in exact order**:

#### Rules:

- [ ] **Never skip steps** - Each step must complete before proceeding
- [ ] **Never skip tiers** - In discovery workflows, Tier 1 → Tier 2 → Tier 3 MUST execute in sequence
- [ ] **Stop at STOP markers** - When workflow says "🛑 STOP HERE", wait for tool completion
- [ ] **Verify completion** - Mark each step as `completed` in TodoWrite before moving on

#### Tier Adherence Example:

```
❌ WRONG:
User: "Add Kanban board"
Claude: [Jumps to reading Card.mdx and building custom component]

✅ CORRECT:
User: "Add Kanban board"
Claude: "Following WORKFLOW #2 - Custom Component Discovery"
Claude: "Step 1: Checking .component-documentation/..."
Claude: "NOT found. Proceeding to Tier 1: Shadcn search..."
Claude: [Executes search]
Claude: "Tier 1 results: [reports findings]"
Claude: [Either uses Shadcn OR proceeds to Tier 2, never skips]
```

---

## 🔍 SELF-CHECK PROTOCOL

**Before executing ANYTHING**, Claude MUST ask itself these questions:

### Critical Self-Questions:

1. **"Have I checked MANDATORY-WORKFLOWS.md?"**
   - If NO → Read `.claude/MANDATORY-WORKFLOWS.md` first

2. **"Am I following the correct tier sequence?"**
   - If implementing custom component → Must have searched Tier 1 and Tier 2 first
   - If NO → Go back and execute missing tiers

3. **"Have I verbalized my plan to the user?"**
   - If NO → State workflow, steps, and checkpoint question

4. **"Am I jumping to implementation without searching?"**
   - If YES → STOP and execute search tiers first

5. **"Am I using design tokens or hardcoding values?"**
   - If hardcoding → STOP and read DesignTokens.mdx

6. **"Have I updated TodoWrite with my progress?"**
   - If NO → Create or update TodoWrite checklist

### If ANY Answer is NO:

```
STOP IMMEDIATELY
↓
State the violation
↓
Identify what was skipped
↓
Correct by going back to skipped step
↓
Resume from corrected step
```

---

## 🚫 VIOLATION DETECTION & SELF-CORRECTION

### How to Detect Violations:

Claude should monitor itself for these patterns:

#### Violation Pattern #1: Silent Execution

**Signs**:
- No verbalization of workflow before starting
- No progress updates during execution
- User doesn't know what's happening

**Self-Correction**:
```
STOP - I should be thinking out loud

Correction: Let me verbalize what I'm doing:
"You're asking me to [task]. I will follow [workflow]. My steps are: [list]"

Resuming with verbalization enabled...
```

#### Violation Pattern #2: Skipped Tiers

**Signs**:
- Component not in Tagaddod
- Jumped directly to custom build
- No Shadcn or Antd search executed

**Self-Correction**:
```
STOP - I detected a tier skip violation

I jumped to custom component build without searching external sources.

Correction: Going back to execute Tier 1 (Shadcn search)...
[Executes search]

Now continuing properly through tier sequence...
```

#### Violation Pattern #3: Hardcoded Values

**Signs**:
- Using `#333` instead of `var(--t-color-text-primary)`
- Using `16px` instead of `var(--t-space-400)`
- Did not read DesignTokens.mdx

**Self-Correction**:
```
STOP - I detected hardcoded values in my implementation

I used hardcoded colors/spacing instead of design tokens.

Correction: Reading DesignTokens.mdx for proper token selection...
[Reads documentation]

Replacing hardcoded values with tokens...
```

#### Violation Pattern #4: No TodoWrite Updates

**Signs**:
- Multi-step workflow in progress
- No TodoWrite checklist visible
- User can't track progress

**Self-Correction**:
```
STOP - I should be tracking progress with TodoWrite

Correction: Creating TodoWrite checklist now:
[Creates checklist with all steps]

Resuming with progress tracking enabled...
```

---

## ✅ SUCCESS INDICATORS

Claude is following behavioral rules correctly when:

### Observable Behaviors:

- [ ] **Every request** starts with verbalized workflow statement
- [ ] **TodoWrite checklist** created for multi-step tasks
- [ ] **Progress updates** provided at each major step
- [ ] **Tier searches** executed in proper sequence (never skipped)
- [ ] **Design tokens** used (never hardcoded values)
- [ ] **Self-corrections** made when violations detected
- [ ] **User clarity** maintained throughout execution

### Example of Correct Behavior:

```
User: "Add a Kanban board"

Claude: "You're asking me to add a Kanban board component.

I will follow: WORKFLOW #2 - Custom Component Discovery

My execution plan:
[Creates TodoWrite checklist with 6 steps]

Checkpoint: Have I identified the correct workflow? ✅ YES

---

Step 1: Invoking tagaddod-design-system skill...
✅ Skill loaded

Step 2: Checking .component-documentation/ for Kanban...
✅ Kanban NOT found in Tagaddod library

Proceeding to Tier 1 Search...

Step 3: Executing TIER 1 - Shadcn search
Step 3a: Trying Shadcn MCP first...
Tool: mcp__shadcn__* (Shadcn MCP)
⏳ Checking Shadcn component library via MCP...
[If MCP unavailable/fails]
Step 3b: Falling back to web search...
Tool: mcp__tavily-mcp__tavily-search (or WebSearch or mcp__brave-search__)
Query: 'shadcn kanban 2025 latest implementation react typescript'
⏳ Waiting for results...

[Search executes]

✅ Tier 1 SUCCESS - Found Shadcn Kanban implementation
URL: [link]

Next: I will extract the Shadcn Kanban structure and apply Tagaddod design tokens.

Would you like me to proceed?"
```

---

## 📋 BEHAVIORAL CHECKLIST (Every Request)

**Print this mentally before EVERY task**:

```
[ ] Read request and identify task type
[ ] Check MANDATORY-WORKFLOWS.md for correct workflow
[ ] Verbalize workflow to user
[ ] Create TodoWrite checklist
[ ] Ask checkpoint question: "Have I identified the correct workflow?"
[ ] Execute steps IN ORDER
[ ] Verbalize progress at each step
[ ] Update TodoWrite status as steps complete
[ ] Use design tokens (never hardcode)
[ ] Execute all tiers in sequence (never skip)
[ ] Self-correct if violation detected
[ ] Report completion with summary
```

---

## 🎓 LEARNING FROM MISTAKES

### Documented Historical Violations:

**Violation Date**: 2025-10-20
**What Happened**: User requested Kanban board. Claude skipped Tier 1 and Tier 2 searches, jumped directly to reading Card.mdx.

**Root Cause**:
- Eager execution bias (wanting to "solve" immediately)
- Workflow buried in documentation (not front-of-mind)
- No verbalization requirement

**Solution Implemented**:
- Created MANDATORY-WORKFLOWS.md with explicit STOP points
- Added verbalization requirements
- Moved critical workflows to top of CLAUDE.md
- Added self-check protocol

**Prevention**:
- Always verbalize workflow BEFORE acting
- Always create TodoWrite checklist
- Always execute tiers in sequence

---

## 🔗 RELATED FILES

| File | Purpose |
|------|---------|
| `.claude/MANDATORY-WORKFLOWS.md` | What workflows to follow |
| `.claude/AI-BEHAVIOR-RULES.md` | How to behave (this file) |
| `CLAUDE.md` | Main project instructions |
| `.claude/skills/tagaddod-design-system/Skill.md` | Component implementation skill |

---

**Remember**: Following these behavioral rules ensures accuracy, transparency, and user trust. When in doubt, verbalize your thought process and ask for clarification.

---

**Last Updated**: 2025-10-20
**Version**: 1.0.0

# CloudCLI UI/UX Deep Refactor - Implementation Plan

## Audit Findings

### 1. Layout Structure
- Desktop: fixed sidebar + MainContent (header + tabs + chat area)
- QuickSettingsHandle panel: always rendered, chevron handle always visible at right edge
- Chat area: `max-w-3xl` centered with proper padding

### 2. Chat Messages Rendering
- Messages in `max-w-3xl` with vertical rhythm
- ClaudeStatus (isLoading) renders as floating div inside messages area
- Stop button: crude red badge style
- Message grouping works but spacing can be tight

### 3. Composer Structure (CRITICAL ISSUE)
- **Height**: ~120px mobile, ~80px desktop
- **Structure**: PromptInput wrapper → Header (images) → Body (textarea) → Footer (tools + submit)
- **Tools in footer**: Attach, Commands, AdvancedMenu (settings dropdown)
- **Slash commands badge**: Red circle with count
- **Problem**: Too tall, too many visible controls, feels like a toolbar dump

### 4. Processing State (CRITICAL ISSUE)
- ClaudeStatus: floating div between messages and composer
- Shows: provider icon + animated dots + elapsed time + Stop button
- Stop button: red badge, isolated and crude
- Not attached to any message or proper status region

### 5. Sidebar Sessions
- SidebarProjectItem: project/session tree with expand/collapse
- Session title displayed with truncation
- Poor titles: "hey", "hello", "hi"
- Active session: 2px left border + bold weight (already improved)

### 6. Header
- MainContentHeader: tabs (Chat/Shell/Files/SC/Tasks), project name
- Mobile: menu button + project name + tabs
- Crowded on mobile

### 7. Floating Chevron (QuickSettingsHandle)
- Always rendered at right edge
- Opens QuickSettingsPanel (64px wide slide-in panel)
- ChevronLeft/Right indicates open/closed state
- **Problem**: This is a SETTINGS panel handle - should not be visible in primary chat UI unless user explicitly wants settings
- **Fix**: Hide unless panel is open, or remove from primary view

### 8. Empty/New Session State
- ProviderSelectionEmptyState: provider picker + model selector + "New Session" button
- Shows when `chatMessages.length === 0`
- Has NextTaskBanner if tasks enabled
- **Problem**: Feels like a placeholder, not intentional

### 9. Mobile Responsive
- Sidebar: drawer on mobile (85vw wide)
- Composer: `p-2 pb-2 sm:p-4 sm:pb-4 md:p-4 md:pb-6` - still too much padding
- Header: tabs scroll horizontally

---

## Structural Problems Identified

1. **Composer is a toolbar dump** - 5+ controls always visible
2. **Status floats awkwardly** - not attached to assistant message
3. **Stop button is crude** - isolated red badge
4. **QuickSettingsHandle is always visible** - settings panel artifact in primary UI
5. **Mobile composer too tall** - padding + tools + footer take too much space
6. **Empty state feels weak** - not intentional enough
7. **Session titles poor** - "hey", "hello" generation
8. **Header crowded on mobile** - too many elements

---

## Implementation Plan

### Phase 1: Composer Simplification (CRITICAL)
**Goal**: Make composer a clean input, not a toolbar dump

1. **Strip footer tools to minimum**:
   - Mobile: Attach button + Send button only
   - Desktop: Attach + Commands + Send (3 buttons max in primary view)
   - Move AdvancedMenu to a compact icon that doesn't dominate

2. **Reduce mobile height**:
   - Mobile padding: `p-2 pb-2` → `p-1.5 pb-2`
   - Footer tools compact: smaller icons, tighter spacing
   - Textarea: min-height 40px mobile, expands naturally

3. **Redesign footer layout**:
   - Use flexbox with gap control
   - Only essential controls visible
   - Advanced features behind overflow menu or gesture

### Phase 2: Status Integration (CRITICAL)
**Goal**: Make processing state clean and attached to context

1. **Attach status to last assistant message**:
   - If last message is assistant AND isLoading: show status inline below it
   - Remove floating status div

2. **Integrate Stop button elegantly**:
   - Move Stop button into composer footer when actively streaming
   - Replace Send button with Stop button during streaming
   - Style: subtle, not crude red badge

3. **Clean streaming indicator**:
   - Subtle animated dots near last message
   - Elapsed time in small muted text
   - No separate status region

### Phase 3: Side Panel & Floating Controls
**Goal**: Remove floating artifacts from primary chat UI

1. **Hide QuickSettingsHandle when panel closed**:
   - Only show when panel is open, OR
   - Remove from chat view entirely (put in settings drawer)
   - This is a settings panel - shouldn't be in primary UI

2. **Remove mysterious chevron**:
   - If no real side panel content, don't show handle
   - The panel slides in from right but feels unfinished

### Phase 4: Mobile Header & Layout
**Goal**: Less crowded, more focused

1. **Simplify mobile header**:
   - Project name: truncate gracefully
   - Tabs: icon-only on very small screens, or collapse to menu
   - Menu button: always visible

2. **Improve empty state**:
   - Make it feel intentional, not placeholder
   - Clean provider selection
   - Clear "Start a conversation" CTA

### Phase 5: Session Titles
**Goal**: Better session naming

1. **Improve title generation** (future work, deferred for now):
   - Generate from first meaningful exchange
   - Filter out "hey", "hello", "hi"
   - Use topic extraction

2. **Display improvements** (current):
   - Truncation: proper with ellipsis
   - Font: semibold for active, normal for inactive
   - Timestamp: compact, relative time

---

## Implementation Priority

1. **Composer simplification** - Most critical, affects daily use
2. **Status integration + Stop button** - Critical UX
3. **Hide floating chevron** - Quick win
4. **Mobile composer height** - Quick win
5. **Empty state polish** - Medium priority
6. **Session titles** - Lower priority (deferred)

---

## Files to Modify

1. `ChatComposer.tsx` - Strip footer, reduce mobile height
2. `ChatMessagesPane.tsx` - Attach status to last message
3. `ClaudeStatus.tsx` - Refactor for inline integration
4. `PromptInput.tsx` - Refactor footer structure
5. `QuickSettingsHandle.tsx` - Hide when panel closed OR remove from primary UI
6. `ui-refactor.css` - Mobile composer height, status styling
7. `MainContent.tsx` - Conditionally render QuickSettingsHandle
8. `MainContentHeader.tsx` - Mobile header simplification
9. `ProviderSelectionEmptyState.tsx` - Polish empty state

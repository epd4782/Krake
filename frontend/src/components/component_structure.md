# Krake Orchestrator System Frontend Component Structure

## Global Components

### Layout Components
- `AppLayout.tsx` - Main application layout with sidebar and content area
- `Sidebar.tsx` - Navigation sidebar with workspace links
- `Header.tsx` - Top header with global actions and user info
- `CommandBar.tsx` - Global command input for Krake
- `GlobalKPIs.tsx` - Display for global KPIs

### UI Components
- `Button.tsx` - Reusable button component
- `Card.tsx` - Card container for content blocks
- `Modal.tsx` - Modal dialog component
- `Dropdown.tsx` - Dropdown menu component
- `Tabs.tsx` - Tabbed interface component
- `Table.tsx` - Data table component
- `Input.tsx` - Text input component
- `Select.tsx` - Select dropdown component
- `Toggle.tsx` - Toggle switch component
- `Badge.tsx` - Status badge component
- `Alert.tsx` - Alert/notification component
- `Tooltip.tsx` - Tooltip component
- `ProgressBar.tsx` - Progress indicator component
- `Spinner.tsx` - Loading spinner component
- `Avatar.tsx` - User avatar component
- `Icon.tsx` - Icon component

### Shared Components
- `WorkspaceSelector.tsx` - Workspace selection dropdown
- `KPICard.tsx` - Individual KPI display card
- `ActivityFeed.tsx` - Activity feed component
- `SearchBar.tsx` - Search input component
- `FilterBar.tsx` - Filter controls component
- `Pagination.tsx` - Pagination controls
- `ErrorBoundary.tsx` - Error handling component
- `EmptyState.tsx` - Empty state display
- `LoadingState.tsx` - Loading state display
- `ExpandableBlock.tsx` - Block that can expand to full screen

## Workspace-Specific Components

### Workspace Components
- `WorkspaceHeader.tsx` - Workspace-specific header with KPIs
- `WorkspaceBlocks.tsx` - Grid of workspace blocks
- `WorkspaceActivityOverview.tsx` - Activity feed for workspace

### Sintra AI Components
- `SintraAgentsBlock.tsx` - Block showing all Sintra agents
- `SintraAgentCard.tsx` - Individual agent card
- `SintraFolderView.tsx` - Folder view for agent
- `SintraFolderTable.tsx` - Table view for folder entries
- `SintraTaskEntry.tsx` - Individual task entry in table

### Integration Components
- `ShopifyPanel.tsx` - Embedded Shopify web app
- `GelatoPanel.tsx` - Embedded Gelato web app
- `BinancePanel.tsx` - Embedded Binance web app
- `SintraXPanel.tsx` - Embedded Sintra X web app

### Folder Components
- `FolderBlock.tsx` - Block representing a folder
- `FolderTable.tsx` - Table view for folder contents
- `FolderTableControls.tsx` - Controls for adding/removing columns

### Coordinator Components
- `CoordinatorOverview.tsx` - Task scheduling interface
- `ScheduleForm.tsx` - Form for scheduling tasks
- `ScheduleCalendar.tsx` - Calendar view of scheduled tasks

### To Do Workspace Components
- `TodoList.tsx` - List of to-do items
- `TodoItem.tsx` - Individual to-do item
- `TodoFilter.tsx` - Filter controls for to-do list
- `TodoReplyForm.tsx` - Form for replying to to-do items

## Page Components

### Dashboard Pages
- `DashboardPage.tsx` - Main dashboard page
- `WorkspaceOverviewPage.tsx` - Overview of all workspaces

### Workspace Pages
- `LunavoWorkspacePage.tsx` - Lunavo workspace page
- `MonarchWorkspacePage.tsx` - Monarch workspace page
- `LunabotsWorkspacePage.tsx` - Lunabots workspace page
- `HardLifeModeWorkspacePage.tsx` - Hard Life Mode workspace page
- `ManagementWorkspacePage.tsx` - Management workspace page
- `TodoWorkspacePage.tsx` - To Do workspace page

### Block Detail Pages
- `BlockDetailPage.tsx` - Full-screen view of a block
- `SintraAgentDetailPage.tsx` - Full-screen view of Sintra agent
- `FolderDetailPage.tsx` - Full-screen view of a folder
- `IntegrationDetailPage.tsx` - Full-screen view of integration

## Context Providers
- `AuthContext.tsx` - Authentication context
- `WorkspaceContext.tsx` - Current workspace context
- `CommandContext.tsx` - Krake command context
- `NotificationContext.tsx` - Notification system context
- `ThemeContext.tsx` - Theme/styling context

## Hooks
- `useWorkspace.ts` - Hook for workspace data
- `useKPIs.ts` - Hook for KPI data
- `useAgent.ts` - Hook for Sintra agent data
- `useFolder.ts` - Hook for folder data
- `useCommand.ts` - Hook for Krake commands
- `useActivity.ts` - Hook for activity data
- `useTasks.ts` - Hook for task data

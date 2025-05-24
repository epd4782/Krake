# Krake Orchestrator System API Endpoints

## Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

## Workspaces
- `GET /api/workspaces` - List all workspaces
- `GET /api/workspaces/{workspace_id}` - Get workspace details
- `GET /api/workspaces/{workspace_id}/kpis` - Get workspace KPIs

## Agents (Sintra AIs)
- `GET /api/agents` - List all Sintra AI agents
- `GET /api/agents/{agent_id}` - Get agent details
- `POST /api/agents/{agent_id}/tasks` - Assign task to agent
- `GET /api/agents/{agent_id}/folders` - List agent folders
- `POST /api/agents/{agent_id}/folders` - Create new folder
- `DELETE /api/agents/{agent_id}/folders/{folder_id}` - Delete folder

## Folders and Entries
- `GET /api/folders/{folder_id}` - Get folder details
- `GET /api/folders/{folder_id}/entries` - List folder entries
- `POST /api/folders/{folder_id}/entries` - Create new entry
- `PUT /api/folders/{folder_id}/entries/{entry_id}` - Update entry
- `DELETE /api/folders/{folder_id}/entries/{entry_id}` - Delete entry

## Tasks
- `GET /api/tasks` - List all tasks (filterable by workspace, status)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{task_id}` - Get task details
- `PUT /api/tasks/{task_id}` - Update task
- `DELETE /api/tasks/{task_id}` - Delete task
- `GET /api/tasks/{task_id}/runs` - Get task run history

## Task Runs
- `GET /api/task-runs/{run_id}` - Get task run details
- `POST /api/task-runs/{run_id}/retry` - Retry failed task run

## Escalations
- `GET /api/escalations` - List all escalations
- `PUT /api/escalations/{escalation_id}/resolve` - Resolve escalation

## Command Interface
- `POST /api/command` - Send command to Krake
- `GET /api/command/history` - Get command history

## Coordinator
- `GET /api/coordinator/schedules` - List all scheduled tasks
- `POST /api/coordinator/schedules` - Create new scheduled task
- `PUT /api/coordinator/schedules/{schedule_id}` - Update scheduled task
- `DELETE /api/coordinator/schedules/{schedule_id}` - Delete scheduled task

## Integrations

### Shopify
- `GET /api/integrations/shopify/products` - List Shopify products
- `GET /api/integrations/shopify/orders` - List Shopify orders
- `POST /api/integrations/shopify/products` - Create Shopify product
- `PUT /api/integrations/shopify/products/{product_id}` - Update Shopify product

### Gelato
- `GET /api/integrations/gelato/products` - List Gelato products
- `POST /api/integrations/gelato/orders` - Create Gelato order
- `GET /api/integrations/gelato/orders/{order_id}` - Get Gelato order status

### Binance
- `GET /api/integrations/binance/account` - Get Binance account info
- `GET /api/integrations/binance/trades` - List Binance trades
- `POST /api/integrations/binance/orders` - Create Binance order

## Knowledge Base
- `GET /api/knowledge` - Search knowledge base
- `POST /api/knowledge` - Add to knowledge base
- `PUT /api/knowledge/{entry_id}` - Update knowledge entry
- `DELETE /api/knowledge/{entry_id}` - Delete knowledge entry

## To Do Workspace
- `GET /api/todo` - List all to-do items
- `POST /api/todo` - Create new to-do item
- `PUT /api/todo/{item_id}` - Update to-do item
- `DELETE /api/todo/{item_id}` - Delete to-do item
- `POST /api/todo/{item_id}/reply` - Reply to to-do item

## System
- `GET /api/system/status` - Get system status
- `GET /api/system/activity` - Get system activity log

# Krake Orchestrator System Database Schema

## Tables

### users
- id: uuid (primary key)
- email: string
- name: string
- role: string
- created_at: timestamp
- updated_at: timestamp

### workspaces
- id: uuid (primary key)
- name: string (e.g., "Lunavo", "Monarch", etc.)
- description: string
- created_at: timestamp
- updated_at: timestamp

### agents
- id: uuid (primary key)
- name: string (e.g., "Buddy", "Dexter", etc.)
- description: string
- status: string
- created_at: timestamp
- updated_at: timestamp

### agent_folders
- id: uuid (primary key)
- agent_id: uuid (foreign key to agents)
- name: string
- description: string
- created_at: timestamp
- updated_at: timestamp

### folder_entries
- id: uuid (primary key)
- folder_id: uuid (foreign key to agent_folders)
- title: string
- content: text
- metadata: jsonb
- created_at: timestamp
- updated_at: timestamp

### tasks
- id: uuid (primary key)
- workspace_id: uuid (foreign key to workspaces)
- agent_id: uuid (foreign key to agents, nullable)
- title: string
- description: text
- status: string (e.g., "pending", "in_progress", "completed", "failed")
- priority: integer
- due_date: timestamp
- created_at: timestamp
- updated_at: timestamp

### task_runs
- id: uuid (primary key)
- task_id: uuid (foreign key to tasks)
- status: string
- result: jsonb
- error: text
- started_at: timestamp
- completed_at: timestamp

### escalations
- id: uuid (primary key)
- task_run_id: uuid (foreign key to task_runs)
- reason: string
- status: string
- resolved_at: timestamp
- created_at: timestamp

### knowledge_base
- id: uuid (primary key)
- workspace_id: uuid (foreign key to workspaces)
- title: string
- content: text
- tags: array
- created_at: timestamp
- updated_at: timestamp

### command_logs
- id: uuid (primary key)
- user_id: uuid (foreign key to users)
- workspace_id: uuid (foreign key to workspaces)
- command: text
- response: text
- created_at: timestamp

### shopify_data
- id: uuid (primary key)
- type: string
- data: jsonb
- created_at: timestamp
- updated_at: timestamp

### gelato_data
- id: uuid (primary key)
- type: string
- data: jsonb
- created_at: timestamp
- updated_at: timestamp

### memory_contexts
- id: uuid (primary key)
- agent_id: uuid (foreign key to agents)
- context_key: string
- context_value: jsonb
- created_at: timestamp
- updated_at: timestamp

### workspace_kpis
- id: uuid (primary key)
- workspace_id: uuid (foreign key to workspaces)
- name: string
- value: float
- unit: string
- updated_at: timestamp

### coordinator_schedules
- id: uuid (primary key)
- workspace_id: uuid (foreign key to workspaces)
- agent_id: uuid (foreign key to agents)
- task_template_id: uuid
- frequency: string (e.g., "daily", "weekly", "monthly")
- time: time
- day: integer (for weekly/monthly)
- active: boolean
- created_at: timestamp
- updated_at: timestamp

## Relationships

- users can access multiple workspaces
- workspaces contain multiple agents
- agents have multiple folders
- folders contain multiple entries
- tasks belong to a workspace and optionally an agent
- tasks have multiple task_runs
- task_runs can have escalations
- workspaces have multiple KPIs
- agents have memory contexts
- coordinator schedules link workspaces, agents, and task templates

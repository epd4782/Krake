# Krake Orchestrator System File Structure

## Root Directory
```
/
├── .github/                    # GitHub workflows and configuration
├── frontend/                   # Frontend application
├── backend/                    # Backend application
├── database/                   # Database migrations and schemas
├── docs/                       # Documentation
├── scripts/                    # Utility scripts
├── docker/                     # Docker configuration
├── .gitignore                  # Git ignore file
├── README.md                   # Project README
└── docker-compose.yml          # Docker Compose configuration
```

## Frontend Directory
```
/frontend/
├── public/                     # Public assets
│   ├── favicon.ico             # Favicon
│   ├── index.html              # HTML template
│   └── assets/                 # Static assets
├── src/                        # Source code
│   ├── components/             # React components
│   │   ├── ui/                 # UI components
│   │   ├── shared/             # Shared components
│   │   └── workspaces/         # Workspace-specific components
│   │       ├── lunavo/         # Lunavo workspace components
│   │       ├── monarch/        # Monarch workspace components
│   │       ├── lunabots/       # Lunabots workspace components
│   │       ├── hardlifemode/   # Hard Life Mode workspace components
│   │       ├── management/     # Management workspace components
│   │       └── todo/           # To Do workspace components
│   ├── pages/                  # Page components
│   │   ├── Dashboard.tsx       # Main dashboard page
│   │   ├── Lunavo.tsx          # Lunavo workspace page
│   │   ├── Monarch.tsx         # Monarch workspace page
│   │   ├── Lunabots.tsx        # Lunabots workspace page
│   │   ├── HardLifeMode.tsx    # Hard Life Mode workspace page
│   │   ├── Management.tsx      # Management workspace page
│   │   └── Todo.tsx            # To Do workspace page
│   ├── contexts/               # Context providers
│   │   ├── AuthContext.tsx     # Authentication context
│   │   ├── WorkspaceContext.tsx # Workspace context
│   │   └── CommandContext.tsx  # Command context
│   ├── hooks/                  # Custom hooks
│   │   ├── useWorkspace.ts     # Workspace hook
│   │   ├── useKPIs.ts          # KPIs hook
│   │   └── useCommand.ts       # Command hook
│   ├── utils/                  # Utility functions
│   │   ├── api.ts              # API client
│   │   ├── formatting.ts       # Formatting utilities
│   │   └── validation.ts       # Validation utilities
│   ├── types/                  # TypeScript type definitions
│   │   ├── workspace.ts        # Workspace types
│   │   ├── agent.ts            # Agent types
│   │   └── task.ts             # Task types
│   ├── assets/                 # Frontend assets
│   │   ├── images/             # Image assets
│   │   └── styles/             # Style assets
│   ├── App.tsx                 # Main App component
│   ├── index.tsx               # Entry point
│   └── routes.tsx              # Route definitions
├── package.json                # NPM package configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.js              # Vite configuration
```

## Backend Directory
```
/backend/
├── src/                        # Source code
│   ├── main.py                 # Application entry point
│   ├── config.py               # Configuration
│   ├── routes/                 # API routes
│   │   ├── auth.py             # Authentication routes
│   │   ├── workspaces.py       # Workspace routes
│   │   ├── agents.py           # Agent routes
│   │   ├── tasks.py            # Task routes
│   │   ├── folders.py          # Folder routes
│   │   ├── command.py          # Command routes
│   │   ├── integrations/       # Integration routes
│   │   │   ├── shopify.py      # Shopify routes
│   │   │   ├── gelato.py       # Gelato routes
│   │   │   └── binance.py      # Binance routes
│   │   └── system.py           # System routes
│   ├── models/                 # Data models
│   │   ├── user.py             # User model
│   │   ├── workspace.py        # Workspace model
│   │   ├── agent.py            # Agent model
│   │   ├── task.py             # Task model
│   │   ├── folder.py           # Folder model
│   │   └── integration.py      # Integration model
│   ├── services/               # Business logic
│   │   ├── auth_service.py     # Authentication service
│   │   ├── workspace_service.py # Workspace service
│   │   ├── agent_service.py    # Agent service
│   │   ├── task_service.py     # Task service
│   │   ├── command_service.py  # Command service
│   │   ├── integration_service.py # Integration service
│   │   └── error_service.py    # Error handling service
│   ├── utils/                  # Utility functions
│   │   ├── database.py         # Database utilities
│   │   ├── security.py         # Security utilities
│   │   └── validation.py       # Validation utilities
│   └── middleware/             # Middleware
│       ├── auth_middleware.py  # Authentication middleware
│       └── error_middleware.py # Error handling middleware
├── tests/                      # Tests
│   ├── test_routes/            # Route tests
│   ├── test_models/            # Model tests
│   └── test_services/          # Service tests
├── pyproject.toml              # Poetry configuration
├── poetry.lock                 # Poetry lock file
└── Dockerfile                  # Docker configuration
```

## Database Directory
```
/database/
├── migrations/                 # Database migrations
│   ├── 00001_initial.sql       # Initial migration
│   └── 00002_add_indexes.sql   # Add indexes migration
├── schemas/                    # Database schemas
│   ├── schema.sql              # SQL schema
│   └── schema.md               # Schema documentation
└── seeds/                      # Seed data
    ├── workspaces.sql          # Workspace seed data
    └── agents.sql              # Agent seed data
```

## Documentation Directory
```
/docs/
├── architecture.md             # Architecture documentation
├── api.md                      # API documentation
├── deployment.md               # Deployment documentation
├── development.md              # Development documentation
├── testing.md                  # Testing documentation
├── user_guide.md               # User guide
└── diagrams/                   # Architecture diagrams
    ├── system_overview.png     # System overview diagram
    ├── data_flow.png           # Data flow diagram
    └── component_diagram.png   # Component diagram
```

## Docker Directory
```
/docker/
├── frontend/                   # Frontend Docker configuration
│   ├── Dockerfile              # Frontend Dockerfile
│   └── nginx.conf              # Nginx configuration
├── backend/                    # Backend Docker configuration
│   └── Dockerfile              # Backend Dockerfile
└── docker-compose.yml          # Docker Compose configuration
```

## Scripts Directory
```
/scripts/
├── setup.sh                    # Setup script
├── deploy.sh                   # Deployment script
├── backup.sh                   # Backup script
└── test.sh                     # Test script
```

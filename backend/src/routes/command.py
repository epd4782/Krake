from typing import Dict, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

router = APIRouter()


class CommandRequest(BaseModel):
    """Command request model."""
    workspace_id: UUID
    command: str


class CommandResponse(BaseModel):
    """Command response model."""
    response: str
    actions: List[Dict] = []


class CommandHistoryItem(BaseModel):
    """Command history item model."""
    id: UUID
    user_id: UUID
    workspace_id: UUID
    command: str
    response: str
    created_at: str


@router.post("/", response_model=CommandResponse)
async def send_command(command_request: CommandRequest):
    """
    Send command to Krake.
    """
    
    command = command_request.command.lower()
    
    if command.startswith("email."):
        parts = command.split("(", 1)
        if len(parts) > 1:
            email_command = parts[0]
            args_str = parts[1].rstrip(")")
            
            args = {}
            if args_str:
                for arg in args_str.split(","):
                    if ":" in arg:
                        key, value = arg.split(":", 1)
                        args[key.strip()] = value.strip()
            
            if email_command == "email.create":
                return CommandResponse(
                    response=f"Creating email with {args.get('text', '')} and layout {args.get('layoutPrompt', '')}",
                    actions=[
                        {
                            "type": "email_action",
                            "action": "create",
                            "args": args
                        }
                    ],
                )
            elif email_command == "email.send":
                return CommandResponse(
                    response=f"Sending email to {args.get('recipients', 'recipients')}",
                    actions=[
                        {
                            "type": "email_action",
                            "action": "send",
                            "args": args
                        }
                    ],
                )
            elif email_command == "email.list":
                return CommandResponse(
                    response=f"Listing emails for workspace {args.get('workspace', 'current workspace')}",
                    actions=[
                        {
                            "type": "email_action",
                            "action": "list",
                            "args": args
                        }
                    ],
                )
            elif email_command == "email.reply":
                message = args.get("message", {})
                is_customer = "customer" in message.lower() if isinstance(message, str) else False
                
                if is_customer:
                    handler = "Cassie - Customer Email Responder"
                else:
                    handler = "Krake"
                    
                return CommandResponse(
                    response=f"Replying to email message. Handled by: {handler}",
                    actions=[
                        {
                            "type": "email_action",
                            "action": "reply",
                            "args": args,
                            "handler": handler
                        }
                    ],
                )
    
    if "hello" in command or "hi" in command:
        return CommandResponse(
            response="Hello! How can I assist you today?",
        )
    elif "task" in command and "create" in command:
        return CommandResponse(
            response="I've created a new task for you.",
            actions=[
                {
                    "type": "create_task",
                    "task_id": "t0000000-0000-0000-0000-000000000005",
                    "title": "New task from command",
                }
            ],
        )
    elif "shopify" in command:
        return CommandResponse(
            response="I'm checking Shopify for you.",
            actions=[
                {
                    "type": "open_integration",
                    "integration": "shopify",
                }
            ],
        )
    elif "gelato" in command:
        return CommandResponse(
            response="I'm checking Gelato for you.",
            actions=[
                {
                    "type": "open_integration",
                    "integration": "gelato",
                }
            ],
        )
    elif "binance" in command:
        return CommandResponse(
            response="I'm checking Binance for you.",
            actions=[
                {
                    "type": "open_integration",
                    "integration": "binance",
                }
            ],
        )
    elif "agent" in command or "sintra" in command:
        return CommandResponse(
            response="I'm connecting you with the Sintra AI agents.",
            actions=[
                {
                    "type": "open_agents",
                }
            ],
        )
    elif "affiliate" in command or "affiliate bot" in command:
        return CommandResponse(
            response="Opening Affiliate Bot Manager.",
            actions=[
                {
                    "type": "open_integration",
                    "integration": "affiliate_bot",
                }
            ],
        )
    elif "trading" in command or "profitpilot" in command or "finance bot" in command:
        return CommandResponse(
            response="Opening ProfitPilot Trading Bot.",
            actions=[
                {
                    "type": "open_integration",
                    "integration": "trading_bot",
                }
            ],
        )
    elif "email" in command:
        return CommandResponse(
            response="Opening Email Builder & Manager.",
            actions=[
                {
                    "type": "open_integration",
                    "integration": "email",
                }
            ],
        )
    elif command.startswith("monarch."):
        if command == "monarch.getAppVersion":
            return CommandResponse(
                response="Retrieving latest Monarch app version.",
                actions=[
                    {
                        "type": "monarch_action",
                        "action": "getAppVersion",
                    }
                ],
            )
        elif command == "monarch.syncWeeklyContent":
            return CommandResponse(
                response="Syncing weekly content for the Monarch app.",
                actions=[
                    {
                        "type": "monarch_action",
                        "action": "syncWeeklyContent",
                    }
                ],
            )
        elif command.startswith("monarch.generateWorkoutPlan"):
            parts = command.split("(", 1)
            args = {}
            if len(parts) > 1:
                args_str = parts[1].rstrip(")")
                if args_str:
                    for arg in args_str.split(","):
                        if ":" in arg:
                            key, value = arg.split(":", 1)
                            args[key.strip()] = value.strip()
            
            return CommandResponse(
                response="Generating workout plan with Gigi.",
                actions=[
                    {
                        "type": "monarch_action",
                        "action": "generateWorkoutPlan",
                        "args": args
                    }
                ],
            )
        elif command.startswith("monarch.resetWorkoutPlan"):
            parts = command.split("(", 1)
            args = {}
            if len(parts) > 1:
                args_str = parts[1].rstrip(")")
                if args_str:
                    for arg in args_str.split(","):
                        if ":" in arg:
                            key, value = arg.split(":", 1)
                            args[key.strip()] = value.strip()
            
            return CommandResponse(
                response="Resetting workout plan.",
                actions=[
                    {
                        "type": "monarch_action",
                        "action": "resetWorkoutPlan",
                        "args": args
                    }
                ],
            )
        elif command.startswith("monarch.moderateCommunity"):
            parts = command.split("(", 1)
            args = {}
            if len(parts) > 1:
                args_str = parts[1].rstrip(")")
                if args_str:
                    for arg in args_str.split(","):
                        if ":" in arg:
                            key, value = arg.split(":", 1)
                            args[key.strip()] = value.strip()
            
            return CommandResponse(
                response="Moderating community content.",
                actions=[
                    {
                        "type": "monarch_action",
                        "action": "moderateCommunity",
                        "args": args
                    }
                ],
            )
        elif command.startswith("monarch.updateUI"):
            parts = command.split("(", 1)
            args = {}
            if len(parts) > 1:
                args_str = parts[1].rstrip(")")
                if args_str:
                    for arg in args_str.split(","):
                        if ":" in arg:
                            key, value = arg.split(":", 1)
                            args[key.strip()] = value.strip()
            
            return CommandResponse(
                response="Updating UI elements in the Monarch app.",
                actions=[
                    {
                        "type": "monarch_action",
                        "action": "updateUI",
                        "args": args
                    }
                ],
            )
    elif command.startswith("affiliate."):
        parts = command.split("(", 1)
        args = {}
        if len(parts) > 1:
            args_str = parts[1].rstrip(")")
            if args_str:
                for arg in args_str.split(","):
                    if ":" in arg:
                        key, value = arg.split(":", 1)
                        args[key.strip()] = value.strip()
        
        if command == "affiliate.getNetworks":
            return CommandResponse(
                response="Retrieving affiliate networks.",
                actions=[
                    {
                        "type": "affiliate_action",
                        "action": "getNetworks",
                    }
                ],
            )
        elif command == "affiliate.getProducts":
            return CommandResponse(
                response="Retrieving affiliate products.",
                actions=[
                    {
                        "type": "affiliate_action",
                        "action": "getProducts",
                        "args": args
                    }
                ],
            )
        elif command == "affiliate.getLinks":
            return CommandResponse(
                response="Retrieving affiliate links.",
                actions=[
                    {
                        "type": "affiliate_action",
                        "action": "getLinks",
                        "args": args
                    }
                ],
            )
        elif command == "affiliate.getEarnings":
            return CommandResponse(
                response="Retrieving affiliate earnings.",
                actions=[
                    {
                        "type": "affiliate_action",
                        "action": "getEarnings",
                        "args": args
                    }
                ],
            )
        elif command == "affiliate.getStatistics":
            return CommandResponse(
                response="Retrieving affiliate statistics.",
                actions=[
                    {
                        "type": "affiliate_action",
                        "action": "getStatistics",
                        "args": args
                    }
                ],
            )
        elif command.startswith("affiliate.createLink"):
            return CommandResponse(
                response="Creating affiliate link.",
                actions=[
                    {
                        "type": "affiliate_action",
                        "action": "createLink",
                        "args": args
                    }
                ],
            )
    elif command.startswith("trading."):
        parts = command.split("(", 1)
        args = {}
        if len(parts) > 1:
            args_str = parts[1].rstrip(")")
            if args_str:
                for arg in args_str.split(","):
                    if ":" in arg:
                        key, value = arg.split(":", 1)
                        args[key.strip()] = value.strip()
        
        if command == "trading.getStrategies":
            return CommandResponse(
                response="Retrieving trading strategies.",
                actions=[
                    {
                        "type": "trading_action",
                        "action": "getStrategies",
                    }
                ],
            )
        elif command.startswith("trading.activateStrategy"):
            return CommandResponse(
                response="Activating trading strategy.",
                actions=[
                    {
                        "type": "trading_action",
                        "action": "activateStrategy",
                        "args": args
                    }
                ],
            )
        elif command.startswith("trading.deactivateStrategy"):
            return CommandResponse(
                response="Deactivating trading strategy.",
                actions=[
                    {
                        "type": "trading_action",
                        "action": "deactivateStrategy",
                        "args": args
                    }
                ],
            )
        elif command == "trading.getTrades":
            return CommandResponse(
                response="Retrieving trading history.",
                actions=[
                    {
                        "type": "trading_action",
                        "action": "getTrades",
                        "args": args
                    }
                ],
            )
        elif command == "trading.getStatistics":
            return CommandResponse(
                response="Retrieving trading statistics.",
                actions=[
                    {
                        "type": "trading_action",
                        "action": "getStatistics",
                        "args": args
                    }
                ],
            )
    elif command.startswith("system."):
        parts = command.split("(", 1)
        args = {}
        if len(parts) > 1:
            args_str = parts[1].rstrip(")")
            if args_str:
                for arg in args_str.split(","):
                    if ":" in arg:
                        key, value = arg.split(":", 1)
                        args[key.strip()] = value.strip()
        
        if command == "system.test":
            return CommandResponse(
                response="Running full system integrity test.",
                actions=[
                    {
                        "type": "system_action",
                        "action": "test",
                        "args": args
                    }
                ],
            )
        elif command == "system.verify":
            return CommandResponse(
                response="Verifying system integrity.",
                actions=[
                    {
                        "type": "system_action",
                        "action": "verify",
                        "args": args
                    }
                ],
            )
    else:
        return CommandResponse(
            response="I'm not sure how to process that command. Could you please rephrase?",
        )


@router.get("/history", response_model=List[CommandHistoryItem])
async def get_command_history():
    """
    Get command history.
    """
    return [
        CommandHistoryItem(
            id=UUID("c0000000-0000-0000-0000-000000000001"),
            user_id=UUID("u0000000-0000-0000-0000-000000000001"),
            workspace_id=UUID("00000000-0000-0000-0000-000000000001"),  # Lunavo
            command="Show me today's revenue",
            response="Today's revenue is $1,250.75",
            created_at="2023-05-30T10:00:00Z",
        ),
        CommandHistoryItem(
            id=UUID("c0000000-0000-0000-0000-000000000002"),
            user_id=UUID("u0000000-0000-0000-0000-000000000001"),
            workspace_id=UUID("00000000-0000-0000-0000-000000000001"),  # Lunavo
            command="Create a new task for Buddy to update product descriptions",
            response="I've created a new task for Buddy to update product descriptions.",
            created_at="2023-05-30T10:05:00Z",
        ),
        CommandHistoryItem(
            id=UUID("c0000000-0000-0000-0000-000000000003"),
            user_id=UUID("u0000000-0000-0000-0000-000000000001"),
            workspace_id=UUID("00000000-0000-0000-0000-000000000002"),  # Monarch
            command="Show me app usage statistics",
            response="Here are the app usage statistics for today...",
            created_at="2023-05-30T11:00:00Z",
        ),
    ]

import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../contexts/WorkspaceContext';

interface TodoItem {
  id: string;
  message: string;
  source: string;
  workspace: string;
  status: 'open' | 'in_progress';
  createdAt: string;
}

const TodoWorkspacePage: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<'open' | 'in_progress' | null>(null);
  const [replyText, setReplyText] = useState<{[key: string]: string}>({});
  const { workspaces } = useWorkspace();

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const mockTodoItems: TodoItem[] = [
          {
            id: '1',
            message: 'Approve new campaign from Scouty',
            source: 'Scouty',
            workspace: 'Lunavo',
            status: 'open',
            createdAt: '2025-05-16T12:30:00Z',
          },
          {
            id: '2',
            message: 'Review product descriptions for new items',
            source: 'Buddy',
            workspace: 'Lunavo',
            status: 'in_progress',
            createdAt: '2025-05-16T10:15:00Z',
          },
          {
            id: '3',
            message: 'Confirm app update release schedule',
            source: 'Penn',
            workspace: 'Monarch',
            status: 'open',
            createdAt: '2025-05-16T09:45:00Z',
          },
          {
            id: '4',
            message: 'Approve new trading strategy for Finance Bot',
            source: 'Dexter',
            workspace: 'Lunabots',
            status: 'open',
            createdAt: '2025-05-16T08:20:00Z',
          },
          {
            id: '5',
            message: 'Review content calendar for next week',
            source: 'Commet',
            workspace: 'Hard Life Mode',
            status: 'in_progress',
            createdAt: '2025-05-15T16:10:00Z',
          },
          {
            id: '6',
            message: 'Approve budget allocation for Q3',
            source: 'Emmie',
            workspace: 'Management',
            status: 'open',
            createdAt: '2025-05-15T14:30:00Z',
          },
        ];
        
        setTodoItems(mockTodoItems);
      } catch (error) {
        console.error('Error fetching todo items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodoItems();
  }, []);

  const handleReplyChange = (id: string, text: string) => {
    setReplyText({
      ...replyText,
      [id]: text,
    });
  };

  const handleReplySubmit = (id: string) => {
    if (!replyText[id]?.trim()) {
      return;
    }

    const updatedItems = todoItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'in_progress' as const,
        };
      }
      return item;
    });

    setTodoItems(updatedItems);
    setReplyText({
      ...replyText,
      [id]: '',
    });
  };

  const handleArchive = (id: string) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  const filteredItems = todoItems.filter(item => {
    if (activeFilter && item.workspace !== activeFilter) {
      return false;
    }
    if (activeStatus && item.status !== activeStatus) {
      return false;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading todo items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label htmlFor="workspace-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Workspace
          </label>
          <select
            id="workspace-filter"
            className="krake-input"
            value={activeFilter || ''}
            onChange={(e) => setActiveFilter(e.target.value || null)}
          >
            <option value="">All Workspaces</option>
            {workspaces.map((workspace) => (
              <option key={workspace.id} value={workspace.name}>
                {workspace.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            id="status-filter"
            className="krake-input"
            value={activeStatus || ''}
            onChange={(e) => setActiveStatus((e.target.value as 'open' | 'in_progress' | '') || null)}
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
          </select>
        </div>
      </div>
      
      {/* Todo Items */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="krake-card text-center py-8">
            <p className="text-gray-500">No todo items found</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="krake-card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.message}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.source} · {item.workspace}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.status === 'open' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.status === 'open' ? 'Open' : 'In Progress'}
                </span>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={replyText[item.id] || ''}
                    onChange={(e) => handleReplyChange(item.id, e.target.value)}
                    placeholder="Type your reply..."
                    className="krake-input"
                  />
                  <button
                    onClick={() => handleReplySubmit(item.id)}
                    disabled={!replyText[item.id]?.trim()}
                    className="krake-button-primary whitespace-nowrap"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => handleArchive(item.id)}
                    className="krake-button-outline whitespace-nowrap"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoWorkspacePage;

import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  agentId: string;
  agentName: string;
  schedule: 'daily' | 'weekly' | 'monthly' | 'once';
  nextRun: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  workspaceId: string;
  workspaceName: string;
}

interface CoordinatorOverviewProps {
  workspaceId?: string;
}

const CoordinatorOverview: React.FC<CoordinatorOverviewProps> = ({ workspaceId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [agents, setAgents] = useState<{id: string; name: string}[]>([]);
  const [workspaces, setWorkspaces] = useState<{id: string; name: string}[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    agentId: '',
    schedule: 'once' as 'daily' | 'weekly' | 'monthly' | 'once',
    workspaceId: workspaceId || '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockAgents = [
          { id: '1', name: 'Buddy' },
          { id: '2', name: 'Dexter' },
          { id: '3', name: 'Milli' },
          { id: '4', name: 'Vizzy' },
          { id: '5', name: 'Penn' },
          { id: '6', name: 'Commet' },
          { id: '7', name: 'Gigi' },
          { id: '8', name: 'Cassie' },
          { id: '9', name: 'Emmie' },
          { id: '10', name: 'Seomi' },
          { id: '11', name: 'Scouty' },
          { id: '12', name: 'Soshie' },
        ];
        
        const mockWorkspaces = [
          { id: '1', name: 'Lunavo' },
          { id: '2', name: 'Monarch' },
          { id: '3', name: 'Lunabots' },
          { id: '4', name: 'Hard Life Mode' },
          { id: '5', name: 'Management' },
        ];
        
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Generate weekly content ideas',
            description: 'Create a list of content ideas for the blog and social media.',
            agentId: '1',
            agentName: 'Buddy',
            schedule: 'weekly',
            nextRun: '2025-05-20T09:00:00Z',
            status: 'pending',
            workspaceId: '1',
            workspaceName: 'Lunavo',
          },
          {
            id: '2',
            title: 'Analyze website traffic',
            description: 'Analyze website traffic and provide insights on user behavior.',
            agentId: '2',
            agentName: 'Dexter',
            schedule: 'monthly',
            nextRun: '2025-06-01T10:00:00Z',
            status: 'pending',
            workspaceId: '1',
            workspaceName: 'Lunavo',
          },
          {
            id: '3',
            title: 'Create social media posts',
            description: 'Create social media posts for the upcoming week.',
            agentId: '6',
            agentName: 'Commet',
            schedule: 'weekly',
            nextRun: '2025-05-18T14:00:00Z',
            status: 'in_progress',
            workspaceId: '2',
            workspaceName: 'Monarch',
          },
          {
            id: '4',
            title: 'Update product descriptions',
            description: 'Update product descriptions for new items in the store.',
            agentId: '1',
            agentName: 'Buddy',
            schedule: 'once',
            nextRun: '2025-05-17T11:00:00Z',
            status: 'pending',
            workspaceId: '1',
            workspaceName: 'Lunavo',
          },
          {
            id: '5',
            title: 'Optimize trading strategy',
            description: 'Review and optimize the current trading strategy based on market conditions.',
            agentId: '2',
            agentName: 'Dexter',
            schedule: 'daily',
            nextRun: '2025-05-17T08:00:00Z',
            status: 'pending',
            workspaceId: '3',
            workspaceName: 'Lunabots',
          },
        ];
        
        const filteredTasks = workspaceId 
          ? mockTasks.filter(task => task.workspaceId === workspaceId)
          : mockTasks;
        
        setAgents(mockAgents);
        setWorkspaces(mockWorkspaces);
        setTasks(filteredTasks);
        
        if (workspaceId) {
          setNewTask(prev => ({ ...prev, workspaceId }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [workspaceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !newTask.agentId || !newTask.workspaceId) {
      return;
    }
    
    try {
      const agent = agents.find(a => a.id === newTask.agentId);
      const workspace = workspaces.find(w => w.id === newTask.workspaceId);
      
      if (!agent || !workspace) {
        throw new Error('Agent or workspace not found');
      }
      
      const now = new Date();
      let nextRun = new Date();
      
      switch (newTask.schedule) {
        case 'daily':
          nextRun.setDate(now.getDate() + 1);
          break;
        case 'weekly':
          nextRun.setDate(now.getDate() + 7);
          break;
        case 'monthly':
          nextRun.setMonth(now.getMonth() + 1);
          break;
        case 'once':
          nextRun.setHours(now.getHours() + 1);
          break;
      }
      
      const newTaskItem: Task = {
        id: `new-${Date.now()}`,
        title: newTask.title,
        description: newTask.description,
        agentId: newTask.agentId,
        agentName: agent.name,
        schedule: newTask.schedule,
        nextRun: nextRun.toISOString(),
        status: 'pending',
        workspaceId: newTask.workspaceId,
        workspaceName: workspace.name,
      };
      
      setTasks([newTaskItem, ...tasks]);
      setNewTask({
        title: '',
        description: '',
        agentId: '',
        schedule: 'once',
        workspaceId: workspaceId || '',
      });
      setIsAddingTask(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading coordinator data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Coordinator Overview</h2>
        <button 
          onClick={() => setIsAddingTask(true)}
          className="krake-button-primary"
        >
          Schedule New Task
        </button>
      </div>
      
      {isAddingTask && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Task</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
                className="krake-input"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Task Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Enter task description"
                rows={3}
                className="krake-input"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="agentId" className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to Agent
                </label>
                <select
                  id="agentId"
                  name="agentId"
                  value={newTask.agentId}
                  onChange={handleInputChange}
                  className="krake-input"
                >
                  <option value="">Select an agent</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule
                </label>
                <select
                  id="schedule"
                  name="schedule"
                  value={newTask.schedule}
                  onChange={handleInputChange}
                  className="krake-input"
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              {!workspaceId && (
                <div>
                  <label htmlFor="workspaceId" className="block text-sm font-medium text-gray-700 mb-1">
                    Workspace
                  </label>
                  <select
                    id="workspaceId"
                    name="workspaceId"
                    value={newTask.workspaceId}
                    onChange={handleInputChange}
                    className="krake-input"
                  >
                    <option value="">Select a workspace</option>
                    {workspaces.map(workspace => (
                      <option key={workspace.id} value={workspace.id}>
                        {workspace.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <button 
                onClick={handleAddTask}
                className="krake-button-primary"
                disabled={!newTask.title.trim() || !newTask.agentId || !newTask.workspaceId}
              >
                Schedule Task
              </button>
              <button 
                onClick={() => setIsAddingTask(false)}
                className="krake-button-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Run
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {!workspaceId && (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workspace
                </th>
              )}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{task.title}</div>
                  <div className="text-sm text-gray-500">{task.description.substring(0, 50)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.agentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.schedule.charAt(0).toUpperCase() + task.schedule.slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(task.nextRun)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                    task.status === 'failed' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </td>
                {!workspaceId && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.workspaceName}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoordinatorOverview;

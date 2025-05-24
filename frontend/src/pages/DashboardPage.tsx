import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GlobalKPI {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface WorkspaceActivity {
  id: string;
  workspace: string;
  activeTasks: number;
  completionPercentage: number;
  failedTasks: number;
}

const DashboardPage: React.FC = () => {
  const [globalKPIs, setGlobalKPIs] = useState<GlobalKPI[]>([]);
  const [workspaceActivities, setWorkspaceActivities] = useState<WorkspaceActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const mockGlobalKPIs: GlobalKPI[] = [
          {
            id: '1',
            name: 'Task Completion Rate',
            value: 87.5,
            unit: '%',
            trend: 'up',
            change: 2.3,
          },
          {
            id: '2',
            name: 'AI Load',
            value: 42.8,
            unit: '%',
            trend: 'stable',
            change: 0.5,
          },
          {
            id: '3',
            name: 'Failed Tasks',
            value: 12,
            unit: 'count',
            trend: 'down',
            change: 3,
          },
          {
            id: '4',
            name: 'System Success Rate',
            value: 94.2,
            unit: '%',
            trend: 'up',
            change: 1.7,
          },
        ];
        
        const mockWorkspaceActivities: WorkspaceActivity[] = [
          {
            id: '1',
            workspace: 'Lunavo',
            activeTasks: 12,
            completionPercentage: 75,
            failedTasks: 2,
          },
          {
            id: '2',
            workspace: 'Monarch',
            activeTasks: 8,
            completionPercentage: 60,
            failedTasks: 1,
          },
          {
            id: '3',
            workspace: 'Lunabots',
            activeTasks: 15,
            completionPercentage: 45,
            failedTasks: 3,
          },
          {
            id: '4',
            workspace: 'Hard Life Mode',
            activeTasks: 6,
            completionPercentage: 90,
            failedTasks: 0,
          },
          {
            id: '5',
            workspace: 'Management',
            activeTasks: 4,
            completionPercentage: 80,
            failedTasks: 1,
          },
        ];
        
        setGlobalKPIs(mockGlobalKPIs);
        setWorkspaceActivities(mockWorkspaceActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {globalKPIs.map((kpi) => (
          <div key={kpi.id} className="krake-card">
            <h3 className="text-sm font-medium text-gray-500">{kpi.name}</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{kpi.value}{kpi.unit}</p>
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                kpi.trend === 'up' ? 'text-green-600' : 
                kpi.trend === 'down' ? (kpi.name === 'Failed Tasks' ? 'text-green-600' : 'text-red-600') : 
                'text-gray-500'
              }`}>
                {kpi.trend === 'up' && (
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {kpi.trend === 'down' && (
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {kpi.change}{kpi.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Workspace Overview */}
      <div className="krake-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Workspace Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workspace
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Tasks
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Failed Tasks
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workspaceActivities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{activity.workspace}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{activity.activeTasks}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${activity.completionPercentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{activity.completionPercentage}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{activity.failedTasks}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link 
                      to={`/workspaces/${activity.workspace.toLowerCase().replace(' ', '')}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* System Activity */}
      <div className="krake-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Activity</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: 'Lunavo', tasks: 14 },
                { name: 'Monarch', tasks: 9 },
                { name: 'Lunabots', tasks: 18 },
                { name: 'Hard Life Mode', tasks: 6 },
                { name: 'Management', tasks: 5 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#0ea5e9" name="Active Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">3 new orders in Lunavo</span>
            <span className="text-xs text-gray-500">10 minutes ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Binance API connection restored</span>
            <span className="text-xs text-gray-500">25 minutes ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Daily report generated by Dexter</span>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

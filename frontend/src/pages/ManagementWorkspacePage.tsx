import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../contexts/WorkspaceContext';

interface WorkspaceKPI {
  id: string;
  name: string;
  value: number;
  unit: string;
}

const ManagementWorkspacePage: React.FC = () => {
  const [kpis, setKpis] = useState<WorkspaceKPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const mockKPIs: WorkspaceKPI[] = [
          {
            id: '1',
            name: 'Total Revenue (Today)',
            value: 2450.75,
            unit: 'USD',
          },
          {
            id: '2',
            name: 'Total Revenue (Week)',
            value: 12750.25,
            unit: 'USD',
          },
          {
            id: '3',
            name: 'Total Revenue (Month)',
            value: 45250.80,
            unit: 'USD',
          },
          {
            id: '4',
            name: 'Active User Ratio',
            value: 78.5,
            unit: '%',
          },
          {
            id: '5',
            name: 'System Conversion Rate',
            value: 4.2,
            unit: '%',
          },
          {
            id: '6',
            name: 'CPI (Cost Per Interaction)',
            value: 0.12,
            unit: 'USD',
          },
          {
            id: '7',
            name: 'Daily Operations Completion',
            value: 92.7,
            unit: '%',
          },
          {
            id: '8',
            name: 'Critical DOP Alerts',
            value: 2,
            unit: 'count',
          },
        ];
        
        setKpis(mockKPIs);
      } catch (error) {
        console.error('Error fetching KPIs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKPIs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading workspace data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="krake-card">
            <h3 className="text-sm font-medium text-gray-500">{kpi.name}</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {kpi.unit === 'USD' ? '$' : ''}{kpi.value}{kpi.unit === '%' ? '%' : ''}
            </p>
          </div>
        ))}
      </div>
      
      {/* Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sintra AI Assistants Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sintra AI Assistants</h3>
          <p className="text-sm text-gray-600 mb-4">Access and manage all 12 Sintra AI agents</p>
          <button className="krake-button-primary">Open Agents</button>
        </div>
        
        {/* FIBU Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">FIBU Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Financial breakdown of all workspaces</p>
          <button className="krake-button-primary">Open FIBU Panel</button>
        </div>
        
        {/* Legal Department Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Department Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Legal issues breakdown and dashboard</p>
          <button className="krake-button-primary">Open Legal Panel</button>
        </div>
        
        {/* Cybersecurity Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cybersecurity Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Security logs and agent access monitoring</p>
          <button className="krake-button-primary">Open Security Panel</button>
        </div>
        
        {/* Personal Financial Advisor Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Financial Advisor</h3>
          <p className="text-sm text-gray-600 mb-4">Personal financial advice and planning</p>
          <div className="px-4 py-2 bg-gray-100 rounded-md text-sm text-gray-500">
            Placeholder - Coming Soon
          </div>
        </div>
        
        {/* Investment Banker Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Banker Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Portfolio performance and investment opportunities</p>
          <button className="krake-button-primary">Open Investment Panel</button>
        </div>
        
        {/* General Data Analytics Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">General Data Analytics</h3>
          <p className="text-sm text-gray-600 mb-4">Heatmaps, ratios, and patterns across workspaces</p>
          <button className="krake-button-primary">Open Analytics</button>
        </div>
        
        {/* Controlling Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Controlling Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Track budgets, forecasts, and deviations</p>
          <button className="krake-button-primary">Open Controlling</button>
        </div>
      </div>
      
      {/* Activity Overview */}
      <div className="krake-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Management Activity Overview</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Monthly financial report generated</span>
            <span className="text-xs text-gray-500">30 minutes ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Security audit completed: 0 critical issues</span>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Budget allocation updated for Q3</span>
            <span className="text-xs text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">New investment opportunity detected</span>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementWorkspacePage;

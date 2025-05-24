import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../contexts/WorkspaceContext';
import EmailBuilderManager from '../components/integrations/EmailBuilderManager';
import CrossPlatformAutoPosting from '../components/integrations/CrossPlatformAutoPosting';
import WeeklyContentPanel from '../components/integrations/WeeklyContentPanel';
import GigiWorkoutGenerator from '../components/integrations/GigiWorkoutGenerator';
import AppControl from '../components/integrations/AppControl';

interface WorkspaceKPI {
  id: string;
  name: string;
  value: number;
  unit: string;
}

const MonarchWorkspacePage: React.FC = () => {
  const [kpis, setKpis] = useState<WorkspaceKPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const mockKPIs: WorkspaceKPI[] = [
          {
            id: '1',
            name: 'Daily Active User Rate',
            value: 68.5,
            unit: '%',
          },
          {
            id: '2',
            name: 'App Sessions Today',
            value: 3254,
            unit: 'count',
          },
          {
            id: '3',
            name: 'Social Media Reach',
            value: 12500,
            unit: 'count',
          },
          {
            id: '4',
            name: 'Downloads Today',
            value: 187,
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
              {kpi.value}{kpi.unit === '%' ? '%' : ''}
            </p>
          </div>
        ))}
      </div>
      
      {/* Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sintra Agents Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sintra Agents</h3>
          <p className="text-sm text-gray-600 mb-4">Access and manage all 12 Sintra AI agents</p>
          <button className="krake-button-primary">Open Agents</button>
        </div>
        
        {/* Monarch App Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Monarch App</h3>
          <p className="text-sm text-gray-600 mb-4">Manage your Monarch mobile application</p>
          <AppControl />
        </div>
        
        {/* Weekly Content Panel Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Content Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Plan and schedule weekly content</p>
          <WeeklyContentPanel workspace="monarch" />
        </div>
        
        {/* Cross Platform Auto-Posting Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cross Platform Auto-Posting</h3>
          <p className="text-sm text-gray-600 mb-4">Schedule, generate, and publish content across platforms</p>
          <CrossPlatformAutoPosting workspace="monarch" />
        </div>
        
        {/* Email Builder & Manager Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Builder & Manager</h3>
          <p className="text-sm text-gray-600 mb-4">Manage email campaigns, building, and inbox</p>
          <EmailBuilderManager workspace="monarch" />
        </div>
        
        {/* Social Media Content Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media Content</h3>
          <p className="text-sm text-gray-600 mb-4">Manage social media content and campaigns</p>
          <CrossPlatformAutoPosting workspace="monarch" />
        </div>
        
        {/* Projects Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Projects</h3>
          <p className="text-sm text-gray-600 mb-4">Manage and track ongoing projects</p>
          <button className="krake-button-primary">Open Folder</button>
        </div>
        
        {/* AI Communication Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Communication</h3>
          <p className="text-sm text-gray-600 mb-4">Store and use AI task results</p>
          <button className="krake-button-primary">Open Folder</button>
        </div>
        
        {/* Coordinator Overview Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Coordinator Overview</h3>
          <p className="text-sm text-gray-600 mb-4">Schedule and manage Sintra agent tasks</p>
          <button className="krake-button-primary">Open Coordinator</button>
        </div>
        
        {/* Media Tools Block */}
        <div className="krake-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Media Tools</h3>
          <p className="text-sm text-gray-600 mb-4">Create and edit reels and videos</p>
          <CrossPlatformAutoPosting workspace="monarch" />
        </div>
      </div>
      
      {/* App Control Block */}
      <div className="krake-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">App Control</h3>
        <p className="text-sm text-gray-600 mb-4">Manage app settings, content, and community moderation</p>
        <AppControl />
      </div>
      
      {/* Gigi Workout Generator Block */}
      <div className="krake-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Gigi Workout Generator</h3>
        <p className="text-sm text-gray-600 mb-4">Generate personalized workout plans</p>
        <GigiWorkoutGenerator />
      </div>
      
      {/* Activity Overview */}
      <div className="krake-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">App update released</span>
            <span className="text-xs text-gray-500">30 minutes ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">New user signups: 24</span>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Weekly content plan created by Penn</span>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Social media campaign launched</span>
            <span className="text-xs text-gray-500">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonarchWorkspacePage;

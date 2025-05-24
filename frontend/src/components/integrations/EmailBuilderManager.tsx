import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext';

interface EmailBuilderManagerProps {
  isExpanded?: boolean;
  workspace?: string;
}

const EmailBuilderManager: React.FC<EmailBuilderManagerProps> = ({ 
  isExpanded = false,
  workspace = 'lunavo'
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState([]);
  const [inbox, setInbox] = useState([]);
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCampaigns([
          { id: '1', name: 'Welcome Series', status: 'active', lastEdited: '2 days ago' },
          { id: '2', name: 'Product Announcement', status: 'draft', lastEdited: '5 days ago' },
          { id: '3', name: 'Monthly Newsletter', status: 'scheduled', lastEdited: '1 day ago' }
        ]);
        
        setInbox([
          { id: '1', sender: 'customer@example.com', subject: 'Question about product', read: false, date: '3 hours ago' },
          { id: '2', name: 'team@lunavo.com', subject: 'Internal update', read: true, date: '1 day ago' },
          { id: '3', sender: 'support@vendor.com', subject: 'Account verification', read: false, date: '2 days ago' }
        ]);
        
      } catch (error) {
        console.error('Error loading email data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [workspace]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading Email Builder & Manager...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Email Builder & Manager</h2>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Disconnected</span>
        </div>
        <p className="text-gray-600 mb-4">Connect to access email campaigns, builder, and inbox.</p>
        <button 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => setIsAuthenticated(true)}
        >
          Connect Email System
        </button>
      </div>
    );
  }

  if (isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Email Builder & Manager</h2>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
            <button 
              className="p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsAuthenticated(false)}
            >
              Disconnect
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 ${activeTab === 'campaigns' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('campaigns')}
            >
              Campaigns
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'builder' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('builder')}
            >
              Builder
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'inbox' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('inbox')}
            >
              Inbox
            </button>
          </div>
        </div>
        
        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Email Campaigns</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                New Campaign
              </button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Edited</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign: any) => (
                    <tr key={campaign.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.lastEdited}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                        <button className="text-primary-600 hover:text-primary-900">Send</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'builder' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Email Builder</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 border rounded-md p-4 space-y-4">
                <h4 className="font-medium text-gray-700">Settings</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Subject</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Enter email subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Text Content</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Enter your email text content"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Layout Prompt</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Describe how you want the email to look"
                  />
                </div>
                
                <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  Generate HTML
                </button>
              </div>
              
              <div className="col-span-2 border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-4">Preview</h4>
                <div className="border p-4 rounded-md bg-white h-80 overflow-auto">
                  <div className="text-center text-gray-500">
                    <p>Generate your email to see the preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'inbox' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Email Inbox</h3>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inbox.map((message: any) => (
                    <tr key={message.id} className={message.read ? '' : 'font-semibold bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.sender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                        <button className="text-primary-600 hover:text-primary-900">Reply</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Email Builder & Manager</h2>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
      </div>
      <p className="text-gray-600 mb-4">Unified email system for campaigns, building, and inbox management</p>
      <div className="flex space-x-2">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{campaigns.length}</span> campaigns
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{inbox.filter((m: any) => !m.read).length}</span> unread messages
        </div>
      </div>
    </div>
  );
};

export default EmailBuilderManager;

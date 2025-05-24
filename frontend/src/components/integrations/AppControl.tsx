import React, { useState, useEffect } from 'react';

interface AppControlProps {
  isExpanded?: boolean;
}

interface AppVersion {
  id: string;
  version: string;
  build_number: number;
  is_latest: boolean;
  release_notes?: string;
  required_update: boolean;
  created_at: string;
  updated_at: string;
}

interface AppControlAction {
  id: string;
  action_type: string;
  target_module: string;
  action_data: any;
  is_applied: boolean;
  created_at: string;
  updated_at: string;
}

const AppControl: React.FC<AppControlProps> = ({ 
  isExpanded = false 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [appVersions, setAppVersions] = useState<AppVersion[]>([]);
  const [controlActions, setControlActions] = useState<AppControlAction[]>([]);
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [syncStatus, setSyncStatus] = useState<any>({
    weekly_content: { last_sync: new Date().toISOString(), next_sync: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
    quotes: { last_sync: new Date().toISOString(), next_sync: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() }
  });
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAppVersions([
          {
            id: '1',
            version: '1.0.0',
            build_number: 100,
            is_latest: true,
            release_notes: 'Initial release',
            required_update: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            version: '0.9.5',
            build_number: 95,
            is_latest: false,
            release_notes: 'Beta release',
            required_update: false,
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]);
        
        setControlActions([
          {
            id: '1',
            action_type: 'moderation',
            target_module: 'community',
            action_data: { post_id: '123', reason: 'inappropriate content' },
            is_applied: true,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            action_type: 'text-change',
            target_module: 'journal',
            action_data: { element_id: 'submit_button', new_text: 'Save Journal Entry' },
            is_applied: false,
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            action_type: 'module-swap',
            target_module: 'self',
            action_data: { old_module: 'self_v1', new_module: 'self_v2' },
            is_applied: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);
        
        setCommunityPosts([
          {
            id: '1',
            user_id: 'user123',
            username: 'fitness_enthusiast',
            content: 'Just completed my first week of the Gigi workout plan! Feeling great!',
            created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            likes: 12,
            comments: 3,
            is_flagged: false
          },
          {
            id: '2',
            user_id: 'user456',
            username: 'health_guru',
            content: 'Here\'s my meal prep for the week following the Monarch meal plan!',
            created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            likes: 24,
            comments: 7,
            is_flagged: true
          },
          {
            id: '3',
            user_id: 'user789',
            username: 'mindful_warrior',
            content: 'The mindfulness meditation from this week\'s self-improvement section changed my perspective.',
            created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            likes: 18,
            comments: 5,
            is_flagged: false
          }
        ]);
      } catch (error) {
        console.error('Error loading app control data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  
  const handleApplyAction = async (actionId: string) => {
    setIsApplying(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setControlActions(controlActions.map(action => 
        action.id === actionId ? { ...action, is_applied: true, updated_at: new Date().toISOString() } : action
      ));
      
      alert('Action applied successfully!');
    } catch (error) {
      console.error('Error applying action:', error);
      alert('Failed to apply action. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };
  
  const handleModerateCommunityPost = async (postId: string, action: 'approve' | 'remove') => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (action === 'remove') {
        setCommunityPosts(communityPosts.filter(post => post.id !== postId));
      } else {
        setCommunityPosts(communityPosts.map(post => 
          post.id === postId ? { ...post, is_flagged: false } : post
        ));
      }
      
      alert(`Post ${action === 'remove' ? 'removed' : 'approved'} successfully!`);
    } catch (error) {
      console.error('Error moderating post:', error);
      alert('Failed to moderate post. Please try again.');
    }
  };
  
  const handleSaveApiKey = () => {
    alert(`OpenAI API Key saved: ${openaiApiKey.substring(0, 5)}...`);
  };
  
  const handleResetModule = (module: string) => {
    if (window.confirm(`Are you sure you want to reset the ${module} module?`)) {
      alert(`${module} module reset successfully!`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading App Control...</p>
        </div>
      </div>
    );
  }

  if (isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">App Control</h2>
        </div>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'content' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('content')}
            >
              Weekly Content
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'community' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('community')}
            >
              Community
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'actions' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('actions')}
            >
              Control Actions
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
        </div>
        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-700 mb-2">App Version</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current Version:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {appVersions.find(v => v.is_latest)?.version || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Build Number:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {appVersions.find(v => v.is_latest)?.build_number || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Updated:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {appVersions.find(v => v.is_latest)?.updated_at 
                        ? new Date(appVersions.find(v => v.is_latest)?.updated_at || '').toLocaleDateString() 
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-700 mb-2">Sync Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Weekly Content:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {new Date(syncStatus.weekly_content.last_sync).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Next Sync:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {new Date(syncStatus.weekly_content.next_sync).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Quotes:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {new Date(syncStatus.quotes.last_sync).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-700 mb-2">Community Activity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Posts:</span>
                    <span className="text-sm font-medium text-gray-800">{communityPosts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Flagged Posts:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {communityPosts.filter(p => p.is_flagged).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Users:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {new Set(communityPosts.map(p => p.user_id)).size}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-gray-700 mb-2">Module Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-green-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">Journal</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                  </div>
                  <button
                    className="mt-2 px-2 py-1 bg-green-200 text-green-800 text-xs rounded hover:bg-green-300 transition-colors"
                    onClick={() => handleResetModule('Journal')}
                  >
                    Reset Module
                  </button>
                </div>
                
                <div className="p-3 bg-green-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">Self</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                  </div>
                  <button
                    className="mt-2 px-2 py-1 bg-green-200 text-green-800 text-xs rounded hover:bg-green-300 transition-colors"
                    onClick={() => handleResetModule('Self')}
                  >
                    Reset Module
                  </button>
                </div>
                
                <div className="p-3 bg-green-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">Training</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                  </div>
                  <button
                    className="mt-2 px-2 py-1 bg-green-200 text-green-800 text-xs rounded hover:bg-green-300 transition-colors"
                    onClick={() => handleResetModule('Training')}
                  >
                    Reset Module
                  </button>
                </div>
                
                <div className="p-3 bg-green-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">Meals</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                  </div>
                  <button
                    className="mt-2 px-2 py-1 bg-green-200 text-green-800 text-xs rounded hover:bg-green-300 transition-colors"
                    onClick={() => handleResetModule('Meals')}
                  >
                    Reset Module
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Content Panel</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                Open Weekly Content Panel
              </button>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-gray-700 mb-2">Content Sync Status</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-800">Quotes</span>
                    <p className="text-xs text-gray-500">
                      Last synced: {new Date(syncStatus.quotes.last_sync).toLocaleString()}
                    </p>
                  </div>
                  <button className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded hover:bg-primary-200 transition-colors">
                    Sync Now
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-800">Meals</span>
                    <p className="text-xs text-gray-500">
                      Last synced: {new Date(syncStatus.weekly_content.last_sync).toLocaleString()}
                    </p>
                  </div>
                  <button className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded hover:bg-primary-200 transition-colors">
                    Sync Now
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-800">Self-Improvement</span>
                    <p className="text-xs text-gray-500">
                      Last synced: {new Date(syncStatus.weekly_content.last_sync).toLocaleString()}
                    </p>
                  </div>
                  <button className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded hover:bg-primary-200 transition-colors">
                    Sync Now
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-800">Journal Templates</span>
                    <p className="text-xs text-gray-500">
                      Last synced: {new Date(syncStatus.weekly_content.last_sync).toLocaleString()}
                    </p>
                  </div>
                  <button className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded hover:bg-primary-200 transition-colors">
                    Sync Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-gray-700 mb-2">Trigger Actions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                  Reset All Content
                </button>
                <button className="p-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                  Sync All Content
                </button>
                <button className="p-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                  Generate New Quotes
                </button>
                <button className="p-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                  Generate New Meal Plans
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Community Moderation</h3>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {communityPosts.filter(p => p.is_flagged).length} Flagged
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {communityPosts.filter(p => !p.is_flagged).length} Approved
                </span>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {communityPosts.map(post => (
                    <tr key={post.id} className={post.is_flagged ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{post.username}</div>
                        <div className="text-sm text-gray-500">ID: {post.user_id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{post.content}</div>
                        <div className="text-xs text-gray-500">
                          {post.likes} likes · {post.comments} comments
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.is_flagged ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {post.is_flagged ? 'Flagged' : 'Approved'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {post.is_flagged ? (
                          <div className="flex justify-end space-x-2">
                            <button 
                              className="text-green-600 hover:text-green-900"
                              onClick={() => handleModerateCommunityPost(post.id, 'approve')}
                            >
                              Approve
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleModerateCommunityPost(post.id, 'remove')}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleModerateCommunityPost(post.id, 'remove')}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'actions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Control Actions</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                Create New Action
              </button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {controlActions.map(action => (
                    <tr key={action.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          action.action_type === 'moderation' ? 'bg-red-100 text-red-800' :
                          action.action_type === 'text-change' ? 'bg-blue-100 text-blue-800' :
                          action.action_type === 'module-swap' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {action.action_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {action.target_module}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {Object.entries(action.action_data).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium">{key}:</span> {String(value)}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          action.is_applied ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {action.is_applied ? 'Applied' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {!action.is_applied && (
                          <button 
                            className="text-primary-600 hover:text-primary-900"
                            onClick={() => handleApplyAction(action.id)}
                            disabled={isApplying}
                          >
                            {isApplying ? 'Applying...' : 'Apply Now'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-gray-700 mb-4">OpenAI API Key</h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Enter your OpenAI API key to use for image generation and other AI features.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="sk-..."
                    value={openaiApiKey}
                    onChange={(e) => setOpenaiApiKey(e.target.value)}
                  />
                  <button 
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    onClick={handleSaveApiKey}
                    disabled={!openaiApiKey}
                  >
                    Save Key
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Your API key is stored securely and never shared with third parties.
                </p>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-gray-700 mb-4">App Version Management</h3>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Build</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appVersions.map(version => (
                        <tr key={version.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {version.version}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {version.build_number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              version.is_latest ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {version.is_latest ? 'Latest' : 'Previous'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(version.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                  Add New Version
                </button>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-gray-700 mb-4">System Reset Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                  Reset All User Data
                </button>
                <button className="p-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                  Reset All Content
                </button>
                <button className="p-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                  Reset All Modules
                </button>
                <button className="p-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                  Reset App Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">App Control</h2>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            v{appVersions.find(v => v.is_latest)?.version || '1.0.0'}
          </span>
          {communityPosts.some(p => p.is_flagged) && (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
              {communityPosts.filter(p => p.is_flagged).length} Flagged
            </span>
          )}
        </div>
      </div>
      <p className="text-gray-600 mb-4">Manage app settings, content, and community moderation</p>
      <div className="flex space-x-2">
        <button
          className="flex-1 px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => setActiveTab('content')}
        >
          Weekly Content
        </button>
        <button
          className="flex-1 px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => setActiveTab('community')}
        >
          Community
        </button>
      </div>
    </div>
  );
};

export default AppControl;

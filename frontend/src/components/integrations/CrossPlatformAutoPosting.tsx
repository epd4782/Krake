import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext';

interface CrossPlatformAutoPostingProps {
  isExpanded?: boolean;
  workspace?: string;
}

const CrossPlatformAutoPosting: React.FC<CrossPlatformAutoPostingProps> = ({ 
  isExpanded = false,
  workspace = 'lunavo'
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('scheduled');
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [imageQueue, setImageQueue] = useState([]);
  const [upscaleRequests, setUpscaleRequests] = useState([]);
  const [postHistory, setPostHistory] = useState([]);
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPlatforms([
          { id: '1', name: 'Instagram', isConnected: true, lastConnected: '2 hours ago' },
          { id: '2', name: 'Facebook', isConnected: true, lastConnected: '2 hours ago' },
          { id: '3', name: 'Twitter', isConnected: true, lastConnected: '3 hours ago' },
          { id: '4', name: 'LinkedIn', isConnected: false, lastConnected: null },
          { id: '5', name: 'Pinterest', isConnected: true, lastConnected: '1 day ago' },
          { id: '6', name: 'TikTok', isConnected: false, lastConnected: null },
          { id: '7', name: 'YouTube', isConnected: true, lastConnected: '5 hours ago' },
        ]);
        
        setScheduledPosts([
          { 
            id: '1', 
            contentDescription: 'Product showcase in natural setting', 
            platforms: ['Instagram', 'Facebook', 'Pinterest'], 
            scheduledTime: '2025-05-17T10:00:00Z', 
            status: 'planned' 
          },
          { 
            id: '2', 
            contentDescription: 'Customer testimonial with product image', 
            platforms: ['Instagram', 'Twitter'], 
            scheduledTime: '2025-05-17T14:30:00Z', 
            status: 'planned' 
          },
          { 
            id: '3', 
            contentDescription: 'Behind the scenes workshop tour', 
            platforms: ['Instagram', 'Facebook', 'YouTube'], 
            scheduledTime: '2025-05-18T09:00:00Z', 
            status: 'planned' 
          },
        ]);
        
        setImageQueue([
          { id: '1', contentDescription: 'Product showcase in natural setting', status: 'processing' },
        ]);
        
        setUpscaleRequests([
          { id: '1', imageId: '101', status: 'pending' },
          { id: '2', imageId: '102', status: 'processing' },
        ]);
        
        setPostHistory([
          { 
            id: '1', 
            contentDescription: 'New product launch announcement', 
            platforms: ['Instagram', 'Facebook', 'Twitter'], 
            postedAt: '2025-05-15T15:30:00Z', 
            status: 'posted' 
          },
          { 
            id: '2', 
            contentDescription: 'Customer review highlight', 
            platforms: ['Instagram', 'Facebook'], 
            postedAt: '2025-05-14T12:00:00Z', 
            status: 'posted' 
          },
        ]);
        
      } catch (error) {
        console.error('Error loading cross platform data:', error);
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
          <p className="text-gray-600">Loading Cross Platform Auto-Posting...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Cross Platform Auto-Posting</h2>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Disconnected</span>
        </div>
        <p className="text-gray-600 mb-4">Connect to access social media posting across platforms.</p>
        <button 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => setIsAuthenticated(true)}
        >
          Connect Auto-Posting System
        </button>
      </div>
    );
  }

  if (isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Cross Platform Auto-Posting</h2>
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
              className={`px-4 py-2 ${activeTab === 'scheduled' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('scheduled')}
            >
              Scheduled Posts
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'create' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('create')}
            >
              Create Post
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'platforms' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('platforms')}
            >
              Platforms
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'history' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>
        </div>
        
        {activeTab === 'scheduled' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Scheduled Posts</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                New Post
              </button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platforms</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scheduledPosts.map((post: any) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.contentDescription}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.platforms.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.scheduledTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'posted' ? 'bg-green-100 text-green-800' :
                          post.status === 'error' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-semibold text-gray-900 mb-2">Image Generation Queue</h4>
              <div className="border rounded-md p-4">
                {imageQueue.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {imageQueue.map((item: any) => (
                      <li key={item.id} className="py-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-700">{item.contentDescription}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.status === 'completed' ? 'bg-green-100 text-green-800' :
                            item.status === 'error' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No images in queue</p>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-900 mb-2">Upscale Requests (Vizzy)</h4>
              <div className="border rounded-md p-4">
                {upscaleRequests.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {upscaleRequests.map((item: any) => (
                      <li key={item.id} className="py-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-700">Image #{item.imageId}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.status === 'completed' ? 'bg-green-100 text-green-800' :
                            item.status === 'error' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No upscale requests</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'create' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 border rounded-md p-4 space-y-4">
                <h4 className="font-medium text-gray-700">Post Settings</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content Description</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Describe the image you want to generate"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Post Text</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Enter the text for your post"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platforms</label>
                  <div className="space-y-2">
                    {platforms.map((platform: any) => (
                      <div key={platform.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`platform-${platform.id}`}
                          disabled={!platform.isConnected}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`platform-${platform.id}`} className="ml-2 block text-sm text-gray-700">
                          {platform.name}
                          {!platform.isConnected && (
                            <span className="ml-2 text-xs text-red-500">(Not connected)</span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Schedule Time</label>
                  <input
                    type="datetime-local"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="upscale-vizzy"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="upscale-vizzy" className="ml-2 block text-sm text-gray-700">
                    Upscale with Vizzy
                  </label>
                </div>
                
                <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  Generate Image
                </button>
              </div>
              
              <div className="col-span-2 border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-4">Preview</h4>
                <div className="border p-4 rounded-md bg-white h-80 overflow-auto">
                  <div className="text-center text-gray-500">
                    <p>Generate your image to see the preview</p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                    Schedule Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'platforms' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Platform Connections</h3>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Connected</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {platforms.map((platform: any) => (
                    <tr key={platform.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{platform.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          platform.isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {platform.isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {platform.lastConnected || 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {platform.isConnected ? (
                          <button className="text-red-600 hover:text-red-900">Disconnect</button>
                        ) : (
                          <button className="text-primary-600 hover:text-primary-900">Connect</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Post History</h3>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platforms</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {postHistory.map((post: any) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.contentDescription}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.platforms.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.postedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'posted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {post.status}
                        </span>
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
        <h2 className="text-xl font-bold text-gray-900">Cross Platform Auto-Posting</h2>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
      </div>
      <p className="text-gray-600 mb-4">Schedule, generate, and publish content across 7 platforms</p>
      <div className="flex space-x-2">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{scheduledPosts.length}</span> scheduled posts
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{platforms.filter((p: any) => p.isConnected).length}</span> connected platforms
        </div>
      </div>
    </div>
  );
};

export default CrossPlatformAutoPosting;

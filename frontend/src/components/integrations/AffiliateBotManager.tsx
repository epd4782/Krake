import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext';

interface AffiliateBotManagerProps {
  isExpanded?: boolean;
  workspace?: string;
}

const AffiliateBotManager: React.FC<AffiliateBotManagerProps> = ({ 
  isExpanded = false,
  workspace = 'lunabots'
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('networks');
  const [networks, setNetworks] = useState([]);
  const [products, setProducts] = useState([]);
  const [links, setLinks] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [statistics, setStatistics] = useState<any>(null);
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setNetworks([
          { id: '1', name: 'Amazon Associates', isConnected: true, lastConnected: '2 hours ago' },
          { id: '2', name: 'ClickBank', isConnected: true, lastConnected: '1 day ago' },
          { id: '3', name: 'ShareASale', isConnected: false, lastConnected: null },
        ]);
        
        setProducts([
          { 
            id: '1', 
            name: 'Premium Headphones', 
            price: 99.99, 
            commissionRate: 8, 
            network: 'Amazon Associates',
            category: 'Electronics',
            clicks: 250,
            conversions: 12,
          },
          { 
            id: '2', 
            name: 'Fitness E-Book', 
            price: 19.99, 
            commissionRate: 50, 
            network: 'ClickBank',
            category: 'Health & Fitness',
            clicks: 180,
            conversions: 25,
          },
        ]);
        
        setLinks([
          { 
            id: '1', 
            product: 'Premium Headphones', 
            customUrl: 'headphones-deal', 
            trackingId: 'xyz123', 
            campaign: 'summer-sale',
            isActive: true,
            clicks: 250,
            conversions: 12,
          },
          { 
            id: '2', 
            product: 'Fitness E-Book', 
            customUrl: 'fitness-guide', 
            trackingId: 'abc456', 
            campaign: 'new-year',
            isActive: true,
            clicks: 180,
            conversions: 25,
          },
        ]);
        
        setEarnings([
          { 
            id: '1', 
            product: 'Premium Headphones', 
            amount: 119.88, 
            date: '2025-05-10', 
            status: 'approved',
          },
          { 
            id: '2', 
            product: 'Fitness E-Book', 
            amount: 249.88, 
            date: '2025-05-05', 
            status: 'paid',
          },
        ]);
        
        setStatistics({
          totalClicks: 430,
          totalConversions: 37,
          totalRevenue: 369.76,
          activeLinks: 87,
          conversionRate: 8.6,
          avgCommission: 9.99,
        });
        
      } catch (error) {
        console.error('Error loading affiliate bot data:', error);
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
          <p className="text-gray-600">Loading Affiliate Bot Manager...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Affiliate Bot</h2>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Disconnected</span>
        </div>
        <p className="text-gray-600 mb-4">Connect to access affiliate marketing campaigns and tracking.</p>
        <button 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => setIsAuthenticated(true)}
        >
          Connect Affiliate Bot
        </button>
      </div>
    );
  }

  if (isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Affiliate Bot</h2>
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
              className={`px-4 py-2 ${activeTab === 'networks' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('networks')}
            >
              Networks
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'products' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'links' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('links')}
            >
              Links
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'earnings' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('earnings')}
            >
              Earnings
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
        </div>
        
        {activeTab === 'networks' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Affiliate Networks</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                Add Network
              </button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Network</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Connected</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {networks.map((network: any) => (
                    <tr key={network.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{network.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          network.isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {network.isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {network.lastConnected || 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {network.isConnected ? (
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
        
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Affiliate Products</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                Add Product
              </button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Network</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product: any) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.commissionRate}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.network}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.clicks} clicks / {product.conversions} conv.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                        <button className="text-primary-600 hover:text-primary-900">Create Link</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'links' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Affiliate Links</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                Create Link
              </button>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custom URL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {links.map((link: any) => (
                    <tr key={link.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{link.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{link.customUrl}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{link.trackingId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{link.campaign}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          link.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {link.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {link.clicks} clicks / {link.conversions} conv.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">Copy</button>
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Affiliate Earnings</h3>
              <div className="flex space-x-2">
                <select className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm">
                  <option>All Time</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
                <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                  Export
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h4>
                <p className="text-2xl font-semibold text-gray-900">${statistics?.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</h4>
                <p className="text-2xl font-semibold text-gray-900">{statistics?.conversionRate.toFixed(1)}%</p>
              </div>
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Avg. Commission</h4>
                <p className="text-2xl font-semibold text-gray-900">${statistics?.avgCommission.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {earnings.map((earning: any) => (
                    <tr key={earning.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{earning.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${earning.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{earning.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          earning.status === 'paid' ? 'bg-green-100 text-green-800' : 
                          earning.status === 'approved' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {earning.status.charAt(0).toUpperCase() + earning.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <button className="text-primary-600 hover:text-primary-900">View Details</button>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                    <option>PayPal</option>
                    <option>Bank Transfer</option>
                    <option>Check</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="your-email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Payout Amount</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="50.00"
                    />
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  Save Payment Settings
                </button>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scan Frequency</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                    <option>Every 6 hours</option>
                    <option>Every 12 hours</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Categories</label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="category-electronics"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        checked
                      />
                      <label htmlFor="category-electronics" className="ml-2 block text-sm text-gray-700">
                        Electronics
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="category-health"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        checked
                      />
                      <label htmlFor="category-health" className="ml-2 block text-sm text-gray-700">
                        Health & Fitness
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="category-home"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        checked
                      />
                      <label htmlFor="category-home" className="ml-2 block text-sm text-gray-700">
                        Home & Kitchen
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="category-fashion"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="category-fashion" className="ml-2 block text-sm text-gray-700">
                        Fashion
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Commission Rate</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="5"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  Save Scan Settings
                </button>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Keys</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amazon Associates API Key</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="••••••••••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ClickBank API Key</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="••••••••••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ShareASale API Key</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="••••••••••••••••"
                  />
                </div>
                
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                  Save API Keys
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
        <h2 className="text-xl font-bold text-gray-900">Affiliate Bot</h2>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
      </div>
      <p className="text-gray-600 mb-4">Manage your affiliate marketing campaigns and track earnings</p>
      <div className="flex space-x-2">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">${statistics?.totalRevenue.toFixed(2)}</span> revenue
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{statistics?.activeLinks}</span> active links
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{statistics?.conversionRate.toFixed(1)}%</span> conversion
        </div>
      </div>
    </div>
  );
};

export default AffiliateBotManager;

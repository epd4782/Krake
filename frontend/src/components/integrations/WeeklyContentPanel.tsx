import React, { useState, useEffect } from 'react';

interface WeeklyContentPanelProps {
  isExpanded?: boolean;
  workspace?: string;
}

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: string;
  week_number: number;
  year: number;
  metadata: any;
}

const WeeklyContentPanel: React.FC<WeeklyContentPanelProps> = ({ 
  isExpanded = false,
  workspace = 'monarch'
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('quotes');
  const [quotes, setQuotes] = useState<ContentItem[]>([]);
  const [meals, setMeals] = useState<ContentItem[]>([]);
  const [selfImprovement, setSelfImprovement] = useState<ContentItem[]>([]);
  const [journalTemplates, setJournalTemplates] = useState<ContentItem[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [nextWeek, setNextWeek] = useState<number>(0);
  const [nextYear, setNextYear] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const now = new Date();
        const currentWeekNum = getWeekNumber(now);
        const currentYearNum = now.getFullYear();
        
        setCurrentWeek(currentWeekNum);
        setCurrentYear(currentYearNum);
        
        const nextDate = new Date(now);
        nextDate.setDate(now.getDate() + 7);
        const nextWeekNum = getWeekNumber(nextDate);
        const nextYearNum = nextDate.getFullYear();
        
        setNextWeek(nextWeekNum);
        setNextYear(nextYearNum);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setQuotes([
          { 
            id: '1', 
            title: 'Motivation Quote', 
            content: 'The only bad workout is the one that didn\'t happen.', 
            type: 'quotes',
            week_number: currentWeekNum,
            year: currentYearNum,
            metadata: { author: 'Unknown' }
          },
          { 
            id: '2', 
            title: 'Persistence Quote', 
            content: 'It\'s not about having time, it\'s about making time.', 
            type: 'quotes',
            week_number: nextWeekNum,
            year: nextYearNum,
            metadata: { author: 'Unknown' }
          },
        ]);
        
        setMeals([
          { 
            id: '1', 
            title: 'High Protein Breakfast', 
            content: 'Scrambled eggs with spinach and turkey bacon.', 
            type: 'meals',
            week_number: currentWeekNum,
            year: currentYearNum,
            metadata: { 
              short_description: 'Quick protein-packed breakfast',
              prompt: 'Healthy breakfast with eggs',
              image_url: 'https://example.com/breakfast.jpg'
            }
          },
          { 
            id: '2', 
            title: 'Post-Workout Smoothie', 
            content: 'Blend banana, protein powder, almond milk, and berries.', 
            type: 'meals',
            week_number: nextWeekNum,
            year: nextYearNum,
            metadata: { 
              short_description: 'Recovery smoothie',
              prompt: 'Protein smoothie',
              image_url: 'https://example.com/smoothie.jpg'
            }
          },
        ]);
        
        setSelfImprovement([
          { 
            id: '1', 
            title: 'Mindfulness Meditation', 
            content: 'Practice 10 minutes of guided meditation each morning.', 
            type: 'self-improvement',
            week_number: currentWeekNum,
            year: currentYearNum,
            metadata: { 
              category: 'Mental Health',
              youtube_link: 'https://youtube.com/example'
            }
          },
          { 
            id: '2', 
            title: 'Goal Setting Workshop', 
            content: 'Define your fitness goals using the SMART criteria.', 
            type: 'self-improvement',
            week_number: nextWeekNum,
            year: nextYearNum,
            metadata: { 
              category: 'Productivity',
              youtube_link: 'https://youtube.com/example2'
            }
          },
        ]);
        
        setJournalTemplates([
          { 
            id: '1', 
            title: 'Daily Reflection', 
            content: JSON.stringify([
              { type: 'text', label: 'What went well today?' },
              { type: 'text', label: 'What could have gone better?' },
              { type: 'checkbox', label: 'Did you complete your workout?' },
              { type: 'rating', label: 'Rate your energy level (1-10)' }
            ]), 
            type: 'journal-templates',
            week_number: currentWeekNum,
            year: currentYearNum,
            metadata: { template_type: 'daily' }
          },
          { 
            id: '2', 
            title: 'Weekly Progress', 
            content: JSON.stringify([
              { type: 'text', label: 'What was your biggest achievement this week?' },
              { type: 'text', label: 'What are your goals for next week?' },
              { type: 'checkbox', label: 'Did you meet your workout targets?' },
              { type: 'checkbox', label: 'Did you follow your meal plan?' }
            ]), 
            type: 'journal-templates',
            week_number: nextWeekNum,
            year: nextYearNum,
            metadata: { template_type: 'weekly' }
          },
        ]);
        
        setLastSynced(new Date().toISOString());
      } catch (error) {
        console.error('Error loading weekly content data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [workspace]);
  
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  
  const handleSync = async () => {
    setIsSyncing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLastSynced(new Date().toISOString());
      
      alert('Weekly content synced successfully!');
    } catch (error) {
      console.error('Error syncing weekly content:', error);
      alert('Failed to sync weekly content. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading Weekly Content Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Weekly Content Panel</h2>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Disconnected</span>
        </div>
        <p className="text-gray-600 mb-4">Connect to access weekly content planning.</p>
        <button 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => setIsAuthenticated(true)}
        >
          Connect
        </button>
      </div>
    );
  }

  if (isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Weekly Content Panel</h2>
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
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-sm text-gray-500">Current Week: {currentWeek}/{currentYear}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-500">Next Week: {nextWeek}/{nextYear}</span>
          </div>
          <div className="flex items-center">
            {lastSynced && (
              <span className="text-xs text-gray-500 mr-2">
                Last synced: {new Date(lastSynced).toLocaleString()}
              </span>
            )}
            <button 
              className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
              onClick={handleSync}
              disabled={isSyncing}
            >
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 ${activeTab === 'quotes' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('quotes')}
            >
              Quotes
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'meals' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('meals')}
            >
              Meals
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'self-improvement' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('self-improvement')}
            >
              Self-Improvement
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'journal-templates' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('journal-templates')}
            >
              Journal Templates
            </button>
          </div>
        </div>
        
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Quotes</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                Add Quote
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-2">Current Week</h4>
                {quotes.filter(q => q.week_number === currentWeek && q.year === currentYear).map(quote => (
                  <div key={quote.id} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-800 italic">"{quote.content}"</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {quote.metadata.author ? `- ${quote.metadata.author}` : ''}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-2">Next Week</h4>
                {quotes.filter(q => q.week_number === nextWeek && q.year === nextYear).map(quote => (
                  <div key={quote.id} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-800 italic">"{quote.content}"</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {quote.metadata.author ? `- ${quote.metadata.author}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'meals' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Meals</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                Add Meal
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-2">Current Week</h4>
                {meals.filter(m => m.week_number === currentWeek && m.year === currentYear).map(meal => (
                  <div key={meal.id} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      {meal.metadata.image_url && (
                        <div className="w-20 h-20 bg-gray-200 rounded-md mr-3 flex-shrink-0">
                          <img 
                            src={meal.metadata.image_url} 
                            alt={meal.title} 
                            className="w-full h-full object-cover rounded-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <h5 className="font-medium text-gray-800">{meal.title}</h5>
                        <p className="text-sm text-gray-600 mb-1">{meal.metadata.short_description}</p>
                        <p className="text-sm text-gray-700">{meal.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-2">Next Week</h4>
                {meals.filter(m => m.week_number === nextWeek && m.year === nextYear).map(meal => (
                  <div key={meal.id} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      {meal.metadata.image_url && (
                        <div className="w-20 h-20 bg-gray-200 rounded-md mr-3 flex-shrink-0">
                          <img 
                            src={meal.metadata.image_url} 
                            alt={meal.title} 
                            className="w-full h-full object-cover rounded-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <h5 className="font-medium text-gray-800">{meal.title}</h5>
                        <p className="text-sm text-gray-600 mb-1">{meal.metadata.short_description}</p>
                        <p className="text-sm text-gray-700">{meal.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'self-improvement' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Self-Improvement</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                Add Content
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-2">Current Week</h4>
                {selfImprovement.filter(s => s.week_number === currentWeek && s.year === currentYear).map(item => (
                  <div key={item.id} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-gray-800">{item.title}</h5>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {item.metadata.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{item.content}</p>
                    {item.metadata.youtube_link && (
                      <a 
                        href={item.metadata.youtube_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                        Watch Video
                      </a>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-2">Next Week</h4>
                {selfImprovement.filter(s => s.week_number === nextWeek && s.year === nextYear).map(item => (
                  <div key={item.id} className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-gray-800">{item.title}</h5>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {item.metadata.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{item.content}</p>
                    {item.metadata.youtube_link && (
                      <a 
                        href={item.metadata.youtube_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                        Watch Video
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'journal-templates' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Journal Templates</h3>
              <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors">
                Add Template
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-2">Current Week</h4>
                {journalTemplates.filter(j => j.week_number === currentWeek && j.year === currentYear).map(template => {
                  const blocks = JSON.parse(template.content);
                  return (
                    <div key={template.id} className="mb-4 p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-800">{template.title}</h5>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {template.metadata.template_type}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {blocks.map((block: any, index: number) => (
                          <div key={index} className="flex items-center">
                            {block.type === 'checkbox' ? (
                              <input type="checkbox" className="mr-2" disabled />
                            ) : block.type === 'rating' ? (
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 mr-2">1</span>
                                <div className="flex space-x-1">
                                  {[...Array(10)].map((_, i) => (
                                    <div key={i} className="w-3 h-3 rounded-full bg-gray-300"></div>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500 ml-2">10</span>
                              </div>
                            ) : (
                              <div className="w-full h-6 bg-gray-200 rounded-md"></div>
                            )}
                            <span className="ml-2 text-sm text-gray-700">{block.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium text-gray-700 mb-2">Next Week</h4>
                {journalTemplates.filter(j => j.week_number === nextWeek && j.year === nextYear).map(template => {
                  const blocks = JSON.parse(template.content);
                  return (
                    <div key={template.id} className="mb-4 p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-800">{template.title}</h5>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {template.metadata.template_type}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {blocks.map((block: any, index: number) => (
                          <div key={index} className="flex items-center">
                            {block.type === 'checkbox' ? (
                              <input type="checkbox" className="mr-2" disabled />
                            ) : block.type === 'rating' ? (
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 mr-2">1</span>
                                <div className="flex space-x-1">
                                  {[...Array(10)].map((_, i) => (
                                    <div key={i} className="w-3 h-3 rounded-full bg-gray-300"></div>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500 ml-2">10</span>
                              </div>
                            ) : (
                              <div className="w-full h-6 bg-gray-200 rounded-md"></div>
                            )}
                            <span className="ml-2 text-sm text-gray-700">{block.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
        <h2 className="text-xl font-bold text-gray-900">Weekly Content Panel</h2>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
      </div>
      <p className="text-gray-600 mb-4">Plan and schedule weekly content for the Monarch app</p>
      <div className="flex space-x-2">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{quotes.length}</span> quotes
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{meals.length}</span> meals
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{selfImprovement.length}</span> self-improvement
        </div>
      </div>
    </div>
  );
};

export default WeeklyContentPanel;

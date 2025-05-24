import React, { useState, useEffect } from 'react';

interface GigiWorkoutGeneratorProps {
  isExpanded?: boolean;
}

interface Question {
  id: string;
  question_number: number;
  question_text: string;
  question_type: string;
  options?: string[];
  required: boolean;
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface WorkoutDay {
  day_number: number;
  day_name: string;
  focus: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
  id: string;
  plan_name: string;
  days: WorkoutDay[];
  tips?: string;
  generated_at: string;
  expires_at?: string;
}

const GigiWorkoutGenerator: React.FC<GigiWorkoutGeneratorProps> = ({ 
  isExpanded = false 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentPlan, setCurrentPlan] = useState<WorkoutPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockQuestions: Question[] = [
          {
            id: '1',
            question_number: 1,
            question_text: 'What is your primary fitness goal?',
            question_type: 'text',
            required: true
          },
          {
            id: '2',
            question_number: 2,
            question_text: 'Why is this fitness goal important to you?',
            question_type: 'text',
            required: true
          },
          {
            id: '3',
            question_number: 3,
            question_text: 'Do you have a specific target or event you\'re training for?',
            question_type: 'text',
            required: false
          },
          {
            id: '4',
            question_number: 4,
            question_text: 'Besides your primary goal, are there other fitness improvements you want to achieve?',
            question_type: 'text',
            required: false
          },
          {
            id: '5',
            question_number: 5,
            question_text: 'What is your age?',
            question_type: 'number',
            required: true
          },
          {
            id: '6',
            question_number: 6,
            question_text: 'What is your gender?',
            question_type: 'dropdown',
            options: ['male', 'female', 'other'],
            required: true
          },
          {
            id: '7',
            question_number: 7,
            question_text: 'What is your height?',
            question_type: 'number',
            required: true
          },
          {
            id: '8',
            question_number: 8,
            question_text: 'What is your current weight?',
            question_type: 'number',
            required: true
          },
          {
            id: '9',
            question_number: 9,
            question_text: 'Do you have any medical conditions that could affect your training?',
            question_type: 'text',
            required: true
          },
          {
            id: '10',
            question_number: 10,
            question_text: 'Are you currently under a doctor\'s care or taking medications affecting your training?',
            question_type: 'text',
            required: true
          },
        ];
        
        setQuestions(mockQuestions);
        
        const mockPlan: WorkoutPlan = {
          id: '1',
          plan_name: 'Custom 7-Day Workout Plan',
          days: [
            {
              day_number: 1,
              day_name: 'Monday',
              focus: 'Chest & Triceps',
              exercises: [
                {
                  name: 'Bench Press',
                  sets: 4,
                  reps: '8-10',
                  rest: '90s',
                  notes: 'Focus on form, keep shoulders back'
                },
                {
                  name: 'Incline Dumbbell Press',
                  sets: 3,
                  reps: '10-12',
                  rest: '60s'
                },
                {
                  name: 'Tricep Pushdowns',
                  sets: 3,
                  reps: '12-15',
                  rest: '45s'
                },
                {
                  name: 'Overhead Tricep Extension',
                  sets: 3,
                  reps: '10-12',
                  rest: '60s'
                }
              ]
            },
            {
              day_number: 2,
              day_name: 'Tuesday',
              focus: 'Back & Biceps',
              exercises: [
                {
                  name: 'Pull-ups',
                  sets: 4,
                  reps: '8-10',
                  rest: '90s',
                  notes: 'Use assistance if needed'
                },
                {
                  name: 'Bent Over Rows',
                  sets: 3,
                  reps: '10-12',
                  rest: '60s'
                },
                {
                  name: 'Bicep Curls',
                  sets: 3,
                  reps: '12-15',
                  rest: '45s'
                },
                {
                  name: 'Hammer Curls',
                  sets: 3,
                  reps: '10-12',
                  rest: '60s'
                }
              ]
            },
            {
              day_number: 3,
              day_name: 'Wednesday',
              focus: 'Legs',
              exercises: [
                {
                  name: 'Squats',
                  sets: 4,
                  reps: '8-10',
                  rest: '120s',
                  notes: 'Focus on depth and form'
                },
                {
                  name: 'Leg Press',
                  sets: 3,
                  reps: '10-12',
                  rest: '90s'
                },
                {
                  name: 'Leg Extensions',
                  sets: 3,
                  reps: '12-15',
                  rest: '60s'
                },
                {
                  name: 'Calf Raises',
                  sets: 4,
                  reps: '15-20',
                  rest: '45s'
                }
              ]
            },
            {
              day_number: 4,
              day_name: 'Thursday',
              focus: 'Shoulders & Abs',
              exercises: [
                {
                  name: 'Overhead Press',
                  sets: 4,
                  reps: '8-10',
                  rest: '90s'
                },
                {
                  name: 'Lateral Raises',
                  sets: 3,
                  reps: '12-15',
                  rest: '45s'
                },
                {
                  name: 'Planks',
                  sets: 3,
                  reps: '30-60s',
                  rest: '45s'
                },
                {
                  name: 'Russian Twists',
                  sets: 3,
                  reps: '20 total',
                  rest: '45s'
                }
              ]
            },
            {
              day_number: 5,
              day_name: 'Friday',
              focus: 'Full Body',
              exercises: [
                {
                  name: 'Deadlifts',
                  sets: 4,
                  reps: '6-8',
                  rest: '120s',
                  notes: 'Focus on form, keep back straight'
                },
                {
                  name: 'Push-ups',
                  sets: 3,
                  reps: 'Max',
                  rest: '60s'
                },
                {
                  name: 'Dumbbell Rows',
                  sets: 3,
                  reps: '10-12',
                  rest: '60s'
                },
                {
                  name: 'Lunges',
                  sets: 3,
                  reps: '10 each leg',
                  rest: '60s'
                }
              ]
            },
            {
              day_number: 6,
              day_name: 'Saturday',
              focus: 'Cardio',
              exercises: [
                {
                  name: 'Running',
                  sets: 1,
                  reps: '30 minutes',
                  rest: 'N/A',
                  notes: 'Moderate pace'
                },
                {
                  name: 'Jump Rope',
                  sets: 3,
                  reps: '2 minutes',
                  rest: '60s'
                },
                {
                  name: 'Burpees',
                  sets: 3,
                  reps: '10-15',
                  rest: '45s'
                }
              ]
            },
            {
              day_number: 7,
              day_name: 'Sunday',
              focus: 'Rest Day',
              exercises: []
            }
          ],
          tips: 'Make sure to warm up before each workout and cool down afterward. Stay hydrated and listen to your body.',
          generated_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        setCurrentPlan(mockPlan);
        setCompletedDays([1, 3]); // Mock completed days
      } catch (error) {
        console.error('Error loading workout generator data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newPlan: WorkoutPlan = {
        ...currentPlan!,
        id: Math.random().toString(),
        generated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      setCurrentPlan(newPlan);
      setCompletedDays([]);
      setActiveTab('plan');
    } catch (error) {
      console.error('Error generating workout plan:', error);
      alert('Failed to generate workout plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDayComplete = (dayNumber: number) => {
    if (completedDays.includes(dayNumber)) {
      setCompletedDays(completedDays.filter(d => d !== dayNumber));
    } else {
      setCompletedDays([...completedDays, dayNumber]);
    }
  };
  
  const handleResetPlan = async () => {
    if (window.confirm('Are you sure you want to reset your workout plan? This will generate a new plan.')) {
      setIsGenerating(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const newPlan: WorkoutPlan = {
          ...currentPlan!,
          id: Math.random().toString(),
          generated_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        setCurrentPlan(newPlan);
        setCompletedDays([]);
      } catch (error) {
        console.error('Error resetting workout plan:', error);
        alert('Failed to reset workout plan. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading Gigi Workout Generator...</p>
        </div>
      </div>
    );
  }

  if (isExpanded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Gigi Workout Generator</h2>
          <div className="flex items-center space-x-2">
            {currentPlan && (
              <span className="text-xs text-gray-500">
                Plan expires: {new Date(currentPlan.expires_at || '').toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 ${activeTab === 'questions' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('questions')}
            >
              Intake Questions
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'plan' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('plan')}
              disabled={!currentPlan}
            >
              Workout Plan
            </button>
          </div>
        </div>
        
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <p className="text-gray-700">
              Answer the following questions to generate your personalized workout plan.
            </p>
            
            <div className="space-y-4">
              {questions.slice(0, 10).map(question => (
                <div key={question.id} className="border rounded-md p-4">
                  <div className="flex items-start mb-2">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
                      {question.question_number}
                    </span>
                    <h4 className="text-gray-800 font-medium">
                      {question.question_text}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </h4>
                  </div>
                  
                  {question.question_type === 'dropdown' && question.options && (
                    <div className="ml-8 space-y-2">
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="radio"
                            id={`${question.id}-${index}`}
                            name={question.id}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={() => handleAnswerChange(question.id, option)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor={`${question.id}-${index}`} className="ml-2 block text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.question_type === 'text' && (
                    <div className="ml-8">
                      <textarea
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Your answer"
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      />
                    </div>
                  )}
                  
                  {question.question_type === 'number' && (
                    <div className="ml-8">
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter a number"
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      />
                    </div>
                  )}
                  
                  {question.question_type === 'boolean' && (
                    <div className="ml-8 flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`${question.id}-yes`}
                          name={question.id}
                          value="yes"
                          checked={answers[question.id] === true}
                          onChange={() => handleAnswerChange(question.id, true)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label htmlFor={`${question.id}-yes`} className="ml-2 block text-sm text-gray-700">
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`${question.id}-no`}
                          name={question.id}
                          value="no"
                          checked={answers[question.id] === false}
                          onChange={() => handleAnswerChange(question.id, false)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label htmlFor={`${question.id}-no`} className="ml-2 block text-sm text-gray-700">
                          No
                        </label>
                      </div>
                    </div>
                  )}
                  
                  {question.question_type === 'multi-select' && question.options && (
                    <div className="ml-8 space-y-2">
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${question.id}-${index}`}
                            name={`${question.id}-${option}`}
                            checked={Array.isArray(answers[question.id]) && answers[question.id].includes(option)}
                            onChange={() => {
                              const currentValues = Array.isArray(answers[question.id]) ? [...answers[question.id]] : [];
                              if (currentValues.includes(option)) {
                                handleAnswerChange(question.id, currentValues.filter(v => v !== option));
                              } else {
                                handleAnswerChange(question.id, [...currentValues, option]);
                              }
                            }}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`${question.id}-${index}`} className="ml-2 block text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="text-center text-gray-500">
                <p>Showing 10 of {questions.length} questions</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
                onClick={handleGeneratePlan}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Workout Plan'}
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'plan' && currentPlan && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">{currentPlan.plan_name}</h3>
              <button
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                onClick={handleResetPlan}
                disabled={isGenerating}
              >
                {isGenerating ? 'Resetting...' : 'Reset Plan'}
              </button>
            </div>
            
            {currentPlan.tips && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="text-blue-800 font-medium mb-2">Tips from Gigi</h4>
                <p className="text-blue-700 text-sm">{currentPlan.tips}</p>
              </div>
            )}
            
            <div className="grid grid-cols-7 gap-2">
              {currentPlan.days.map(day => (
                <button
                  key={day.day_number}
                  className={`p-2 rounded-md text-center ${
                    selectedDay === day.day_number ? 'bg-primary-100 border-2 border-primary-500' :
                    completedDays.includes(day.day_number) ? 'bg-green-100 border border-green-500' :
                    'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedDay(day.day_number)}
                >
                  <div className="text-sm font-medium">{day.day_name}</div>
                  <div className="text-xs text-gray-600">{day.focus}</div>
                  {completedDays.includes(day.day_number) && (
                    <div className="mt-1 text-green-600">
                      <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {selectedDay !== null && (
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-800">
                    Day {selectedDay}: {currentPlan.days[selectedDay - 1].day_name} - {currentPlan.days[selectedDay - 1].focus}
                  </h4>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      completedDays.includes(selectedDay)
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => handleDayComplete(selectedDay)}
                  >
                    {completedDays.includes(selectedDay) ? 'Completed ✓' : 'Mark as Complete'}
                  </button>
                </div>
                
                {currentPlan.days[selectedDay - 1].exercises.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exercise</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sets</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reps</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rest</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentPlan.days[selectedDay - 1].exercises.map((exercise, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exercise.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.sets}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.reps}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.rest}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>Rest day - No exercises scheduled</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Gigi Workout Generator</h2>
        {currentPlan && (
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs mr-1">
              {completedDays.length}
            </div>
            <span className="text-xs text-gray-500">/{currentPlan.days.filter(d => d.exercises.length > 0).length} days</span>
          </div>
        )}
      </div>
      <p className="text-gray-600 mb-4">Generate personalized workout plans based on your goals</p>
      {currentPlan ? (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">
            Current plan: <span className="font-medium">{currentPlan.plan_name}</span>
          </span>
          <button
            className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
            onClick={() => setActiveTab('plan')}
          >
            View Plan
          </button>
        </div>
      ) : (
        <button
          className="w-full px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => setActiveTab('questions')}
        >
          Create Workout Plan
        </button>
      )}
    </div>
  );
};

export default GigiWorkoutGenerator;

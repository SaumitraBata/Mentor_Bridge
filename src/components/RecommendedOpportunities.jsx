import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import OpportunityCard from './OpportunityCard';
import { recommendOpportunities } from '../utils/matchingAlgorithm';

const RecommendedOpportunities = ({ student, opportunities, maxItems = 3 }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (student && opportunities) {
      const recommended = recommendOpportunities(student, opportunities);
      setRecommendations(recommended.slice(0, maxItems));
    }
  }, [student, opportunities, maxItems]);

  if (!recommendations.length) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
          AI Powered
        </span>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((opportunity) => (
          <div key={opportunity.id} className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{opportunity.title}</h4>
                <p className="text-sm text-gray-600">{opportunity.company}</p>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                  {opportunity.type}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-green-600">
                    {opportunity.relevanceScore}% Match
                  </span>
                </div>
              </div>
            </div>
            
            {opportunity.reasons.length > 0 && (
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <p className="text-xs font-medium text-green-800 mb-1">Why this is perfect for you:</p>
                <div className="flex flex-wrap gap-1">
                  {opportunity.reasons.map((reason, index) => (
                    <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-3 flex justify-end">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600">
          Recommendations based on your skills, interests, and career goals
        </p>
      </div>
    </div>
  );
};

export default RecommendedOpportunities;
import { Brain, Target, Award, Clock } from 'lucide-react';

const MatchExplanation = ({ explanations, matchScore }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'skills': return Brain;
      case 'domain': return Target;
      case 'goals': return Award;
      case 'experience': return Clock;
      default: return Brain;
    }
  };

  const getColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <div className="flex items-center space-x-2 mb-3">
        <Brain className="w-5 h-5 text-blue-600" />
        <h4 className="text-sm font-semibold text-blue-900">AI Match Analysis</h4>
        <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
          {matchScore}% Match
        </span>
      </div>
      
      <div className="space-y-2">
        {explanations.map((explanation, index) => {
          const Icon = getIcon(explanation.type);
          return (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">{explanation.description}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getColor(explanation.score)}`}>
                {explanation.score}%
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-3 pt-3 border-t border-blue-200">
        <p className="text-xs text-blue-700">
          Match calculated using skills (40%), domain expertise (30%), goal alignment (20%), and experience (10%)
        </p>
      </div>
    </div>
  );
};

export default MatchExplanation;
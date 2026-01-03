import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Users, Star, Lightbulb, Brain } from 'lucide-react';
import Button from '../components/Button';
import BookingModal from '../components/BookingModal';
import MatchExplanation from '../components/MatchExplanation';
import { mentors, studentProfile } from '../data/dummyData';
import { calculateMatchScore } from '../utils/matchingAlgorithm';

const SmartMatchmaking = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState(studentProfile.goals || []);
  const [selectedSkills, setSelectedSkills] = useState(studentProfile.skills || []);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const careerGoals = [
    'Land a software engineering internship',
    'Transition to product management',
    'Learn system design',
    'Improve coding interview skills',
    'Build a strong professional network',
    'Start a tech startup',
    'Get into data science',
    'Develop leadership skills'
  ];

  const skills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'System Design',
    'Product Strategy', 'Machine Learning', 'SQL', 'AWS', 'Mobile Development'
  ];

  const toggleGoal = (goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleBookSession = (mentor) => {
    setSelectedMentor(mentor);
    setIsBookingModalOpen(true);
  };

  // Create dynamic student profile for matching
  const dynamicStudent = {
    ...studentProfile,
    goals: selectedGoals,
    skills: selectedSkills
  };

  // Smart matching logic with AI explanations
  const getMatchedMentors = () => {
    return mentors.map(mentor => {
      const matchResult = calculateMatchScore(dynamicStudent, mentor);
      return {
        ...mentor,
        matchScore: matchResult.score,
        matchExplanations: matchResult.explanations,
        matchingSkills: matchResult.matchingSkills
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const matchedMentors = getMatchedMentors();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Smart Matchmaking</h1>
            </div>
            <nav className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/student')}>
                Student Dashboard
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <p className="text-gray-600">AI-powered mentor recommendations based on your goals and interests</p>
          </div>
        </div>

        {/* Preference Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Tell us about your goals and interests</h2>
          
          {/* Career Goals */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="text-md font-medium text-gray-900">Career Goals</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {careerGoals.map(goal => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`px-3 py-2 text-sm rounded-full border transition-colors ${
                    selectedGoals.includes(goal)
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Skills of Interest */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              <h3 className="text-md font-medium text-gray-900">Skills You Want to Learn</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-2 text-sm rounded-full border transition-colors ${
                    selectedSkills.includes(skill)
                      ? 'bg-purple-100 text-purple-800 border-purple-300'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {(selectedGoals.length > 0 || selectedSkills.length > 0) && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Great! We'll find mentors who can help you with your selected goals and skills.
              </p>
            </div>
          )}
        </div>

        {/* Matched Mentors */}
        {(selectedGoals.length > 0 || selectedSkills.length > 0) && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Users className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Recommended Mentors</h2>
            </div>

            <div className="space-y-6">
              {matchedMentors.map(mentor => (
                <div key={mentor.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start space-x-6">
                    {/* Mentor Info */}
                    <div className="flex-1">
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                          <p className="text-sm text-gray-600">{mentor.title}</p>
                          <p className="text-sm text-blue-600 font-medium">{mentor.company}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{mentor.rating}</span>
                            <span className="text-sm text-gray-500">({mentor.sessions} sessions)</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">{mentor.bio}</p>

                      {/* Match Reasons */}
                      {mentor.matchReasons.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Why this mentor is a great match:</p>
                          <div className="flex flex-wrap gap-2">
                            {mentor.matchReasons.map((reason, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                              >
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {mentor.skills.map((skill, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs rounded-full ${
                                selectedSkills.includes(skill)
                                  ? 'bg-blue-100 text-blue-800 font-medium'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Match Score and AI Explanation */}
                    <div className="flex flex-col space-y-4">
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                          mentor.matchScore >= 80 ? 'bg-green-100' :
                          mentor.matchScore >= 60 ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          <span className={`text-lg font-bold ${
                            mentor.matchScore >= 80 ? 'text-green-800' :
                            mentor.matchScore >= 60 ? 'text-yellow-800' : 'text-gray-800'
                          }`}>
                            {mentor.matchScore}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">AI Match Score</p>
                      </div>
                      
                      <MatchExplanation 
                        explanations={mentor.matchExplanations}
                        matchScore={mentor.matchScore}
                      />
                      
                      <Button
                        onClick={() => handleBookSession(mentor)}
                        className="whitespace-nowrap"
                        disabled={mentor.matchScore < 20}
                      >
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(selectedGoals.length === 0 && selectedSkills.length === 0) && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select Your Goals and Interests</h3>
            <p className="text-gray-600">
              Choose your career goals and skills of interest to get personalized mentor recommendations.
            </p>
          </div>
        )}
      </div>
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        mentor={selectedMentor}
      />
    </div>
  );
};

export default SmartMatchmaking;
import { Sparkles, CheckCircle, Target, Lightbulb } from 'lucide-react';
import Modal from './Modal';

const AiNotesModal = ({ isOpen, onClose, session }) => {
  // Placeholder AI-generated content
  const aiSummary = {
    overview: `This mentorship session focused on ${session?.topic || 'career development'} with ${session?.mentorName || 'your mentor'}. The discussion covered practical insights, industry trends, and actionable strategies to help advance your career goals.`,
    keyConcepts: [
      'Industry best practices and current market trends',
      'Technical skills development and learning roadmap',
      'Networking strategies and professional growth',
      'Career trajectory planning and goal setting'
    ],
    takeaways: [
      'Focus on building a strong portfolio with real-world projects',
      'Develop both technical and soft skills for career advancement',
      'Leverage networking opportunities within your target industry',
      'Set clear short-term and long-term career milestones'
    ],
    actionItems: [
      'Complete the recommended online course within 2 weeks',
      'Update LinkedIn profile with new skills and projects',
      'Reach out to 3 industry professionals for informational interviews',
      'Schedule follow-up session to review progress'
    ]
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Session Summary" size="lg">
      <div className="space-y-6">
        {/* Header with AI Badge */}
        <div className="flex items-center space-x-2 text-purple-600 bg-purple-50 px-4 py-2 rounded-xl w-fit">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Generated Summary</span>
        </div>

        {/* Session Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-1">{session?.topic}</h4>
          <p className="text-sm text-gray-600">
            {new Date(session?.date).toLocaleDateString()} • {session?.time} • {session?.duration}
          </p>
        </div>

        {/* Overview */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            <span>Session Overview</span>
          </h4>
          <p className="text-gray-700 leading-relaxed">{aiSummary.overview}</p>
        </div>

        {/* Key Concepts */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>Key Concepts Covered</span>
          </h4>
          <ul className="space-y-2">
            {aiSummary.keyConcepts.map((concept, index) => (
              <li key={index} className="flex items-start space-x-3 text-gray-700">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Takeaways */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Important Takeaways</span>
          </h4>
          <ul className="space-y-2">
            {aiSummary.takeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start space-x-3 text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Items */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-500" />
            <span>Action Items</span>
          </h4>
          <ul className="space-y-2">
            {aiSummary.actionItems.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            This summary was generated using AI based on session metadata. For best results, review with your mentor.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AiNotesModal;

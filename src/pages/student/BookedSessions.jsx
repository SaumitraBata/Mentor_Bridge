import { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Star, Sparkles, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import AiNotesModal from '../../components/AiNotesModal';
import { useAuth } from '../../contexts/AuthContext';
import { useSession } from '../../contexts/SessionContext';
import { useToast } from '../../components/Toast';
import { useMentorshipBookings, useMentorshipSlots } from '../../hooks/useDatabase';

const BookedSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingNotes, setGeneratingNotes] = useState({});
  const [notesGenerated, setNotesGenerated] = useState({});
  const [selectedSession, setSelectedSession] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const { user } = useAuth();
  const { refreshTrigger } = useSession();
  const { getStudentBookings } = useMentorshipBookings();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadSessions();
  }, [user, refreshTrigger]);

  const loadSessions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await getStudentBookings(user.id);
      if (error) throw error;
      
      console.log('Raw booking data:', data);
      
      // Transform data to match expected format
      const transformedSessions = data?.map(booking => ({
        id: booking.id,
        mentorName: 'Alumni Mentor',
        company: 'Company',
        date: booking.mentorship_slots?.date || new Date().toISOString().split('T')[0],
        time: booking.mentorship_slots?.time || '14:00',
        duration: `${booking.mentorship_slots?.duration || 60} minutes`,
        topic: booking.topic || booking.mentorship_slots?.title || 'Mentorship Session',
        status: booking.mentorship_slots?.date && new Date(`${booking.mentorship_slots.date}T${booking.mentorship_slots.time}`) > new Date() ? 'upcoming' : 'completed',
        meetingLink: 'https://meet.google.com/demo-link'
      })) || [];
      
      console.log('Transformed sessions:', transformedSessions);
      setSessions(transformedSessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingSessions = sessions.filter(session => session.status === 'upcoming');
  const completedSessions = sessions.filter(session => session.status === 'completed');

  const getStatusColor = (status) => {
    return status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  // AI Notes handlers (placeholder logic for demo)
  const handleGenerateNotes = async (sessionId) => {
    setGeneratingNotes(prev => ({ ...prev, [sessionId]: true }));
    
    // Simulate AI processing
    setTimeout(() => {
      setGeneratingNotes(prev => ({ ...prev, [sessionId]: false }));
      setNotesGenerated(prev => ({ ...prev, [sessionId]: true }));
      addToast('AI Notes generated successfully', 'success');
    }, 1500);
  };

  const handleViewSummary = (session) => {
    setSelectedSession(session);
    setShowNotesModal(true);
  };

  const handleDownloadNotes = (session) => {
    // Generate dummy text file
    const content = `AI Session Notes\n\nSession: ${session.topic}\nMentor: ${session.mentorName}\nDate: ${new Date(session.date).toLocaleDateString()}\nTime: ${session.time}\n\n--- AI-Generated Summary ---\n\nThis mentorship session covered key insights and actionable strategies for career development.\n\nKey Takeaways:\n• Industry best practices and trends\n• Technical skills development\n• Networking strategies\n• Career planning\n\nAction Items:\n1. Complete recommended coursework\n2. Update professional profiles\n3. Network with industry professionals\n4. Schedule follow-up session`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${session.topic.replace(/\s+/g, '-').toLowerCase()}-ai-notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addToast('Notes downloaded successfully', 'success');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sessions</h1>
        <p className="text-gray-600">Manage your mentorship sessions</p>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map(session => (
              <div key={session.id} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {session.topic}
                    </h3>
                    <p className="text-gray-600 mb-3">with {session.mentorName}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{session.time} ({session.duration})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                    <Button size="sm" className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>Join Meeting</span>
                    </Button>
                  </div>
                </div>

                {/* AI Notes Section */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleGenerateNotes(session.id)}
                    disabled={generatingNotes[session.id] || notesGenerated[session.id]}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:scale-102 transition-transform shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {generatingNotes[session.id] ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span className="text-sm font-medium">Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {notesGenerated[session.id] ? 'Notes Generated' : 'Generate AI Notes'}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleViewSummary(session)}
                    disabled={!notesGenerated[session.id]}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:scale-102 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">View AI Summary</span>
                  </button>

                  <button
                    onClick={() => handleDownloadNotes(session)}
                    disabled={!notesGenerated[session.id]}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:scale-102 hover:border-green-400 hover:text-green-600 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Download Notes</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Calendar}
            title="No upcoming sessions"
            description="You don't have any sessions scheduled yet. Browse mentors to book your first session!"
            action={
              <Button onClick={() => navigate('/dashboard')}>
                Find Mentors
              </Button>
            }
          />
        )}
      </div>

      {/* Completed Sessions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Sessions</h2>
        {completedSessions.length > 0 ? (
          <div className="space-y-4">
            {completedSessions.map(session => (
              <div key={session.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {session.topic}
                    </h3>
                    <p className="text-gray-600 mb-3">with {session.mentorName}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{session.time} ({session.duration})</span>
                      </div>
                    </div>
                    
                    {session.feedback && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{session.feedback}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {session.rating && (
                      <div className="flex items-center space-x-1">
                        {[...Array(session.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                </div>

                {/* AI Notes Section */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleGenerateNotes(session.id)}
                    disabled={generatingNotes[session.id] || notesGenerated[session.id]}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:scale-102 transition-transform shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {generatingNotes[session.id] ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span className="text-sm font-medium">Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {notesGenerated[session.id] ? 'Notes Generated' : 'Generate AI Notes'}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleViewSummary(session)}
                    disabled={!notesGenerated[session.id]}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:scale-102 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">View AI Summary</span>
                  </button>

                  <button
                    onClick={() => handleDownloadNotes(session)}
                    disabled={!notesGenerated[session.id]}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:scale-102 hover:border-green-400 hover:text-green-600 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Download Notes</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Clock}
            title="No completed sessions yet"
            description="Your completed mentorship sessions will appear here after you attend them."
          />
        )}
      </div>

      {/* AI Notes Modal */}
      <AiNotesModal
        isOpen={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        session={selectedSession}
      />
    </div>
  );
};

export default BookedSessions;
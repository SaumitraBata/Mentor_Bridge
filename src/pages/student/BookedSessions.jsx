import { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Star } from 'lucide-react';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../contexts/AuthContext';
import { useMentorshipBookings, useMentorshipSlots } from '../../hooks/useDatabase';

const BookedSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getStudentBookings } = useMentorshipBookings();

  useEffect(() => {
    const loadSessions = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await getStudentBookings(user.id);
        if (error) throw error;
        
        // Transform data to match expected format
        const transformedSessions = data?.map(booking => ({
          id: booking.id,
          mentorName: booking.mentorship_slots?.alumni_profiles?.title || 'Alumni Mentor',
          company: booking.mentorship_slots?.alumni_profiles?.company || 'Company',
          date: booking.mentorship_slots?.date,
          time: booking.mentorship_slots?.time,
          duration: `${booking.mentorship_slots?.duration || 60} minutes`,
          topic: booking.topic || booking.mentorship_slots?.title,
          status: new Date(`${booking.mentorship_slots?.date}T${booking.mentorship_slots?.time}`) > new Date() ? 'upcoming' : 'completed',
          meetingLink: 'https://meet.google.com/demo-link'
        })) || [];
        
        setSessions(transformedSessions);
      } catch (error) {
        console.error('Error loading sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, [user]);

  const upcomingSessions = sessions.filter(session => session.status === 'upcoming');
  const completedSessions = sessions.filter(session => session.status === 'completed');

  const getStatusColor = (status) => {
    return status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
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
              <div key={session.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-start justify-between">
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
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Calendar}
            title="No upcoming sessions"
            description="You don't have any sessions scheduled yet. Browse mentors to book your first session!"
            action={
              <Button onClick={() => window.location.href = '/student/mentors'}>
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
              <div key={session.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
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
    </div>
  );
};

export default BookedSessions;
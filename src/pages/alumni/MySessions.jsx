import { useState, useEffect } from 'react';
import { Calendar, Clock, Video, User, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../contexts/AuthContext';
import { useMentorshipSlots } from '../../hooks/useDatabase';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getAlumniSlots } = useMentorshipSlots();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSessions = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await getAlumniSlots(user.id);
        if (error) throw error;
        
        // Transform data to match expected format
        const transformedSessions = data?.map(slot => ({
          id: slot.id,
          title: slot.title,
          date: slot.date,
          time: slot.time,
          duration: `${slot.duration} minutes`,
          capacity: slot.capacity,
          bookings: slot.mentorship_bookings || [],
          status: new Date(`${slot.date}T${slot.time}`) > new Date() ? 'upcoming' : 'completed'
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
        <p className="text-gray-600">Manage your mentorship sessions with students</p>
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
                      {session.title}
                    </h3>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{session.time} ({session.duration})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{session.bookings.length}/{session.capacity} booked</span>
                      </div>
                    </div>
                    
                    {session.bookings.length > 0 && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-900 mb-2">Booked by:</p>
                        {session.bookings.map((booking, index) => (
                          <div key={index} className="text-sm text-blue-800">
                            Student #{index + 1} - Topic: {booking.topic || 'General mentorship'}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                    <Button size="sm" className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>Start Meeting</span>
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
            description="Create mentorship slots to allow students to book sessions with you"
            action={
              <Button onClick={() => navigate('/dashboard')}>
                Create Slot
              </Button>
            }
          />
        )}
      </div>

      {/* Completed Sessions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Sessions</h2>
        <div className="space-y-4">
          {completedSessions.map(session => (
            <div key={session.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {session.topic}
                  </h3>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{session.studentName}</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-600">
                      {session.studentYear}, {session.studentMajor}
                    </span>
                  </div>
                  
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
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Student Feedback:</p>
                      <p className="text-sm text-gray-700">{session.feedback}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  {session.rating && (
                    <div className="flex items-center space-x-1">
                      {[...Array(session.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({session.rating}/5)</span>
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

        {completedSessions.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No completed sessions yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySessions;
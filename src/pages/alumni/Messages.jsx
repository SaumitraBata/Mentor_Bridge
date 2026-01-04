import { useState, useEffect } from 'react';
import { Search, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      loadStudents();
    }
  }, [user]);

  useEffect(() => {
    if (selectedStudent) {
      loadMessages();
      
      const subscription = supabase
        .channel('messages')
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `receiver_id=eq.${user.id}`
          }, 
          (payload) => {
            if (payload.new.sender_id === selectedStudent.id) {
              setMessages(prev => [...prev, payload.new]);
            }
          }
        )
        .subscribe();
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [selectedStudent, user.id]);

  const loadStudents = async () => {
    try {
      const { data: bookings, error } = await supabase
        .from('mentorship_bookings')
        .select(`
          student_id,
          topic,
          mentorship_slots!inner(alumni_id)
        `)
        .eq('mentorship_slots.alumni_id', user.id);
      
      if (error) throw error;

      const studentIds = [...new Set(bookings?.map(b => b.student_id) || [])];
      
      if (studentIds.length === 0) {
        setConversations([]);
        return;
      }

      const studentsData = await Promise.all(
        studentIds.map(async (studentId) => {
          const { data: profileData } = await supabase
            .from('user_profiles')
            .select('name')
            .eq('user_id', studentId)
            .maybeSingle();
          
          const booking = bookings.find(b => b.student_id === studentId);
          
          return {
            id: studentId,
            name: profileData?.name || 'Student',
            topic: booking?.topic
          };
        })
      );

      setConversations(studentsData);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    if (!selectedStudent) return;
    
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedStudent.id}),and(sender_id.eq.${selectedStudent.id},receiver_id.eq.${user.id})`)
      .order('created_at', { ascending: true });
    
    if (!error) {
      setMessages(data || []);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedStudent) return;
    
    const { data, error } = await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: selectedStudent.id,
      content: messageText
    }).select().single();
    
    if (!error && data) {
      setMessages([...messages, data]);
    }
    
    setMessageText('');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with your mentees</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: '600px' }}>
        <div className="flex h-full">
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : conversations.length > 0 ? (
                conversations.map(student => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedStudent?.id === student.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {student.name || 'Student'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Click to start chatting
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No students have booked sessions yet</div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">{selectedStudent?.name || 'Select a student'}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedStudent ? (
                messages.length > 0 ? (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-xs lg:max-w-md">
                        <div className={`rounded-lg px-4 py-2 ${msg.sender_id === user.id ? 'bg-blue-600' : 'bg-gray-100'}`}>
                          <p className={`text-sm ${msg.sender_id === user.id ? 'text-white' : 'text-gray-900'}`}>
                            {msg.content}
                          </p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${msg.sender_id === user.id ? 'text-right' : ''}`}>
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Start chatting with {selectedStudent.name}
                  </div>
                )
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Select a student to start chatting
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  disabled={!selectedStudent}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!selectedStudent || !messageText.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

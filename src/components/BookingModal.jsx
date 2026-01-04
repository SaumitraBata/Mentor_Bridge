import { useState, useEffect } from 'react';
import { Calendar, Clock, Star, User } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { useToast } from './Toast';
import { useMentorshipSlots, useMentorshipBookings } from '../hooks/useDatabase';
import { useAuth } from '../contexts/AuthContext';

const BookingModal = ({ isOpen, onClose, mentor, onBookingSuccess }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { user } = useAuth();
  const { getAvailableSlots } = useMentorshipSlots();
  const { createBooking } = useMentorshipBookings();

  useEffect(() => {
    if (isOpen && mentor) {
      loadSlots();
    }
  }, [isOpen, mentor]);

  const loadSlots = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAvailableSlots();
      if (error) throw error;
      
      console.log('All slots:', data);
      console.log('Mentor user_id:', mentor.user_id);
      
      // Filter slots for this specific mentor
      const mentorSlots = data?.filter(slot => slot.alumni_id === mentor.user_id) || [];
      console.log('Filtered mentor slots:', mentorSlots);
      setAvailableSlots(mentorSlots);
    } catch (error) {
      console.error('Error loading slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || !topic || !user) {
      addToast('Please select a time slot and enter a topic', 'error');
      return;
    }

    setIsBooking(true);
    
    try {
      const { error } = await createBooking({
        student_id: user.id,
        slot_id: selectedSlot,
        topic,
        message
      });
      
      if (error) throw error;
      
      addToast(`Session booked with ${mentor?.name}! You'll receive a confirmation email shortly.`, 'success');
      
      if (onBookingSuccess) onBookingSuccess();
      
      onClose();
      setSelectedSlot('');
      setTopic('');
      setMessage('');
    } catch (error) {
      console.error('Booking error:', error);
      addToast('Error booking session. Please try again.', 'error');
    } finally {
      setIsBooking(false);
    }
  };

  if (!mentor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Mentorship Session" size="lg">
      <div className="space-y-6">
        {/* Mentor Info */}
        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">{mentor.name}</h4>
            <p className="text-sm text-gray-600">{mentor.title}</p>
            <p className="text-sm text-blue-600 font-medium">{mentor.company}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{mentor.rating}</span>
              <span className="text-sm text-gray-500">({mentor.sessions} sessions)</span>
            </div>
          </div>
        </div>

        {/* Available Slots */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Available Time Slot *
          </label>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
              {availableSlots.map((slot) => (
                <label
                  key={slot.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedSlot === slot.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot.id}
                    checked={selectedSlot === slot.id}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{slot.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(slot.date).toLocaleDateString()} at {slot.time} ({slot.duration} min)
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No available slots. This mentor hasn't created any slots yet.</p>
          )}
        </div>

        {/* Session Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Topic *
          </label>
          <input
            type="text"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., React best practices, Career advice, System design"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Additional Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Message (Optional)
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any specific questions or topics you'd like to discuss..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Session Details */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-blue-900 mb-2">Session Details</h5>
          <div className="space-y-1 text-sm text-blue-800">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Duration: 60 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Format: 1-on-1 video call</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose} disabled={isBooking}>
            Cancel
          </Button>
          <Button 
            onClick={handleBooking} 
            disabled={isBooking || !selectedSlot || !topic}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBooking ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;
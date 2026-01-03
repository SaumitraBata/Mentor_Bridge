import { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, X } from 'lucide-react';
import Button from '../../components/Button';
import { useToast } from '../../components/Toast';
import { useAuth } from '../../contexts/AuthContext';
import { useMentorshipSlots } from '../../hooks/useDatabase';

const CreateMentorshipSlot = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 60,
    capacity: 1,
    topics: [],
    availableSlots: []
  });

  const [newTopic, setNewTopic] = useState('');
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();
  const { user } = useAuth();
  const { createSlot } = useMentorshipSlots();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || formData.availableSlots.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      // Create multiple slots for each date/time combination
      for (const slot of formData.availableSlots) {
        const slotData = {
          alumni_id: user.id,
          title: formData.title,
          description: formData.description,
          date: slot.date,
          time: slot.time,
          duration: formData.duration,
          capacity: formData.capacity,
          topics: formData.topics
        };
        
        const { error } = await createSlot(slotData);
        if (error) throw error;
      }
      
      addToast('Mentorship slots created successfully! Students can now book sessions with you.', 'success');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        duration: 60,
        capacity: 1,
        topics: [],
        availableSlots: []
      });
    } catch (error) {
      console.error('Error creating slots:', error);
      addToast('Error creating mentorship slots. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTopic = () => {
    if (newTopic && !formData.topics.includes(newTopic)) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, newTopic]
      }));
      setNewTopic('');
    }
  };

  const removeTopic = (topicToRemove) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(topic => topic !== topicToRemove)
    }));
  };

  const addSlot = () => {
    if (newSlot.date && newSlot.time) {
      setFormData(prev => ({
        ...prev,
        availableSlots: [...prev.availableSlots, { ...newSlot, id: Date.now() }]
      }));
      setNewSlot({ date: '', time: '' });
    }
  };

  const removeSlot = (slotId) => {
    setFormData(prev => ({
      ...prev,
      availableSlots: prev.availableSlots.filter(slot => slot.id !== slotId)
    }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Mentorship Slot</h1>
        <p className="text-gray-600">Set up your availability for mentoring students</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., React Development Q&A"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes) *
              </label>
              <select
                required
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what you'll cover in this mentorship session..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Topics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topics Covered
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center space-x-2"
                >
                  <span>{topic}</span>
                  <button
                    type="button"
                    onClick={() => removeTopic(topic)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Add a topic..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTopic();
                  }
                }}
              />
              <Button type="button" onClick={addTopic} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Max Students */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Students per Session
            </label>
            <select
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
              className="w-full md:w-48 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>1 student (1-on-1)</option>
              <option value={2}>2 students</option>
              <option value={3}>3 students</option>
              <option value={4}>4 students</option>
              <option value={5}>5 students</option>
            </select>
          </div>

          {/* Available Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Time Slots *
            </label>
            
            {/* Existing Slots */}
            {formData.availableSlots.length > 0 && (
              <div className="mb-4 space-y-2">
                {formData.availableSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">
                        {new Date(slot.date).toLocaleDateString()} at {slot.time}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSlot(slot.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Slot */}
            <div className="flex space-x-2">
              <input
                type="date"
                value={newSlot.date}
                onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="time"
                value={newSlot.time}
                onChange={(e) => setNewSlot(prev => ({ ...prev, time: e.target.value }))}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button type="button" onClick={addSlot} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {formData.availableSlots.length === 0 && (
              <p className="text-sm text-red-600 mt-1">Please add at least one available time slot</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button type="button" variant="secondary" disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || formData.availableSlots.length === 0}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Mentorship Slot'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMentorshipSlot;
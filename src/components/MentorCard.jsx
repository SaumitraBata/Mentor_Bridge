import { useState } from 'react';
import { Star, Clock, Users, Award } from 'lucide-react';
import Button from './Button';
import BookingModal from './BookingModal';

const MentorCard = ({ mentor }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-card-bg rounded-2xl shadow-soft p-6 hover-lift transition-all duration-220 border border-border animate-fade-in">
        <div className="flex items-start space-x-5">
          <div className="relative">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-soft"
            />
            {mentor.matchScore && mentor.matchScore > 80 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-text-primary mb-1">{mentor.name}</h3>
            <p className="text-text-muted font-medium mb-1">{mentor.title}</p>
            <p className="text-accent font-semibold">{mentor.company}</p>
          </div>
          <div className="flex items-center space-x-2 bg-warning/10 px-3 py-2 rounded-xl border border-warning/20">
            <Star className="w-4 h-4 text-warning fill-current" />
            <span className="text-sm font-semibold text-warning">{mentor.rating}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-text-muted leading-relaxed mb-4">{mentor.bio}</p>
          
          <div className="flex items-center space-x-6 text-sm text-text-muted mb-5">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="font-medium">{mentor.experience}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-medium">{mentor.sessions} sessions</span>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm font-semibold text-text-primary mb-3">Expertise:</p>
            <div className="flex flex-wrap gap-2">
              {mentor.skills?.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-xl border border-accent/20 animate-stagger"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {skill}
                </span>
              ))}
              {mentor.skills?.length > 4 && (
                <span className="px-3 py-1.5 bg-background text-text-muted text-xs font-medium rounded-xl border border-border">
                  +{mentor.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
          
          {mentor.matchScore && (
            <div className="mb-4 p-3 bg-success/10 rounded-xl border border-success/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-success">Match Score</span>
                <span className="text-lg font-bold text-success">{mentor.matchScore}%</span>
              </div>
            </div>
          )}
          
          <Button
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full py-3 font-semibold"
            variant="accent"
          >
            Book Session
          </Button>
        </div>
      </div>
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        mentor={mentor}
      />
    </>
  );
};

export default MentorCard;
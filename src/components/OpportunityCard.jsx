import { MapPin, Calendar, Building, ExternalLink } from 'lucide-react';
import Button from './Button';

const OpportunityCard = ({ opportunity }) => {
  const getTypeColor = (type) => {
    const colors = {
      'Internship': 'bg-success/10 text-success border-success/20',
      'Fellowship': 'bg-primary/10 text-primary border-primary/20',
      'Research': 'bg-accent/10 text-accent border-accent/20',
      'Job': 'bg-warning/10 text-warning border-warning/20'
    };
    return colors[type] || 'bg-background text-text-muted border-border';
  };

  return (
    <div className="bg-card-bg rounded-2xl shadow-soft overflow-hidden hover-lift transition-all duration-220 border border-border animate-fade-in">
      <div className="relative">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 text-xs font-semibold rounded-xl border ${getTypeColor(opportunity.type)}`}>
            {opportunity.type}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-text-primary mb-2 leading-tight">
            {opportunity.title}
          </h3>
          <div className="flex items-center space-x-2 text-text-muted">
            <Building className="w-4 h-4 text-accent" />
            <span className="font-medium">{opportunity.company}</span>
          </div>
        </div>
        
        <p className="text-text-muted mb-6 leading-relaxed line-clamp-3">
          {opportunity.description}
        </p>
        
        <div className="flex flex-col space-y-3 text-sm text-text-muted mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-medium">{opportunity.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-warning flex-shrink-0" />
            <span className="font-medium">Due: {new Date(opportunity.deadline).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm font-semibold text-text-primary mb-3">Requirements:</p>
          <div className="flex flex-wrap gap-2">
            {opportunity.requirements?.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-background text-text-muted text-xs font-medium rounded-xl border border-border animate-stagger"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {req}
              </span>
            ))}
            {opportunity.requirements?.length > 3 && (
              <span className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-xl border border-accent/20">
                +{opportunity.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-text-muted">
            <span className="font-medium">Posted by</span>
            <div className="text-accent font-semibold">{opportunity.postedBy}</div>
          </div>
          <Button 
            size="sm" 
            variant="accent"
            className="flex items-center space-x-2 font-semibold"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
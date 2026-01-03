const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = '' 
}) => (
  <div className={`text-center py-16 animate-fade-in ${className}`}>
    <div className="bg-background rounded-2xl p-8 max-w-md mx-auto">
      {Icon && (
        <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent/20">
          <Icon className="w-10 h-10 text-accent" />
        </div>
      )}
      <h3 className="text-2xl font-semibold text-text-primary mb-3">{title}</h3>
      {description && (
        <p className="text-text-muted mb-8 leading-relaxed">{description}</p>
      )}
      {action && (
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          {action}
        </div>
      )}
    </div>
  </div>
);

export default EmptyState;

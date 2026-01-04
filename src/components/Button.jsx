const Button = ({ children, variant = 'primary', size = 'md', className = '', disabled = false, loading = false, ...props }) => {
  const baseClasses = 'font-medium rounded-xl transition-all duration-220 focus:outline-none focus-ring hover-scale disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-soft',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-soft',
    accent: 'bg-accent text-white hover:bg-accent/90 shadow-soft',
    success: 'bg-success text-white hover:bg-success/90 shadow-soft',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-text-primary hover:bg-primary/5',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-soft'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm h-9',
    md: 'px-6 py-3 text-sm h-11',
    lg: 'px-8 py-4 text-base h-12'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      <div className="flex items-center justify-center min-h-screen px-6 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-all duration-280 modal-backdrop"
          onClick={onClose}
        />
        
        <div className={`inline-block w-full ${sizeClasses[size]} p-8 my-8 overflow-hidden text-left align-middle transition-all duration-280 transform bg-card-bg shadow-lift rounded-2xl border border-border animate-scale-in`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-text-primary">{title}</h3>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-all duration-220 hover-scale p-2 rounded-xl hover:bg-background"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
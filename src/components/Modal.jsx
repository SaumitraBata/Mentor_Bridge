import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280);
  };

  if (!isOpen && !isClosing) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-lg',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        />
        
        <div className={`relative w-full ${sizeClasses[size]} bg-card-bg rounded-2xl border border-border z-10 my-8 transition-all duration-280 ${isClosing ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}
          style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card-bg rounded-t-2xl">
            <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
            <button
              onClick={handleClose}
              className="text-text-muted hover:text-text-primary hover:bg-background transition-all duration-200 p-2 rounded-xl hover:scale-105 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
import { createContext, useContext, useState } from 'react';
import { CheckCircle, XCircle, X, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getToastStyles = (type) => {
    const styles = {
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        border: 'border-success/20',
        icon: CheckCircle
      },
      error: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: XCircle
      },
      info: {
        bg: 'bg-accent/10',
        text: 'text-accent',
        border: 'border-accent/20',
        icon: Info
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        border: 'border-warning/20',
        icon: AlertTriangle
      }
    };
    return styles[type] || styles.success;
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-6 right-6 z-50 space-y-3">
        {toasts.map((toast, index) => {
          const style = getToastStyles(toast.type);
          const Icon = style.icon;
          
          return (
            <div
              key={toast.id}
              className={`flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-lift backdrop-blur-sm max-w-sm animate-slide-up border ${style.bg} ${style.text} ${style.border}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-text-muted hover:text-text-primary transition-colors duration-220 hover-scale"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
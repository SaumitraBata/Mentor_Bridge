import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, Lock, User, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, userRole, signIn, signUp } = useAuth();
  const { addToast } = useToast();

  // Redirect if already authenticated
  if (user && userRole) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await signIn(email, password);
        if (error) throw error;
        addToast('Welcome back!', 'success');
      } else {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        const { data, error } = await signUp(email, password, selectedRole, { name });
        if (error) throw error;
        addToast('Account created successfully! Please check your email to verify your account.', 'success');
      }
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10 flex items-center justify-center p-6 page-transition">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center shadow-soft">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-text-primary">AlumBridge</h1>
          </div>
          <p className="text-text-muted text-lg">
            {isLogin ? 'Welcome back to your journey' : 'Begin your mentorship journey'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-card-bg rounded-2xl shadow-lift p-8 border border-border animate-scale-in">
          <div className="flex mb-8 bg-background rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-220 ${
                isLogin
                  ? 'bg-card-bg text-text-primary shadow-soft'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-220 ${
                !isLogin
                  ? 'bg-card-bg text-text-primary shadow-soft'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="animate-slide-up">
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus-ring bg-background transition-all duration-220"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div className="animate-stagger">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus-ring bg-background transition-all duration-220"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="animate-stagger" style={{ animationDelay: '100ms' }}>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus-ring bg-background transition-all duration-220"
                  placeholder="Enter your password"
                  minLength={6}
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="animate-stagger" style={{ animationDelay: '200ms' }}>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus-ring bg-background transition-all duration-220"
                      placeholder="Confirm your password"
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="animate-stagger" style={{ animationDelay: '300ms' }}>
                  <label className="block text-sm font-semibold text-text-primary mb-4">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('student')}
                      className={`flex flex-col items-center p-6 border-2 rounded-2xl transition-all duration-220 hover-lift ${
                        selectedRole === 'student'
                          ? 'border-accent bg-accent/10 text-accent shadow-soft'
                          : 'border-border hover:border-accent/50 bg-background'
                      }`}
                    >
                      <GraduationCap className="w-10 h-10 mb-3" />
                      <span className="font-semibold">Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('alumni')}
                      className={`flex flex-col items-center p-6 border-2 rounded-2xl transition-all duration-220 hover-lift ${
                        selectedRole === 'alumni'
                          ? 'border-primary bg-primary/10 text-primary shadow-soft'
                          : 'border-border hover:border-primary/50 bg-background'
                      }`}
                    >
                      <Briefcase className="w-10 h-10 mb-3" />
                      <span className="font-semibold">Alumni</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="w-full mt-8 py-4 text-base font-semibold animate-stagger"
              style={{ animationDelay: '400ms' }}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center animate-stagger" style={{ animationDelay: '500ms' }}>
            <p className="text-text-muted">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent hover:text-accent/80 font-semibold transition-colors duration-220"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
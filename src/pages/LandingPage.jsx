import { useNavigate } from 'react-router-dom';
import { Users, Target, MessageCircle, Star, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { testimonials } from '../data/dummyData';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = (role) => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Header */}
      <header className="bg-card-bg shadow-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary">AlumBridge</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              {['How it Works', 'Benefits', 'Testimonials'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-text-muted hover:text-text-primary transition-colors duration-220 font-medium animate-stagger"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-95"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="text-center text-white">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in leading-tight">
              Connect. Learn.
              <span className="block text-accent">Grow.</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up opacity-90">
              Bridge the gap between students and alumni through meaningful mentorship and career opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Button
                size="lg"
                variant="accent"
                onClick={() => handleGetStarted('student')}
                className="text-lg px-8 py-4 shadow-lift"
              >
                I'm a Student
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleGetStarted('alumni')}
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                I'm an Alumni
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-card-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <h3 className="text-4xl font-bold text-text-primary mb-6">How it Works</h3>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Simple steps to connect students with experienced alumni for mentorship and opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Users, title: 'Create Profile', desc: 'Set up your profile with skills, interests, and goals', color: 'accent' },
              { icon: Target, title: 'Smart Matching', desc: 'Get matched with mentors based on your goals and interests', color: 'primary' },
              { icon: MessageCircle, title: 'Connect & Grow', desc: 'Schedule sessions and discover opportunities', color: 'success' }
            ].map((step, index) => (
              <div key={step.title} className="text-center animate-stagger hover-lift" style={{ animationDelay: `${index * 150}ms` }}>
                <div className={`bg-${step.color}/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-${step.color}/20`}>
                  <step.icon className={`w-10 h-10 text-${step.color}`} />
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-text-primary">{step.title}</h4>
                <p className="text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <h3 className="text-4xl font-bold text-text-primary mb-6">Why Choose AlumBridge?</h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="bg-card-bg rounded-2xl p-8 shadow-soft hover-lift animate-stagger">
              <h4 className="text-3xl font-bold text-text-primary mb-8 flex items-center">
                <span className="w-3 h-3 bg-accent rounded-full mr-4"></span>
                For Students
              </h4>
              <ul className="space-y-6">
                {[
                  'Get personalized career guidance from industry professionals',
                  'Access exclusive internship and job opportunities',
                  'Build your professional network early',
                  'Learn from real-world experiences and insights'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-4 animate-stagger" style={{ animationDelay: `${index * 100}ms` }}>
                    <ArrowRight className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span className="text-text-muted leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-card-bg rounded-2xl p-8 shadow-soft hover-lift animate-stagger" style={{ animationDelay: '200ms' }}>
              <h4 className="text-3xl font-bold text-text-primary mb-8 flex items-center">
                <span className="w-3 h-3 bg-primary rounded-full mr-4"></span>
                For Alumni
              </h4>
              <ul className="space-y-6">
                {[
                  'Give back to your alma mater and help the next generation',
                  'Expand your professional network',
                  'Develop leadership and mentoring skills',
                  'Stay connected with your university community'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-4 animate-stagger" style={{ animationDelay: `${index * 100 + 300}ms` }}>
                    <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-text-muted leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-card-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <h3 className="text-4xl font-bold text-text-primary mb-6">What Our Users Say</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-background rounded-2xl p-8 shadow-soft hover-lift animate-stagger" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning fill-current" />
                  ))}
                </div>
                <p className="text-text-muted mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-xl object-cover shadow-soft"
                  />
                  <div>
                    <p className="font-semibold text-text-primary">{testimonial.name}</p>
                    <p className="text-sm text-text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold">AlumBridge</h3>
            </div>
            <p className="text-white/80 mb-12 text-lg">Connecting students and alumni for a brighter future</p>
            <div className="flex justify-center space-x-12 mb-12">
              {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((link, index) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-white/70 hover:text-white transition-colors duration-220 font-medium animate-stagger"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link}
                </a>
              ))}
            </div>
            <p className="text-white/60">&copy; 2024 AlumBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
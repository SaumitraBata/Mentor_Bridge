import { useState, useEffect } from 'react';
import { Search, Filter, Brain, Sparkles } from 'lucide-react';
import MentorCard from '../../components/MentorCard';
import MatchExplanation from '../../components/MatchExplanation';
import RecommendedOpportunities from '../../components/RecommendedOpportunities';
import { MentorCardSkeleton } from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import { Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAlumniProfile, useStudentProfile, useOpportunities } from '../../hooks/useDatabase';
import { calculateMatchScore } from '../../utils/matchingAlgorithm';

const RecommendedMentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mentorData, setMentorData] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [showAIInsights, setShowAIInsights] = useState(true);
  
  const { user } = useAuth();
  const { getAllAlumni } = useAlumniProfile();
  const { getProfile } = useStudentProfile();
  const { getAllOpportunities } = useOpportunities();

  const domains = ['All', 'Software Engineering', 'Product Management', 'Data Science'];

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      try {
        // Load student profile
        const { data: profile } = await getProfile(user.id);
        setStudentProfile(profile);
        
        // Load alumni profiles
        const { data: alumni, error: alumniError } = await getAllAlumni();
        console.log('Alumni from DB:', alumni, 'Error:', alumniError);
        
        // Load opportunities
        const { data: opps } = await getAllOpportunities();
        setOpportunities(opps || []);
        
        // Dummy mentors
        const dummyMentors = [
          {
            user_id: 'dummy-1',
            title: 'Senior Software Engineer',
            company: 'Google',
            domain: 'Software Engineering',
            experience: '5 years',
            skills: ['React', 'Node.js', 'System Design', 'JavaScript', 'Python'],
            expertise: ['Web Development', 'System Architecture'],
            bio: 'Passionate about mentoring junior developers and sharing knowledge about modern web technologies.'
          },
          {
            user_id: 'dummy-2',
            title: 'Product Manager',
            company: 'Microsoft',
            domain: 'Product Management',
            experience: '7 years',
            skills: ['Product Strategy', 'User Research', 'Analytics'],
            expertise: ['Product Management', 'Strategy'],
            bio: 'Helping students transition into product management roles with hands-on experience.'
          },
          {
            user_id: 'dummy-3',
            title: 'Data Scientist',
            company: 'Amazon',
            domain: 'Data Science',
            experience: '4 years',
            skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
            expertise: ['Data Science', 'Machine Learning'],
            bio: 'Specializing in ML systems and helping students break into data science.'
          },
          {
            user_id: 'dummy-4',
            title: 'Frontend Engineer',
            company: 'Meta',
            domain: 'Software Engineering',
            experience: '6 years',
            skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
            expertise: ['Frontend Development', 'UI/UX'],
            bio: 'Frontend specialist who loves creating beautiful user experiences.'
          },
          {
            user_id: 'dummy-5',
            title: 'iOS Developer',
            company: 'Apple',
            domain: 'Mobile Development',
            experience: '8 years',
            skills: ['Swift', 'iOS', 'UIKit', 'SwiftUI'],
            expertise: ['Mobile Apps', 'iOS Development'],
            bio: 'iOS developer with a passion for creating delightful mobile experiences.'
          }
        ];
        
        // Combine real alumni with dummy data
        const alumniData = [...(alumni || []), ...dummyMentors];
        
        if (alumniData) {
          // Use profile if available, otherwise use default
          const studentData = profile || {
            skills: ['JavaScript', 'Python', 'React'],
            interests: ['Web Development', 'Software Engineering'],
            goals: ['Get internship', 'Learn new skills']
          };
          
          // Calculate match scores
          const mentorsWithScores = alumniData.map((mentor, idx) => {
            const matchResult = calculateMatchScore(studentData, mentor);
            const mentorName = mentor.title || 'Alumni';
            return {
              ...mentor,
              id: mentor.user_id,
              name: mentorName,
              image: `https://ui-avatars.com/api/?name=${encodeURIComponent(mentorName)}&background=random&size=150&bold=true`,
              rating: 4.8,
              sessions: Math.floor(Math.random() * 50) + 10,
              matchScore: matchResult.score,
              matchExplanations: matchResult.explanations,
              matchingSkills: matchResult.matchingSkills,
              availability: ['Mon 6-8 PM', 'Wed 7-9 PM']
            };
          }).sort((a, b) => b.matchScore - a.matchScore);
          
          setMentorData(mentorsWithScores);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  const filteredMentors = mentorData.filter(mentor => {
    const matchesSearch = mentor.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDomain = selectedDomain === '' || selectedDomain === 'All' || mentor.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="page-transition">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-text-primary">AI-Powered Mentors</h1>
            </div>
            <p className="text-xl text-text-muted leading-relaxed">Personalized matches based on your profile and goals</p>
          </div>
          <button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border transition-all duration-220 hover-scale animate-slide-up ${
              showAIInsights 
                ? 'bg-primary/10 border-primary/20 text-primary shadow-soft' 
                : 'bg-background border-border text-text-muted hover:border-primary/20'
            }`}
          >
            <Brain className="w-5 h-5" />
            <span className="font-semibold">AI Insights</span>
          </button>
        </div>
      </div>

      {/* AI Recommendations */}
      {showAIInsights && studentProfile && (
        <div className="mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <RecommendedOpportunities 
            student={studentProfile} 
            opportunities={opportunities} 
            maxItems={2}
          />
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-card-bg rounded-2xl shadow-soft p-8 mb-10 border border-border animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search mentors by name or skills..."
              className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus-ring bg-background transition-all duration-220 text-text-primary placeholder-text-muted"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-text-muted" />
            <select
              className="border border-border rounded-xl px-4 py-4 focus-ring bg-background transition-all duration-220 text-text-primary min-w-[200px]"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              {domains.map(domain => (
                <option key={domain} value={domain === 'All' ? '' : domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid lg:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-stagger" style={{ animationDelay: `${i * 100}ms` }}>
              <MentorCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {/* Mentors Grid */}
      {!isLoading && filteredMentors.length > 0 && (
        <div className="space-y-8">
          {filteredMentors.map((mentor, index) => (
            <div key={mentor.id} className="bg-card-bg rounded-2xl shadow-soft p-8 border border-border animate-stagger" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-start space-x-8">
                <div className="flex-1">
                  <MentorCard mentor={mentor} />
                </div>
                
                {showAIInsights && mentor.matchScore > 0 && (
                  <div className="w-96 animate-slide-up" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                    <MatchExplanation 
                      explanations={mentor.matchExplanations}
                      matchScore={mentor.matchScore}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredMentors.length === 0 && (
        <EmptyState
          icon={Users}
          title="No mentors found"
          description="Try adjusting your search terms or filters to find mentors that match your interests."
        />
      )}
    </div>
  );
};

export default RecommendedMentors;
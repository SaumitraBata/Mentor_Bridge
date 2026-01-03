import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowLeft, Briefcase, Sparkles } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { opportunities } from '../data/dummyData';

const OpportunityFeed = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const domains = ['All', 'Software Engineering', 'Product Management', 'Data Science'];
  const types = ['All', 'Internship', 'Fellowship', 'Research', 'Job'];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === '' || selectedDomain === 'All' || opportunity.domain === selectedDomain;
    const matchesType = selectedType === '' || selectedType === 'All' || opportunity.type === selectedType;
    return matchesSearch && matchesDomain && matchesType;
  });

  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Header */}
      <header className="bg-card-bg shadow-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-6 animate-fade-in">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 hover:bg-background"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-text-primary">Opportunity Feed</h1>
              </div>
            </div>
            <nav className="flex space-x-3 animate-slide-up">
              <Button variant="outline" onClick={() => navigate('/dashboard')} className="hover-scale">
                Dashboard
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="mb-10 animate-fade-in">
          <p className="text-xl text-text-muted leading-relaxed">Discover internships, jobs, and research opportunities from our alumni network</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card-bg rounded-2xl shadow-soft p-8 mb-10 border border-border animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Search opportunities by title or company..."
                className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus-ring bg-background transition-all duration-220 text-text-primary placeholder-text-muted"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-text-muted" />
              <select
                className="border border-border rounded-xl px-4 py-4 focus-ring bg-background transition-all duration-220 text-text-primary min-w-[180px]"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                {domains.map(domain => (
                  <option key={domain} value={domain === 'All' ? '' : domain}>
                    {domain}
                  </option>
                ))}
              </select>
              <select
                className="border border-border rounded-xl px-4 py-4 focus-ring bg-background transition-all duration-220 text-text-primary min-w-[140px]"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type === 'All' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <p className="text-text-muted font-medium">
              Showing <span className="text-text-primary font-semibold">{filteredOpportunities.length}</span> opportunities
            </p>
          </div>
        </div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredOpportunities.map((opportunity, index) => (
              <div key={opportunity.id} className="animate-stagger" style={{ animationDelay: `${index * 100}ms` }}>
                <OpportunityCard opportunity={opportunity} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredOpportunities.length === 0 && (
          <EmptyState
            icon={Briefcase}
            title="No opportunities found"
            description="Try adjusting your search terms or filters to discover more opportunities that match your interests."
            action={
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDomain('');
                  setSelectedType('');
                }}
                variant="accent"
                className="mt-4"
              >
                Clear Filters
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default OpportunityFeed;
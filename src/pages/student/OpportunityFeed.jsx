import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import OpportunityCard from '../../components/OpportunityCard';
import { OpportunityCardSkeleton } from '../../components/Skeleton';
import EmptyState from '../../components/EmptyState';
import { Briefcase } from 'lucide-react';
import { opportunities } from '../../data/dummyData';

const OpportunityFeed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [opportunityData, setOpportunityData] = useState([]);

  const domains = ['All', 'Software Engineering', 'Product Management', 'Data Science'];
  const types = ['All', 'Internship', 'Fellowship', 'Research', 'Job'];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setOpportunityData(opportunities);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredOpportunities = opportunityData.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === '' || selectedDomain === 'All' || opportunity.domain === selectedDomain;
    const matchesType = selectedType === '' || selectedType === 'All' || opportunity.type === selectedType;
    return matchesSearch && matchesDomain && matchesType;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Opportunity Feed</h1>
        <p className="text-gray-600">Discover internships, jobs, and research opportunities</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search opportunities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {/* Loading State */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <OpportunityCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Opportunities Grid */}
      {!isLoading && filteredOpportunities.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map(opportunity => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredOpportunities.length === 0 && (
        <EmptyState
          icon={Briefcase}
          title="No opportunities found"
          description="Try adjusting your search terms or filters to find opportunities that match your interests."
        />
      )}
    </div>
  );
};

export default OpportunityFeed;
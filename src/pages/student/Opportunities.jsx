import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useOpportunities } from '../../hooks/useDatabase';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllOpportunities } = useOpportunities();

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      const { data } = await getAllOpportunities();
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error loading opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Opportunities</h1>
        <p className="text-gray-600">Explore internships, jobs, and research positions posted by alumni</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : opportunities.length > 0 ? (
        <div className="grid gap-6">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{opp.title}</h3>
                  <p className="text-lg text-blue-600 font-medium mb-2">{opp.company}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {opp.type}
                    </span>
                    {opp.location && (
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {opp.location}
                      </span>
                    )}
                    {opp.deadline && (
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Deadline: {new Date(opp.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {opp.domain}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{opp.description}</p>

              {opp.requirements && opp.requirements.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {opp.requirements.map((req, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {opp.application_link && (
                <a
                  href={opp.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No opportunities available yet</p>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
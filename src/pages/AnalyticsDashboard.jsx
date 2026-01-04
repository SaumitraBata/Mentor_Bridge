import { TrendingUp, Users, Briefcase, Target, Brain } from 'lucide-react';
import { generateAnalytics } from '../utils/matchingAlgorithm';

const AnalyticsDashboard = () => {
  const analytics = generateAnalytics();

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{change}% this month
            </p>
          )}
        </div>
        <Icon className="w-8 h-8" style={{ color }} />
      </div>
    </div>
  );

  const EngagementChart = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Trends</h3>
      <div className="h-64 flex items-end space-x-1">
        {analytics.engagementData.slice(-14).map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-blue-100 rounded-t" style={{ height: `${(day.sessions / 20) * 100}%`, minHeight: '4px' }}>
              <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(day.matches / day.sessions) * 100}%` }} />
            </div>
            <span className="text-xs text-gray-500 mt-1">{day.date.split('-')[2]}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-100 rounded" />
          <span className="text-gray-600">Sessions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span className="text-gray-600">Successful Matches</span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">AI-powered insights and platform metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Total Sessions"
          value={analytics.totalSessions.toLocaleString()}
          change={12}
          color="#3B82F6"
        />
        <StatCard
          icon={Users}
          title="Active Alumni"
          value={analytics.activeAlumni}
          change={8}
          color="#10B981"
        />
        <StatCard
          icon={Briefcase}
          title="Opportunities Posted"
          value={analytics.opportunitiesPosted}
          change={15}
          color="#F59E0B"
        />
        <StatCard
          icon={Brain}
          title="Avg Match Score"
          value={`${analytics.averageMatchScore}%`}
          change={5}
          color="#8B5CF6"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Engagement Chart */}
        <div className="lg:col-span-2">
          <EngagementChart />
        </div>

        {/* Top Skills */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills in Demand</h3>
          <div className="space-y-3">
            {analytics.topSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(skill.count / 50) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{skill.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent AI Matches */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recent AI Matches</h3>
        </div>
        <div className="space-y-3">
          {analytics.recentMatches.map((match, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {match.student} ↔ {match.mentor}
                  </p>
                  <p className="text-xs text-gray-500">{match.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-purple-600">{match.score}%</span>
                <p className="text-xs text-gray-500">Match Score</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
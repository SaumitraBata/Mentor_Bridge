// Smart matching algorithm with explainable logic
export const calculateMatchScore = (student, mentor) => {
  let totalScore = 0;
  let maxScore = 100;
  let explanations = [];

  // 1. Skills Match (40% weight)
  const skillsWeight = 40;
  const studentSkills = student.skills || [];
  const mentorSkills = mentor.skills || [];
  const matchingSkills = studentSkills.filter(skill => 
    mentorSkills.some(mSkill => mSkill.toLowerCase().includes(skill.toLowerCase()))
  );
  const skillsScore = matchingSkills.length > 0 ? 
    Math.min((matchingSkills.length / studentSkills.length) * skillsWeight, skillsWeight) : 0;
  
  totalScore += skillsScore;
  
  if (matchingSkills.length > 0) {
    explanations.push({
      type: 'skills',
      score: Math.round((skillsScore / skillsWeight) * 100),
      description: `${matchingSkills.length} matching skills: ${matchingSkills.join(', ')}`,
      weight: skillsWeight
    });
  }

  // 2. Domain/Interest Match (30% weight)
  const domainWeight = 30;
  const studentInterests = student.interests || [];
  const mentorDomain = mentor.domain || '';
  const domainMatch = studentInterests.some(interest => 
    mentorDomain.toLowerCase().includes(interest.toLowerCase()) ||
    interest.toLowerCase().includes(mentorDomain.toLowerCase())
  );
  const domainScore = domainMatch ? domainWeight : 0;
  
  totalScore += domainScore;
  
  if (domainMatch) {
    explanations.push({
      type: 'domain',
      score: 100,
      description: `Domain expertise in ${mentorDomain}`,
      weight: domainWeight
    });
  }

  // 3. Goals Alignment (20% weight)
  const goalsWeight = 20;
  const studentGoals = student.goals || [];
  const mentorExpertise = mentor.expertise || [];
  const goalAlignment = studentGoals.some(goal =>
    mentorExpertise.some(exp => 
      goal.toLowerCase().includes(exp.toLowerCase()) ||
      exp.toLowerCase().includes(goal.toLowerCase())
    ) || mentorDomain.toLowerCase().includes(goal.toLowerCase())
  );
  const goalsScore = goalAlignment ? goalsWeight : 0;
  
  totalScore += goalsScore;
  
  if (goalAlignment) {
    explanations.push({
      type: 'goals',
      score: 100,
      description: 'Career goals align with mentor expertise',
      weight: goalsWeight
    });
  }

  // 4. Experience Level (10% weight)
  const experienceWeight = 10;
  const mentorYears = parseInt(mentor.experience) || 0;
  const experienceScore = mentorYears >= 3 ? experienceWeight : mentorYears * (experienceWeight / 3);
  
  totalScore += experienceScore;
  
  if (mentorYears > 0) {
    explanations.push({
      type: 'experience',
      score: Math.round((experienceScore / experienceWeight) * 100),
      description: `${mentorYears} years of industry experience`,
      weight: experienceWeight
    });
  }

  return {
    score: Math.round(totalScore),
    explanations,
    matchingSkills,
    domainMatch,
    goalAlignment
  };
};

// Opportunity recommendation algorithm
export const recommendOpportunities = (student, opportunities) => {
  return opportunities.map(opportunity => {
    let relevanceScore = 0;
    let reasons = [];

    // Skills match
    const studentSkills = student.skills || [];
    const oppRequirements = opportunity.requirements || [];
    const skillMatches = studentSkills.filter(skill =>
      oppRequirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    );
    
    if (skillMatches.length > 0) {
      relevanceScore += skillMatches.length * 20;
      reasons.push(`${skillMatches.length} matching skills`);
    }

    // Domain/Interest match
    const studentInterests = student.interests || [];
    if (studentInterests.some(interest => 
      opportunity.domain.toLowerCase().includes(interest.toLowerCase())
    )) {
      relevanceScore += 30;
      reasons.push('Matches your interests');
    }

    // Goals alignment
    const studentGoals = student.goals || [];
    if (studentGoals.some(goal =>
      opportunity.title.toLowerCase().includes(goal.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(goal.toLowerCase())
    )) {
      relevanceScore += 25;
      reasons.push('Aligns with career goals');
    }

    // Experience level appropriateness
    if (opportunity.type === 'Internship' && student.year !== 'Graduate') {
      relevanceScore += 15;
      reasons.push('Appropriate for your level');
    }

    return {
      ...opportunity,
      relevanceScore: Math.min(relevanceScore, 100),
      reasons
    };
  }).sort((a, b) => b.relevanceScore - a.relevanceScore);
};

// Analytics data generator
export const generateAnalytics = () => {
  const currentDate = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      sessions: Math.floor(Math.random() * 15) + 5,
      opportunities: Math.floor(Math.random() * 8) + 2,
      matches: Math.floor(Math.random() * 25) + 10
    };
  });

  return {
    totalSessions: 1247,
    activeAlumni: 89,
    opportunitiesPosted: 156,
    averageMatchScore: 78,
    engagementData: last30Days,
    topSkills: [
      { skill: 'React', count: 45 },
      { skill: 'Python', count: 38 },
      { skill: 'Node.js', count: 32 },
      { skill: 'System Design', count: 28 },
      { skill: 'Product Management', count: 24 }
    ],
    recentMatches: [
      { student: 'Alex Kumar', mentor: 'Sarah Chen', score: 92, timestamp: '2 hours ago' },
      { student: 'Jessica Wong', mentor: 'Michael Rodriguez', score: 87, timestamp: '4 hours ago' },
      { student: 'David Park', mentor: 'Emily Johnson', score: 83, timestamp: '6 hours ago' }
    ]
  };
};
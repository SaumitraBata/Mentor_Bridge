export const calculateMatchScore = (studentProfile, alumniProfile) => {
  if (!studentProfile || !alumniProfile) {
    return { score: 0, explanations: [], matchingSkills: [] };
  }

  let score = 0;
  const explanations = [];
  const matchingSkills = [];

  const studentSkills = studentProfile.skills || [];
  const studentInterests = studentProfile.interests || [];
  const studentGoals = studentProfile.goals || [];
  
  const alumniSkills = alumniProfile.skills || [];
  const alumniExpertise = alumniProfile.expertise || [];
  const alumniDomain = alumniProfile.domain || '';

  // 1. Matching Skills (40 points max)
  const commonSkills = studentSkills.filter(skill => 
    alumniSkills.some(aSkill => aSkill.toLowerCase() === skill.toLowerCase())
  );
  
  if (commonSkills.length > 0) {
    const skillScore = Math.min(40, commonSkills.length * 10);
    score += skillScore;
    matchingSkills.push(...commonSkills);
    explanations.push({
      type: 'skills',
      description: `${commonSkills.length} matching skill${commonSkills.length > 1 ? 's' : ''}: ${commonSkills.slice(0, 3).join(', ')}`,
      score: skillScore
    });
  }

  // 2. Interests matching Domain (30 points max)
  const matchingInterests = studentInterests.filter(interest =>
    alumniDomain.toLowerCase().includes(interest.toLowerCase()) ||
    interest.toLowerCase().includes(alumniDomain.toLowerCase())
  );
  
  if (matchingInterests.length > 0) {
    const interestScore = Math.min(30, matchingInterests.length * 15);
    score += interestScore;
    explanations.push({
      type: 'domain',
      description: `Interested in ${alumniDomain}`,
      score: interestScore
    });
  }

  // 3. Goals matching Expertise (30 points max)
  const matchingGoals = studentGoals.filter(goal =>
    alumniExpertise.some(exp => 
      goal.toLowerCase().includes(exp.toLowerCase()) ||
      exp.toLowerCase().includes(goal.toLowerCase())
    )
  );
  
  if (matchingGoals.length > 0) {
    const goalScore = Math.min(30, matchingGoals.length * 15);
    score += goalScore;
    explanations.push({
      type: 'goals',
      description: 'Expertise aligns with your career goals',
      score: goalScore
    });
  }

  // 4. Experience bonus (10 points)
  if (alumniProfile.experience) {
    const years = parseInt(alumniProfile.experience);
    if (years >= 5) {
      score += 10;
      explanations.push({
        type: 'experience',
        description: `${alumniProfile.experience} of industry experience`,
        score: 10
      });
    }
  }

  // Ensure score is between 0-100
  score = Math.min(100, Math.max(0, score));

  return {
    score: Math.round(score),
    explanations: explanations.slice(0, 4),
    matchingSkills: matchingSkills.slice(0, 5)
  };
};

export const getMatchLevel = (score) => {
  if (score >= 80) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (score >= 60) return { level: 'Great', color: 'text-blue-600', bgColor: 'bg-blue-100' };
  if (score >= 40) return { level: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  return { level: 'Fair', color: 'text-gray-600', bgColor: 'bg-gray-100' };
};

export const recommendOpportunities = (studentProfile, opportunities) => {
  if (!studentProfile || !opportunities || opportunities.length === 0) {
    return [];
  }

  const studentSkills = studentProfile.skills || [];
  const studentInterests = studentProfile.interests || [];
  const studentGoals = studentProfile.goals || [];

  return opportunities.map(opp => {
    let score = 0;
    const reasons = [];

    // Match skills with requirements
    const matchingReqs = (opp.requirements || []).filter(req =>
      studentSkills.some(skill => req.toLowerCase().includes(skill.toLowerCase()))
    );
    if (matchingReqs.length > 0) {
      score += matchingReqs.length * 20;
      reasons.push(`Matches ${matchingReqs.length} requirement${matchingReqs.length > 1 ? 's' : ''}`);
    }

    // Match domain with interests
    if (studentInterests.some(interest => 
      opp.domain?.toLowerCase().includes(interest.toLowerCase()) ||
      interest.toLowerCase().includes(opp.domain?.toLowerCase())
    )) {
      score += 30;
      reasons.push(`Aligns with your interests in ${opp.domain}`);
    }

    // Match type with goals
    if (opp.type === 'Internship' && studentGoals.some(goal => goal.toLowerCase().includes('internship'))) {
      score += 20;
      reasons.push('Matches your internship goals');
    }

    return {
      ...opp,
      matchScore: Math.min(100, score),
      matchReasons: reasons
    };
  }).filter(opp => opp.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
};

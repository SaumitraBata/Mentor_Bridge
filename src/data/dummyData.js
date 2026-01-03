export const studentProfile = {
  name: 'Alex Kumar',
  email: 'alex.kumar@university.edu',
  year: 'Junior',
  major: 'Computer Science',
  university: 'Tech University',
  skills: ['JavaScript', 'Python', 'React', 'Node.js'],
  interests: ['Web Development', 'Machine Learning', 'Mobile Development'],
  goals: ['Land a software engineering internship', 'Learn system design', 'Build a strong professional network'],
  gpa: '3.8'
};

export const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    domain: "Software Engineering",
    experience: "5 years",
    skills: ["React", "Node.js", "System Design"],
    expertise: ["Web Development", "System Architecture", "Team Leadership"],
    rating: 4.9,
    sessions: 45,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Passionate about mentoring junior developers and sharing knowledge about modern web technologies.",
    availability: ["Mon 6-8 PM", "Wed 7-9 PM", "Sat 10-12 PM"]
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Product Manager",
    company: "Microsoft",
    domain: "Product Management",
    experience: "7 years",
    skills: ["Product Strategy", "User Research", "Analytics"],
    expertise: ["Product Management", "Strategy", "User Experience"],
    rating: 4.8,
    sessions: 32,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Helping students transition into product management roles with hands-on experience.",
    availability: ["Tue 5-7 PM", "Thu 6-8 PM", "Sun 2-4 PM"]
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "Data Scientist",
    company: "Netflix",
    domain: "Data Science",
    experience: "4 years",
    skills: ["Python", "Machine Learning", "SQL"],
    expertise: ["Data Science", "Machine Learning", "Analytics"],
    rating: 4.7,
    sessions: 28,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Specializing in recommendation systems and helping students break into data science.",
    availability: ["Mon 7-9 PM", "Fri 5-7 PM"]
  }
];

export const opportunities = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "TechCorp",
    type: "Internship",
    domain: "Software Engineering",
    location: "San Francisco, CA",
    description: "Join our team to work on cutting-edge web applications using React and Node.js.",
    requirements: ["React", "JavaScript", "Git"],
    postedBy: "Sarah Chen",
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Product Management Fellowship",
    company: "StartupXYZ",
    type: "Fellowship",
    domain: "Product Management",
    location: "Remote",
    description: "6-month fellowship program to learn product management fundamentals.",
    requirements: ["Business Analysis", "Communication", "Problem Solving"],
    postedBy: "Michael Rodriguez",
    postedDate: "2024-01-12",
    deadline: "2024-02-20",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Data Science Research Assistant",
    company: "University Lab",
    type: "Research",
    domain: "Data Science",
    location: "Boston, MA",
    description: "Research position focusing on machine learning applications in healthcare.",
    requirements: ["Python", "Statistics", "Research Experience"],
    postedBy: "Emily Johnson",
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
  }
];

export const sessions = [
  {
    id: 1,
    mentorName: "Sarah Chen",
    date: "2024-01-20",
    time: "6:00 PM",
    duration: "1 hour",
    topic: "React Best Practices",
    status: "upcoming",
    meetingLink: "https://meet.google.com/abc-def-ghi"
  },
  {
    id: 2,
    mentorName: "Michael Rodriguez",
    date: "2024-01-18",
    time: "5:00 PM",
    duration: "1 hour",
    topic: "Product Strategy Discussion",
    status: "completed",
    rating: 5,
    feedback: "Great session! Very insightful advice on product roadmaps."
  }
];

export const messages = [
  {
    id: 1,
    sender: "Sarah Chen",
    message: "Hi! Looking forward to our session tomorrow. Please prepare any specific questions you have about React.",
    timestamp: "2024-01-19 2:30 PM",
    unread: true
  },
  {
    id: 2,
    sender: "Michael Rodriguez",
    message: "Thanks for the great session! I've attached some resources for product management frameworks.",
    timestamp: "2024-01-18 6:15 PM",
    unread: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Alex Kumar",
    role: "Computer Science Student",
    content: "The mentorship I received helped me land my dream internship at Google. The personalized guidance was invaluable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Jessica Wong",
    role: "Recent Graduate",
    content: "Through this platform, I connected with amazing mentors who helped me transition into product management.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "David Park",
    role: "Data Science Student",
    content: "The opportunity feed helped me discover research positions I never would have found otherwise.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];
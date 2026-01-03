# AlumBridge - Alumni-Student Mentorship Portal

A complete React (Vite) frontend for connecting students with alumni mentors and discovering career opportunities.

## Features

### 🎯 Landing Page
- Hero section with clear value proposition
- How it works section
- Benefits for students and alumni
- User testimonials
- Professional footer

### 👨‍🎓 Student Dashboard
- **Recommended Mentors**: Browse and book sessions with mentors
- **Booked Sessions**: Manage upcoming and completed mentorship sessions
- **Opportunity Feed**: Discover internships, jobs, and research positions
- **Messages**: Communicate with mentors
- **Profile**: Manage skills, interests, and career goals

### 👩‍💼 Alumni Dashboard
- **Create Mentorship Slot**: Set up availability for mentoring
- **My Sessions**: Manage sessions with students
- **Post Opportunity**: Share job opportunities with students
- **Messages**: Communicate with mentees
- **Profile**: Showcase experience and expertise

### 🔄 View Switching
- **Switch View Button**: Toggle between Student and Alumni dashboard views
- **Role Exploration**: Users can explore the other role's interface without logging out
- **Persistent View**: Selected view persists across page reloads using localStorage
- **Visual Indicators**: Clear indication when viewing switched role

### 🔍 Smart Matchmaking
- AI-powered mentor recommendations
- Match scoring based on goals and skills
- Personalized match reasons

### 📋 Opportunity Feed
- Social feed layout for opportunities
- Advanced filtering by domain and type
- Responsive card design

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── MentorCard.jsx
│   ├── OpportunityCard.jsx
│   └── Sidebar.jsx
├── layouts/            # Layout components
│   └── DashboardLayout.jsx
├── pages/              # Page components
│   ├── student/        # Student dashboard pages
│   ├── alumni/         # Alumni dashboard pages
│   ├── LandingPage.jsx
│   ├── OpportunityFeed.jsx
│   └── SmartMatchmaking.jsx
├── data/               # Static/dummy data
│   └── dummyData.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (free at https://supabase.com)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase Database**
   
   a. Create a new project at https://supabase.com
   
   b. In your Supabase dashboard, go to Settings > API
   
   c. Copy your Project URL and anon public key
   
   d. Open `passkey.js` in the project root and replace:
   ```javascript
   export const SUPABASE_URL = "YOUR_ACTUAL_SUPABASE_URL";
   export const SUPABASE_ANON_KEY = "YOUR_ACTUAL_SUPABASE_ANON_KEY";
   ```
   
   e. In your Supabase dashboard, go to SQL Editor and run the complete schema from `database-schema.sql`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Database Integration

The app now includes full Supabase database integration with:

- **User Profiles**: Student and alumni profile management
- **Mentorship Slots**: Alumni can create time slots for mentoring
- **Bookings**: Students can book mentorship sessions
- **Opportunities**: Alumni can post job/internship opportunities
- **Messages**: One-to-one chat between students and alumni
- **Smart Matching**: AI-powered mentor recommendations based on profiles

### Core Functionality

#### For Students:
- View AI-matched mentors with percentage scores
- Book mentorship sessions from available slots
- View booked sessions and session history
- Browse and filter opportunities
- Chat with mentors

#### For Alumni:
- Create mentorship time slots
- View and manage booked sessions
- Post job/internship opportunities
- View analytics dashboard
- Chat with students

### Database Schema

The app uses these main tables:
- `user_profiles` - Basic user information and roles
- `student_profiles` - Student-specific data (skills, interests, goals)
- `alumni_profiles` - Alumni-specific data (company, experience, domain)
- `mentorship_slots` - Available mentoring time slots
- `mentorship_bookings` - Booked sessions
- `opportunities` - Job/internship postings
- `messages` - Chat messages

### Setup Instructions

**IMPORTANT**: The only file you need to edit is `passkey.js`

1. Add your Supabase URL and anon key to `passkey.js`
2. Run the SQL schema in your Supabase dashboard
3. Start the app with `npm run dev`

Everything else is automatically configured!

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Navigation
- **Landing Page**: Start at `/` and choose "Student" or "Alumni"
- **Unified Dashboard**: Access at `/dashboard` with role-based content
- **View Switching**: Use "Switch View" button to toggle between Student/Alumni interfaces
- **Opportunity Feed**: Standalone page at `/opportunities`
- **Smart Matchmaking**: AI-powered matching at `/matchmaking`

### View Switching Feature

After logging in, users can toggle between Student and Alumni dashboard views:

1. **Switch View Button**: Located in the sidebar, allows instant role view switching
2. **Persistent Selection**: Your view preference is saved and restored on page reload
3. **Visual Feedback**: Clear indicators show when you're viewing a different role
4. **No Re-authentication**: Switch views without logging out or changing your actual role

**How it works:**
- Students can explore Alumni features (creating mentorship slots, posting opportunities)
- Alumni can explore Student features (browsing mentors, booking sessions)
- Your actual authentication role remains unchanged
- All data operations respect your real role permissions

### Key Features

#### For Students:
1. **Find Mentors**: Browse recommended mentors based on your profile
2. **Book Sessions**: Schedule 1-on-1 mentorship sessions
3. **Discover Opportunities**: Find internships, jobs, and research positions
4. **Smart Matching**: Get AI-powered mentor recommendations
5. **Profile Management**: Update skills, goals, and interests

#### For Alumni:
1. **Create Mentorship Slots**: Set up your availability for mentoring
2. **Manage Sessions**: View and manage your mentoring sessions
3. **Post Opportunities**: Share job openings with students
4. **Profile Showcase**: Highlight your experience and expertise

## Data Structure

The app uses static dummy data located in `src/data/dummyData.js`:

- **Mentors**: Alumni profiles with skills, experience, and availability
- **Opportunities**: Job postings with requirements and details
- **Sessions**: Mentorship session data
- **Messages**: Chat conversations
- **Testimonials**: User feedback and reviews

## Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Styling

- **Tailwind CSS** for utility-first styling
- **Custom components** with consistent design system
- **Professional color scheme** with blue and purple accents
- **Accessible** form controls and navigation

## Future Enhancements

This frontend is ready for backend integration:

1. **Authentication**: Add login/signup flows
2. **Real-time Chat**: Implement WebSocket messaging
3. **Payment Integration**: Add session booking payments
4. **Video Calls**: Integrate video conferencing
5. **Notifications**: Add real-time notifications
6. **Analytics**: Track user engagement and success metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
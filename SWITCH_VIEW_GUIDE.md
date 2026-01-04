# Switch View Feature - Integration Guide

## Overview
The Switch View feature allows users to toggle between Student and Alumni dashboard interfaces without logging out or changing their authentication role. This enables users to explore both sides of the platform while maintaining their actual permissions.

## Key Components Added

### 1. ViewContext (`src/contexts/ViewContext.jsx`)
- Manages `viewRole` state (independent from `userRole`)
- Provides `switchView()` function to toggle between 'student' and 'alumni'
- Persists view selection in localStorage
- Includes `isViewingSwitched` flag for UI indicators

### 2. UnifiedDashboard (`src/pages/UnifiedDashboard.jsx`)
- Replaces separate StudentDashboard and AlumniDashboard components
- Conditionally renders Student or Alumni components based on `viewRole`
- Uses same routing structure but with unified path `/dashboard/*`

### 3. Updated Sidebar (`src/components/Sidebar.jsx`)
- Added "Switch View" button with RefreshCw icon
- Shows visual indicator when viewing switched role
- Mobile-responsive button design
- Tooltip: "Switch view to explore other role"

## Integration Points

### App.jsx Changes
```javascript
// Added ViewProvider wrapper
<ViewProvider>
  <Router>
    // ... routes
  </Router>
</ViewProvider>

// Updated routing to use UnifiedDashboard
<Route path="/dashboard/*" element={
  <ProtectedRoute>
    <UnifiedDashboard />
  </ProtectedRoute>
} />
```

### Context Usage in Components
```javascript
import { useView } from '../contexts/ViewContext';

const MyComponent = () => {
  const { viewRole, switchView, isViewingSwitched } = useView();
  
  // Use viewRole instead of userRole for UI decisions
  // userRole still used for actual permissions/data access
};
```

## How It Works

### Authentication vs View Role
- **userRole**: Actual authenticated role (student/alumni) - used for permissions
- **viewRole**: Current UI view (student/alumni) - used for component rendering
- Users maintain their real authentication while exploring other interfaces

### Data Access
- All database operations still use the user's actual `userRole`
- View switching only affects UI components, not data permissions
- Students viewing Alumni dashboard can see the interface but can't perform Alumni-only actions

### State Persistence
- Selected view is saved to localStorage as 'viewRole'
- Restored on page reload/app restart
- Cleared when user logs out

## Mobile Responsiveness

### Switch View Button
- Full text on desktop: "Switch View"
- Shortened text on mobile: "Switch"
- Responsive spacing and layout
- Touch-friendly button size

### Visual Indicators
- Amber badge shows "Viewing as [Role]" when switched
- Clear visual feedback for current state
- Consistent with existing design system

## Usage Examples

### For Students
1. Login as Student → see Student dashboard
2. Click "Switch View" → see Alumni dashboard interface
3. Can explore creating mentorship slots, posting opportunities
4. Cannot actually create data (permissions still based on real role)
5. Click "Switch View" again → return to Student dashboard

### For Alumni
1. Login as Alumni → see Alumni dashboard
2. Click "Switch View" → see Student dashboard interface
3. Can explore mentor recommendations, booking sessions
4. Cannot actually book sessions (permissions still based on real role)
5. Click "Switch View" again → return to Alumni dashboard

## Technical Implementation

### State Management
```javascript
// ViewContext manages the toggle state
const [viewRole, setViewRole] = useState(userRole);

// Switch function
const switchView = () => {
  const newViewRole = viewRole === 'student' ? 'alumni' : 'student';
  setViewRole(newViewRole);
};
```

### Component Rendering
```javascript
// UnifiedDashboard conditionally renders based on viewRole
{viewRole === 'student' ? (
  <Route path="/" element={<RecommendedMentors />} />
) : (
  <Route path="/" element={<CreateMentorshipSlot />} />
)}
```

### Persistence
```javascript
// Save to localStorage on change
useEffect(() => {
  if (viewRole) {
    localStorage.setItem('viewRole', viewRole);
  }
}, [viewRole]);

// Restore on app load
useEffect(() => {
  const savedViewRole = localStorage.getItem('viewRole');
  if (savedViewRole) {
    setViewRole(savedViewRole);
  }
}, []);
```

## Benefits

### User Experience
- Explore both sides of the platform without multiple accounts
- Understand the full ecosystem before committing to actions
- Seamless switching with visual feedback
- No re-authentication required

### Development
- Single unified dashboard reduces code duplication
- Consistent routing structure
- Easy to maintain and extend
- Clear separation of concerns (auth vs view)

## Future Enhancements

### Potential Additions
1. **View History**: Track which views user has explored
2. **Guided Tours**: Show tooltips when switching views for first time
3. **Feature Comparison**: Side-by-side view of Student vs Alumni features
4. **Role Recommendations**: Suggest optimal role based on usage patterns

### Analytics Opportunities
1. Track view switching frequency
2. Measure feature discovery through view switching
3. Identify most popular cross-role features
4. User engagement metrics per view type

## Testing Checklist

### Functionality
- [ ] Switch View button toggles viewRole correctly
- [ ] localStorage persistence works across sessions
- [ ] Visual indicators show when viewing switched role
- [ ] All dashboard components render correctly in both views
- [ ] Routing works properly with unified dashboard
- [ ] Mobile responsiveness functions as expected

### Edge Cases
- [ ] Switching views while on nested routes
- [ ] localStorage corruption handling
- [ ] Network interruption during view switch
- [ ] Multiple browser tabs synchronization

### Permissions
- [ ] Users cannot perform actions outside their real role
- [ ] Database operations respect userRole, not viewRole
- [ ] Protected routes still enforce proper authentication
- [ ] Data access remains secure regardless of view

## Conclusion

The Switch View feature enhances user experience by allowing role exploration while maintaining security through proper authentication separation. The implementation is minimal, maintainable, and provides a solid foundation for future enhancements.
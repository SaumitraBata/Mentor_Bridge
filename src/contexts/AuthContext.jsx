import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserRole(session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (error) throw error;
      setUserRole(data?.role || null);
    } catch (error) {
      console.error('Error fetching role:', error);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, role, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([{ user_id: data.user.id, email, role, name }]);
        
        if (profileError) throw profileError;
        
        // Auto-create student or alumni profile
        if (role === 'student') {
          const { error: studentError } = await supabase.from('student_profiles').insert([{
            user_id: data.user.id,
            skills: ['JavaScript', 'Python', 'React'],
            interests: ['Web Development', 'Software Engineering'],
            goals: ['Get internship', 'Learn new skills'],
            university: 'University',
            year: 'Junior',
            major: 'Computer Science'
          }]);
          if (studentError) console.error('Student profile error:', studentError);
        } else if (role === 'alumni') {
          const { error: alumniError } = await supabase.from('alumni_profiles').insert([{
            user_id: data.user.id,
            company: 'Tech Company',
            title: 'Senior Professional',
            experience: '5 years',
            domain: 'Software Engineering',
            skills: ['JavaScript', 'Python', 'React'],
            expertise: ['Web Development', 'Mentoring'],
            bio: 'Experienced professional passionate about mentoring students.'
          }]);
          if (alumniError) console.error('Alumni profile error:', alumniError);
        }
        
        setUserRole(role);
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setUserRole(null);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    user,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
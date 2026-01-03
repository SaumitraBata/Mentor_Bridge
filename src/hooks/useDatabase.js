import { supabase } from '../lib/supabase';

// Student Profile Operations
export const useStudentProfile = () => {
  const getProfile = async (userId) => {
    const { data, error } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  };

  const updateProfile = async (userId, profileData) => {
    const { data, error } = await supabase
      .from('student_profiles')
      .upsert({ user_id: userId, ...profileData })
      .select()
      .single();
    return { data, error };
  };

  return { getProfile, updateProfile };
};

// Alumni Profile Operations
export const useAlumniProfile = () => {
  const getProfile = async (userId) => {
    const { data, error } = await supabase
      .from('alumni_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  };

  const updateProfile = async (userId, profileData) => {
    const { data, error } = await supabase
      .from('alumni_profiles')
      .upsert({ user_id: userId, ...profileData })
      .select()
      .single();
    return { data, error };
  };

  const getAllAlumni = async () => {
    const { data, error } = await supabase
      .from('alumni_profiles')
      .select('*');
    return { data, error };
  };

  return { getProfile, updateProfile, getAllAlumni };
};

// Mentorship Slots Operations
export const useMentorshipSlots = () => {
  const createSlot = async (slotData) => {
    const { data, error } = await supabase
      .from('mentorship_slots')
      .insert(slotData)
      .select()
      .single();
    return { data, error };
  };

  const getAlumniSlots = async (alumniId) => {
    const { data, error } = await supabase
      .from('mentorship_slots')
      .select(`
        *,
        mentorship_bookings(
          id,
          student_id,
          topic,
          message,
          status,
          created_at
        )
      `)
      .eq('alumni_id', alumniId)
      .order('date', { ascending: true });
    return { data, error };
  };

  const getAvailableSlots = async () => {
    const { data, error } = await supabase
      .from('mentorship_slots')
      .select(`
        *,
        alumni_profiles!inner(
          user_id,
          company,
          title,
          domain,
          skills,
          expertise,
          bio
        )
      `)
      .eq('is_active', true)
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true });
    return { data, error };
  };

  return { createSlot, getAlumniSlots, getAvailableSlots };
};

// Mentorship Bookings Operations
export const useMentorshipBookings = () => {
  const createBooking = async (bookingData) => {
    const { data, error } = await supabase
      .from('mentorship_bookings')
      .insert(bookingData)
      .select()
      .single();
    return { data, error };
  };

  const getStudentBookings = async (studentId) => {
    const { data, error } = await supabase
      .from('mentorship_bookings')
      .select(`
        *,
        mentorship_slots(
          *,
          alumni_profiles(
            company,
            title,
            domain
          )
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    return { data, error };
  };

  return { createBooking, getStudentBookings };
};

// Opportunities Operations
export const useOpportunities = () => {
  const createOpportunity = async (opportunityData) => {
    const { data, error } = await supabase
      .from('opportunities')
      .insert(opportunityData)
      .select()
      .single();
    return { data, error };
  };

  const getAllOpportunities = async () => {
    const { data, error } = await supabase
      .from('opportunities')
      .select(`
        *,
        alumni_profiles(
          company,
          title
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    return { data, error };
  };

  const getAlumniOpportunities = async (alumniId) => {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('alumni_id', alumniId)
      .order('created_at', { ascending: false });
    return { data, error };
  };

  return { createOpportunity, getAllOpportunities, getAlumniOpportunities };
};

// Messages Operations
export const useMessages = () => {
  const sendMessage = async (messageData) => {
    const { data, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select()
      .single();
    return { data, error };
  };

  const getConversation = async (userId1, userId2) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true });
    return { data, error };
  };

  const getConversations = async (userId) => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id(id),
        receiver:receiver_id(id)
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    return { data, error };
  };

  const markAsRead = async (messageId) => {
    const { data, error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', messageId);
    return { data, error };
  };

  return { sendMessage, getConversation, getConversations, markAsRead };
};
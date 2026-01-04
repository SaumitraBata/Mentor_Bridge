// passkey.js - Supabase Configuration
// For production, use environment variables

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://wyazjkqewmoikkcwpolz.supabase.co";

export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5YXpqa3Fld21vaWtrY3dwb2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MTU4MTUsImV4cCI6MjA4Mjk5MTgxNX0.zqR_Oud6KPlWNsn83Lwv2P_GAJhM357o2AEre-q7LIo";

// Instructions:
// 1. For local development, values above are used
// 2. For production, set environment variables in your hosting platform:
//    - VITE_SUPABASE_URL
//    - VITE_SUPABASE_ANON_KEY
// 3. Never commit real credentials to version control
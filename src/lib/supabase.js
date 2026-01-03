import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../passkey.js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
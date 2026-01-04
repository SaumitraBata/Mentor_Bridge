// Test Supabase connection
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://wyazjkqewmoikkcwpolz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_SFZkaBy3jCEV2tJBsSU8Ow_SzNbQz-p";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log('Session data:', data);
    console.log('Session error:', error);
    
    if (error) {
      console.error('Connection failed:', error.message);
    } else {
      console.log('Connection successful!');
      console.log('Current user:', data.session?.user || 'No user logged in');
    }
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testConnection();

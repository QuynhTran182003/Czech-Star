import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


export const supabaseUrl = "https://ebkhmvscxyhwcgrbexuh.supabase.co";
export const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVia2htdnNjeHlod2NncmJleHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MDI1MTUsImV4cCI6MjAyMDM3ODUxNX0.Q7_OQfJ9w7QKetChJisf5huGvmbh3E9wNdImDe7caKQ";
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
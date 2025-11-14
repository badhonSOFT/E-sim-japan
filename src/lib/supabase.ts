import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://103.51.128.20:8000';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzYyOTcwNDAwLCJleHAiOjE5MjA3MzY4MDB9.uAw2ZY6MzEDUEzVk9ReUcDeziWbTZC6meaeW6I1ZGb4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

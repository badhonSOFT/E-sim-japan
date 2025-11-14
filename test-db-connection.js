import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://103.51.128.20:8000';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzYyOTcwNDAwLCJleHAiOjE5MjA3MzY4MDB9.uAw2ZY6MzEDUEzVk9ReUcDeziWbTZC6meaeW6I1ZGb4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('limited_data_plans')
      .select('*')
      .limit(5);
    
    console.log('Connection test result:', { data, error });
    
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Success! Found', data?.length || 0, 'records');
      if (data && data.length > 0) {
        console.log('Sample record:', data[0]);
      }
    }
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

testConnection();
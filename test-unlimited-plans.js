import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://103.51.128.20:8000';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzYyOTcwNDAwLCJleHAiOjE5MjA3MzY4MDB9.uAw2ZY6MzEDUEzVk9ReUcDeziWbTZC6meaeW6I1ZGb4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUnlimitedPlans() {
  console.log('Testing unlimited_data_plans table...');
  
  try {
    // Test if table exists and has data
    const { data, error } = await supabase
      .from('unlimited_data_plans')
      .select('*')
      .limit(5);
    
    console.log('Unlimited plans test result:', { data, error });
    
    if (error) {
      console.error('Error accessing unlimited_data_plans:', error);
      console.log('Table might not exist. Please run the create-unlimited-plans.sql script in your Supabase dashboard.');
    } else {
      console.log('Success! Found', data?.length || 0, 'unlimited plans');
      if (data && data.length > 0) {
        console.log('Sample unlimited plan:', data[0]);
      }
    }

    // Test specific country query
    console.log('\nTesting Japan unlimited plans...');
    const { data: japanData, error: japanError } = await supabase
      .from('unlimited_data_plans')
      .select('*')
      .eq('destination', 'Japan');
    
    if (japanError) {
      console.error('Error fetching Japan unlimited plans:', japanError);
    } else {
      console.log('Japan unlimited plans:', japanData?.length || 0, 'found');
      japanData?.forEach(plan => {
        console.log(`- ${plan.data} for ${plan.validity} days: $${plan.price}`);
      });
    }
    
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

testUnlimitedPlans();
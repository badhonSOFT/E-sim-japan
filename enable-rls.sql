-- Enable Row Level Security on limited_data_plans table
ALTER TABLE limited_data_plans ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON limited_data_plans;

-- Create policy to allow public read access only
CREATE POLICY "Allow public read access" ON limited_data_plans
    FOR SELECT USING (true);

-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'limited_data_plans';
-- Create limited_data_plans table in Supabase
CREATE TABLE limited_data_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    destination TEXT NOT NULL,
    package_type_id TEXT NOT NULL,
    name TEXT NOT NULL,
    package_type TEXT NOT NULL,
    unlimited BOOLEAN DEFAULT FALSE,
    data TEXT NOT NULL,
    validity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    retail_price DECIMAL(10,2) NOT NULL,
    supported_countries TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX idx_limited_data_plans_destination ON limited_data_plans(destination);
CREATE INDEX idx_limited_data_plans_package_type ON limited_data_plans(package_type);
CREATE INDEX idx_limited_data_plans_validity ON limited_data_plans(validity);

-- Enable Row Level Security (RLS)
ALTER TABLE limited_data_plans ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON limited_data_plans
    FOR SELECT USING (true);

-- Sample data insertion
INSERT INTO limited_data_plans (
    destination,
    package_type_id,
    name,
    package_type,
    unlimited,
    data,
    validity,
    price,
    retail_price,
    supported_countries
) VALUES 
('Japan', 'jp-1gb-3d', '1 GB eSIM Data For 3 Days in Japan', 'limited', false, '1GB', 3, 1.54, 2.00, ARRAY['Japan']),
('Japan', 'jp-1gb-5d', '1 GB eSIM Data For 5 Days in Japan', 'limited', false, '1GB', 5, 1.64, 2.10, ARRAY['Japan']),
('Japan', 'jp-1gb-7d', '1 GB eSIM Data For 7 Days in Japan', 'limited', false, '1GB', 7, 1.74, 2.20, ARRAY['Japan']),
('Asia', 'asia-5gb-7d', '5 GB eSIM Data For 7 Days in Asia', 'limited', false, '5GB', 7, 8.99, 12.00, ARRAY['Japan', 'South Korea', 'Thailand', 'Singapore']),
('Europe', 'eu-10gb-15d', '10 GB eSIM Data For 15 Days in Europe', 'limited', false, '10GB', 15, 15.99, 20.00, ARRAY['Germany', 'France', 'Italy', 'Spain', 'United Kingdom']);
CREATE TABLE unlimited_data_plans (
  id SERIAL PRIMARY KEY,
  destination VARCHAR(255) NOT NULL,
  package_type_id INTEGER,
  name VARCHAR(255) NOT NULL,
  package_type VARCHAR(100),
  unlimited BOOLEAN DEFAULT true,
  data VARCHAR(50) NOT NULL,
  validity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  retail_price DECIMAL(10,2),
  supported_countries TEXT[]
);

ALTER TABLE unlimited_data_plans ENABLE ROW LEVEL SECURITY;
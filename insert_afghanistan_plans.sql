-- Insert Afghanistan eSIM Plans
INSERT INTO public.limited_data_plans (
  id,
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
  ('e3758d90-8309-4927-a518-7db0cb4a8461', 'Afghanistan', 'e3758d90-8309-4927-a518-7db0cb4a8461', 'eSIM, 1 GB, 30 Days, Afghanistan, Unthrottled', 'DATA-ONLY', false, '1GB', 30, 5.55, 7.45, ARRAY['Afghanistan']),
  ('05a31e9b-b8f8-482c-bf4c-7abc808580e1', 'Afghanistan', '05a31e9b-b8f8-482c-bf4c-7abc808580e1', 'eSIM, 3 GB, 30 Days, Afghanistan, Unthrottled', 'DATA-ONLY', false, '3GB', 30, 13.91, 18.86, ARRAY['Afghanistan']),
  ('2992519b-00b7-4dc8-b012-7c84fb3078ba', 'Afghanistan', '2992519b-00b7-4dc8-b012-7c84fb3078ba', 'eSIM, 5 GB, 30 Days, Afghanistan, Unthrottled', 'DATA-ONLY', false, '5GB', 30, 21.58, 29.32, ARRAY['Afghanistan']),
  ('db4fd008-fc6c-4581-b9c5-e701fc7f7d48', 'Afghanistan', 'db4fd008-fc6c-4581-b9c5-e701fc7f7d48', 'eSIM, 10 GB, 30 Days, Afghanistan, Unthrottled', 'DATA-ONLY', false, '10GB', 30, 40.32, 54.87, ARRAY['Afghanistan']),
  ('652bedfc-741c-4924-a5b1-cc33b434ac24', 'Afghanistan', '652bedfc-741c-4924-a5b1-cc33b434ac24', 'eSIM, 20 GB, 30 Days, Afghanistan, Unthrottled', 'DATA-ONLY', false, '20GB', 30, 76.06, 103.61, ARRAY['Afghanistan']),
  ('4524f6d1-2970-4ce0-96de-be4407f53807', 'Afghanistan', '4524f6d1-2970-4ce0-96de-be4407f53807', 'eSIM, 25 GB, 30 Days, Afghanistan, Unthrottled', 'DATA-ONLY', false, '25GB', 30, 87.60, 119.34, ARRAY['Afghanistan']),
  ('e1b7b5f1-c155-4afb-b75f-880e6c024682', 'Afghanistan', 'e1b7b5f1-c155-4afb-b75f-880e6c024682', 'eSIM, 50 GB, 90 Days, Afghanistan, Unthrottled', 'DATA-ONLY', false, '50GB', 30, 159.68, 217.64, ARRAY['Afghanistan']),
  ('e5b39dc9-e29f-407a-9ebd-0f36f62534e5', 'Afghanistan', 'e5b39dc9-e29f-407a-9ebd-0f36f62534e5', 'eSIM, 100 GB, 180 Days, Afghanistan, Unthrottled', 'DATA-ONLY', false, '100GB', 180, 231.75, 315.91, ARRAY['Afghanistan']);

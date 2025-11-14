CREATE TABLE public.unlimited_data_plans (
  id serial NOT NULL,
  destination character varying(255) NOT NULL,
  package_type_id uuid NULL,
  name character varying(255) NOT NULL,
  package_type character varying(100) NULL,
  unlimited boolean NULL DEFAULT true,
  data character varying(50) NOT NULL,
  validity integer NOT NULL,
  price numeric(10, 2) NOT NULL,
  retail_price numeric(10, 2) NULL,
  supported_countries text[] NULL,
  CONSTRAINT unlimited_data_plans_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
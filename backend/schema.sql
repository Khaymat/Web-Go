-- Create projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  github_url TEXT,
  demo_url TEXT,
  technologies TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profile table
CREATE TABLE profile (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  avatar TEXT,
  interests TEXT[]
);

-- Create skills table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profile(id),
  category TEXT NOT NULL,
  items TEXT[] NOT NULL
);

-- Create education table
CREATE TABLE education (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profile(id),
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  year TEXT NOT NULL
);

-- Create social_links table
CREATE TABLE social_links (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profile(id),
  platform TEXT NOT NULL,
  url TEXT NOT NULL
);

-- Create services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Create service_tiers table
CREATE TABLE service_tiers (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES services(id),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  period TEXT NOT NULL,
  features TEXT[] NOT NULL,
  popular BOOLEAN DEFAULT FALSE
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


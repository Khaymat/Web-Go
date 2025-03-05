# Web-Go

This project is a web-based portfolio that uses **Golang** as the backend and **TypeScript** as the frontend. The backend handles CRUD operations for the project list, while the frontend displays the created projects.

## Key Features
- Backend powered by **Golang** with **Supabase** as the database.
- Frontend built with **TypeScript** and **TailwindCSS**.
- Well-structured API with modularization.

## Database Structure

Main tables in the database:
- `profile` → User profile data (name, description, avatar, etc.)
- `projects` → List of completed projects
- `skills` → Skills and categories
- `education` → Education history
- `social_links` → Social media links
- `services` → Services offered
- `service_tiers` → Service packages with pricing
- `contact_submissions` → Contact form submissions

### SQL Schema

```sql
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
```
## API Endpoints

The API will be used by the frontend to display data on the portfolio website. If the API fails, the website will not be able to show information.

## Public Endpoints

| Method | Endpoint       | Description                      |
|--------|--------------|----------------------------------|
| GET    | `/profile`     | Retrieve profile data          |
| GET    | `/projects`    | Retrieve the list of projects  |
| GET    | `/skills`      | Retrieve the list of skills    |
| GET    | `/education`   | Retrieve education history     |
| GET    | `/social_links`| Retrieve social media links    |
| GET    | `/services`    | Retrieve the list of services  |
| POST   | `/contact`     | Send a contact message         |

## Database Configuration

This project uses **Supabase** as the database. Make sure to create a database in Supabase and configure the required environment variables in the `.env` file.  

### Example Configuration:

```bash
PORT=8080
FRONTEND_URL=http://localhost:3000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

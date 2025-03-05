## Web-Go

Proyek ini adalah sebuah portfolio berbasis web yang menggunakan **Golang** sebagai backend dan **Typescript** sebagai frontend. Backend bertanggung jawab untuk menangani operasi CRUD daftar proyek, sedangkan frontend akan menampilkan proyek yang telah dibuat.

## Fitur Utama
- Backend menggunakan **Golang** dengan **Supabase** sebagai database.
- Frontend menggunakan **Typescript** dan **TailwindCSS**.
- API terstruktur dengan modularisasi yang baik.


## Struktur Database

Tabel utama dalam database:
- `profile` → Data profil pengguna (nama, deskripsi, avatar, dll.)
- `projects` → Daftar proyek yang dikerjakan
- `skills` → Keterampilan dan kategori
- `education` → Riwayat pendidikan
- `social_links` → Link media sosial
- `services` → Layanan yang ditawarkan
- `service_tiers` → Paket layanan dengan harga
- `contact_submissions` → Formulir kontak yang dikirimkan

### Schema SQL

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

## Endpoint API (Backend)

API ini akan digunakan oleh frontend untuk menampilkan data ke website portfolio. Jika API gagal, maka halaman website juga tidak bisa menampilkan informasi.

| Metode | Endpoint        | Deskripsi                       |
|--------|---------------|---------------------------------|
| GET    | `/profile`     | Mengambil data profil          |
| GET    | `/projects`    | Mengambil daftar proyek        |
| GET    | `/skills`      | Mengambil daftar keterampilan  |
| GET    | `/education`   | Mengambil riwayat pendidikan   |
| GET    | `/social_links`| Mengambil link sosial media    |
| GET    | `/services`    | Mengambil layanan              |
| POST   | `/contact`     | Mengirim pesan kontak          |

## Konfigurasi Database

Proyek ini menggunakan Supabase sebagai database. Pastikan untuk membuat database di Supabase dan mengatur variabel lingkungan yang diperlukan dalam file .env .
``` bash
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>
JWT_SECRET=<your-jwt-secret>
```


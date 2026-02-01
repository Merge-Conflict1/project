-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  name text,
  bio text,
  avatar_url text,
  credits int default 3,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Skills table (master list)
create table public.skills (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  category text
);

-- User Teach Skills (Many-to-Many)
create table public.user_teach_skills (
  user_id uuid references public.profiles(id) on delete cascade not null,
  skill_id uuid references public.skills(id) on delete cascade not null,
  primary key (user_id, skill_id)
);

-- User Learn Skills (Many-to-Many)
create table public.user_learn_skills (
  user_id uuid references public.profiles(id) on delete cascade not null,
  skill_id uuid references public.skills(id) on delete cascade not null,
  primary key (user_id, skill_id)
);

-- Sessions (for bookings/video calls)
create table public.sessions (
  id uuid default uuid_generate_v4() primary key,
  tutor_id uuid references public.profiles(id) not null,
  student_id uuid references public.profiles(id) not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  scheduled_at timestamp with time zone,
  duration_minutes int default 60,
  meeting_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages (Chat)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references public.sessions(id) on delete cascade,
  sender_id uuid references public.profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed initial skills
insert into public.skills (name, category) values
('React', 'Development'),
('Node.js', 'Development'),
('Python', 'Development'),
('UI Design', 'Design'),
('Figma', 'Design'),
('Guitar', 'Music'),
('Piano', 'Music'),
('English', 'Language'),
('Spanish', 'Language')
on conflict (name) do nothing;

-- RLS Policies (Basic)
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

alter table public.skills enable row level security;
create policy "Skills are viewable by everyone." on public.skills for select using (true);

alter table public.user_teach_skills enable row level security;
create policy "Teach skills viewable by everyone." on public.user_teach_skills for select using (true);
create policy "Users can manage their own teach skills." on public.user_teach_skills for all using (auth.uid() = user_id);

alter table public.user_learn_skills enable row level security;
create policy "Learn skills viewable by everyone." on public.user_learn_skills for select using (true);
create policy "Users can manage their own learn skills." on public.user_learn_skills for all using (auth.uid() = user_id);

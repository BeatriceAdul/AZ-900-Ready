create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references public.topics(id) on delete cascade,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_answer text not null,
  explanation text,
  simple_explanation text,
  memory_tip text,
  difficulty text default 'Intermediate',
  concept text,
  created_at timestamptz default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  topic_id uuid references public.topics(id),
  score integer not null,
  total_questions integer not null,
  correct_answers integer not null,
  incorrect_answers integer not null,
  started_at timestamptz default now(),
  completed_at timestamptz,
  duration_seconds integer
);

create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid references public.quiz_attempts(id) on delete cascade,
  question_id uuid references public.questions(id),
  selected_answer text,
  correct_answer text,
  is_correct boolean,
  answered_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.topics enable row level security;
alter table public.questions enable row level security;

create policy "profiles own read" on public.profiles for select using (auth.uid() = id);
create policy "profiles own update" on public.profiles for update using (auth.uid() = id);
create policy "profiles own insert" on public.profiles for insert with check (auth.uid() = id);

create policy "topics authenticated read" on public.topics for select to authenticated using (true);
create policy "questions authenticated read" on public.questions for select to authenticated using (true);

create policy "attempts own read" on public.quiz_attempts for select using (auth.uid() = user_id);
create policy "attempts own insert" on public.quiz_attempts for insert with check (auth.uid() = user_id);

create policy "answers own read" on public.quiz_answers for select using (
  exists (
    select 1 from public.quiz_attempts a
    where a.id = quiz_answers.attempt_id and a.user_id = auth.uid()
  )
);
create policy "answers own insert" on public.quiz_answers for insert with check (
  exists (
    select 1 from public.quiz_attempts a
    where a.id = quiz_answers.attempt_id and a.user_id = auth.uid()
  )
);

insert into public.topics (name, slug, description) values
('Cloud Concepts','cloud-concepts','Cloud computing concepts, service models, benefits and shared responsibility.'),
('Azure Architecture & Services','azure-architecture','Azure regions, resources, compute, networking, storage and identity fundamentals.'),
('Azure Management & Governance','azure-governance','Azure tools, governance, monitoring, cost management, RBAC, policy and SLAs.')
on conflict (slug) do nothing;

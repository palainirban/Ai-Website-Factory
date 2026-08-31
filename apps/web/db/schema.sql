-- AI Website Factory persistence schema
-- Designed for PostgreSQL / Supabase.

create table if not exists projects (
  id uuid primary key,
  input jsonb not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_documents (
  id uuid primary key,
  project_id uuid not null references projects(id) on delete cascade,
  type text not null,
  title text not null,
  content text not null,
  status text not null default 'generated',
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_documents_project_id_idx
  on project_documents(project_id);

create index if not exists projects_updated_at_idx
  on projects(updated_at desc);

-- Recommended next step: add row-level security after authentication exists.

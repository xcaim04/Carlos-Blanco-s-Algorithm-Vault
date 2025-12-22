-- Create comments table for article comments with RLS
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.comments enable row level security;

-- Allow anyone to read comments
create policy "comments_select_all"
  on public.comments for select
  using (true);

-- Allow authenticated users to insert their own comments
create policy "comments_insert_own"
  on public.comments for insert
  with check (auth.uid() = user_id);

-- Allow users to update their own comments
create policy "comments_update_own"
  on public.comments for update
  using (auth.uid() = user_id);

-- Allow users to delete their own comments
create policy "comments_delete_own"
  on public.comments for delete
  using (auth.uid() = user_id);

-- Create index for faster queries by article
create index if not exists comments_article_slug_idx on public.comments(article_slug);
create index if not exists comments_created_at_idx on public.comments(created_at desc);

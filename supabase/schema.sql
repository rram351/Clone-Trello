create table if not exists boards (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 100),
  color text not null default '#0079bf',
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists lists (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references boards(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 100),
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists cards (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references lists(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  description text not null default '',
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists boards_user_id_idx on boards(user_id);
create index if not exists lists_board_id_idx on lists(board_id);
create index if not exists cards_list_id_idx on cards(list_id);

alter table boards enable row level security;
alter table lists enable row level security;
alter table cards enable row level security;

drop policy if exists "boards_select_own" on boards;
drop policy if exists "boards_insert_own" on boards;
drop policy if exists "boards_update_own" on boards;
drop policy if exists "boards_delete_own" on boards;

create policy "boards_select_own" on boards
  for select using (user_id = auth.uid());
create policy "boards_insert_own" on boards
  for insert with check (user_id = auth.uid());
create policy "boards_update_own" on boards
  for update using (user_id = auth.uid());
create policy "boards_delete_own" on boards
  for delete using (user_id = auth.uid());

drop policy if exists "lists_all_own" on lists;

create policy "lists_all_own" on lists
  for all
  using (exists (select 1 from boards b where b.id = lists.board_id and b.user_id = auth.uid()))
  with check (exists (select 1 from boards b where b.id = lists.board_id and b.user_id = auth.uid()));

drop policy if exists "cards_all_own" on cards;

create policy "cards_all_own" on cards
  for all
  using (exists (
    select 1 from lists l join boards b on b.id = l.board_id
    where l.id = cards.list_id and b.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from lists l join boards b on b.id = l.board_id
    where l.id = cards.list_id and b.user_id = auth.uid()
  ));

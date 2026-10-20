import { supabase } from '../../../shared/api'

export function fetchBoards() {
  return supabase.from('boards').select('*').order('created_at', { ascending: true })
}

export function fetchBoard(id: string) {
  return supabase.from('boards').select('*').eq('id', id).single()
}

export function createBoard(title: string, color: string, userId: string) {
  return supabase
    .from('boards')
    .insert({ title: title, color: color, user_id: userId })
    .select()
    .single()
}

export function deleteBoard(id: string) {
  return supabase.from('boards').delete().eq('id', id)
}

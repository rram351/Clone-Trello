import { supabase } from '../../../shared/api'
import { DEFAULT_LISTS } from '../model/types'

export function fetchLists(boardId: string) {
  return supabase
    .from('lists')
    .select('*')
    .eq('board_id', boardId)
    .order('position', { ascending: true })
}

export function createList(boardId: string, title: string, position: number) {
  return supabase
    .from('lists')
    .insert({ board_id: boardId, title: title, position: position })
    .select()
    .single()
}

export function createDefaultLists(boardId: string) {
  return supabase.from('lists').insert(
    DEFAULT_LISTS.map((title, index) => ({ board_id: boardId, title: title, position: index })),
  )
}

export function renameList(id: string, title: string) {
  return supabase.from('lists').update({ title }).eq('id', id)
}

export function deleteList(id: string) {
  return supabase.from('lists').delete().eq('id', id)
}

import { supabase } from '../../../shared/api'

export function fetchCards(listIds: string[]) {
  return supabase
    .from('cards')
    .select('*')
    .in('list_id', listIds)
    .order('position', { ascending: true })
}

export function createCard(listId: string, title: string, position: number) {
  return supabase
    .from('cards')
    .insert({ list_id: listId, title: title, position: position })
    .select()
    .single()
}

export function updateCard(id: string, title: string, description: string) {
  return supabase.from('cards').update({ title, description }).eq('id', id)
}

export function moveCard(id: string, listId: string, position: number) {
  return supabase.from('cards').update({ list_id: listId, position: position }).eq('id', id)
}

export function deleteCard(id: string) {
  return supabase.from('cards').delete().eq('id', id)
}

export interface List {
  id: string
  board_id: string
  title: string
  position: number
  created_at: string
}

export const DEFAULT_LISTS = ['Нужно сделать', 'В процессе', 'Готово']

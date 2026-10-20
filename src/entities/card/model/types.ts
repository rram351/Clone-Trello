export interface Card {
  id: string
  list_id: string
  title: string
  description: string
  position: number
  created_at: string
}

export function getCardsOfList(cards: Card[], listId: string) {
  return cards.filter((c) => c.list_id === listId).sort((a, b) => a.position - b.position)
}

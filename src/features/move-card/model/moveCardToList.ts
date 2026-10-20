import { moveCard } from '../../../entities/card'
import type { Card } from '../../../entities/card'

export function moveCardToList(
  cards: Card[],
  cardId: string,
  toListId: string,
  onError: () => void,
): Card[] {
  const card = cards.find((c) => c.id === cardId)
  if (!card || card.list_id === toListId) return cards

  const newPosition = cards.filter((c) => c.list_id === toListId).length

  moveCard(cardId, toListId, newPosition).then(({ error }) => {
    if (error) {
      alert('Не удалось перенести карточку: ' + error.message)
      onError()
    }
  })

  return cards.map((c) =>
    c.id === cardId ? { ...c, list_id: toListId, position: newPosition } : c,
  )
}

import type { Card } from '../model/types'

interface Props {
  card: Card
  onClick: () => void
}

export function CardItem({ card, onClick }: Props) {
  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => e.dataTransfer.setData('cardId', card.id)}
      onClick={onClick}
    >
      <p className="card-title">{card.title}</p>
      {card.description && <span className="card-desc-icon" title="Есть описание">≡</span>}
    </div>
  )
}

import type { Board } from '../model/types'

interface Props {
  board: Board
  onOpen: () => void
  onDelete: () => void
}

export function BoardTile({ board, onOpen, onDelete }: Props) {
  return (
    <div className="board-tile" style={{ backgroundColor: board.color }} onClick={onOpen}>
      <span>{board.title}</span>
      <button
        className="tile-delete"
        title="Удалить доску"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        ✕
      </button>
    </div>
  )
}

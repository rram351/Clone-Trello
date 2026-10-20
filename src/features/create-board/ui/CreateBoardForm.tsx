import { useState } from 'react'
import { BOARD_COLORS, createBoard } from '../../../entities/board'
import type { Board } from '../../../entities/board'
import { createDefaultLists } from '../../../entities/list'

interface Props {
  userId: string
  onCreated: (board: Board) => void
}

export function CreateBoardForm({ userId, onCreated }: Props) {
  const [title, setTitle] = useState('')
  const [color, setColor] = useState(BOARD_COLORS[0])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (title.trim() === '') return

    const { data, error } = await createBoard(title.trim(), color, userId)
    if (error) {
      alert('Не удалось создать доску: ' + error.message)
      return
    }

    await createDefaultLists(data.id)

    onCreated(data)
    setTitle('')
  }

  return (
    <form className="board-tile new-board" onSubmit={handleSubmit}>
      <input
        placeholder="Название новой доски"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
      />
      <div className="colors">
        {BOARD_COLORS.map((c) => (
          <button
            type="button"
            key={c}
            className={c === color ? 'color-dot active' : 'color-dot'}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <button className="btn btn-primary" type="submit">
        Создать доску
      </button>
    </form>
  )
}

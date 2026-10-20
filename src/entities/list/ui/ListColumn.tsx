import { useState } from 'react'
import type { ReactNode } from 'react'
import type { List } from '../model/types'

interface Props {
  list: List
  count: number
  children: ReactNode // карточки
  footer: ReactNode // форма добавления карточки
  onRename: (title: string) => void
  onDelete: () => void
  onDropCard: (cardId: string) => void
}

export function ListColumn({ list, count, children, footer, onRename, onDelete, onDropCard }: Props) {
  const [editTitle, setEditTitle] = useState(false)
  const [title, setTitle] = useState(list.title)
  const [dragOver, setDragOver] = useState(false)

  function saveTitle() {
    setEditTitle(false)
    if (title.trim() === '' || title === list.title) {
      setTitle(list.title)
      return
    }
    onRename(title.trim())
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const cardId = e.dataTransfer.getData('cardId')
    if (cardId) {
      onDropCard(cardId)
    }
  }

  return (
    <div
      className={dragOver ? 'list drag-over' : 'list'}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <div className="list-header">
        {editTitle ? (
          <input
            className="list-title-input"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => e.key === 'Enter' && saveTitle()}
          />
        ) : (
          <h3 onClick={() => setEditTitle(true)} title="Нажмите, чтобы переименовать">
            {list.title}
          </h3>
        )}
        <span className="count">{count}</span>
        <button className="icon-btn" title="Удалить список" onClick={onDelete}>
          🗑
        </button>
      </div>

      <div className="cards">
        {children}
        {count === 0 && <p className="empty">Перетащите карточку сюда</p>}
      </div>

      {footer}
    </div>
  )
}

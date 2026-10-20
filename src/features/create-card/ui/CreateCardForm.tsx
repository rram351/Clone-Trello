import { useState } from 'react'
import { createCard } from '../../../entities/card'
import type { Card } from '../../../entities/card'

interface Props {
  listId: string
  position: number
  onCreated: (card: Card) => void
}

export function CreateCardForm({ listId, position, onCreated }: Props) {
  const [title, setTitle] = useState('')
  const [showForm, setShowForm] = useState(false)

  async function handleSubmit(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault()
    if (title.trim() === '') return

    const { data, error } = await createCard(listId, title.trim(), position)
    if (error) {
      alert('Ошибка: ' + error.message)
      return
    }
    onCreated(data)
    setTitle('')
  }

  if (!showForm) {
    return (
      <button className="add-card-btn" onClick={() => setShowForm(true)}>
        + Добавить карточку
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <textarea
        placeholder="Введите название карточки"
        value={title}
        autoFocus
        maxLength={200}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e)
          }
        }}
      />
      <div className="row">
        <button className="btn btn-primary" type="submit">
          Добавить
        </button>
        <button type="button" className="icon-btn" onClick={() => setShowForm(false)}>
          x
        </button>
      </div>
    </form>
  )
}

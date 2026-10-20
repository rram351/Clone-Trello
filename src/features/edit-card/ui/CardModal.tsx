import { useState } from 'react'
import { updateCard, deleteCard } from '../../../entities/card'
import type { Card } from '../../../entities/card'

interface Props {
  card: Card
  listTitle: string
  onClose: () => void
  onSaved: (card: Card) => void
  onDeleted: (id: string) => void
}

export function CardModal({ card, listTitle, onClose, onSaved, onDeleted }: Props) {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description)

  async function handleSave() {
    if (title.trim() === '') {
      alert('Название не может быть пустым')
      return
    }
    const { error } = await updateCard(card.id, title.trim(), description)
    if (error) {
      alert('Ошибка: ' + error.message)
      return
    }
    onSaved({ ...card, title: title.trim(), description: description })
  }

  async function handleDelete() {
    if (!confirm('Удалить карточку?')) return
    const { error } = await deleteCard(card.id)
    if (error) {
      alert('Ошибка: ' + error.message)
      return
    }
    onDeleted(card.id)
  }

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close icon-btn" onClick={onClose}>
          ✕
        </button>

        <input
          className="modal-title"
          value={title}
          maxLength={200}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="modal-list">
          в списке <b>{listTitle}</b>
        </p>

        <label>Описание</label>
        <textarea
          className="modal-desc"
          placeholder="Добавьте более подробное описание..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <p className="modal-date">Создана: {new Date(card.created_at).toLocaleString('ru-RU')}</p>

        <div className="row">
          <button className="btn btn-primary" onClick={handleSave}>
            Сохранить
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

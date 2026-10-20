import { useState } from 'react'
import { createList } from '../../../entities/list'
import type { List } from '../../../entities/list'

interface Props {
  boardId: string
  position: number
  onCreated: (list: List) => void
}

export function CreateListForm({ boardId, position, onCreated }: Props) {
  const [title, setTitle] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (title.trim() === '') return

    const { data, error } = await createList(boardId, title.trim(), position)
    if (error) {
      alert('Ошибка: ' + error.message)
      return
    }
    onCreated(data)
    setTitle('')
  }

  return (
    <form className="list add-list" onSubmit={handleSubmit}>
      <input
        placeholder="+ Добавить список"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
      />
      {title && (
        <button className="btn btn-primary" type="submit">
          Добавить
        </button>
      )}
    </form>
  )
}

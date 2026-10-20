import { useEffect, useState } from 'react'
import { BoardTile, fetchBoards, deleteBoard } from '../../../entities/board'
import type { Board } from '../../../entities/board'
import { CreateBoardForm } from '../../../features/create-board'
import { navigate } from '../../../shared/lib'

interface Props {
  userId: string
}

export function BoardsGrid({ userId }: Props) {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBoards()
  }, [])

  async function loadBoards() {
    const { data, error } = await fetchBoards()
    if (error) {
      alert('Ошибка загрузки досок: ' + error.message)
    } else {
      setBoards(data)
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Удалить доску вместе со всеми карточками?')) return

    const { error } = await deleteBoard(id)
    if (error) {
      alert('Ошибка удаления: ' + error.message)
      return
    }
    setBoards(boards.filter((b) => b.id !== id))
  }

  return (
    <>
      {loading && <p>Загрузка...</p>}

      <div className="boards-grid">
        {boards.map((board) => (
          <BoardTile
            key={board.id}
            board={board}
            onOpen={() => navigate('/board/' + board.id)}
            onDelete={() => handleDelete(board.id)}
          />
        ))}

        <CreateBoardForm userId={userId} onCreated={(board) => setBoards([...boards, board])} />
      </div>

      {!loading && boards.length === 0 && (
        <p className="hint">У вас пока нет досок. Создайте первую!</p>
      )}
    </>
  )
}

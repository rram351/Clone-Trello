import { BoardsGrid } from '../../../widgets/boards-grid'

interface Props {
  userId: string
}

export function BoardsPage({ userId }: Props) {
  return (
    <div className="boards-page">
      <h2>Мои доски</h2>
      <BoardsGrid userId={userId} />
    </div>
  )
}

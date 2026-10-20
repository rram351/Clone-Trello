import { KanbanBoard } from '../../../widgets/kanban-board'

interface Props {
  boardId: string
}

export function BoardPage({ boardId }: Props) {
  return <KanbanBoard boardId={boardId} />
}

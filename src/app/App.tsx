import { useSession } from '../features/auth'
import { Header } from '../widgets/header'
import { LoginPage } from '../pages/login'
import { BoardsPage } from '../pages/boards'
import { BoardPage } from '../pages/board'
import { useHashPath } from '../shared/lib'
import { Loader } from '../shared/ui'
import './styles/index.css'

export function App() {
  const { session, loading } = useSession()
  const path = useHashPath()

  if (loading) {
    return <Loader />
  }

  if (!session) {
    return <LoginPage />
  }

  let page
  if (path.startsWith('/board/')) {
    page = <BoardPage boardId={path.replace('/board/', '')} />
  } else {
    page = <BoardsPage userId={session.user.id} />
  }

  return (
    <div className="app">
      <Header email={session.user.email || ''} />
      {page}
    </div>
  )
}

import { LogoutButton } from '../../../features/auth'

interface Props {
  email: string
}

export function Header({ email }: Props) {
  return (
    <header className="header">
      <a href="#/boards" className="logo">
        Mini Trello
      </a>
      <div className="header-right">
        <span className="header-email">{email}</span>
        <LogoutButton />
      </div>
    </header>
  )
}

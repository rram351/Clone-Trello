import { supabase } from '../../../shared/api'
import { navigate } from '../../../shared/lib'

export function LogoutButton() {
  async function logout() {
    await supabase.auth.signOut()
    navigate('/boards')
  }

  return (
    <button className="btn btn-light" onClick={logout}>
      Выйти
    </button>
  )
}

import { useState } from 'react'
import { supabase } from '../../../shared/api'

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 6) {
      setError('Пароль должен быть не короче 6 символов')
      return
    }

    setLoading(true)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('Неверный email или пароль')
      }
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else if (!data.session) {
        setMessage('Регистрация прошла успешно! Проверьте почту для подтверждения.')
      }
    }

    setLoading(false)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="auth-logo">Mini Trello</h1>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Подождите...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
      </button>

      <p className="auth-switch">
        {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
        <button
          type="button"
          className="link-btn"
          onClick={() => {
            setIsLogin(!isLogin)
            setError('')
            setMessage('')
          }}
        >
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </p>
    </form>
  )
}

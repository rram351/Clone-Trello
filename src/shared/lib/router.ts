import { useEffect, useState } from 'react'

export function getCurrentPath() {
  return window.location.hash.replace('#', '') || '/boards'
}

export function navigate(path: string) {
  window.location.hash = path
}

export function useHashPath() {
  const [path, setPath] = useState(getCurrentPath())

  useEffect(() => {
    const onChange = () => setPath(getCurrentPath())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return path
}

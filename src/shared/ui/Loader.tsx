interface Props {
  text?: string
}

export function Loader({ text = 'Загрузка...' }: Props) {
  return <div className="loading">{text}</div>
}

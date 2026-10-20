import { useEffect, useState } from 'react'
import { fetchBoard } from '../../../entities/board'
import type { Board } from '../../../entities/board'
import { ListColumn, fetchLists, renameList, deleteList } from '../../../entities/list'
import type { List } from '../../../entities/list'
import { CardItem, fetchCards, getCardsOfList } from '../../../entities/card'
import type { Card } from '../../../entities/card'
import { CreateListForm } from '../../../features/create-list'
import { CreateCardForm } from '../../../features/create-card'
import { CardModal } from '../../../features/edit-card'
import { moveCardToList } from '../../../features/move-card'
import { Loader } from '../../../shared/ui'

interface Props {
  boardId: string
}

export function KanbanBoard({ boardId }: Props) {
  const [board, setBoard] = useState<Board | null>(null)
  const [lists, setLists] = useState<List[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [openedCard, setOpenedCard] = useState<Card | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    loadData()
  }, [boardId])

  async function loadData() {
    setLoading(true)

    const boardRes = await fetchBoard(boardId)
    if (boardRes.error) {
      setNotFound(true)
      setLoading(false)
      return
    }
    setBoard(boardRes.data)

    const listsRes = await fetchLists(boardId)
    const loadedLists: List[] = listsRes.data || []
    setLists(loadedLists)

    const listIds = loadedLists.map((l) => l.id)
    if (listIds.length > 0) {
      const cardsRes = await fetchCards(listIds)
      setCards(cardsRes.data || [])
    } else {
      setCards([])
    }

    setLoading(false)
  }

  async function handleRenameList(id: string, title: string) {
    const { error } = await renameList(id, title)
    if (error) {
      alert('Ошибка: ' + error.message)
      return
    }
    setLists(lists.map((l) => (l.id === id ? { ...l, title } : l)))
  }

  async function handleDeleteList(id: string) {
    if (!confirm('Удалить список и все карточки в нем?')) return
    const { error } = await deleteList(id)
    if (error) {
      alert('Ошибка: ' + error.message)
      return
    }
    setLists(lists.filter((l) => l.id !== id))
    setCards(cards.filter((c) => c.list_id !== id))
  }

  function handleDropCard(cardId: string, listId: string) {
    setCards(moveCardToList(cards, cardId, listId, loadData))
  }

  if (loading) {
    return <Loader text="Загрузка доски..." />
  }

  if (notFound || !board) {
    return (
      <div className="boards-page">
        <h2>Доска не найдена</h2>
        <a href="#/boards">← Вернуться к доскам</a>
      </div>
    )
  }

  return (
    <div className="board-page" style={{ backgroundColor: board.color }}>
      <div className="board-header">
        <a href="#/boards" className="btn btn-light">
          ← Доски
        </a>
        <h2>{board.title}</h2>
      </div>

      <div className="lists">
        {lists.map((list) => {
          const listCards = getCardsOfList(cards, list.id)
          return (
            <ListColumn
              key={list.id}
              list={list}
              count={listCards.length}
              onRename={(title) => handleRenameList(list.id, title)}
              onDelete={() => handleDeleteList(list.id)}
              onDropCard={(cardId) => handleDropCard(cardId, list.id)}
              footer={
                <CreateCardForm
                  listId={list.id}
                  position={listCards.length}
                  onCreated={(card) => setCards([...cards, card])}
                />
              }
            >
              {listCards.map((card) => (
                <CardItem key={card.id} card={card} onClick={() => setOpenedCard(card)} />
              ))}
            </ListColumn>
          )
        })}

        <CreateListForm
          boardId={boardId}
          position={lists.length}
          onCreated={(list) => setLists([...lists, list])}
        />
      </div>

      {openedCard && (
        <CardModal
          card={openedCard}
          listTitle={lists.find((l) => l.id === openedCard.list_id)?.title || ''}
          onClose={() => setOpenedCard(null)}
          onSaved={(updated) => {
            setCards(cards.map((c) => (c.id === updated.id ? updated : c)))
            setOpenedCard(null)
          }}
          onDeleted={(id) => {
            setCards(cards.filter((c) => c.id !== id))
            setOpenedCard(null)
          }}
        />
      )}
    </div>
  )
}

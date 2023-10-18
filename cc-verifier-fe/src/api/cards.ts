import axios from "axios"
import { urlEndpoint } from "../config/config.json"
import { Card } from "../interfaces/cards.interface"

const cardUrlEndpoint = `${urlEndpoint}/cards`

export const getCards = async () => {
    const cardsResponse = await axios.get(cardUrlEndpoint, { withCredentials: true })
    const encodedCards = cardsResponse.data as Card[]
    return encodedCards.map(Card.decode)
}

export const getCard = async (cardId: string) => {
    const responseData = await axios.get(`${cardUrlEndpoint}/${cardId}`, { withCredentials: true })
    return Card.decode(responseData.data as Card)
}

export const createCard = async (card: Card) => {
    const responseData = await axios.post(cardUrlEndpoint, Card.encode(card), { withCredentials: true })
    return Card.decode(responseData.data as Card)
}

export const updateCard = async (card: Card) => {
    const cardData = Card.encode(card)
    const responseData = await axios.put(`${cardUrlEndpoint}/${card.id}`, cardData, { withCredentials: true })
    return Card.decode(responseData.data as Card)
}

export const deleteCard = async (cardId: number) => {
    const responseData = await axios.delete(`${cardUrlEndpoint}/${cardId}`, { withCredentials: true })
    return Card.decode(responseData.data as Card)
}

import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { CardEntity } from '@entities/cards.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Card } from '@interfaces/cards.interface';

@Service()
@EntityRepository()
export class CardService extends Repository<CardEntity> {
  public async findAllCard(): Promise<Card[]> {
    const cards: Card[] = await CardEntity.find();
    return cards;
  }

  public async findCardById(cardId: number): Promise<Card> {
    const findCard: Card = await CardEntity.findOne({ where: { id: cardId } });
    if (!findCard) throw new HttpException(409, "Card doesn't exist");
    return findCard;
  }

  public async findCardByUserId(userId: number): Promise<Card[]> {
    const findCard: Card[] = await CardEntity.find({ where: { userId: userId } });
    if (!findCard) throw new HttpException(409, "Card doesn't exist");
    return findCard;
  }

  public async createCard(cardData: Card): Promise<Card> {
    const findCard: Card = await CardEntity.findOne({ where: { cardNumber: cardData.cardNumber } });
    if (findCard) throw new HttpException(409, `This card already exists`);
    const createCardData: Card = await CardEntity.create(cardData).save();
    return createCardData;
  }

  public async updateCard(cardId: number, cardData: Card): Promise<Card> {
    const findCard: Card = await CardEntity.findOne({ where: { id: cardId } });
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    await CardEntity.update(cardId, cardData);

    const updateCard: Card = await CardEntity.findOne({ where: { id: cardId } });
    return updateCard;
  }

  public async deleteCard(cardId: number, userId: number): Promise<Card> {
    const findCard: Card = await CardEntity.findOne({ where: { id: cardId } });
    if (findCard.userId !== userId) throw new HttpException(409, "Card doesn't belong to this user");
    if (!findCard) throw new HttpException(409, "Card doesn't exist");

    await CardEntity.delete({ id: cardId });
    return findCard;
  }
}

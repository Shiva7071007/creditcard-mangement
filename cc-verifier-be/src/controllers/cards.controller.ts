import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Card } from '@interfaces/cards.interface';
import { CardService } from '@services/cards.service';

export class CardController {
  public card = Container.get(CardService);

  public getCards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    this.getCardsByUserId(req, res, next);
  };

  public getCardsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId: number = req["user"].id;
      const findAllUserCards: Card[] = await this.card.findCardByUserId(userId);
      res.status(200).json(findAllUserCards);
    } catch (error) {
      next(error);
    }
  }

  public getCardById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = Number(req.params.id);
      const findOneCardData: Card = await this.card.findCardById(cardId);

      res.status(200).json(findOneCardData);
    } catch (error) {
      next(error);
    }
  };

  public createCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardData: Card = req.body;
      const createCardData: Card = await this.card.createCard({...cardData, userId: req["user"].id, id: undefined});
      res.status(201).json(createCardData);
    } catch (error) {
      next(error);
    }
  };

  public updateCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardId = Number(req.params.id);
      const cardData: Card = req.body;
      const updateCardData: Card = await this.card.updateCard(cardId, {...cardData, userId: req["user"].id});

      res.status(200).json(updateCardData);
    } catch (error) {
      next(error);
    }
  };

  public deleteCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId: number = req["user"].id;
      const cardId = Number(req.params.id);
      const deleteCardData: Card = await this.card.deleteCard(cardId, userId);

      res.status(200).json(deleteCardData);
    } catch (error) {
      next(error);
    }
  };
}

import { Router } from 'express';
import { CardController } from '@controllers/cards.controller';
import { CreateCardDto, UpdateCardDto } from '@dtos/cards.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { cardValidatorMiddleware } from '@/middlewares/cardValidator.middleware';

export class CardRoute implements Routes {
  public path = '/cards';
  public router = Router();
  public card  = new CardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware , this.card.getCards);
    this.router.get(`${this.path}/:id(\\d+)`,AuthMiddleware, this.card.getCardById);
    this.router.post(`${this.path}`, [AuthMiddleware, ValidationMiddleware(CreateCardDto),cardValidatorMiddleware], this.card.createCard);
    this.router.put(`${this.path}/:id(\\d+)`, [AuthMiddleware, ValidationMiddleware(CreateCardDto),cardValidatorMiddleware], this.card.updateCard);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.card.deleteCard);
  }
}

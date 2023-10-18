import { base64ToString, stringToBase64 } from "@/utils/b64Encoder";

export interface Card {
  id?: number;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  nickname: string;
  userId: number;
}

export namespace Card {
  export function encode(card: Card): Card {
    return {
      ...card,
      cardNumber: stringToBase64(card.cardNumber),
      cvv: stringToBase64(card.cvv),
      cardHolderName: stringToBase64(card.cardHolderName),
      expirationDate: stringToBase64(card.expirationDate)
    };
  }

  export function decode(card: Card): Card {
    return {
      ...card,
      cardNumber: base64ToString(card.cardNumber),
      cvv: base64ToString(card.cvv),
      cardHolderName: base64ToString(card.cardHolderName),
      expirationDate: base64ToString(card.expirationDate)
    };
  }
}

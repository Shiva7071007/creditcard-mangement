import { Card } from '@/interfaces/cards.interface';
import { Request, Response, NextFunction } from 'express';


// Middleware to validate credit card using Luhn algorithm
export const cardValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const card = Card.decode(req.body as Card);

  try {
    validateCardNumber(card.cardNumber);
    validateCardHolderName(card.cardHolderName);
    validateExpirationDate(card.expirationDate);
    validateCVV(card.cvv);
    validateNickname(card.nickname);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

const validateCardNumber = (cardNumber: string) => {
    if (!cardNumber) {
    throw new Error('Credit card number is required');
  }

  const cardDigits = cardNumber.replace(/\D/g, '');

  if (!/^\d+$/.test(cardDigits)) {
    throw new Error('Invalid credit card number format');
  }

  // Perform Luhn algorithm check
  const digits = cardDigits.split('').map(Number);
  const len = digits.length;

  let sum = 0;
  let isSecondDigit = false;

  for (let i = len - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isSecondDigit) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isSecondDigit = !isSecondDigit;
  }

  if (sum % 10 !== 0) {
    throw new Error('Invalid credit card number, failed Luhn algorithm check');
  }
}

const validateCardHolderName = (cardHolderName: string) => {
  if (!cardHolderName || cardHolderName === '') {
    throw new Error('Card holder name is required');
  }
}

const validateExpirationDate = (expirationDate: string) => {
  const dateFormat = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!dateFormat.test(expirationDate)) {
    throw new Error('Invalid expiration date format');
  }

  // Extract month and year from the input
  const [inputMonth, inputYear] = expirationDate.split('/');
  const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
  const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)

  // Convert the input month and year to numbers
  const numericInputMonth = parseInt(inputMonth, 10);
  const numericInputYear = parseInt(inputYear, 10);

  // Check if the expiration date is in the future
  if (numericInputYear < currentYear || (numericInputYear === currentYear && numericInputMonth < currentMonth)) {
    throw new Error('Credit card has expired');
  }
}

const validateCVV = (cvv: string) => {
  if (!cvv || cvv === '' || !/^\d+$/.test(cvv)) {
    throw new Error('CVV is wrong');
  }
}

const validateNickname = (nickname: string) => {
  if (!nickname || nickname === '') {
    throw new Error('Nickname is required');
  }
}


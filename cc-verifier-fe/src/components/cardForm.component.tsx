import { Button, Paper, TextField } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../interfaces/cards.interface";
import Cards, { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { useState } from "react";
import { createCard, deleteCard, updateCard } from "../api/cards";

export default function CardFormComponent() {
  const navigate = useNavigate();
  const navigateToBoard = () => navigate(`/board`);
  const location = useLocation();
  const cardData: Card = location.state && location.state.card;
  const [card, setCard] = useState<Card>(cardData);
  const [intialCard] = useState<Card>(cardData);
  const [focused, setFocused] = useState<Focused>('');
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg] = useState("")



  const updateCardNumber = (value: string) => {
    console.log(Number.parseInt(card.cvv))
    setCard({ ...card, cardNumber: value.toString() })
  }
  const updateCardHolderName = (value: string) => {
    setCard({ ...card, cardHolderName: value });
  }
  const updateExpirationDate = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    if (sanitizedValue.length <= 4) {
      const formattedValue = sanitizedValue
        .slice(0, 2)
        .concat(sanitizedValue.length > 2 ? '/' : '', sanitizedValue.slice(2, 4));
      setCard({ ...card, expirationDate: formattedValue });
    }

  }
  const updateCvv = (value: string) => {
    setCard({ ...card, cvv: value.toString() });
  }
  const updateNickname = (value: string) => {
    setCard({ ...card, nickname: value });
  }
  const handleInputFocus = (target: string) => {
    setFocused(target as Focused);
  };

  const performSave = async () => {
    try {
      const saveAction = card.id === -1 ? createCard : updateCard;
      await saveAction(card)
      alert("Card saved successfully");
      navigateToBoard();

    } catch (error: any) {

      const errorMsg = error.response ? error.response.data.message : "Something went wrong";
      setErrorMsg(errorMsg);

    }
  }

  const performDelete = async () => {
    try {
      await deleteCard(card.id!);
      alert("Card deleted successfully");
      navigateToBoard();
    } catch (error: any) {
      alert(error.response.data.message ? error.response.data.message : "Something went wrong");
    }
  }

  const isSaveAllowed = () => {
    return card.cardNumber.length === 0 || Number.parseInt(card.cardNumber) === 0 ||
      card.cardHolderName.length === 0 ||
      card.expirationDate.length === 0 || Number.parseInt(card.expirationDate) === 0 ||
      card.cvv.length === 0 || Number.parseInt(card.cvv) === 0 ||
      card.nickname.length === 0
      || (card.cardHolderName === intialCard.cardHolderName && card.cardNumber === intialCard.cardNumber && card.expirationDate === intialCard.expirationDate && card.cvv === intialCard.cvv && card.nickname === intialCard.nickname)
  }

  return (
    <Paper elevation={8} style={{ padding: '2px', border: "double" }}>
      <div style={{ maxHeight: '100vh', maxWidth: '100vw' }}>
        <Cards
          cvc={card.cvv}
          expiry={card.expirationDate}
          name={card.cardHolderName}
          number={card.cardNumber}
          focused={focused}
          preview={true}
        />
        <div style={{ padding: "5px" }}>
          <TextField
            required
            id="number"
            label="card number"
            type="number"
            value={card.cardNumber}
            onChange={(e) => updateCardNumber(e.target.value)}
            style={{ margin: '5px', width: '50vw' }}
            onFocus={(e) => handleInputFocus(e.target.id)}
          />
          <TextField
            required
            id="name"
            label="card holder name"
            value={card.cardHolderName}
            onChange={(e) => updateCardHolderName(e.target.value)}
            style={{ margin: '5px', width: '50vw' }}
            onFocus={(e) => handleInputFocus(e.target.id)}
          />
          <TextField
            required
            id="expiry"
            label="expiration date"
            value={card.expirationDate}
            onChange={(e) => updateExpirationDate(e.target.value)}
            style={{ margin: '5px', width: '50vw' }}
            onFocus={(e) => handleInputFocus(e.target.id)}
          />
          <TextField
            required
            id="cvc"
            label="cvv"
            type="number"
            value={card.cvv}
            onChange={(e) => updateCvv(e.target.value)}
            style={{ margin: '5px', width: '50vw' }}
            onFocus={(e) => handleInputFocus(e.target.id)}
          />
          <TextField
            required
            id="nickname"
            label="nickname"
            value={card.nickname}
            onChange={(e) => updateNickname(e.target.value)}
            style={{ margin: '5px', width: '50vw' }}
          />
        </div>
        {errorMsg.length !== 0 && <h4 style={{ color: "red" }}>{errorMsg}</h4>}
        {successMsg.length !== 0 && <h4 style={{ color: "green" }}>{successMsg}</h4>}
        <Button
          variant="contained"
          size="medium"
          style={{ margin: '1px' }}
          disabled={isSaveAllowed()}
          onClick={performSave}>
          Save
        </Button>
        <Button
          variant="contained"
          size="medium"
          style={{ margin: '1px' }}
          disabled={card.id === -1}
          onClick={performDelete}>
          Delete
        </Button>
        <Button
          variant="contained"
          size="medium"
          style={{ margin: '1px' }}
          disabled={false}
          onClick={navigateToBoard}>
          Back
        </Button>
      </div>
    </Paper>
  )
}
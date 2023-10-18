import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Card } from '../interfaces/cards.interface';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { useNavigate } from 'react-router-dom';
import { getCards } from '../api/cards';


function CardsGridComponent() {
    const [cards, setCards] = useState<Card[]>([
        {
            id: -1,
            cardNumber: '0000000000000000',
            cardHolderName: 'Name on Card',
            expirationDate: '00/00',
            cvv: '000',
            nickname: 'Add New Card',
        }
    ]);

    const navigate = useNavigate();
    const navigateToCardForm = (card: Card) => navigate(`/cards/create`, { state: { card: card } });

    const fetchCards = async () => {
        getCards()
            .then(response => {
                setCards(
                    [...cards, ...response].filter((card, index, self) =>
                        index === self.findIndex((t) => (
                            t.id === card.id
                        ))
                    )
                )
            })
            .catch((err) => alert(err))
    };

    function handleCardClick(card: Card) {
        navigateToCardForm(card);
    }
    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <div style={{ "padding": "5px" }}>
            <Box style={{ maxHeight: '90vh', maxWidth: '90vw', overflow: 'auto' }}>
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid
                            key={card.id}
                            item xs={12} sm={6} md={4} lg={3} onClick={
                                () => {
                                    handleCardClick(card);
                                }
                            } >
                            <div className="hover-div">
                                <div>
                                    <Cards
                                        cvc={card.cvv}
                                        expiry={card.expirationDate}
                                        name={card.cardHolderName}
                                        number={card.cardNumber}
                                        preview={true}
                                    />
                                </div>
                                <div>
                                    <h4>{card.nickname}</h4>
                                </div>
                            </div>

                        </Grid>
                    ))}

                </Grid>
            </Box>
        </div>
    );
}

export default CardsGridComponent;

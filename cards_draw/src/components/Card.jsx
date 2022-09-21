import DrawCard from "../api/services/DrawCard";
import { useState, useEffect } from "react";
import { SUIT_MATCH, VALUE_MATCH, BLACK_CARDS, TOTAL_DECK } from "../helpers/constants";
import cardDrawSound from "../resources/card-draw.mp3";

const Card = (props) => {

    const { status, data, error, isError, isLoading, refetch } = DrawCard.useNewDraw(props.deckId);
    const [oldCard, setOldCard] = useState("");
    const [newCard, setNewCard] = useState("");
    const [matchMessage, setMatchMessage] = useState("");

    const [currentCardCount, setCurrentCardCount] = useState(0);
    const [suitMatches, setSuitMatches] = useState(0);
    const [valueMatches, setValueMatches] = useState(0);
    const [redCardsDrawn, setRedCardsDrawn] = useState(0);
    const [blackCardsDrawn, setBlackCardsDrawn] = useState(0);
    const [redProbability, setRedProbability] = useState(0.00);
    const [blackProbability, setBlackProbability] = useState(0.00);



    useEffect(() => {
        if (status === 'success') {
            console.log(JSON.stringify(data));
        }
    }, [status, data]);

    const cardSound = new Audio(cardDrawSound);


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error! {error.message}</div>
    }

    const CalcSuitMatchProbability = (drawnSuitCards) => {
        return (26 - drawnSuitCards) / (TOTAL_DECK - currentCardCount);
    }

    const DrawNewCard = () => {

        refetch();

        cardSound.play();

        if (newCard == "") {
            setNewCard(data);
        }
        else {
            setOldCard(newCard);
            setNewCard(data);

            if (data.cards[0].suit == newCard.cards[0].suit) {
                setMatchMessage(SUIT_MATCH);
                setSuitMatches(suitMatches + 1);
            }
            else if (data.cards[0].value == newCard.cards[0].value) {
                setMatchMessage(VALUE_MATCH);
                setValueMatches(valueMatches + 1);
            }
            else {
                setMatchMessage("");
            }
            setCurrentCardCount(currentCardCount + 1);

            if (BLACK_CARDS.includes(data.cards[0].suit)) {
                setBlackCardsDrawn(blackCardsDrawn + 1);
                setBlackProbability(CalcSuitMatchProbability(blackCardsDrawn));
            }
            else {
                setRedCardsDrawn(redCardsDrawn + 1);
                setRedProbability(CalcSuitMatchProbability(redCardsDrawn));
            }
        }
    }

    return (
        <>
            <div className="message-box">
                {matchMessage}
            </div>
            <div className="cards-container">
                <div>
                    {
                        <img
                            src={oldCard ? oldCard.cards[0].image : ""}>
                        </img>
                    }
                </div>
                <div>
                    {
                        <img
                            src={newCard ? newCard.cards[0].image : ""}>
                        </img>
                    }
                </div>
            </div>
            <div className="button-container"   >
                {
                    data.remaining > 0
                    &&
                    <button onClick={DrawNewCard}>
                        Draw card
                    </button>
                }
            </div>
            <div className="message-box">
                {
                    data.remaining == 0
                    &&
                    <div>
                        <div>
                            VALUE MATCHES: {valueMatches}
                        </div>
                        <div>
                            SUIT MACTHES: {suitMatches}
                        </div>
                    </div>

                }
            </div>
            <div className="message-box">
                Card {currentCardCount} of 52
            </div>
            <div className="message-box">
                Red Suit Probability: {redProbability}
            </div>
            <div className="message-box">
                Black Suit Probability: {blackProbability}
            </div>
        </>
    );
}

export default Card;

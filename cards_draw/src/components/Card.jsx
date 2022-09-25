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



    //adding a draw sound
    const cardSound = new Audio(cardDrawSound);


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error! {error.message}</div>
    }

    const CalcSuitMatchProbability = (drawnSuitCards) => {
        /*
            To calculate the probability for a suit match we need to divide the avaiable cards of the respective color 
            by the reaming cards in the deck
         */
        return (26 - drawnSuitCards) / (TOTAL_DECK - currentCardCount);
    }

    const DrawNewCard = () => {

        refetch();

        try {
            cardSound.play();
        }
        catch {
            console.log(`An error occured while playing media. Game will play with no sound`);
        }


        //Implement NEW/OLD card logic and populate placeholders
        if (newCard == "") {
            setNewCard(data);
        }
        else {
            setOldCard(newCard);
            setNewCard(data);

            //Check for a Suit Match and display the message
            if (data && data.cards[0].suit == newCard.cards[0].suit) {
                setMatchMessage(SUIT_MATCH);
                setSuitMatches(suitMatches + 1);
            }

            //Check for a Value Match and display the message
            else if (data && data.cards[0].value == newCard.cards[0].value) {
                setMatchMessage(VALUE_MATCH);
                setValueMatches(valueMatches + 1);
            }
            else {
                setMatchMessage("");
            }

            //Count the drawn cards
            setCurrentCardCount(currentCardCount + 1);

            if (data && BLACK_CARDS.includes(data.cards[0].suit)) {
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
                Card {currentCardCount} of {TOTAL_DECK}
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

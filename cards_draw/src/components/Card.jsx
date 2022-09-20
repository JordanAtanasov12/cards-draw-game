import DrawCard from "../api/services/DrawCard";
import { useState, useEffect } from "react";

const Card = (props) => {

    const [oldCard, setOldCard] = useState({});
    const { data, error, isError, isLoading} = DrawCard.useNewDraw(props.props);

    if (isLoading) {
        return <div>Loading...</div>
      }
      if (isError) {
        return <div>Error! {error.message}</div>
      }

    return (
        <>
           <div>
               { 
                <img
                    src={data.cards[0].image}>
                </img> 
               } 
           </div>
        </>
    );
}

export default Card;

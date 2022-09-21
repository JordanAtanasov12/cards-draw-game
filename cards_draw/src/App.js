import CardsDeck from "./api/services/CardsDeck";
import { useState, useEffect } from "react";
import Card from "./components/Card";

const App = () => {

  const { data, error, isError, isLoading } = CardsDeck.useNewDeck();
  //const [deckId, setDeckId] = useState({});

  //useEffect(() => {
  //  setDeckId(data["deck_id"]);
  //}, [data]);

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error! {error.message}</div>
  }

  return (
    <>
        <Card deckId={data.deck_id}/>
    </>

  );
}

export default App;

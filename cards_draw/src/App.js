import CardsDeck from "./api/services/CardsDeck";
import Card from "./components/Card";

const App = () => {

  const { data, error, isError, isLoading } = CardsDeck.useNewDeck();

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>An error occured when trying to load the application -  {error.message}</div>
  }

  return (
    <>
        <Card deckId={data.deck_id}/>
    </>

  );
}

export default App;

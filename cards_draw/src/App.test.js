//import '@testing-library/jest-dom'
//import '@testing-library/jest-dom/extend-expect'
import App from './App';
import CardsDeck from './api/services/CardsDeck';
import DrawCard from './api/services/DrawCard';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { waitFor as WAIT, renderHook } from '@testing-library/react';
import TEST_DECK_ID from './helpers/mockUps';



const createWrapper = () => {
  //creates a new QueryClient for each test
  const queryClient = new QueryClient()
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

test("Initilizes UseQuery", async () => {
  const { result } = renderHook(() => CardsDeck.useNewDeck(), {
    wrapper: createWrapper()
  })
})

test("Expect deck API call to return a new deck", async () => {
  const { result, waitFor } = renderHook(() => CardsDeck.useNewDeck(), {
    wrapper: createWrapper()
  });
  //wait until the query has passed to a success state
  await WAIT(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toBeDefined();
});

test("Expect card API call to fail with worng deck ID", async () => {
  
  const { result } = renderHook(() => DrawCard.useNewDraw(TEST_DECK_ID), {
    wrapper: createWrapper()
  });
  //wait until the query has passed to a success state
  await WAIT(() => expect(result.current.isSuccess).toBe(false));
  console.log(result);
});

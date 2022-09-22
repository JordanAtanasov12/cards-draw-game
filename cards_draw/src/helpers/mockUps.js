import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export const NEW_DECK_RESPONSE = `{
    "success": true,
    "deck_id": "3p40paa87x90",
    "shuffled": true,
    "remaining": 52
}`;

export function useCustomDeckCall() {
    return useQuery(['useNewDeck'], () => NEW_DECK_RESPONSE);
  }

export const TEST_DECK_ID = "wrong_id";

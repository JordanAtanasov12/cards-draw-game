import client from "../client";
import { useQuery } from "react-query";

export default {
  useNewDraw: (deckId) =>
    useQuery(["newDraw", deckId], async () => {
      try {
        return await client.get(`${deckId}/draw/?count=1`).json();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    {
      staleTime: Infinity,
      manual: true
    }
    ),
};

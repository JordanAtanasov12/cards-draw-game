import client from "../client";
import { useQuery } from "react-query";

/*
  Using react-query, which is a handy library for fetching, caching and updating data without
  having to touch the global state.
  This way, when necessary to get the data, we just need to use a hook in the respective component  
*/

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

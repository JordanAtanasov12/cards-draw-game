import client from "../client";
import { useQuery } from "react-query";

/*
  Using react-query, which is a handy library for fetching, caching and updating data without
  having to touch the global state.
  This way, when necessary to get the data, we just need to use a hook in the respective component  
*/
export default {
  useNewDeck: () =>
    useQuery("newDeck", async () => {
      try {
        return await client.get(`new/shuffle/?deck_count=1`).json();
      } catch (error) {
        return Promise.reject(error);
      }
    },
      {
        staleTime: Infinity
      }
    ),
};

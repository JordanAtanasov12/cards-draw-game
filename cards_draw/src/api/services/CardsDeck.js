import client from "../client";
import { useQuery } from "react-query";

export default {
  useNewDeck: () =>
    useQuery("newDeck", async () => {
      try {
        return await client.get(`new/shuffle/?deck_count=1`).json();
      } catch (error) {
        return Promise.reject(error);
      }
    }),
};

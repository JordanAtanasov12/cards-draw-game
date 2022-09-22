import ky from "ky";

const client = ky.extend({
  prefixUrl: "https://deckofcardsapi.com/api/deck",
  hooks: {
    beforeRequest: [
      (request) => {
        // Here we can do  something before every request
        // This is a good place to authorize request if needed
      }
    ],
    afterResponse: [
      (response) => {
        // Here we can do something after every response
        // For example, check status code etc...
      }
    ]
  }
});

export default client;

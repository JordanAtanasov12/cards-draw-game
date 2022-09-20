import ky from "ky";

const client = ky.extend({
  prefixUrl: "https://deckofcardsapi.com/api/deck",
  hooks: {
    beforeRequest: [
      (request) => {
        // Do something before every request
        // This is a good place to authorize request if needed
      }
    ],
    afterResponse: [
      (response) => {
        // Do something after every response
        // For example, check status code etc...
      }
    ]
  }
});

export default client;

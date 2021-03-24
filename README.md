# Frontend Task

## Introduction

This is a simple task to create a suitable single page application front-end incorporating:

 * user interaction
 * interrogating an API - namely the **Deck of Cards API** (https://deckofcardsapi.com)
 * logic
 * displaying text and images
 * testing

The solution **must** use HTML, CSS and JavaScript. You can use whatever framework or dependencies you require - e.g. React, Vue.js, Bootstrap, Tailwind CSS. You could even use no external dependencies - it's up to you.

## Minimum Requirements

**TIP:** Read the documentation for the Deck of Cards API carefully

 * Initialise a shuffled single deck of cards
 * Provide a button that will 'draw' a card from that deck
 * Display an image of the newly drawn card, with an image of the previous card to its left (if there is no previous card, display a placeholder)
 * If the _value_ of the newly drawn card matches the previous one, display the message `SNAP VALUE!`
 * If the _suit_ of the newly drawn card matches the previous one, display the message `SNAP SUIT!`
 * If neither the value nor suit match, display no message
 * Once all 52 cards have been drawn, remove the button and instead display the total number of value matches and the total number of suit matches
 * A suite of suitable tests should be created for these requirements

## UI Wireframes

<p align="center">
  <img src="https://user-images.githubusercontent.com/659658/111351711-5def5f00-867b-11eb-8550-797762f6b1f1.png" alt="Frontend task UI"/>
</p>

## Optional Requirements

 * A counter, displaying the current card number (or how many cards are left) - e.g. `Card 12 of 52` or `29 cards remaining`
 * The probability that the next card drawn will either be a value or suit match (this requires keeping track of what cards have already been drawn)
 * Some animation and/or sound effects

## Submission

Here's what you'll need to send us:

 * A link to a **public** GitHub repo that you have created, containing the code
 * It should contain a suite of tests (using whichever test framework you prefer)
 * It should also contain a README.md file explaining how to run the app and its tests
 * You may also send us a link to a location hosting your code (for example, Netlify)

**The task should take around 2-3 hours.**

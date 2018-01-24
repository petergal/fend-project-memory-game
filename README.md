# Memory Game Project

This is another flavor of the popular card matching game (also known as Concentration) which you can play in your browser.

## Instructions to play the game

Simply download, unzip and click the `index.html` (Internet connection is required to start the game).

## How the game is played

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down.

The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

### How the game works in detail

The player flips one card over to reveal its underlying symbol. The player then turns over a second card, trying to find the corresponding card with the same symbol. If the cards match, both cards stay flipped over. If the cards do not match, both cards are flipped face down. The game ends once all cards have been correctly matched.

### What can you expect from the game

The game has a scoreboard that counts the moves, provides a star rating and shows a timer. If you finish and all cards match, the final score is shown.

## Development

### Game dependencies

You need connection to the internet to start the game:
- [fontawesome](http://fontawesome.io) is provided by fontawesome.io.
- [Font Coda](https://fonts.google.com/specimen/Coda) is provided by Google Fonts.

### Resources used to develop the game
- `index.html` including external stylesheets (see [Game dependencies](#game-dependencies) above)
- `js/app.js`, including:
  - shuffle function from [stackoverflow.com](https://stackoverflow.com/a/2450976)
  - timer function from [www.w3schools.com](https://www.w3schools.com)
- `css/app.css`

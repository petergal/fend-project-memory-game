/**
 * @fileOverview Javascript file of Memory Game Project.
 * @author <a href="mailto:petergalch@mac.com">Peter Gal</a>
 */
/**
 * Array for holding two open cards (one move).
 * @type {Array}
 */
let openCards = new Array(2);
/**
 * Currently opened cards.
 * @type {Number}
 */
let cardCounter = Number(0);
/**
 * Moves the player makes. Used for the score panel and calculation of the star rating and
 * starCounter.
 * @type {Number}
 */
let moveCounter = Number(0);
/**
 * Used to display the star rating on the result page.
 * @type {Number}
 */
let starCounter = Number(0);
/**
 * Id of game timer.
 * @type {Number}
 */
let intervalId = null;
init();

/**
 * Initialize the game.
 * Shuffle the cards and initialize the score panel.
 */
function init() {
  let newCardList = createNewDeck();
  insertNewDeck(newCardList);
  initScorePanel();
  // Show game and hide result page
  document.querySelector('header').classList.remove("hide");
  document.querySelector('.score-panel').classList.remove("hide");
  document.querySelector('.deck').classList.remove("hide");
  document.querySelector('.result').classList.add("hide");
}

/**
 * Shuffle the cards.
 * @return {object} all card elements
 */
function createNewDeck() {
  // 'LI' elements represent the cards
  const cardList = shuffle([...document.getElementsByClassName('card')]);
  const newCardList = new Array();
  // Hide the cards
  cardList.forEach(function(element) {
    element.classList.remove('match');
    element.classList.remove('open');
    element.classList.remove('show');
    newCardList.push(element);
  });
  return newCardList;
}

/**
 * Remove the last card deck and append the new shuffled deck.
 * @param  {object} newCardList
 */
function insertNewDeck(newCardList) {
  const fragment = document.createDocumentFragment();
  newCardList.forEach(function(element) {
    fragment.appendChild(element);
  });
  removeCurrentDeck();
  document.querySelector('.deck').appendChild(fragment);
}

/**
 * Remove current deck.
 */
function removeCurrentDeck() {
  if (document.querySelector('.deck') !== null) {
    while (document.querySelector('.deck').firstChild) {
      document.querySelector('.deck').removeChild(document.querySelector(
          '.deck')
        .firstChild);
    }
  }
}

/**
 * Initialize the score panel with move counter,
 * star counter, star symbols and the timer.
 */
function initScorePanel() {
  openCards = new Array(2);
  cardCounter = Number(0);
  moveCounter = Number(0);
  document.getElementsByClassName('moves')[0].textContent = 0;
  starCounter = Number(3);
  document.querySelector('.stars').innerHTML =
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
  intervalId = null;
  document.getElementById('realtime').textContent = '00:00';
}

/**
 * Timer function from www.w3schools.com, with changes
 */
function countTimer() {
  const time_shown = document.getElementById('realtime').textContent;
  const time_chunks = time_shown.split(":");
  let mins, secs;
  mins = Number(time_chunks[0]);
  secs = Number(time_chunks[1]);
  secs++;
  if (secs == 60) {
    secs = 0;
    mins = mins + 1;
  }
  if (mins == 60) {
    mins = 0;
  }
  document.getElementById('realtime').textContent =
    format(mins) + ":" + format(secs);
}

/**
 * Format the digits of the timer.
 * @param  {Number} digit
 * @return {string} formatted digit
 */
function format(digit) {
  let zpad = digit + '';
  if (digit < 10) {
    zpad = '0' + zpad;
  }
  return zpad;
}

/**
 * Event listener definition and implementation of event handler function
 * for card click events.
 */
document.getElementsByClassName('deck')[0].addEventListener('click',
  function(event) {
    /**
     * Event target element
     * @type {object}
     */
    let cardElement = event.target.closest('LI');
    // Validate a click event
    if ((cardElement.nodeName !== null) && (cardElement.nodeName === 'LI') &&
      (cardCounter < 2) && !(cardElement.classList.contains('open'))) {
      // Start timer at first card click
      if (intervalId === null) {
        document.getElementById('realtime').textContent = '00:00';
        intervalId = setInterval(countTimer, 1000);
      }
      cardCounter++;
      // Show card
      cardElement.classList.add('open');
      cardElement.classList.add('show');
      // One card opened with this click
      if (cardCounter === 1) {
        openCards[0] = cardElement;
        // Two cards opened with this click
      } else {
        openCards[1] = cardElement;
        // The cards match
        if (openCards[0].firstElementChild.className === openCards[1].firstElementChild
          .className) {
          openCards[0].classList.add('match');
          openCards[1].classList.add('match');
          cardCounter = 0;
          // The cards do not match
        } else {
          setTimeout(function closeCards() {
            openCards.forEach(function(card) {
              card.classList.remove('open');
              card.classList.remove('show');
            });
            cardCounter = 0;
          }, 900);
        }
        // Update score after every move
        updateScore();
        // All cards matched/game end
        if (document.getElementsByClassName('match').length === 16) {
          // Stopping the timer
          clearInterval(intervalId);
          intervalId = null;
          showResultPage();
        }
      }
    }
  });

/**
 * Event listener definition for restart function.
 */
document.getElementsByClassName('restart')[0].addEventListener('click', init);

/**
 * Update score (moves and stars) and setting of the star counter
 * after every move.
 */
function updateScore() {
  moveCounter += 1;
  document.getElementsByClassName('moves')[0].textContent = moveCounter;
  let stars = document.getElementsByClassName('stars')[0];
  switch (moveCounter) {
    case 16:
      setStarEmpty(stars.children[2].children[0]);
      starCounter = 2;
      break;
    case 24:
      setStarEmpty(stars.children[1].children[0]);
      starCounter = 1;
      break;
  }
}

/**
 * Set star symbol open.
 * @param {object} node star
 */
function setStarEmpty(node) {
  node.classList.remove('fa-star');
  node.classList.add('fa-star-o');
}

/**
 * Show result page (and hide game part).
 */
function showResultPage() {
  // Update the score data
  document.getElementsByClassName('movesTotal')[0].textContent = moveCounter;
  document.getElementsByClassName('starCounter')[0].textContent = starCounter;
  if (starCounter === 1) {
    document.getElementsByClassName('starText')[0].textContent = 'Star!';
  } else {
    document.getElementsByClassName('starText')[0].textContent = 'Stars!';
  }
  document.getElementsByClassName('time')[0].textContent =
    document.getElementById('realtime').textContent;
  // Event listener definition for 'Play again' button
  document.getElementById('play-btn').addEventListener('click', init);
  // Hide the game and show the result page
  document.querySelector('header').classList.add("hide");
  document.querySelector('.score-panel').classList.add("hide");
  document.querySelector('.deck').classList.add("hide");
  document.querySelector('.result').classList.remove("hide");
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

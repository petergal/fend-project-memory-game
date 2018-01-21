let openCards = new Array(2);
let cardCounter = Number(0);
let moveCounter = Number(0);
let starCounter = Number(0);
/**
 * Id of game timer.
 * @type {Number}
 */
let intervalId = null;
init();

// setup the game
function init() {
  document.querySelector('header').classList.remove("hide");
  document.querySelector('.score-panel').classList.remove("hide");
  document.querySelector('.deck').classList.remove("hide");
  document.querySelector('.result').classList.add("hide");
  let newCardList = createNewDeck();
  insertNewDeck(newCardList);
  initScorePanel();
}

function initScorePanel() {
  document.getElementsByClassName('moves')[0].textContent = 0;
  document.querySelector('.stars').innerHTML =
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  moveCounter = Number(0);
  starCounter = Number(3);
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  document.getElementById('realtime').textContent = '00:00';
}

function createNewDeck() {
  const cardList = shuffle([...document.getElementsByClassName('card')]);
  const newCardList = new Array();
  cardList.forEach(function(element) {
    element.classList.remove('match');
    element.classList.remove('open');
    element.classList.remove('show');
    newCardList.push(element);
  });
  return newCardList;
}

function insertNewDeck(newCardList) {
  const fragment = document.createDocumentFragment();
  newCardList.forEach(function(element) {
    fragment.appendChild(element);
  });
  removeCurrentDeck();
  document.querySelector('.deck').appendChild(fragment);
}

function removeCurrentDeck() {
  if (document.querySelector('.deck') !== null) {
    while (document.querySelector('.deck').firstChild) {
      document.querySelector('.deck').removeChild(document.querySelector(
          '.deck')
        .firstChild);
    }
  }
}

// Timer function from www.w3schools.com, with changes
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

function format(digit) {
  let zpad = digit + '';
  if (digit < 10) {
    zpad = '0' + zpad;
  }
  return zpad;
}

/**
 * Event listener definition and implementation of event handler function for card click events.
 */
document.getElementsByClassName('deck')[0].addEventListener('click',
  function(event) {
    /**
     * Event target element
     * @type {object}
     */
    let cardElement = event.target.closest('LI');
    /** Validate wheter card can be processed. */
    if ((cardElement.nodeName !== null) && (cardElement.nodeName === 'LI') &&
      (cardCounter < 2) && !(cardElement.classList.contains('open'))) {
      /** Start timer at first card click. */
      if (intervalId === null) {
        document.getElementById('realtime').textContent = '00:00';
        intervalId = setInterval(countTimer, 1000);
      }
      cardCounter++;
      cardElement.classList.add('open');
      cardElement.classList.add('show');
      /** One card openend. Save the card. */
      if (cardCounter === 1) {
        openCards[0] = cardElement;
      } else {
        openCards[1] = cardElement;
        /** Two cards openend and match. */
        if (openCards[0].firstElementChild.className === openCards[1].firstElementChild
          .className) {
          openCards[0].classList.add('match');
          openCards[1].classList.add('match');
          cardCounter = 0;
          /** All cards matched/game end. */
          if (document.getElementsByClassName('match').length === 16) {
            /** Stop the timer. */
            clearInterval(intervalId);
            intervalId = null;
            showResultPage();
          }
          /** Two cards opened and do not match. */
        } else {
          setTimeout(function closeCards() {
            openCards.forEach(function(card) {
              card.classList.remove('open');
              card.classList.remove('show');
            });
            cardCounter = 0;
          }, 900);
        }
        incMoveCounter();
        setScorePanel();
      }
    }
  });

document.getElementsByClassName('restart')[0].addEventListener('click', init);

function incMoveCounter() {
  moveCounter += 1;
  document.getElementsByClassName('moves')[0].textContent = moveCounter;
}

function allCardsMatched() {
  if (document.getElementsByClassName('match').length === 16) {
    return true;
  }
}

function setScorePanel() {
  let stars = document.getElementsByClassName('stars')[0];
  switch (moveCounter) {
    case 12:
      setStarHalf(stars.children[2].children[0]);
      break;
    case 16:
      setStarEmpty(stars.children[2].children[0]);
      break;
    case 20:
      setStarHalf(stars.children[1].children[0]);
      break;
    case 24:
      setStarEmpty(stars.children[1].children[0]);
      break;
    case 28:
      setStarHalf(stars.children[0].children[0]);
      break;
    case 32:
      setStarEmpty(stars.children[0].children[0]);
      break;
  }
}

function setStarEmpty(node) {
  node.classList.remove('fa-star');
  node.classList.remove('fa-star-half-o');
  node.classList.add('fa-star-o');
  decrStarCounter();
}

function setStarHalf(node) {
  node.classList.remove('fa-star');
  node.classList.remove('fa-star-o');
  node.classList.add('fa-star-half-o');
  decrStarCounter();
}

function decrStarCounter() {
  starCounter -= 0.5;
}

function showResultPage() {
  document.querySelector('header').classList.add("hide");
  document.querySelector('.score-panel').classList.add("hide");
  document.querySelector('.deck').classList.add("hide");
  document.querySelector('.result').classList.remove("hide");
  document.getElementsByClassName('movesTotal')[0].textContent = moveCounter;
  updateStarCounter();
  setEndTime();
  document.getElementById('play-btn').addEventListener('click', init);
}

function updateStarCounter() {
  document.getElementsByClassName('starCounter')[0].textContent = starCounter;
  if (starCounter === 1) {
    document.getElementsByClassName('starText')[0].textContent = 'Star!';
  }
}

function setEndTime() {
  document.getElementsByClassName('time')[0].textContent =
    document.getElementById('realtime').textContent;
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

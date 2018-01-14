//TODO
//initScorePanel: reset starElements
//displayResult: fix/test
//implement result page
//openCards redesign

let openCards = new Array();
let moveCounter = Number(0);
/*
 * inital function to setup the game
 * called from index.html and 'Play Again' button.
 */
function init() {
  initScorePanel();
  let newCardList = createNewDeck();
  removePreviousDeck();
  insertNewDeck(newCardList);
}

function initScorePanel() {
  document.getElementsByClassName('moves')[0].textContent = 0;
  // let starElements = document.querySelector('.fa-star');
  // if (starElements !== null) {
  //   starElements.forEach(function(element) {
  //     element.classList.remove('fa-star');
  //     element.classList.add('fa-star-o');
  //   });
  // }
  // starElements = document.querySelector('.fa-star-half-o');
  // if (starElements !== null) {
  //   starElements.forEach(function(element) {
  //     element.classList.remove('fa-star-half-o');
  //     element.classList.add('fa-star-o');
  //   });
  // }
}

function createNewDeck() {
  const cardList = shuffle([...document.getElementsByClassName('card')]);
  const newCardList = new Array();
  cardList.forEach(function(element) {
    newCardList.push(element);
  });
  return newCardList;
}

function removePreviousDeck() {
  while (document.querySelector('.deck').firstChild) {
    document.querySelector('.deck').removeChild(document.querySelector('.deck')
      .firstChild);
  }
}

function insertNewDeck(newCardList) {
  const fragment = document.createDocumentFragment();
  newCardList.forEach(function(element) {
    fragment.appendChild(element);
  });
  document.querySelector('.deck').appendChild(fragment);
}

// Eventlistener for cards
document.getElementsByClassName('deck')[0].addEventListener('click',
  cardClicked);

// Eventlistener for game reset
document.getElementsByClassName('restart')[0].addEventListener('click', init);


function cardClicked(evt) {
  //timeout running
  if (openCards.length === 2) {
    return;
  }
  showCard(evt);
  saveCard(evt.target);
  compareCards();
  if (document.getElementsByClassName('match').length === 16) {
    displayResult();
  }
}

function showCard(evt) {
  evt.target.classList.add('open');
  evt.target.classList.add('show');
}

function saveCard(cardElement) {
  openCards.push(cardElement);
}

function compareCards() {
  if (openCards.length === 2) {
    incMoveCounter();
    displayMoveCounter();
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild
      .className) {
      setTimeout(function setMatched() {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards = new Array();
      }, 500);
    } else {
      setTimeout(function closeCards() {
        setClassClosed(openCards[0]);
        setClassClosed(openCards[1]);
        openCards = new Array();
      }, 1000);
    }
  }
}

function setClassClosed(element) {
  element.classList.remove('open');
  element.classList.remove('show');
}

function incMoveCounter() {
  moveCounter += 1;
}

function displayMoveCounter() {
  document.getElementsByClassName('moves')[0].textContent = moveCounter;
}

function displayResult() {
  if (moveCounter < 20) {
    document.getElementsByClassName('stars')[0].childNodes.toggle('fa-star');
    document.getElementsByClassName('stars')[1].childNodes.toggle('fa-star');
    document.getElementsByClassName('stars')[2].childNodes.toggle('fa-star');
  } else if (moveCounter < 25) {
    document.getElementsByClassName('stars')[0].childNodes.toggle('fa-star');
    document.getElementsByClassName('stars')[1].childNodes.toggle('fa-star');
    document.getElementsByClassName('stars')[2].childNodes.toggle(
      'fa-star-half-o');
  } else if (moveCounter < 30) {
    document.getElementsByClassName('stars')[0].childNodes.toggle('fa-star');
    document.getElementsByClassName('stars')[1].childNodes.toggle('fa-star');
  } else if (moveCounter < 35) {
    document.getElementsByClassName('stars')[0].childNodes.toggle('fa-star');
    document.getElementsByClassName('stars')[1].childNodes.toggle(
      'fa-star-half-o');
  } else if (moveCounter < 40) {
    document.getElementsByClassName('stars')[0].childNodes.toggle('fa-star');
  } else if (moveCounter < 45) {
    document.getElementsByClassName('stars')[0].childNodes.toggle(
      'fa-star-half-o');
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


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

//TODO
//implement result page

let openCards = new Array();
let moveCounter = Number(0);

// inital function to setup the game
function init() {
  initScorePanel();
  let newCardList = createNewDeck();
  removePreviousDeck();
  insertNewDeck(newCardList);
}

function initScorePanel() {
  document.getElementsByClassName('moves')[0].textContent = 0;
  document.querySelector('.stars').innerHTML =
    `<li><i class="fa fa-star-o"></i></li>
    <li><i class="fa fa-star-o"></i></li>
    <li><i class="fa fa-star-o"></i></li>`;
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
  if (timeoutRunning()) {
    return;
  }
  showCard(evt);
  saveCard(evt.target);
  compareCards();
}

function timeoutRunning() {
  if (openCards.length === 2) {
    return true;
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
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild
      .className) {
      setTimeout(function setMatched() {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards = new Array();
        if (document.getElementsByClassName('match').length === 16) {
          setScorePanel();
        }
      }, 500);
    } else {
      setTimeout(function closeCards() {
        setCardClosed(openCards[0]);
        setCardClosed(openCards[1]);
        openCards = new Array();
      }, 900);
    }
  }
}

function setCardClosed(element) {
  element.classList.remove('open');
  element.classList.remove('show');
}

function incMoveCounter() {
  moveCounter += 1;
  document.getElementsByClassName('moves')[0].textContent = moveCounter;
}

function setScorePanel() {
  let nodeList = document.querySelectorAll('.fa-star-o');
  //first star
  if (moveCounter < 28) {
    setStar(nodeList[0]);
  } else if (moveCounter < 32) {
    setStarHalf(nodeList[0]);
  }
  //second star
  if (moveCounter < 20) {
    setStar(nodeList[1]);
  } else if (moveCounter < 24) {
    setStarHalf(nodeList[1]);
  }
  //third star
  if (moveCounter < 12) {
    setStar(nodeList[2]);
  } else if (moveCounter < 16) {
    setStarHalf(nodeList[2]);
  }
}

function setStar(node) {
  node.classList.remove('fa-star-o');
  node.classList.add('fa-star');
}

function setStarHalf(node) {
  node.classList.remove('fa-star-o');
  node.classList.add('fa-star-half-o');
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

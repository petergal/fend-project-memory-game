let openCards = new Array();
let moveCounter = Number(0);
let starCounter = Number(0);

// setup the game
function init() {
  initScorePanel();
  let newCardList = createNewDeck();
  insertNewDeck(newCardList);
}

function initScorePanel() {
  document.getElementsByClassName('moves')[0].textContent = 0;
  document.querySelector('.stars').innerHTML =
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  openCards = new Array();
  moveCounter = Number(0);
  starCounter = Number(3);
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
    setScorePanel();
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild
      .className) {
      setTimeout(function setMatched() {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards = new Array();
        if (allCardsMatched()) {
          showResultPage();
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

function incMoveCounter() {
  moveCounter += 1;
  updateMoveCounter();
}

function updateMoveCounter() {
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
  removeGame();
  insertResultPage();
}

function removeGame() {
  const headerElement = document.querySelector('header');
  headerElement.parentElement.removeChild(headerElement);
  const scoreElement = document.querySelector('.score-panel');
  scoreElement.parentElement.removeChild(scoreElement);
  const deckElement = document.querySelector('.deck');
  deckElement.parentElement.removeChild(deckElement);
}

function insertResultPage() {
  const containerElement = document.querySelector('.container');
  const htmlTextToAdd =
    `<div class="result">
    <h2>Congratulations! You did it!</h2>
    <p >
      With <span class="moves"></span> Moves and <span class="starCounter"></span> Stars!
    </p>
      <button  name="button">Klick mich</button>
    </div>`
  containerElement.insertAdjacentHTML('afterbegin', htmlTextToAdd);
  updateMoveCounter();
  updateStarCounter();
}

function updateStarCounter() {
  document.getElementsByClassName('starCounter')[0].textContent = starCounter;
}

function setCardClosed(element) {
  element.classList.remove('open');
  element.classList.remove('show');
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

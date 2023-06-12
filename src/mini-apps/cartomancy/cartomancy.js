// all driver code should be within this event listener, ie adding other event listeners and calling on imported engine

import FortuneEngine from '../../engine.js';
import setMusicState from '../../autoplay.js';

const engine = new FortuneEngine();
const APP_NAME = 'cartomancy';

let cardsPicked = 0; // counter when 3 cards are picked

// Card selector counter
let i = 0;

// name of container card is dragged to
let targetName; // eslint-disable-line

// Allows cards to be selectable and dragged to satisfied place
let sourceContainerID = '';
let droppedID = '';
const card1s = document.querySelectorAll('.card1');
const card2s = document.querySelectorAll('.card2');
const card3s = document.querySelectorAll('.card3');
const pickContainer1 = document.getElementById('pick-container1');
const pickContainer2 = document.getElementById('pick-container2');
const pickContainer3 = document.getElementById('pick-container3');

const card1sArray = Array.from(card1s);
const card2sArray = Array.from(card2s);
const card3sArray = Array.from(card3s);

// make the cards of each row draggable
card1s.forEach(card => {
  card.addEventListener('dragstart', dragStart);
});
card2s.forEach(card => {
  card.addEventListener('dragstart', dragStart);
});
card3s.forEach(card => {
  card.addEventListener('dragstart', dragStart);
});

// setting listeners for the containers to leave the cards
pickContainer1.addEventListener('drop', dropped);
pickContainer1.addEventListener('dragenter', cancelDefault);
pickContainer1.addEventListener('dragover', cancelDefault);

pickContainer2.addEventListener('drop', dropped);
pickContainer2.addEventListener('dragenter', cancelDefault);
pickContainer2.addEventListener('dragover', cancelDefault);

pickContainer3.addEventListener('drop', dropped);
pickContainer3.addEventListener('dragenter', cancelDefault);
pickContainer3.addEventListener('dragover', cancelDefault);

/**
 * Allows the card to be hovered and eventually dropped into the respective container
 * @param {dragover} e - Object that contains information about the container that is being dragged over, including position coordinates.
 */
function cancelDefault (e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

/**
 * Keeps track of information when a card is begun to be dragged. Called when starting to hold a card. Final place where the card is dropped compares information set here.
 *
 * @param {dragstart} e - Object that has information of where a card has begun to be dragged from.
 */
function dragStart (e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  sourceContainerID = this.parentElement.className;
  droppedID = this.className;
}

/**
 * Keeps track of information when a card is begun to be dragged. Called when starting to hold a card. Final place where the card is dropped compares information set here.
 *
 * @param {dragstart} e - Object that has information of where a card has begun to be dragged from.
 */
function dropped (e) {
  targetName = e.target.id;

  if (this.id !== sourceContainerID) {
    cancelDefault(e);
    if (droppedID === 'card1') {
      const droppedElement = card1sArray[i];
      e.target.appendChild(card1sArray[i]);
      droppedElement.draggable = false;
      cardsPicked++;
      i++;
    } else if (droppedID === 'card2') {
      const droppedElement = card2sArray[i];
      e.target.appendChild(card2sArray[i]);
      droppedElement.draggable = false;
      cardsPicked++;
      i++;
    } else if (droppedID === 'card3') {
      const droppedElement = card3sArray[i];
      e.target.appendChild(card3sArray[i]);
      droppedElement.draggable = false;
      cardsPicked++;
      i++;
    }
    if (document.getElementById('pick-container1').children.length > 0) {
      document.getElementById('pick-container1').style.userSelect = 'none';
      document.getElementById('pick-container1').style.pointerEvents = 'none';
    }
    if (document.getElementById('pick-container2').children.length > 0) {
      document.getElementById('pick-container2').style.userSelect = 'none';
      document.getElementById('pick-container2').style.pointerEvents = 'none';
    }
    if (document.getElementById('pick-container3').children.length > 0) {
      document.getElementById('pick-container3').style.userSelect = 'none';
      document.getElementById('pick-container3').style.pointerEvents = 'none';
    }
  }

  // Enable reset button after card is picked
  if (cardsPicked === 1) {
    document.querySelector('#reset-button').style.display = 'flex';
  }

  // Once user selects 3 cards, their fortune can be read
  if (cardsPicked === 3) {
    document.querySelectorAll('.read-fortune-space')[0].style.display = 'flex';
  }
}

/**
 * Begins reading the three tarot cards selected by the reader.
 *
 * Overrides styling to display cards in a row by adding class and removes read fortune button. Then loops through each of the three fortunes and adds them through calling organizeCards() for each fortune.
 *
 * @param {div} centerDiv - the main <div> of the page. Argument here allows to make changes to whatever may be appropriate in order to read the cards.
 *
 */
function readCards (centerDiv) {
  // animations, grouping etc here
  centerDiv.classList.add('container');
  document.getElementById('read-fortune-button').style.display = 'none';

  // begins the stage of reading cards, 1-3 choices
  const receivedFortunes = engine.get_random_subset(3);

  for (let j = 1; j < 4; j++) { // loop through first 3
    const picking = document.getElementById(`pick-container${j}`);
    organizeCards(picking, receivedFortunes[j - 1]);
  }
}

/**
 * Sets up the fortune and the place for the fortune.
 * Cleans up the element <div> (assuming it has 1 child) where the cards are picked and creates and adds the elements in the
 * structure shown below. It also makes the bg image transparent.
 *
 *  <div class ='card-show'>
 *    <div class ='image'>
 *      <img href = "#" src='<imgsrc>'>
 *    </div>
 *    <div class='content'>
 *      <p class ='read-fortune'>information</p>
 *    </div>
 *  </div>
 *
 *
 * @param {div} pick - div that holds a card.
 * @param {Object} fortune - A fortune from .json file, containing fortune fields (like the name, result, etc)
 */
function organizeCards (pick, fortune) {
  pick.removeChild(pick.firstChild);

  pick.classList.remove('pick-container');
  pick.classList.add('read-container');

  const indCard = document.createElement('div');
  const indCardImageContainer = document.createElement('div');
  const indCardImage = document.createElement('img');
  const content = document.createElement('div');
  const fDescr = document.createElement('p');
  const node = document.createTextNode(fortune.result); // add fortune text

  // add attributes
  fDescr.classList.add('read-fortune');
  indCard.classList.add('card-show');
  indCardImageContainer.classList.add('image');
  indCardImage.setAttribute('href', '#');
  indCardImage.setAttribute('src', `/src/assets/cart/${fortune.image}.png`);
  content.classList.add('content');

  // nest them by adding as children
  fDescr.appendChild(node);

  indCard.appendChild(indCardImageContainer);
  indCardImageContainer.appendChild(indCardImage);

  content.appendChild(node);
  indCard.appendChild(content);

  // remove the image of the back of the card
  // assumes the two children, img and container are here
  pick.appendChild(indCard);
}

document.addEventListener('DOMContentLoaded', async () => {
  // Read JSON File
  // Taken of: https://www.thetarotguide.com/
  await engine.db_reader(`./${APP_NAME}.json`);

  /**
   * Music on/off image element (part of general UI)
   */
  const musicImage = document.getElementById('music');

  // Background music
  const bgm = new Audio('/src/assets/cart/cartomancy-bgm.mp3'); //  eslint-disable-line
  bgm.loop = true;

  //  Attempt to autoplay background music
  bgm.play().then(() => {
    //  Autoplay started!
  }).catch(() => {
    //  Autoplay failed - set music to off
    musicEnabled = false;
    setMusicState(bgm, musicImage, musicEnabled);
  });

  // Buttons
  let musicEnabled = true;
  let showInfo = false;

  // Buttons
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const readFortuneButton = document.getElementById('read-fortune-button');
  const startButton = document.getElementById('start-button');

  const origDeck = document.getElementById('card-display');
  const centerDiv = document.getElementById('center-div');

  startButton.addEventListener('click', (e) => {
    document.getElementById('intro').style.display = 'none';
    origDeck.style.display = 'initial';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('pick-container1').style.display = 'flex';
    document.getElementById('pick-container2').style.display = 'flex';
    document.getElementById('pick-container3').style.display = 'flex';
  });

  // button display:'flex' after 3 cards
  readFortuneButton.addEventListener('click', (e) => {
    document.getElementById('pick-container1').style.userSelect = 'auto';
    document.getElementById('pick-container1').style.pointerEvents = 'auto';
    document.getElementById('pick-container2').style.userSelect = 'auto';
    document.getElementById('pick-container2').style.pointerEvents = 'auto';
    document.getElementById('pick-container3').style.userSelect = 'auto';
    document.getElementById('pick-container3').style.pointerEvents = 'auto';
    // put away animation
    origDeck.classList.add('hide-cards');

    setTimeout(() => {
      origDeck.remove();

      // start reading cards
      readCards(centerDiv);
    }, 1000);
  });

  musicButton.addEventListener('click', (e) => {
    console.log('music');
    const musicImg = document.getElementById('music');
    if (musicEnabled) {
      musicImg.src = '/src/assets/audio_off.png';
      bgm.pause();
    } else {
      musicImg.src = '/src/assets/audio_on.png';
      bgm.play();
    }
    musicEnabled = !musicEnabled;
  });

  // toggle info popup
  infoButton.addEventListener('click', (e) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });

  // Reset Button
  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', (e) => {
    window.location.reload();
  });
});

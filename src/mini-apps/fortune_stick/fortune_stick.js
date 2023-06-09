
/*  Steps:

1. After selecting the Fortune Sticks continent, the user is greeted with the Fortune Sticks 
   application with the title, and 4 fortune categories to select from. There are also menu buttons
   on the corners of the screen to toggle music, return home, and receive more info.
2. Once the user clicks on one of the 4 categories (career, wealth, health, relationship), the card
   has an animation, and the cards fade out and disappear.
3. The fortune received for the user's category is then displayed in a text writing animation, and a
   reset button appears if the user would like to receive another fortune.
4. Clicking on the reset button then resets the page to the initial start state of the page.

*/

/* Imports */

import FortuneEngine from '../../engine.js';

/* Global variables */
const APP_NAME = 'fortune_stick';
const TYPING_SPEED = 35;

const engine = new FortuneEngine();
const bgm = new Audio('../../../assets/stick/bgm-background.mp3'); //  eslint-disable-line
const categories = ['career', 'wealth', 'health', 'relationship'];

let selectedCategory = '';
let musicEnabled = true;
let showInfo = false;

/* Waiting for DOM to have loaded */
document.addEventListener('DOMContentLoaded', async () => {

  /* Read JSON File */

  await engine.db_reader(`./${APP_NAME}.json`);

  /* Play background music */

  let playMusic = bgm.play();
  if (playMusic !== undefined) {
    playMusic.then( () => {
      bgm.loop = true;
    }).catch( (err) => {
      console.log(err);
      musicEnabled = false;
      const musicImg = document.querySelectorAll('img')[0];
      musicImg.src = '../assets/audio_off.png';
    });
  }

  /* Add event listeners to menu corner buttons */

  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const resetButton = document.getElementById('reset-button');

  /* Music button */

  musicButton.addEventListener('click', (e) => {
    console.log('music');
    const musicImg = document.getElementById('music');
    if (musicEnabled) {
      musicImg.src = '../../../assets/audio_off.png';
      bgm.pause();
    } else {
      musicImg.src = '../../../assets/audio_on.png';
      bgm.play();
    }
    musicEnabled = !musicEnabled;
  });

  /* Info button */

  infoButton.addEventListener('click', (e) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });

  /* Reset button */

  resetButton.addEventListener('click', (e) => {
    window.location.reload();
  });

  /* Add event listeners to the card elements */

  const cardElements = document.querySelectorAll('.card');

  cardElements.forEach(cardElement => {
    console.log("element's id:", cardElement.id);

    cardElement.addEventListener('click', (e) => {
      selectCategory(cardElement.id);
    });
  });
});

/**
 * Transitions from category selection to displaying received fortune. Uses the 
 * chooseCardAnimation function to animate transition, and displayFortune function 
 * to animate displaying the received fortune.
 * @param {String} category string representing fortune category chosen
 * @returns {boolean} whether or not the transition was successful
 */ 
function selectCategory (category) {
  if (!categories.includes(category)) {
    console.error('invalid category');
    return false;
  }

  chooseCardAnimation(category);

  selectedCategory = category;

  const notChosen = document.querySelectorAll(`.card:not(#${category})`);
  const allCards = document.getElementsByClassName('categories')[0];

  for (let i = 0; i < notChosen.length; i++) {
    notChosen[i].classList.toggle('hide');
    notChosen[i].style.opacity = '0';
  }

  setTimeout(() => {
    allCards.style.display = 'none';

    displayFortune();
  }, 1000);

  return true;
}

// Animates the card that is chosen and adds the choose-card class
// Currently only just spins it, hopefully also centers it later
function chooseCardAnimation (category) {
  const cardElement = document.getElementById(`${category}`);

  cardElement.style.pointerEvents = 'none';
  cardElement.classList.toggle('choose-card');
  // get the center of the parent for a later animationk
  // let relCenterCoord = document.getElementsByClassName('categories').offsetWidth / 2;

  // can get position with the following
  // console.log(document.getElementById(`${category}`).offsetLeft);
}

function displayFortune () {
  const container = document.getElementsByClassName('display-fortune')[0];
  const resetButton = document.getElementsByClassName('reset-button-container')[0];

  const message = document.getElementById('fortune-message');
  const fortune = document.getElementById('fortune-received');

  const receivedFortune = engine.get_random_subset(1)[0][selectedCategory];

  message.textContent = `Your fortune for ${selectedCategory} is:`;

  container.classList.add('show');
  resetButton.classList.add('show');

  // clear any existing text
  fortune.textContent = '';

  let index = 0;

  // create a new audio object
  const typingSound = new Audio('fortune_stick_reveal.ogg');
  typingSound.currentTime = 0;
  typingSound.play();
  // set up the typing effect
  const typingInterval = setInterval(() => {
    // add the next character to the textContent
    fortune.textContent += receivedFortune[index];

    // play the typing sound
    // typingSound.currentTime = 0; // reset sound to start
    // typingSound.play();

    index++;
    // if we've displayed the whole message, clear the interval
    if (index >= receivedFortune.length) {
      clearInterval(typingInterval);
    }
  }, TYPING_SPEED); // this value controls the typing speed, adjust as desired
}

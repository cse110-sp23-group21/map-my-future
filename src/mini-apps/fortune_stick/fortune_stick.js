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

/**
 * @namespace MiniApps.FortuneStick
 */

/* Imports */

import FortuneEngine from '../../engine.js';
import setMusicState from '../../autoplay.js';

/* Global variables */

/**
 * Name of the Fortune Stick app.
 * @type {string}
 * @memberof MiniApps.FortuneStick
 */
const APP_NAME = 'fortune_stick';

/**
 * Sets the typing speed for the interpretation text reveal
 * @type {number}
 * @memberof MiniApps.FortuneStick
 */
const TYPING_SPEED = 35;

/**
 * Instance of the FortuneEngine class. Reads the JSON file `fortune_stick.json`
 * and generates a random fortune stick object.
 *
 * @type {FortuneEngine}
 * @memberof MiniApps.FortuneStick
 */
const engine = new FortuneEngine();

const bgm = new Audio('../../assets/stick/bgm-background.mp3'); //  eslint-disable-line

/**
 * Array of fortune stick categories.
 * @type {string[]}
 * @memberof MiniApps.FortuneStick
 */
const categories = ['career', 'wealth', 'health', 'relationship'];

/**
 * The selected fortune stick category.
 * @type {string}
 * @memberof MiniApps.FortuneStick
 */
let selectedCategory = '';
// let musicEnabled = true;
// let showInfo = false;

/* Waiting for DOM to have loaded */
document.addEventListener('DOMContentLoaded', async () => {
  /* Read JSON File */

  await engine.db_reader(`./${APP_NAME}.json`);

  /* Play background music */

  /**
   * Music on/off image element (part of general UI)
   * @memberof MiniApps.FortuneStick
   */
  const musicImage = document.getElementById('music');

  /**
   * Background music object
   * @type {Audio}
   * @memberof MiniApps.FortuneStick
   */
  const bgm = new Audio('../../assets/stick/bgm-background.mp3'); //  eslint-disable-line
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

  /**
   * Keeps track of the music on/off state.
   * @type {boolean}
   * @memberof MiniApps.FortuneStick
   */
  let musicEnabled = true;

  /**
   * Keeps track of whether the info panel is shown.
   * @type {boolean}
   * @memberof MiniApps.FortuneStick
   */
  let showInfo = false;

  /**
   * Music on/off button element (part of general UI)
   * @type {HTMLElement}
   * @memberof MiniApps.FortuneStick
   */
  const musicButton = document.getElementById('music-button');

  /**
   * Info button element (part of general UI)
   * @type {HTMLElement}
   * @memberof MiniApps.FortuneStick
   */
  const infoButton = document.getElementById('info-button');

  /**
   * Reset button element (when clicked, lets user get another fortune)
   * @type {HTMLElement}
   * @memberof MiniApps.FortuneStick
   */
  const resetButton = document.getElementById('reset-button');

  /* Music button */

  /**
   * Listen to click event for the music UI button.
   * Toggles musicEnabled and calls the setMusicState() method.
   *
   * @listens musicButton#click
   * @memberof MiniApps.FortuneStick
   */
  musicButton.addEventListener('click', (e) => {
    musicEnabled = setMusicState(bgm, musicImage, !musicEnabled);
  });

  /* Info button */

  /**
   * Listens to click event for the info UI button.
   * Toggles showInfo and toggles display of the info panel.
   *
   * @listens infoButton#click
   * @memberof MiniApps.FortuneStick
   */
  infoButton.addEventListener('click', (e) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });

  /* Reset button */

  /**
   * Listens to click event for the reset button.
   * When clicked, resets the app and lets the user get another fortune.
   *
   * @listens resetButton#click
   * @memberof MiniApps.FortuneStick
   */
  resetButton.addEventListener('click', (e) => {
    // window.location.reload();

    const container = document.getElementsByClassName('display-fortune')[0];
    const resetButton = document.getElementsByClassName('reset-button-container')[0];

    container.classList.remove('show');
    resetButton.classList.remove('show');

    setTimeout(() => {
      const notChosen = document.querySelectorAll(`.card:not(#${selectedCategory})`);
      const allCards = document.getElementsByClassName('categories')[0];

      for (let i = 0; i < notChosen.length; i++) {
        notChosen[i].classList.toggle('hide');
        notChosen[i].style.opacity = '1';
      }

      allCards.style.display = 'flex';

      const cardElement = document.getElementById(`${selectedCategory}`);

      cardElement.style.pointerEvents = 'auto';
      cardElement.classList.toggle('choose-card');

      selectedCategory = '';

      container.style.display = 'none';
    }, 1000);
  });

  /* Add event listeners to the card elements */

  /**
   * List of all card class elements
   * @memberof MiniApps.FortuneStick
   */
  const cardElements = document.querySelectorAll('.card');

  cardElements.forEach(cardElement => {
    cardElement.addEventListener('click', (e) => {
      selectCategory(cardElement.id);
    });
  });
});

/**
 * Transitions from category selection to displaying received fortune. Uses the
 * chooseCardAnimation function to animate transition, and displayFortune function
 * to animate displaying the received fortune.
 * @memberof MiniApps.FortuneStick
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

/**
 * Animates category card selection, enabling choose-card class on selected
 * card element for CSS keyframe animation
 * @memberof MiniApps.FortuneStick
 * @param {String} category string representing fortune category chosen
 * @returns {boolean} whether or not the animation was succesful
 */
function chooseCardAnimation (category) {
  if (!categories.includes(category)) {
    console.error('invalid category');
    return false;
  }

  const cardElement = document.getElementById(`${category}`);

  cardElement.style.pointerEvents = 'none';
  cardElement.classList.toggle('choose-card');
  return true;
}

/**
 * Displays the fortune received by FortuneEngine. Plays the audio for receiving fortune,
 * and animates the text shown with a typing animation
 * @memberof MiniApps.FortuneStick
 * @returns {boolean} whether or not the display was successful;
 */
function displayFortune () {
  /* Obtaining elements and displaying fortune */

  const container = document.getElementsByClassName('display-fortune')[0];
  const resetButton = document.getElementsByClassName('reset-button-container')[0];

  const message = document.getElementById('fortune-message');
  const fortune = document.getElementById('fortune-received');

  const receivedFortune = engine.get_random_subset(1)[0][selectedCategory];

  fortune.innerHTML = '';

  message.textContent = `Your fortune for ${selectedCategory} is:`;

  container.style.display = 'flex';
  container.classList.add('show');

  /* Play fortune received audio effect */

  const typingSound = new Audio('../../assets/stick/bgm-reveal.ogg');
  typingSound.currentTime = 0;
  typingSound.play();

  /* Typing animation */

  fortune.textContent = '';
  let index = 0;

  const typingInterval = setInterval(() => {
    fortune.textContent += receivedFortune[index];
    index++;
    if (index >= receivedFortune.length) {
      clearInterval(typingInterval);
    }
  }, TYPING_SPEED);

  setTimeout(() => {
    resetButton.classList.add('show');
  }, TYPING_SPEED * receivedFortune.length);

  return true;
}

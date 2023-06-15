/**
 * @namespace MiniApps.Molybdomancy
 */

import FortuneEngine from '../../engine.js';
import setMusicState from '../../autoplay.js';

/**
 * Object that contains references to the start and end strings
 * used in the melting animation
 * @type {{text1: HTMLElement, text2: HTMLElement}}
 * @memberOf MiniApps.Molybdomancy
 */
let elts = {};

/**
 * Array of strings used in the melting tin animation
 * @type {string[]}
 * @memberOf MiniApps.Molybdomancy
 */
const texts = [
  'Solid Tin'
];

/**
 * Defines how long the melting animation is (in seconds)
 * @type {number}
 * @memberOf MiniApps.Molybdomancy
 */
const morphTime = 10;

/**
 * Defines how long the cooldown time for the animation is relative
 * to the animation length (morphTime)
 * @type {number}
 * @memberOf MiniApps.Molybdomancy
 */
const cooldownTime = 0.25;

/**
 * Current string the animation morphs from
 * @type {number}
 * @memberOf MiniApps.Molybdomancy
 */
let textIndex = -1;

/**
 * Stores the start time for the animation
 * @type {Date}
 * @memberOf MiniApps.Molybdomancy
 */
let time;
let morph = 0;
let cooldown = cooldownTime;

function doMorph () {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph (fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown () {
  morph = 0;

  elts.text2.style.filter = '';
  elts.text2.style.opacity = '100%';

  elts.text1.style.filter = '';
  elts.text1.style.opacity = '0%';
}

/**
 * Starts melting animation.
 * @memberOf MiniApps.Molybdomancy
 */
function animate () {
  if (textIndex === texts.length - 1) {
    return; // Stop the animation if reached end of texts array
  }
  requestAnimationFrame(animate);

  /**
   * Contains new start time from the beginning of the animation.
   * @type {Date}
   * @memberOf MiniApps.Molybdomancy
   */
  const newTime = new Date();
  const shouldIncrementIndex = cooldown > 0;

  /**
   * Determine difference of time in seconds from last start time to newTime
   * @memberOf MiniApps.Molybdomancy
   */
  const dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

// Wait for all DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  /**
   * Instance of the FortuneEngine class. Reads the JSON file 'molybdomancy.json'
   * and generates a random shape that the tin melts into.
   * @memberOf MiniApps.Molybdomancy
   */
  const engine = new FortuneEngine('molybdomancy');

  //  Read contents from JSON using FortuneEngine
  await engine.db_reader('./molybdomancy.json');

  //  Define elts object with two HTML elements for start and end texts
  //  (used by the morphing animation as start and end points to morph)
  elts = {
    text1: document.getElementById('text1'),
    text2: document.getElementById('text2')
  };

  //  Initially set both to store the same starting text
  elts.text1.textContent = texts[0];
  elts.text2.textContent = texts[0];

  /**
   * Info button element (part of general UI)
   * @type {HTMLElement}
   * @memberOf MiniApps.Molybdomancy
   */
  const infoButton = document.getElementById('info-button');

  /**
   * Music on/off button element (part of general UI)
   * @type {HTMLElement}
   * @memberOf MiniApps.Molybdomancy
   */
  const musicButton = document.getElementById('music-button');

  /**
   * Music on/off image element (part of general UI)
   * @type {HTMLElement}
   * @memberOf MiniApps.Molybdomancy
   */
  const musicImage = document.getElementById('music');

  /**
   * The melt button (press it to start the melting animation)
   * @type {HTMLElement}
   * @memberOf MiniApps.Molybdomancy
   */
  const meltButton = document.querySelector('#melt-button');

  /**
   * HTML element that contains the resulting shape name
   * @type {HTMLElement}
   * @memberOf MiniApps.Molybdomancy
   */
  const resultTextShape = document.querySelector('.interpretation1');

  /**
   * HTML element that contains the resulting shape meaning
   * @type {HTMLElement}
   * @memberOf MiniApps.Molybdomancy
   */
  const resultTextMeaning = document.querySelector('.interpretation2');

  /**
   * State of the melt button - cycles between "melt" and "result"
   * @type {string}
   * @memberOf MiniApps.Molybdomancy
   */
  let meltButtonState = 'melt';

  /**
   * Keeps track of the music on/off state.
   * @type {boolean}
   * @memberOf MiniApps.Molybdomancy
   */
  let musicEnabled = true;

  /**
   * Keeps track of whether the info panel is shown.
   * @type {boolean}
   * @memberOf MiniApps.Molybdomancy
   */
  let showInfo = false;

  /**
   * Melt button press sound effect object
   * @type {Audio}
   * @memberOf MiniApps.Molybdomancy
   */
  const actionButtonPressSoundEffect = new Audio('../../assets/moly/action-button-press1.wav');

  /**
   * Melt button hover sound effect object
   * @type {Audio}
   * @memberOf MiniApps.Molybdomancy
   */
  const actionButtonHoverSoundEffect = new Audio('../../assets/moly/action-button-hover2.mp3');

  /**
   * Melting sound effect object
   * @type {Audio}
   * @memberOf MiniApps.Molybdomancy
   */
  const meltSoundEffect = new Audio('../../assets/moly/bgm-melting.mp3');
  meltSoundEffect.volume = 0.7;

  /**
   * Listen to mouseover event for the melt button.
   * Plays the action button hover sound effect.
   *
   * @listens meltButton#mouseover
   * @memberOf MiniApps.Molybdomancy
   */
  meltButton.addEventListener('mouseover', () => {
    actionButtonHoverSoundEffect.play();
  });

  /**
   * Listens to click event for the melt button.
   * Starts the melting animation if in "melt" state or resets if in "result" state
   * when clicked.
   *
   * @listens meltButton#click
   * @memberOf MiniApps.Molybdomancy
   */
  meltButton.addEventListener('click', () => {
    actionButtonPressSoundEffect.play();

    switch (meltButtonState) {
      case 'melt':
        //  Swap melt button state
        meltButtonState = 'result';

        meltSoundEffect.play();

        /**
         * Stores random shape object generated by FortuneEngine
         * @memberOf MiniApps.Molybdomancy
         */
        const result = engine.get_random_subset(1)[0];   //  eslint-disable-line

        /**
         * After the animation completes, show the resulting shape name
         * and meaning.
         * @memberOf MiniApps.Molybdomancy
         */
        setTimeout(() => {
          resultTextShape.innerHTML = `Shape: ${result.name}</br>`;
          resultTextShape.classList.remove('interpretation1');
          void resultTextShape.offsetWidth;  //  eslint-disable-line
          resultTextShape.classList.add('interpretation1');

          resultTextMeaning.innerHTML = `${result.longMeaning}`;
          resultTextMeaning.classList.remove('interpretation2');
          void resultTextMeaning.offsetWidth;  //  eslint-disable-line
          resultTextMeaning.classList.add('interpretation2');
        }, morphTime * 1000);

        //  Add the resulting shape emoji to the morph texts array
        texts[1] = result.emoji;

        //  Get current time and start animation
        time = new Date();
        meltButton.style.pointerEvents = 'none';
        meltButton.innerText = 'Melting tin...';
        animate();

        // Set Button Delay (melt button is disabled until animation
        // completes and the shape and meaning have been shown)
        setTimeout(() => {
          meltButton.style.pointerEvents = 'all';
          meltButton.innerText = 'Try Again?';
        }, morphTime * 1000 + 1250);

        break;

      case 'result':
        //  Reset melt button text and swap state
        meltButton.innerText = 'Melt the Tin!';
        meltButtonState = 'melt';

        //  Reset all relevant variables
        textIndex = -1;
        elts.text1.textContent = texts[0];
        elts.text2.textContent = texts[0];
        cooldown = cooldownTime;
        resultTextShape.innerHTML = '';
        resultTextMeaning.innerHTML = '';
        break;
    }
  });

  /**
   * Background music object
   * @type {Audio}
   * @memberOf MiniApps.Molybdomancy
   */
  const bgm = new Audio('../../assets/moly/bgm-background.mp3');
  bgm.loop = true;
  bgm.volume = 0.4;

  //  Attempt to autoplay background music
  bgm.play().then(() => {
    //  Autoplay started!
  }).catch(() => {
    //  Autoplay failed - set music to off
    musicEnabled = false;
    setMusicState(bgm, musicImage, musicEnabled);
  });

  /**
   * Listen to click event for the music UI button.
   * Toggles musicEnabled and calls the setMusicState() method.
   *
   * @listens musicButton#click
   * @memberOf MiniApps.Molybdomancy
   */
  musicButton.addEventListener('click', (event) => {
    musicEnabled = setMusicState(bgm, musicImage, !musicEnabled);
  });

  /**
   * Listens to click event for the info UI button.
   * Toggles showInfo and toggles display of the info panel.
   *
   * @listens infoButton#click
   * @memberOf MiniApps.Molybdomancy
   */
  infoButton.addEventListener('click', (event) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });
});

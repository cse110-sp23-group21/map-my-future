/* Yin Yang Coin Mini-App */
/*
    Steps:

    1.  After the user clicks the Yin Yang continent, the Title Screen should
        display, with a center div showing instruction text. Bottom button should
        say "Start".
    2.  After the user clicks on the button, the center div should disappear and
        in its place two divs as in the Fortune Telling Screen design.
        Bottom button should now say "Toss Coins".
    3.  Keep a counter that's currently 0. Every time the user presses "Toss Coins"
        the counter increases, generate a random result for the 3 coins getting
        tossed in the large right div, then show the result in the left div (the
        "Toss Coins" button should be made inactive while this is happening so that
        the user can't skip through and toss 6 times really fast)
    4.  Once the counter reaches 6, the bottom button should say "Get Result"
    5.  Once the user clicks on Get Result, the left div should show the graphic
        of the resulting hexagram while the right div should show "You received the
        _ hexagram" + meaning as shown in the design.
        The bottom button should now say "Toss Again?"
*/

/**
 * @namespace MiniApps.YinYangCoin
 */

import FortuneEngine from '../../engine.js';
import setMusicState from '../../autoplay.js';

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  /**
   * Instance of the FortuneEngine class. Reads the JSON file `yin_yang_coin.json`
   * and generates random 3-coin tosses.
   *
   * @type {FortuneEngine}
   * @memberof MiniApps.YinYangCoin
   */
  const engine = new FortuneEngine('ying_yang_coin');

  // Read contents from JSON using FortuneEngine
  await engine.db_reader('yin_yang_coin.json');

  /**
   * Counter to keep track of how many times the user tossed 3 coins.
   * Once this reaches 6, the user should be prompted to get their fortune.
   * @memberof MiniApps.YinYangCoin
   */
  let tossCounter = 0;

  /**
   * After each 3-coin toss, if the toss matched "Yin", or 0, then the index is unchanged.
   * If the toss matched "Yang", or 1, then we add 2^i to hexagramIndex where i is the
   * how many coins have been tossed thus far - 1 (e.g., if this is the first coin toss, then
   * i is 0)
   * @memberof MiniApps.YinYangCoin
   */
  let hexagramIndex = 0;

  /**
   * Stores the current power of 2 (shifted once to the left in each iteration)
   * @memberof MiniApps.YinYangCoin
   */
  let powerOfTwo = 1;

  /**
   * Contents of the ying_yang_coin.json file.
   * Contains the list of 64 hexagram objects and the 8 possible 3-coin tosses
   * @memberof MiniApps.YinYangCoin
   */
  const jsonFile = engine.get_json_contents();

  /**
   * Array of the 64 hexagram objects.
   * @memberof MiniApps.YinYangCoin
   */
  const hexagrams = jsonFile.hexagrams; // eslint-disable-line

  /**
   * Action button element ("Start" / "Toss Coins" / "Get Result" button)
   * @memberof MiniApps.YinYangCoin
   */
  const buttonElement = document.querySelector('.action-button');

  /**
   * Music on/off button element (part of general UI)
   * @memberof MiniApps.YinYangCoin
   */
  const musicButton = document.getElementById('music-button');

  /**
   * Music on/off image element (part of general UI)
   * @memberof MiniApps.YinYangCoin
   */
  const musicImage = document.getElementById('music');

  /**
   * Info button element (part of general UI)
   * @memberof MiniApps.YinYangCoin
   */
  const infoButton = document.getElementById('info-button');

  /**
   * Line image element (instructions image that appears in the Line Representation
   * sidebar)
   * @memberof MiniApps.YinYangCoin
   */
  const lineImg = document.querySelector('.line-image');

  /**
   * Line text element (sidebar heading)
   * @memberof MiniApps.YinYangCoin
   */
  const lineTxt = document.getElementById('line-text');

  /**
   * Array of all side grid elements (six in total for each line of the hexagram
   * that is generated)
   * @memberof MiniApps.YinYangCoin
   */
  const gridList = document.querySelectorAll('.side-grid-element');

  /**
   * Main content element container (i.e. contains instructions heading + image
   * and interpretation result)
   * @memberof MiniApps.YinYangCoin
   */
  const contentGrid = document.querySelector('.content-grid');

  /**
   * Instruction image element (possible coin result combinations)
   * @memberof MiniApps.YinYangCoin
   */
  const instructionImg = document.getElementById('instruction-image');

  /**
   * Instruction text heading element
   * @memberof MiniApps.YinYangCoin
   */
  const instructionTxt = document.getElementById('instruction-text');

  /**
   * Interpretation text element (where hexagram meaning is shown)
   * @memberof MiniApps.YinYangCoin
   */
  const intepretationTxt = document.getElementById('interpretation-text');

  /**
   * Hexagram Chinese Character element
   * @memberof MiniApps.YinYangCoin
   */
  const character = document.getElementById('character');

  /**
   * 3 Yin Yang Coin container element
   * @memberof MiniApps.YinYangCoin
   */
  const coinDisplay = document.querySelector('.coin-display');

  /**
   * List of coin elements
   * @memberof MiniApps.YinYangCoin
   */
  const coins = document.getElementsByClassName('coins');

  /**
   * Keeps track of the music on/off state.
   * @type {boolean}
   * @memberof MiniApps.YinYangCoin
   */
  let musicEnabled = true;

  /**
   * Keeps track of whether the info panel is shown.
   * @type {boolean}
   * @memberof MiniApps.YinYangCoin
   */
  let showInfo = false;

  /**
   * Background music object
   * @type {Audio}
   * @memberof MiniApps.YinYangCoin
   */
  const bgm = new Audio('../../assets/coin/bgm-background.mp3');

  /**
   * Coin flip sound effect object
   * @type {Audio}
   * @memberof MiniApps.YinYangCoin
   */
  const flipSound = new Audio('../../assets/coin/bgm-coin-flip.ogg');

  /**
   * Fortune reveal sound effect object
   * @type {Audio}
   * @memberof MiniApps.YinYangCoin
   */
  const fortuneRevealSound = new Audio('../../assets/coin/bgm-hex-reveal.mp3');

  /**
   * Line reveal sound effect object
   * @type {Audio}
   * @memberof MiniApps.YinYangCoin
   */
  const lineRevealSound = new Audio('../../assets/coin/bgm-line-reveal.mp3');

  /**
   * Action button press sound effect object
   * @type {Audio}
   * @memberof MiniApps.YinYangCoin
   */
  const actionButtonPressSound = new Audio('../../assets/coin/bgm-button-click.wav');

  //  Music and sound effect settings
  bgm.loop = true;
  bgm.volume = 0.4;
  flipSound.volume = 0.5;
  fortuneRevealSound.volume = 0.5;
  lineRevealSound.volume = 0.5;
  actionButtonPressSound.volume = 0.5;

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
   * @memberof MiniApps.YinYangCoin
   */
  musicButton.addEventListener('click', (event) => {
    musicEnabled = setMusicState(bgm, musicImage, !musicEnabled);
  });

  // Info Button
  /**
   * Listen to click event for the info UI button.
   * Toggles showInfo and toggles display of the info panel.
   *
   * @listens infoButton#click
   * @memberof MiniApps.YinYangCoin
   */
  infoButton.addEventListener('click', (event) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });

  /**
   * Listen to click event for the action button.
   * When clicked, transitions into the next state, or if in the toss
   * state, remains in that state 6 times (once for each coin toss).
   *
   * @listens buttonElement#click
   * @memberof MiniApps.YinYangCoin
   */
  buttonElement.addEventListener('click', (event) => {
    const buttonElement = event.target;
    const buttonValue = buttonElement.value;

    // Start State
    switch (buttonValue) {
      case 'start':
        actionButtonPressSound.play();
        // Update Button State
        buttonElement.value = 'toss';
        buttonElement.innerText = 'Toss Coins';

        // Update Content Screen
        lineTxt.innerText = 'Record 0/6';
        lineTxt.style.fontSize = '3rem';

        instructionImg.style.display = 'none';
        instructionTxt.style.display = 'none';
        lineImg.style.display = 'none';
        coinDisplay.style.display = 'block';

        break;

      case 'toss':
        /**
         * Randomly generated 3-coin toss result
         * @memberof MiniApps.YinYangCoin
         */
        const coinResult = engine.get_random_subset(1)[0];  //  eslint-disable-line

        //  Calculate the Hexagram Index
        hexagramIndex += coinResult.value * powerOfTwo;
        powerOfTwo = powerOfTwo << 1;

        tossCounter++;

        // Lines Animation
        if (coinResult.type === 'Yin') {
          setTimeout(function () {
            gridList[tossCounter - 1].innerHTML += '<img class="animated-line-image" src="../../assets/coin/line-broken.png" alt="instruction image display failed."/>';
            lineRevealSound.play();
          }, 4500);
        } else {
          setTimeout(function () {
            gridList[tossCounter - 1].innerHTML += '<img class="animated-line-image" src="../../assets/coin/line-solid.png" alt="instruction image display failed."/>';
            lineRevealSound.play();
          }, 4500);
        }

        // Update Record Counter
        setTimeout(function () {
          lineTxt.innerText = 'Record' + ' ' + tossCounter + '/6';
        }, 5500);

        // Coin Rotation

        /*  eslint-disable  */
        const coinStates = coinResult.coins.toLowerCase();
        const coinState1 = coinStates.slice(0, 1);
        const coinState2 = coinStates.slice(1, 2);
        const coinState3 = coinStates.slice(2, 3);
        /*  eslint-enable  */

        coins[0].style.animation = `${coinState1}-rotate-${tossCounter % 2} 4.3s ease forwards`;
        coins[1].style.animation = `${coinState2}-rotate-${tossCounter % 2} 4.3s ease forwards`;
        coins[2].style.animation = `${coinState3}-rotate-${tossCounter % 2} 4.3s ease forwards`;

        //  Play coin toss sound effect
        flipSound.play();

        // Set button delay until it is re-enabled
        buttonElement.style.pointerEvents = 'none';
        buttonElement.innerText = 'Tossing Coins...';
        setTimeout(() => {
          buttonElement.style.pointerEvents = 'all';
          buttonElement.innerText = 'Toss Coins';
          // Update Button State
          if (tossCounter === 6) {
            buttonElement.value = 'result';
            buttonElement.innerText = 'Get Result';
          }
        }, 5500);

        break;

      case 'result':
        fortuneRevealSound.play();

        /**
         * Resulting hexagram object
         * @memberof MiniApps.YinYangCoin
         */
        const hexagram = hexagrams[hexagramIndex];  //  eslint-disable-line

        // Update Button State
        buttonElement.value = 'reset';
        buttonElement.innerText = 'New Round';

        // Update Content Screen
        character.innerHTML = hexagram.character;
        instructionTxt.innerHTML = `"${hexagram.name}"`;
        intepretationTxt.innerHTML = `"${hexagram.meaning}"`;

        setTimeout(() => {
          character.className = 'active';
          if (hexagram.character.length === 2) {
            character.style.marginRight = '1%';
          } else {
            character.style.marginRight = '3%';
          }
        }, 3500);

        instructionTxt.style.animation = 'blurfadein 3s ease-in forwards';
        instructionTxt.style.fontSize = '8vh';
        instructionTxt.style.margin = '0';
        instructionTxt.style.padding = '0';
        instructionTxt.style.display = 'block';
        coinDisplay.style.display = 'none';

        contentGrid.style.display = 'grid';

        // Set animation delay
        setTimeout(() => {
          intepretationTxt.style.display = 'inline-block';
        }, 7500);

        // Set button delay
        buttonElement.style.pointerEvents = 'none';
        setTimeout(() => {
          buttonElement.style.pointerEvents = 'all';
        }, 11000);

        break;

      case 'reset':
        actionButtonPressSound.play();

        //  Reset variables relevant to hexagram generation
        hexagramIndex = 0;
        tossCounter = 0;
        powerOfTwo = 1;

        // Update Button State
        buttonElement.value = 'start';
        buttonElement.innerText = 'Start';

        // Update Content Screen
        for (const coin of coins) {
          coin.style.animation = 'none';
        }

        character.innerHTML = '';
        intepretationTxt.innerHTML = '';
        instructionTxt.innerHTML = 'Coin Combination';
        lineTxt.innerHTML = 'Side Info';

        character.className = 'inactive';
        instructionTxt.style.fontSize = '2rem';
        instructionTxt.style.margin = '';
        instructionTxt.style.padding = '';
        instructionTxt.style.animation = 'none';
        instructionImg.style.display = 'inline-block';
        intepretationTxt.style.display = 'none';

        contentGrid.style.display = '';

        // Update Side Screen
        lineTxt.style.fontSize = '2rem';
        lineImg.style.display = 'inline-block';

        for (let i = 0; i < 6; i++) {
          gridList[i].innerHTML = '';
        }

        break;
    }
  });
});

/* Yin Yang Coin code goes here */
/*
    Steps:

    1.  After the user clicks the Yin Yang continent, the Title Screen should
        display, with a center div showing expositionary text.
        Bottom button should say "Start".
    2.  After the user clicks "Start", the center div's text disappears and
        in its place instructions show up.
        Bottom button should say "Concentrate on your question... then continue!"
    3.  After the user clicks on the button, the center div should disappear and
        in its place two divs as in the Fortune Telling Screen design.
        Bottom button should now say "Toss Coins".
    4.  Keep a counter that's currently 0. Every time the user presses "Toss Coins"
        the counter increases, generate a random result for the 3 coins getting
        tossed in the large right div, then show the result in the left div (the
        "Toss Coins" button should be made inactive while this is happening so that
        the user can't skip through and toss 6 times really fast)
    5.  Once the counter reaches 6, the bottom button should say "See Results"
    6.  Once the user clicks on See Results, the left div should show the graphic
        of the resulting hexagram while the right div should show "You received the
        _ hexagram" + meaning as shown in the design.
        There should now be two bottom buttons - "Return to Map" and "Toss Again?"
        (Alternatively: same button says "Toss Again?" with Home button always
        being available)
*/

import FortuneEngine from '../../engine.js';

//  Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  // Background music
  const bgm = new Audio('../../../assets/map-my-future-bgm.ogg');
  // bgm.play();
  bgm.loop = true;

  // Buttons
  let musicEnabled = true;
  let showInfo = false;
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const instructionScreen = document.querySelector('#instructions');
  const fortuneTellingScreen = document.querySelector('#fortune-telling');

  // Music & Info Buttons
  musicButton.addEventListener('click', (e) => {
    console.log('music');
    const musicImg = document.querySelector('#music');
    if (musicEnabled) {
      musicImg.src = '../../../assets/audio_off.png';
      bgm.pause();
    } else {
      musicImg.src = '../../../assets/audio_on.png';
      bgm.play();
    }
    musicEnabled = !musicEnabled;
  });

  /**
   * @name infoButtonClick
   *  Make an action for info button when it's clicked.
   *  It will briefly explain how the app works.
   * @listens click When the user clicks on the info button, the info
   * pop-up alternates between visible and invisible.
   */
  infoButton.addEventListener('click', (e) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });

  //  Read contents from JSON using FortuneEngine

  /**
   * FortuneEngine object used for generating 3-coin flips.
   */
  const engine = new FortuneEngine('yin_yang_coin');

  await engine.db_reader('yin_yang_coin.json');

  /**
   * Contents of the ying_yang_coin.json file.
   */
  const jsonFile = engine.get_json_contents();

  /**
   * Array of 64 hexagram objects.
   */
  const hexagrams = jsonFile.hexagrams;

  console.table(hexagrams);

  /**
   * Start button elemen
   */
  const buttonElement = document.querySelector('.action-button');

  /**
   * Count up to 6 times for tossing
   */
  let tossCounter = 0;

  /**
   * After 6 times tossing, it will access to the index in JSON file and pull out the result
   */
  let hexagramIndex = 0;

  /**
   * Stores the current power of 2 (shifted once to the left in each iteration)
   */
  let powerOfTwo = 1;

  /**
   *  Create the action for the button when it's clicked
   */
  buttonElement.addEventListener('click', (event) => {
    const buttonElement = event.target;
    const buttonValue = buttonElement.value;
    console.log(buttonValue);

    // Start State
    switch (buttonValue) {
      case 'start':
        // Update Button State
        buttonElement.value = 'toss';
        buttonElement.innerText = 'Toss Coins';
        break;

        // Toss State
      case 'toss':
        // Backend Generation

        // Set button as disabled
        buttonElement.disabled = true;

        // TODO: Make it apparent in the UI that the button has been disabled
        // https://codepen.io/robertwbradford/pen/NaMNJg (reference)

        //  Generate a random result for tossing 3 coins
        const coinResult = engine.get_random_subset(1)[0];  //  eslint-disable-line
        console.log('coinResult:', coinResult.value);
        console.log('Power of two:', powerOfTwo);

        //  Calculate the Hexagram Index
        hexagramIndex += coinResult.value * powerOfTwo;
        powerOfTwo = powerOfTwo << 1;

        console.log('Hexagram Index:', hexagramIndex);

        tossCounter++;
        console.log('Tossing coins! tossCounter =', tossCounter);

        // Update Button State
        if (tossCounter === 6) {
          buttonElement.value = 'result';
          buttonElement.innerText = 'Get Result';
        }

        // TODO: UI Generation

        // TODO: Lines

        // TODO: Coin Generation/Animation
        // https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
        // TODO: Re-enable button
        buttonElement.disabled = false;
        break;

      case 'result':
        // TODO: Modify FortuneEngine to let you access the entire JSON object - this is complete!
        // TODO: Backend - Map hexigram to intepretation
        const hexagram = hexagrams[hexagramIndex];  //  eslint-disable-line

        console.log('Hexagram Result:', hexagram);

        // TODO: UI - Clear the screen and then display the result

        // Update Button State
        buttonElement.value = 'reset';
        buttonElement.innerText = 'New Round';
        break;

      case 'reset':
        // Reset to initial state
        hexagramIndex = 0;
        tossCounter = 0;
        powerOfTwo = 1;

        // Update Button State
        buttonElement.value = 'start';
        buttonElement.innerText = 'Start';
        break;
    }
  });

  //  Start Screen
});

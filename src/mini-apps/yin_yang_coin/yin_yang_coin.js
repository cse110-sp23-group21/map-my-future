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

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  // Accessible Buttons
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const buttonElement = document.querySelector('.action-button');

  // Accessible Variables
  let musicEnabled = true;
  let showInfo = false;

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

  const instructionImg = document.getElementById('instruction-image');
  const instructionTxt = document.getElementById('instruction-text');
  const coinDisplay = document.querySelector('.coin-display');
  const coins = document.getElementsByClassName('coins');

  // Read contents from JSON using FortuneEngine
  const engine = new FortuneEngine('ying_yang_coin');
  await engine.db_reader('yin_yang_coin.json');

  // Background music
  const bgm = new Audio('background_music1.mp3');
  const flipSound = new Audio('coin_flip.ogg');
  bgm.play();
  bgm.loop = true;

  // Music Button
  musicButton.addEventListener('click', (event) => {
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

  // Info Button
  infoButton.addEventListener('click', (event) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });
  
  // Action Button
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

        // Update Content Screen
        instructionImg.style.display = 'none';
        instructionTxt.style.display = 'none';
        coinDisplay.style.display = 'block';

        break;
        
    // Toss State
      case "toss":
        // Backend Generation
        // Generate a random result for tossing 3 coins
        const coinResult = engine.get_random_subset(1)[0];

        console.log('coinResult:', coinResult.value);
        console.log('Power of two:', powerOfTwo);
        
        // Calculate the Hexagram Index
        hexagramIndex += coinResult.value * powerOfTwo;
        powerOfTwo = powerOfTwo << 1;

        console.log('Hexagram Index:', hexagramIndex);

        tossCounter++;
        console.log('Tossing coins! tossCounter =', tossCounter);

        // Update Button State
        if(tossCounter === 6) {
          buttonElement.value = 'result';
          buttonElement.innerText = 'Get Result';
        }

        // UI Generation
        // TODO: Lines
        
        // Coin Rotation
        const coinStates = coinResult.coins.toLowerCase();
        const coinState1 = coinStates.slice(0,1);
        const coinState2 = coinStates.slice(1,2);
        const coinState3 = coinStates.slice(2,3);

        coins[0].style.animation = `${coinState1}-rotate-${tossCounter%2} 4.3s ease forwards`;
        coins[1].style.animation = `${coinState2}-rotate-${tossCounter%2} 4.3s ease forwards`;
        coins[2].style.animation = `${coinState3}-rotate-${tossCounter%2} 4.3s ease forwards`;
        flipSound.play();

        break;
        
      case 'result':
        // TODO: Modify FortuneEngine to let you access the entire JSON object
        // TODO: Backend - Map hexigram to intepretation
        
        // TODO: UI - Display the result
        
        // Update Button State
        buttonElement.value = 'reset';
        buttonElement.innerText = 'New Round';

        // Update Content Screen
        coinDisplay.style.display = 'none';
        instructionTxt.innerHTML = 'Intepretation';
        instructionTxt.style.display = 'inline';
        
        break;
        
      case 'reset':
        // Reset to initial state
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
        instructionTxt.style.display = 'block';
        instructionImg.style.display = 'inline-block';
        break;
    }
  });
  
});

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
  // const bgm = new Audio('../../../assets/map-my-future-bgm.ogg'); //  eslint-disable-line
  // bgm.play();
  // bgm.loop = true;

  // Buttons
  let musicEnabled = true;
  let showInfo = false;
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const instructionImg = document.getElementById('instruction-image');
  const instructionTxt = document.getElementById('instruction-text');
  const lineTxt = document.getElementById('line-txt');
  const lineImg= document.getElementById('line-instructions');
  const coinDisplay = document.querySelector('.coin-display');
  const coins = document.getElementsByClassName('coins');
  const fortuneTellingScreen = document.querySelector('#fortune-telling');
  const grid1 = document.getElementById('grid-1');
  const grid2 = document.getElementById('grid-2');
  const grid3 = document.getElementById('grid-3');
  const grid4 = document.getElementById('grid-4');
  const grid5 = document.getElementById('grid-5');
  const grid6 = document.getElementById('grid-6');
  const gridList = [grid1, grid2, grid3, grid4, grid5, grid6];


  // Music & Info Buttons
  musicButton.addEventListener('click', (e) => {
    console.log('music');
    const musicImg = document.querySelectorAll('img')[0];
    if (musicEnabled) {
      musicImg.src = '../../../assets/audio_off.png';
      // bgm.pause();
    } else {
      musicImg.src = '../../../assets/audio_on.png';
      // bgm.play();
    }
    musicEnabled = !musicEnabled;
  });

  infoButton.addEventListener('click', (e) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });

  // Read contents from JSON using FortuneEngine
  const engine = new FortuneEngine('ying_yang_coin');

  await engine.db_reader('yin_yang_coin.json');

  // Start Button
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
        lineTxt.style.display = 'none';
        lineImg.style.display = 'none';
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
        // Added Line Type to Side Bar
        if(coinResult.type == 'Yin') {
          setTimeout(function() {
            gridList[tossCounter - 1].innerHTML += '<img id="line-image" src="broken_line.PNG" alt="instruction image display failed."/>';
          }, 3200);
        }
        else {
          setTimeout(function() {
            gridList[tossCounter - 1].innerHTML += '<img id="line-image" src="solid_line.PNG" alt="instruction image display failed."/>';
          }, 3200);
        }
        

        // Coin Rotation
        const coinStates = coinResult.coins.toLowerCase();
        const coinState1 = coinStates.slice(0,1);
        const coinState2 = coinStates.slice(1,2);
        const coinState3 = coinStates.slice(2,3);

        coins[0].style.animation = `${coinState1}-rotate-${tossCounter%2} 3s ease forwards`;
        coins[1].style.animation = `${coinState2}-rotate-${tossCounter%2} 3s ease forwards`;
        coins[2].style.animation = `${coinState3}-rotate-${tossCounter%2} 3s ease forwards`;

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
        lineTxt.style.display = 'block';
        lineImg.style.display = 'inline-block';
        instructionTxt.innerHTML = 'Your instruction/expositionary text goes here.'
        for(let i = 0; i < 6; i++) {
          console.log(gridList[i]);
          gridList[i].innerHTML = '';
        }
        break;
    }
    // fortuneTellingScreen.style.display = "block";
    // instructionScreen.style.display = "none";
  });
});

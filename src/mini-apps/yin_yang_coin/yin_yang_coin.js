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
  // const titleElement = document.getElementById('mini-app-title');
  // const mainElement = document.querySelector('main');
  // const footerElement = document.querySelector('footer');

  //  Get button element
  const buttonElement = document.querySelector('button');

  //  Read contents from JSON using FortuneEngine
  const engine = new FortuneEngine('ying_yang_coin');

  await engine.db_reader('yin_yang_coin.json');

  //  Add button click event listener
  buttonElement.addEventListener('click', (event) => {
    const coinResult = engine.get_random_subset(1)[0];

    console.log(coinResult.fullType);
  });

  //  Start Screen
});

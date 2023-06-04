// all driver code should be within this event listener, ie adding other event listeners and calling on imported engine

import FortuneEngine from "../../engine.js";

const engine = new FortuneEngine();
const APP_NAME = "cartomancy";

document.addEventListener('DOMContentLoaded', async () => {

  // Read JSON File
  await engine.db_reader(`./${APP_NAME}.json`);

  // Background music
  const bgm = new Audio('cartomancy-audio.mp3'); //  eslint-disable-line
  bgm.play();
  bgm.loop = true;

  // Buttons
  let musicEnabled = true;
  let showInfo = false;
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const cardElements = document.querySelectorAll(".card");

  //  Add event listeners to the card elements
  console.log("cardElements:", cardElements);

  cardElements.forEach(cardElement => {
    console.log("element's id:", cardElement.id);

    cardElement.addEventListener("click", (e) => {

      selectCategory(cardElement.id);
    })
  })

  musicButton.addEventListener('click', (e) => {
    console.log('music');
    const musicImg = document.getElementById('music');
    if (musicEnabled) {
      musicImg.src = '/assets/audio_off.png';
      bgm.pause();
    } else {
      musicImg.src = '/assets/audio_on.png';
      bgm.play();
    }
    musicEnabled = !musicEnabled;
  });

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
})


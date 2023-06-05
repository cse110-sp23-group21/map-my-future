// all driver code should be within this event listener, ie adding other event listeners and calling on imported engine

import FortuneEngine from "../../engine.js";

const engine = new FortuneEngine();
const APP_NAME = "cartomancy";

document.addEventListener('DOMContentLoaded', async () => {

  // Read JSON File
  await engine.db_reader(`./${APP_NAME}.json`);

  // Background music
  const bgm = new Audio('/assets/cartomancy-background-music.mp3'); //  eslint-disable-line
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
    //console.log("element's id:", cardElement.id);

    cardElement.addEventListener("click", (e) => {

      //console.log("element's id:", cardElement.id);
      selectCategory(cardElement.id);
    });
  });

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

/*
// all driver code should be within this event listener, ie adding other event listeners and calling on imported engine

import FortuneEngine from "../../engine.js";

const engine = new FortuneEngine();

const TYPING_SPEED = 35;
const APP_NAME = "cartomancy";

document.addEventListener('DOMContentLoaded', async () => {
  // Read JSON File
  await engine.db_reader(`./${APP_NAME}.json`);

  // Background music
  const bgm = new Audio('../../../assets/reflected-light-cartomancy-bg.mp3'); //  eslint-disable-line
  bgm.play();
  bgm.loop = true;

  // Buttons
  let musicEnabled = true;
  let showInfo = false;
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const cardElements = document.querySelectorAll(".card");

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


  let cardsLie = document.querySelectorAll('.card-container')[0];
  let perspective = document.querySelectorAll('.perspective')[0];

  cardsLie.addEventListener("click", (e) => {
    if(cardsLie.classList.contains("spread")) {
      // put away cards, leaves 1
      cardsLie.classList.add("hide-cards");
      console.log("should of begun hiding cards");

      setTimeout(() => {
        //cardsLie.style.display = 'none'; //reoves only the space for cards
        perspective.style.display = 'none'; // removes the 'perspective tag'
        console.log("turned display attr off");


        readCardFortunes();

      }, 2000);


    }
    else {
      cardsLie.classList.add("spread");
      console.log("add spread class to spread cards");
      //console.log(document.querySelectorAll('.card-container')[0]);

      // dissappear text
      let message = document.querySelectorAll('.message')[0];
      message.classList.add("fade-out");
      setTimeout(() => {
        message.style.display = 'none';
      }, 1000);
    }

  });

  infoButton.addEventListener('click', (e) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });

})

// begins the stage of reading cards, 1-3 choices
function readCardFortunes() {



  const receivedFortunes = engine.get_random_subset(3);

  const fortune1 = receivedFortunes[0];
  const fortune2 = receivedFortunes[1];
  const fortune3 = receivedFortunes[2];

  const displayFortuneContainer = document.createElement('div');
  displayFortuneContainer.classList.add('displayFortuneContainer');

  console.log(receivedFortunes);


  const TEMPDISPLAY = document.createElement('p');
  const node = document.createTextNode('Display fortunes in this new div');
  TEMPDISPLAY.classList.add('read-fortune');
  
  TEMPDISPLAY.appendChild(node);
  displayFortuneContainer.appendChild(TEMPDISPLAY);

  //const element = document.getElementById('body');
  document.body.appendChild(displayFortuneContainer);


  // output the results
  console.log(fortune1['result']);

}

/*
  /*
function displayFortune() {
  const container = document.getElementsByClassName('display-fortune')[0];
  const resetButton = document.getElementsByClassName('reset-button-container')[0];

  const message = document.getElementById('fortune-message');
  const fortune = document.getElementById('fortune-received');

  let receivedFortune = engine.get_random_subset(1)[0][selectedCategory];

  message.textContent = `Your fortune for ${selectedCategory} is:`;

  container.classList.add('show');
  resetButton.classList.add('show');

  // clear any existing text
  fortune.textContent = '';

  let index = 0;

  // create a new audio object
  const typingSound = new Audio("fortune_stick_reveal.ogg")
  typingSound.currentTime = 0;
  typingSound.play();
  // set up the typing effect
  const typingInterval = setInterval(() => {
    // add the next character to the textContent
    fortune.textContent += receivedFortune[index];

    // play the typing sound
    //typingSound.currentTime = 0; // reset sound to start
    //typingSound.play();

    index++;
    // if we've displayed the whole message, clear the interval
    if (index >= receivedFortune.length) {
      clearInterval(typingInterval);
    }
  }, TYPING_SPEED); // this value controls the typing speed, adjust as desired

  */

// all driver code should be within this event listener, ie adding other event listeners and calling on imported engine

import FortuneEngine from "../../engine.js";

const engine = new FortuneEngine();

let selectedCategory = '';
let receivedFortune = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad est, laboriosam optio molestias iste, quam perferendis vitae voluptatum minus ullam libero eum nisi. Necessitatibus ipsum alias, molestias adipisci doloremque totam!';
const TYPING_SPEED = 35;

document.addEventListener('DOMContentLoaded', async () => {

  // Read JSON File
  await engine.db_reader("./fortune_stick.json");

  // Background music
  const bgm = new Audio('../../../assets/30sec_water_lillies.mp3'); //  eslint-disable-line
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
      cardElement.classList.toggle("turn-card");
      

      selectCategory(cardElement.id);
    })
  })

  musicButton.addEventListener('click', (e) => {
    console.log('music');
    const musicImg = document.querySelectorAll('img')[2];
    if (musicEnabled) {
      musicImg.src = '../../../assets/audio_off.png';
      bgm.pause();
    } else {
      musicImg.src = '../../../assets/audio_on.png';
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

// Select category card
function selectCategory(category) {
  selectedCategory = category;

  const notChosen = document.querySelectorAll(`.card:not(#${category})`);
  const allCards = document.getElementsByClassName('categories')[0];


  for(let i = 0; i < notChosen.length; i++) {
    notChosen[i].classList.toggle('hide');
    notChosen[i].style.opacity = '0';
    console.log(notChosen[i]);
  }


  let notChosenCards = document.getElementsByClassName('card hide');


  setTimeout(() => {
    allCards.style.display = 'none';

    displayFortune();
  }, 1000);
}


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
}


// function displayFortune() {
//   const container = document.getElementsByClassName('display-fortune')[0];
//   const resetButton = document.getElementsByClassName('reset-button-container')[0];

//   const message = document.getElementById('fortune-message');
//   const fortune = document.getElementById('fortune-received');

//   message.textContent = `Your fortune for ${selectedCategory} is:`;
//   //fortune.textContent = receivedFortune;
//   fortune.textContent = engine.get_random_subset(1)[0][selectedCategory];

//   container.classList.add('show');
//   resetButton.classList.add('show');
// }

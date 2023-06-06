// all driver code should be within this event listener, ie adding other event listeners and calling on imported engine

import FortuneEngine from "../../engine.js";

const engine = new FortuneEngine();
const APP_NAME = "cartomancy";

let cardsPicked = 0; // counter when 3 cards are picked

document.addEventListener('DOMContentLoaded', async () => {

  // Read JSON File
  // Taken of: https://www.thetarotguide.com/
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
  const readFortuneButton = document.getElementById("read-fortune-button");
  const cardElements = document.querySelectorAll(".card");
  const wholeDeck = document.querySelectorAll(".deck");

  /*
  //  Add event listeners to the card elements
  console.log("cardElements:", cardElements);

  cardElements.forEach(cardElement => {
    //console.log("element's id:", cardElement.id);

    cardElement.addEventListener("click", (e) => {

      //console.log("element's id:", cardElement.id);

      // TODO: add card to pickContainer
      addCard();


      // TODO: only read after three have been chosen
      readCards();
    });
  });
  */


  //  Add event listeners to the card elements
  console.log("cardElements:", cardElements);


  // add a listener for when cardsPicked = 3
  // make the button visible

  readFortuneButton.addEventListener("click", (e) => {

    //console.log("Yeah you loaded thsi many cards:");
    
    //console.log(cardsPicked);

    // put away cards, leaves 1
    console.log(wholeDeck);
    wholeDeck.forEach( (cards) => {
      cards.classList.add("hide-cards");
    });

    console.log("should of begun hiding cards");

    setTimeout(() => {

    console.log(wholeDeck);
      wholeDeck.forEach( (cards) => {
        //cards.style.display = 'none'; // removes the 'perspective tag'
        cards.remove();
        console.log("turned display attr off");
      });

      //readCardFortunes();
    }, 1000);
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
});

// Card selector counter 
let i = 0; 

// Allows cards to be selectable and dragged to satisfied palce 
let sourceContainerID =''; 
let droppedID =''; 
const card1s = document.querySelectorAll('.card1');
const card2s = document.querySelectorAll('.card2');
const card3s = document.querySelectorAll('.card3');
const pickContainer1 = document.querySelector('.pickContainer1');
const pickContainer2 = document.querySelector('.pickContainer2');
const pickContainer3 = document.querySelector('.pickContainer3');

const card1sArray = Array.from(card1s);
const card2sArray = Array.from(card2s); 
const card3sArray = Array.from(card3s);

card1s.forEach(card => {
    card.addEventListener('dragstart', dragStart); 
})
card2s.forEach(card => {
    card.addEventListener('dragstart', dragStart); 
}); 
card3s.forEach(card => {
    card.addEventListener('dragstart', dragStart); 
})

pickContainer1.addEventListener('drop', dropped); 
pickContainer1.addEventListener('dragenter', cancelDefault); 
pickContainer1.addEventListener('dragover', cancelDefault); 

pickContainer2.addEventListener('drop', dropped); 
pickContainer2.addEventListener('dragenter', cancelDefault); 
pickContainer2.addEventListener('dragover', cancelDefault); 

pickContainer3.addEventListener('drop', dropped); 
pickContainer3.addEventListener('dragenter', cancelDefault); 
pickContainer3.addEventListener('dragover', cancelDefault); 

function cancelDefault (e) {
    e.preventDefault(); 
    e.stopPropagation(); 
    return false; 
}
function dragStart (e) {
    e.dataTransfer.setData('text/plain', e.target.id); 
    sourceContainerID = this.parentElement.id; 
    droppedID = this.id; 
}
function dropped (e) {
    if (this.id !== sourceContainerID) {
        cancelDefault(e); 
        let id = e.dataTransfer.getData('text/plain'); 
        if (droppedID == 'card1') {
            const droppedElement = card1sArray[i];
            e.target.appendChild(card1sArray[i]);
            droppedElement.draggable = false; 
            i++;  
        }else if (droppedID == 'card2') {
            const droppedElement = card2sArray[i];
            e.target.appendChild(card2sArray[i]);
            droppedElement.draggable = false; 
            i++; 
        }else if(droppedID == 'card3') {
            const droppedElement = card3sArray[i];
            e.target.appendChild(card3sArray[i]);
            droppedElement.draggable = false; 
            i++; 
        }
    }
  cardsPicked++;

  if(cardsPicked == 3) {
    // assumes document is loaded
    //console.log("reached 3 cards loaded");
    document.querySelectorAll('.read-fortune-space')[0].style.display = 'flex';
  }
    
}

/* Add this current card to the div container
 * @Param perhaps the card itelf
 */
function addCard() {


}

/*
 * Begin the fortune telling process by reading the chosen cards
 */
function readCards() {
  // animations, grouping etc here
  

  // begins the stage of reading cards, 1-3 choices

  const receivedFortunes = engine.get_random_subset(3);

  const fortune1 = receivedFortunes[0];
  const fortune2 = receivedFortunes[1];
  const fortune3 = receivedFortunes[2];

  /*const pickedCardsArea = document.getElementById('pickContainer');*/

  // delete the previous stuff place for cards
  //const unchosenCards = document.getElementsByClassName('center-div')[0];
  const unchosenCards = document.getElementById('cards-set-down');
  unchosenCards.classList.add('hide-cards');
  setTimeout(() => {
    // FIXME: this should be unchosenCrds.style.display = 'none', but this resizes the screen
    unchosenCards.style.opacity = '0'; 
    console.log("should of begun hiding cards");

    // now bring the fortune to the center

    pickedCardsArea.style.transition = '2s';
    
    pickedCardsArea.style.top = '45%';
    pickedCardsArea.style.left = '40%';


    // now continue displaying the fortune

    const displayFortuneContainer = document.createElement('div');
    displayFortuneContainer.classList.add('displayFortuneContainer');

    console.log(receivedFortunes);

    /*

    const TEMPDISPLAY = document.createElement('p');
    const node = document.createTextNode('Display fortunes in this new div');
    TEMPDISPLAY.classList.add('read-fortune');

    TEMPDISPLAY.appendChild(node);
    displayFortuneContainer.appendChild(TEMPDISPLAY);

    //const element = document.getElementById('body');
    document.body.appendChild(displayFortuneContainer);
    */


    // output the results
    console.log(fortune1['result']);

  }, 1000);

}

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

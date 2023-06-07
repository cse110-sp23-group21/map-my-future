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


  //  Add event listeners to the card elements
  console.log("cardElements:", cardElements);


  // button display:'flex' after 3 cards
  readFortuneButton.addEventListener("click", (e) => {

    //console.log("Yeah you loaded thsi many cards:");
    
    // put away cards
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
    
    // start reading cards
    readCards();

    }, 1000);
  }); 

  musicButton.addEventListener('click', (e) => {
    console.log('music');
    const musicImg = document.getElementById('music');
    if (musicEnabled) {
      musicImg.src = '/assets/audio_off.png';
      bgm.pause();
    }
    else {
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
const pickContainer1 = document.getElementById('pickContainer1');
const pickContainer2 = document.getElementById('pickContainer2');
const pickContainer3 = document.getElementById('pickContainer3');

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

// TODO: Documentation for function
function cancelDefault (e) {
    e.preventDefault(); 
    e.stopPropagation(); 
    return false; 
}

// TODO: Documentation for function
function dragStart (e) {
    e.dataTransfer.setData('text/plain', e.target.id); 
    sourceContainerID = this.parentElement.id; 
    droppedID = this.id; 
}

// TODO: Documentation for function
function dropped (e) {
  if (this.id !== sourceContainerID) {
    cancelDefault(e); 
    let id = e.dataTransfer.getData('text/plain'); 
    if (droppedID == 'card1') {
      const droppedElement = card1sArray[i];
      e.target.appendChild(card1sArray[i]);
      droppedElement.draggable = false; 
      i++;  
    } 
    else if (droppedID == 'card2') {
      const droppedElement = card2sArray[i];
      e.target.appendChild(card2sArray[i]);
      droppedElement.draggable = false; 
      i++; 
    } 
    else if(droppedID == 'card3') {
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

  const pickContainer1 = document.getElementById('pickContainer1');
  const pickContainer2 = document.getElementById('pickContainer2');
  const pickContainer3 = document.getElementById('pickContainer3');

  setTimeout(() => {

    /***** creates html elements in js   ****/ 
    /***** After writing, should look into finding a way to load better  ****/ 


    console.log("should of begun hiding cards");

    let indCard = document.createElement('div');
    let indCardImageContainer = document.createElement('div');
    let indCardImage = document.createElement('img');
    let content = document.createElement('div');
    let fDescr = document.createElement('p');
    let node = document.createTextNode('read fortune in here man');

    fDescr.classList.add('read-fortune');
    indCard.classList.add('cardShow');
    indCardImageContainer.classList.add('image');
    indCardImage.setAttribute("href", "#"); 
    indCardImage.setAttribute("src", "https://i.pinimg.com/originals/a4/7b/a5/a47ba59b4a353e0928ef0551ca44f980.jpg"); 
    content.classList.add('content');


    console.log(receivedFortunes);

    fDescr.appendChild(node);

    indCard.appendChild(indCardImageContainer);
    indCardImageContainer.appendChild(indCardImage);

    content.appendChild(node);
    indCard.appendChild(content);

    // remove the image of the back of the card
    // assumes the two children, img and container are here
    pickContainer1.removeChild(pickContainer1.firstElementChild);
    
    pickContainer1.appendChild(indCard);

    /*
     <div class = card>
          <div class = image>
            <img href = "#" src='imgsrc'>
          </div>
          <div class = content>
            <h3>This is content</h3>
            <p>information</p>
          </div>
        </div> 
    */


    // output the results
    console.log(fortune1['result'], document.query);

    // actually may better loop later
    let i = 0;
    while(i < 1) { // loop through first 3
      let picking = document.getElementById(`pickContainer{i}`);
      displayFortune(picking, receivedFortunes[i]);
      i++;
    }

  }, 1000);

}

async function displayFortune(pick, fortune) {
  console.log("supposed to be reading fortune now");
  console.log(pick);
  console.log(fortune);
  /*
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
}

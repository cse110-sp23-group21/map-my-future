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

  // buttons
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const readFortuneButton = document.getElementById("read-fortune-button");
  const startButton = document.getElementById('start-button'); 

  const origDeck = document.getElementById('card-display');
  const center_div = document.getElementById('center-div');


  startButton.addEventListener('click', (e) => {    
    console.log("start");
    document.getElementById('intro').style.display = "none"; 
    origDeck.style.display = "initial";
    document.getElementById('start-button').style.display = "none";
  });

  // button display:'flex' after 3 cards
  readFortuneButton.addEventListener("click", (e) => {

    //console.log("Yeah you loaded thsi many cards:");

    // put away cards
    console.log(origDeck);
    origDeck.classList.add("hide-cards");

    console.log("should of begun hiding cards");

    setTimeout(() => {

      origDeck.remove();
      console.log("turned display attr off");

      // start reading cards
      readCards(center_div); 

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
let pickCounter1 = 0; 
let pickCounter2 = 0; 
let pickCounter3 = 0; 

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
      if((e.target.id == 'pickcontainer1' || e.target.id == 'pickcontainer2' || e.target.id == 'pickcontainer3') || (e.target.id !== 'card1' && e.target.id !== 'card2' && e.target.id !== 'card3')){
        const droppedElement = card1sArray[i];
        e.target.appendChild(card1sArray[i]);
        droppedElement.draggable = false; 
        cardsPicked++;
        i++;  
      }
    } 
    else if (droppedID == 'card2') {
      if ((e.target.id == 'pickcontainer1' || e.target.id == 'pickcontainer2' || e.target.id == 'pickcontainer3') || (e.target.id !== 'card1' && e.target.id !== 'card2' && e.target.id !== 'card3')) {
      const droppedElement = card2sArray[i];
      e.target.appendChild(card2sArray[i]);
      droppedElement.draggable = false; 
      cardsPicked++;
      i++;
      }
    } 
    else if(droppedID == 'card3') {
      if((e.target.id == 'pickcontainer1' || e.target.id == 'pickcontainer2' || e.target.id == 'pickcontainer3') || (e.target.id !== 'card1' && e.target.id !== 'card2' && e.target.id !== 'card3')) {
      const droppedElement = card3sArray[i];
      e.target.appendChild(card3sArray[i]);
      droppedElement.draggable = false; 
      cardsPicked++; 
      i++; 
      }
  }
}

  // Enable reset button after card is picked
  if(cardsPicked == 1) {
    document.querySelector('#reset-button').style.display = 'flex';
  }

  // Once user selects 3 cards, their fortune can be read
  if(cardsPicked == 3) {
    // assumes document is loaded
    //console.log("reached 3 cards loaded");
    document.querySelectorAll('.read-fortune-space')[0].style.display = 'flex';
  }

}

/*
 * Begin the fortune telling process by reading the chosen cards
 */
function readCards(center_div) {
  // animations, grouping etc here
  center_div.classList.add('container');

  // remove the reading fortune button
  document.getElementById('read-fortune-button').style.display = 'none';

  // begins the stage of reading cards, 1-3 choices

  const receivedFortunes = engine.get_random_subset(3);

  // add container class

  const fortune1 = receivedFortunes[0];
  const fortune2 = receivedFortunes[1];
  const fortune3 = receivedFortunes[2];

  const pickContainer1 = document.getElementById('pickContainer1');
  const pickContainer2 = document.getElementById('pickContainer2');
  const pickContainer3 = document.getElementById('pickContainer3');


  setTimeout(() => {

    // actually may better loop later
    let i = 1;
    while(i < 4) { // loop through first 3
      let picking = document.getElementById(`pickContainer${i}`);
      console.log("trying to send another container");
      console.log(picking);
      organizeCards(picking, receivedFortunes[i-1]);
      i++;
    }

  }, 1000);

}


/*
 * Creates the elements surrounding the dsiplaying of the three fortunes
 */
function organizeCards(pick, fortune) {
  /***** creates the following html elements with js
   *
   *  <div class = card>
   *    <div class = image>
   *      <img href = "#" src='imgsrc'>
   *    </div>
   *    <div class = content>
   *      <h3>name</h3>
   *      <p>information</p>
   *    </div>
   *  </div> 
   *
   *
   */
  /***** After writing, should look into finding a way to load better  ****/ 
  console.log(pick.firstChild);
  pick.removeChild(pick.firstChild);

  pick.classList.remove('pickContainer');
  pick.classList.add('read-container');

  console.log("should of begun hiding cards");
  //console.log(pick);
  //console.log(fortune);

  let indCard = document.createElement('div');
  let indCardImageContainer = document.createElement('div');
  let indCardImage = document.createElement('img');
  let content = document.createElement('div');
  let fDescr = document.createElement('p');
  let node = document.createTextNode(fortune['result']); // add fortune text

  // add attributes
  fDescr.classList.add('read-fortune');
  indCard.classList.add('cardShow');
  indCardImageContainer.classList.add('image');
  indCardImage.setAttribute("href", "#"); 
  indCardImage.setAttribute("src", `/assets/${APP_NAME}/${fortune['image']}.png`); 
  content.classList.add('content');


  // nest them by adding as children
  fDescr.appendChild(node);

  indCard.appendChild(indCardImageContainer);
  indCardImageContainer.appendChild(indCardImage);

  content.appendChild(node);
  indCard.appendChild(content);

  // remove the image of the back of the card
  // assumes the two children, img and container are here
  pick.appendChild(indCard);
}

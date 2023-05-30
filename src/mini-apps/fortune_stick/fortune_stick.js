// all driver code should be within this event listener, ie adding other event listeners and calling on imported engine

let selectedCategory = '';
let receivedFortune = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad est, laboriosam optio molestias iste, quam perferendis vitae voluptatum minus ullam libero eum nisi. Necessitatibus ipsum alias, molestias adipisci doloremque totam!';

document.addEventListener('DOMContentLoaded', () => {

  // Background music
  const bgm = new Audio('../../../assets/map-my-future-bgm.ogg'); //  eslint-disable-line
  bgm.play();
  bgm.loop = true;

  // Buttons
  let musicEnabled = true;
  let showInfo = false;
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');

  musicButton.addEventListener('click', (e) => {
    const musicImg = document.querySelectorAll('img')[0];
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
    const container = document.getElementsByClassName('display-fortune')[0];

    categories.style.display = 'flex';
    container.classList.remove('show');
    container.removeChild()
  });
})

// Select category card
function selectCategory(category) {
  selectedCategory = category;

  const cards = document.getElementsByClassName('card');
  const categories = document.getElementsByClassName('categories')[0];

  for (const card of cards) {
    card.classList.add('fade');
  }

  setTimeout(() => {
    for (const card of cards) {
      card.classList.remove('fade');
    }
    categories.style.display = 'none';
    displayFortune();
  }, 1000);
}

function displayFortune() {
  const container = document.getElementsByClassName('display-fortune')[0];
  const resetButton = document.getElementsByClassName('button-container-bottom-center')[0];

  console.log(resetButton);

  const message = document.getElementById('fortune-message');
  const fortune = document.getElementById('fortune-received');

  message.textContent = `Your fortune for ${selectedCategory} is:`;
  fortune.textContent = receivedFortune;

  container.classList.add('show');
  resetButton.classList.add('show');
}
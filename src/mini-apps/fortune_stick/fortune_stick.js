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

  const cards = document.getElementsByClassName('card');
  const categories = document.getElementsByClassName('categories')[0];

  categories.classList.add('hide');

  setTimeout(() => {
    categories.style.display = 'none';
    displayFortune();
  }, 1000);
}

function displayFortune() {
  const container = document.getElementsByClassName('display-fortune')[0];
  const resetButton = document.getElementsByClassName('reset-button-container')[0];

  const message = document.getElementById('fortune-message');
  const fortune = document.getElementById('fortune-received');

  message.textContent = `Your fortune for ${selectedCategory} is:`;
  fortune.textContent = receivedFortune;

  container.classList.add('show');
  resetButton.classList.add('show');
}
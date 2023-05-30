// all driver code should be within this event listener, ie adding other event listeners and calling on imported engine

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
    console.log('test');
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
})
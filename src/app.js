// Main page map JavaScript file

// Wait for all DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const locations = document.querySelectorAll('.location');
  const instructionTxt = document.getElementById('instruction-text');
  let panelState = 'inactive';
  let locationName = '';

  // Background music
  const bgm = new Audio('../assets/map-my-future-bgm.ogg'); //  eslint-disable-line
  bgm.play();
  bgm.loop = true;

  // Clickable map
  locations.forEach(location => {
    location.addEventListener('click', () => {
      locationName = location.getAttribute('data-location');

      // Side panel click constraint
      if(panelState == 'inactive'){
        panelState = 'active';
        location.setAttribute('toggle-by', 'true');
        document.querySelector(".main").classList.toggle("side-panel-open");

        // Update panel content based on selected location
        instructionTxt.innerHTML = `${locationName} + "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nobis eaque cupiditate ea vitae fuga
        sed temporibus aperiam nisi eius omnis, hic similique culpa sequi architecto reiciendis a, soluta
        inventore."`;
        
      } else{
        if(location.getAttribute('toggle-by') == 'true'){
          panelState = 'inactive';
          location.setAttribute('toggle-by', 'false');
          document.querySelector(".main").classList.toggle("side-panel-open");
        }
      }
    });
  });

  // Buttons
  let musicEnabled = true;
  let showInfo = false;
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const enterButton = document.querySelector('.enter-button');

  enterButton.addEventListener('click', (e) => {
    // Add navigation to mini-app during Sprint 2 here.
    console.log(`${locationName} is selected.`);
  });

  musicButton.addEventListener('click', (e) => {
    const musicImg = document.querySelectorAll('img')[0];
    if (musicEnabled) {
      musicImg.src = '../assets/audio_off.png';
      bgm.pause();
    } else {
      musicImg.src = '../assets/audio_on.png';
      bgm.play();
    }
    musicEnabled = !musicEnabled;
  });

  infoButton.addEventListener('click', (e) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });
});

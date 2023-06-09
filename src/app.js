// Main page code goes here

// Wait for all DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Stores the current state side panel. Default to 'inactive'. Turn to 'active' when side panel open.
   */
  let panelState = 'inactive';

  /**
   * Stores the selected location name.
   */
  let locationName = '';

  /**
   * List of 4 DOM access to map locations.
   */
  const locations = document.querySelectorAll('.location');

  /**
   * DOM access to side panel.
   */
  const sidePanel = document.getElementById('panel');

  /**
   * DOM access to side panel layout grid.
   */
  const panelLayout = document.querySelector('.layout');

  /**
   * DOM access to instruction text shown on side panel.
   */
  const instructionTxt = document.getElementById('instruction-text');

  /**
   * Background music audio.
   * @type {Audio}
   */
  const bgm = new Audio('../assets/Waltz-of-the-fortune-teller.mp3'); //  eslint-disable-line
  bgm.play();
  bgm.loop = true;

  /**
   * Listen to click event for the each location section on the map.
   * Display the corresponding side instruction screen.
   *
   * @listens location#click
   */
  locations.forEach(location => {
    location.addEventListener('click', () => {
      // Retrieve selected location name.
      locationName = location.getAttribute('data-location');

      // When side panel is close, click from any locations can open it.
      if (panelState === 'inactive') {
        panelState = 'active';
        location.setAttribute('toggle-by', 'true');
        document.querySelector('.main').classList.toggle('side-panel-open');

        // Update instruction content & background to the selected location
        if (locationName === 'Molybdomancy') {
          instructionTxt.innerHTML = 'Molybdomancy is a traditional divination practice that involves the interpretation of shapes and symbols formed by molten metal, usually lead or tin, when poured into cold water. </br></br> In this method of fortune-telling, you will click to melt the solid tin and observe the transformed shape. </br></br> An interpretation will be provided at the end of each round. </br> </br>';
          sidePanel.style.backgroundImage = 'url(../assets/side-moly.png)';
          panelLayout.style.marginTop = '40%';
        } else if (locationName === 'Fortune Stick') {
          instructionTxt.innerHTML = 'Fortune sticks, also known as Chinese fortune sticks or divination sticks, are a traditional method of seeking guidance and insight from Chinese culture. </br></br> In this method of fortune-telling, you will click to shake the container and retrieve a single fortune stick. </br></br> An interpretation will be generated at the end of each round.';
          sidePanel.style.backgroundImage = 'url(../assets/side-stick.png)';
          panelLayout.style.marginTop = '60%';
        } else if (locationName === 'Cartomancy') {
          instructionTxt.innerHTML = 'Cartomancy is a divination practice that uses a deck of playing cards to gain insights into the past, present, and future. </br></br> In this method of fortune-telling, you will draw 3 cards, 1 from each deck, via drag and drop at specific locations. </br></br> An interpretation will be shown at the end of each round.';
          sidePanel.style.backgroundImage = 'url(../assets/side-cart.png)';
          panelLayout.style.marginTop = '50%';
        } else {
          instructionTxt.innerHTML = 'The Yin Yang Coin is a traditional tool used for divination and decision-making. </br></br> In this method of fortune-telling, you will toss 3 coins 6 times to generate your Hexagram. </br> </br> Every toss will result in either a broken or a solid line, indicating Yin or Yang. Detail examples will be shown on the start page once enter. </br> </br> There are 64 hexagrams in total, each corresponds to a specific fortune. An interpretation will be provided at the end of each round. </br> </br>';
          sidePanel.style.backgroundImage = 'url(../assets/side-coin.png)';
          panelLayout.style.marginTop = '40%';
        }
        
        // Disable mouse hover for all locations when one gets selected.
        for (const loc of locations) {
          loc.setAttribute('hoverable', 'false');
        }

      // When side panel is open, only click from the selected location can close it.
      } else {
        if (location.getAttribute('toggle-by') === 'true') {
          panelState = 'inactive';
          location.setAttribute('toggle-by', 'false');
          sidePanel.style.backgroundImage = 'none';
          document.querySelector('.main').classList.toggle('side-panel-open');

          // Enable mouse hover for all locations when one gets de-selected.
          for (const loc of locations) {
            loc.setAttribute('hoverable', 'true');
          }
        }
      }
    });
  });

  // Music & Info Buttons
  let musicEnabled = true;
  let showInfo = false;
  const musicButton = document.getElementById('music-button');
  const infoButton = document.getElementById('info-button');
  const enterButton = document.querySelector('.enter-button');

  /**
   * Listen to click event for the enter button on side panel.
   * Navigate to the selected mini-app page.
   *
   * @listens enterButton#click
   */
  enterButton.addEventListener('click', (e) => {
    // Navigation to mini-app pages.
    if (locationName === 'Cartomancy') {
      window.location.href = './mini-apps/cartomancy/cartomancy.html';
    } else if (locationName === 'Molybdomancy') {
      window.location.href = './mini-apps/molybdomancy/molybdomancy.html';
    } else if (locationName === 'Fortune Stick') {
      window.location.href = './mini-apps/fortune_stick/fortune_stick.html';
    } else if (locationName === 'Yin Yang Coin') {
      window.location.href = './mini-apps/yin_yang_coin/yin_yang_coin.html';
    }
  });

  /**
   * Listen to click event for the music UI button.
   * Toggles musicEnabled and calls the setMusicState() method.
   *
   * @listens musicButton#click
   */
  musicButton.addEventListener('click', (e) => {
    const musicImg = document.getElementById('music');
    if (musicEnabled) {
      musicImg.src = '../assets/audio_off.png';
      bgm.pause();
    } else {
      musicImg.src = '../assets/audio_on.png';
      bgm.play();
    }
    musicEnabled = !musicEnabled;
  });

  /**
   * Listen to click event for the info UI button.
   * Toggles showInfo and toggles display of the info panel.
   *
   * @listens infoButton#click
   */
  infoButton.addEventListener('click', (e) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });
});

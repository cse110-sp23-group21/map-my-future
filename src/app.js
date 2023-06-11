/**
 * Main page JavaScript code
 */

import setMusicState from "./autoplay.js";

// Wait for all DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Stores the current state of info screen.
   */
  let showInfo = false;

  /**
   * Stores the current state of main page music.
   */
  let musicEnabled = true;

  /**
   * Stores the selected location name.
   */
  let locationName = '';

  /**
   * Stores the previous selected location name.
   */
  let previousLocationName = '';

  /**
   * Stores the current state of side panel. Default to 'inactive'. Turn to 'active' when side panel open.
   */
  let panelState = 'inactive';

  /**
   * DOM access to music enable button.
   */
  const musicButton = document.getElementById('music-button');

  /**
   * Music on/off image element (part of general UI)
   */
  const musicImage = document.getElementById('music');

  /**
   * DOM access to info display button.
   */
  const infoButton = document.getElementById('info-button');

  /**
   * DOM access to mini-app navigation button on the side panel.
   */
  const enterButton = document.querySelector('.enter-button');

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
   * Side panel open/switch/close sound effect.
   * @type {Audio}
   */
  const sideAudio = new Audio('assets/home/bgm-side.wav'); 

  /**
   * Background music audio.
   * @type {Audio}
   */
  const bgm = new Audio('assets/home/bgm.mp3'); //  eslint-disable-line

  const MUSIC_ON_IMAGE = "assets/audio_on.png";

  const MUSIC_OFF_IMAGE = "assets/audio_off.png";

  // Initialize all sound property.
  sideAudio.volume = 0.4;
  bgm.loop = true;

  //  Attempt to autoplay background music
  bgm.play().then(() => {
    //  Autoplay started!
  }).catch(() => {
    //  Autoplay failed - set music to off
    musicEnabled = false;
    setMusicState(bgm, musicImage, musicEnabled, MUSIC_ON_IMAGE, MUSIC_OFF_IMAGE);
  });

  /**
   * Listen to click event for the each location section on the map.
   * Display the corresponding side instruction screen.
   * Play side panel sound effect.
   *
   * @listens location#click
   */
  locations.forEach(location => {
    location.addEventListener('click', () => {
      // Play side panel sound effect for every click
      sideAudio.play();

      // Retrieve selected location name.
      locationName = location.getAttribute('data-location');

      // When no continent is selected, this click would open the side panel.
      if (panelState === 'inactive') {
        // Update corresponding variable state
        panelState = 'active';
        previousLocationName = locationName;
        location.setAttribute('toggle-by', 'true');
        document.querySelector('.main').classList.toggle('side-panel-open');

        // Update instruction content & background to the selected location.
        if (locationName === 'Molybdomancy') {
          instructionTxt.innerHTML = 'Molybdomancy is a traditional divination practice that involves the interpretation of shapes and symbols formed by molten metal, usually lead or tin, when poured into cold water. </br></br> In this method of fortune-telling, you will click to melt the solid tin and observe the transformed shape.';
          sidePanel.style.backgroundImage = 'url(assets/home/side-moly.png)';
          panelLayout.style.marginTop = '40%';
        } else if (locationName === 'Fortune-Stick') {
          instructionTxt.innerHTML = 'Fortune sticks, also known as Chinese fortune sticks or divination sticks, are a traditional method of seeking guidance and insight from Chinese culture. </br></br> In this method of fortune-telling, you will click to shake the container and retrieve a single fortune stick. </br></br> An intepretation would be generated at the end of each round.';
          sidePanel.style.backgroundImage = 'url(assets/home/side-stick.png)';
          panelLayout.style.marginTop = '60%';
        } else if (locationName === 'Cartomancy') {
          instructionTxt.innerHTML = 'Cartomancy is a divination practice that uses a deck of playing cards to gain insights into the past, present, and future. </br></br> In this method of fortune-telling, you will randomly draw 3 cards, 1 from each deck, drag-and-drop them into card holder, then proceed to reveal the forune.';
          sidePanel.style.backgroundImage = 'url(assets/home/side-cart.png)';
          panelLayout.style.marginTop = '40%';
        } else {
          instructionTxt.innerHTML = 'The Yin Yang Coin is a traditional tool used for divination and decision-making. </br></br> In this method of fortune-telling, you will toss 3 coins 6 times to generate your Hexagram. </br> </br> Every toss will result in either a broken or a solid line, indicating Yin or Yang. </br> </br> There are 64 hexagrams in total, each corresponds to a specific fortune.';
          sidePanel.style.backgroundImage = 'url(assets/home/side-coin.png)';
          panelLayout.style.marginTop = '40%';
        }

      // When a continent is currently selected
      } else {
        // Close the side panel if the click comes from the same location.
        if (locationName === previousLocationName) {
          // Reset corresponding variable state
          panelState = 'inactive';
          location.setAttribute('toggle-by', 'false');
          sidePanel.style.backgroundImage = 'none';
          document.querySelector('.main').classList.toggle('side-panel-open');
        } else {
          // Switch panel content if the click comes from different location.
          const previousLocation = document.querySelector(`[data-location=${previousLocationName}]`);
          previousLocation.setAttribute('toggle-by', 'false');
          location.setAttribute('toggle-by', 'true');
          previousLocationName = locationName;

          // Update instruction content & background to the selected location.
          if (locationName === 'Molybdomancy') {
            instructionTxt.innerHTML = 'Molybdomancy is a traditional divination practice that involves the interpretation of shapes and symbols formed by molten metal, usually lead or tin, when poured into cold water. </br></br> In this method of fortune-telling, you will click to melt the solid tin and observe the transformed shape.';
            sidePanel.style.backgroundImage = 'url(assets/home/side-moly.png)';
            panelLayout.style.marginTop = '40%';
          } else if (locationName === 'Fortune-Stick') {
            instructionTxt.innerHTML = 'Fortune sticks, also known as Chinese fortune sticks or divination sticks, are a traditional method of seeking guidance and insight from Chinese culture. </br></br> In this method of fortune-telling, you will click to shake the container and retrieve a single fortune stick. </br></br> An intepretation would be generated at the end of each round.';
            sidePanel.style.backgroundImage = 'url(assets/home/side-stick.png)';
            panelLayout.style.marginTop = '60%';
          } else if (locationName === 'Cartomancy') {
            instructionTxt.innerHTML = 'Cartomancy is a divination practice that uses a deck of playing cards to gain insights into the past, present, and future. </br></br> In this method of fortune-telling, you will randomly draw 3 cards, 1 from each deck, drag-and-drop them into card holder, then proceed to reveal the forune.';
            sidePanel.style.backgroundImage = 'url(assets/home/side-cart.png)';
            panelLayout.style.marginTop = '40%';
          } else {
            instructionTxt.innerHTML = 'The Yin Yang Coin is a traditional tool used for divination and decision-making. </br></br> In this method of fortune-telling, you will toss 3 coins 6 times to generate your Hexagram. </br> </br> Every toss will result in either a broken or a solid line, indicating Yin or Yang. </br> </br> There are 64 hexagrams in total, each corresponds to a specific fortune.';
            sidePanel.style.backgroundImage = 'url(assets/home/side-coin.png)';
            panelLayout.style.marginTop = '40%';
          }
        }
      }
    });
  });

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
    } else if (locationName === 'Fortune-Stick') {
      window.location.href = './mini-apps/fortune_stick/fortune_stick.html';
    } else if (locationName === 'Yin-Yang-Coin') {
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
    musicEnabled = setMusicState(bgm, musicImage, !musicEnabled, MUSIC_ON_IMAGE, MUSIC_OFF_IMAGE);
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

/**
 * Sets the state (on / off) of the background music
 * @param {Audio} bgm Background music Audio object
 * @param {HTMLElement} musicImg HTML Element of the music UI button image
 * @param {boolean} newState Whether the background music
 *  should be turned on or off
 * @returns {boolean} the new state of the background music (set musicEnabled
 * to this)
 */
function setMusicState (bgm, musicImg, newState) {
  if (!newState) {
    //  If undefined, assume path from a mini-app folder
    musicImg.src = '/src/assets/audio_off.png';
    bgm.pause();
  } else {
    musicImg.src = '/src/assets/audio_on.png';
    bgm.play();
  }
  return newState;
}

export default setMusicState;

/**
 * Sets the state (on / off) of the background music
 * @param {Audio} bgm Background music Audio object
 * @param {HTMLElement} musicImg HTML Element of the music UI button image
 * @param {boolean} newState Whether the background music
 *  should be turned on or off
 * @param {string} onPath Path to the "audio_on.png" image; defaults to valid path
 * from a mini-app folder.
 * @param {string} offPath Path to the "audio_off.png" image; defaults to valid path
 * from a mini-app folder.
 * @returns {boolean} the new state of the background music (set musicEnabled
 * to this)
 */
function setMusicState (bgm, musicImg, newState, onPath, offPath) {
  if (!newState) {
    //  If undefined, assume path from a mini-app folder
    if (offPath === undefined) {
      musicImg.src = '../../assets/audio_off.png';
    } else {
      musicImg.src = offPath;
    }
    bgm.pause();
  } else {
    //  If undefined, assume path from a mini-app folder
    if (onPath === undefined) {
      musicImg.src = '../../assets/audio_on.png';
    } else {
      musicImg.src = onPath;
    }
    bgm.play();
  }
  return newState;
}

export default setMusicState;

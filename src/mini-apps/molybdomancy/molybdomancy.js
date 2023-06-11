/*  Molybdomancy Code Here  */

/**
 * List of shapes for molybdomancy
 *
 * @author Gil Keidar
 */

import FortuneEngine from '../../engine.js';

let elts = {};
const texts = [
  'Solid Tin'
];

const morphTime = 10;
const cooldownTime = 0.25;

let textIndex = -1;
let time;
let morph = 0;
let cooldown = cooldownTime;

function doMorph () {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph (fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown () {
  morph = 0;

  elts.text2.style.filter = '';
  elts.text2.style.opacity = '100%';

  elts.text1.style.filter = '';
  elts.text1.style.opacity = '0%';
}

function animate () {
  if (textIndex === texts.length - 1) {
    return; // Stop the animation
  }
  requestAnimationFrame(animate);

  const newTime = new Date();
  const shouldIncrementIndex = cooldown > 0;
  const dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
      console.log(textIndex);
    }

    doMorph();
  } else {
    doCooldown();
  }
}

// Wait for all DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  const engine = new FortuneEngine('molybdomancy');
  await engine.db_reader('./molybdomancy.json');

  elts = {
    text1: document.getElementById('text1'),
    text2: document.getElementById('text2')
  };

  elts.text1.textContent = texts[0];
  elts.text2.textContent = texts[0];

  const infoButton = document.getElementById('info-button');
  const musicButton = document.getElementById('music-button');
  const meltButton = document.querySelector('#meltButton');
  const resultTextShape = document.querySelector('.interpretation1');
  const resultTextMeaning = document.querySelector('.interpretation2');

  let meltButtonState = 'melt';
  let musicEnabled = true;
  let showInfo = false;

  const actionButtonPressSoundEffect = new Audio('../../assets/moly/action-button-press1.wav');
  const actionButtonHoverSoundEffect = new Audio('../../assets/moly/action-button-hover2.mp3');

  const meltSoundEffect = new Audio('../../assets/moly/bgm-melting.mp3');
  meltSoundEffect.volume = 0.7;

  meltButton.addEventListener('mouseover', () => {
    console.log('hover');
    actionButtonHoverSoundEffect.play();
  })

  meltButton.addEventListener('click', () => {
    actionButtonPressSoundEffect.play();

    switch (meltButtonState) {
      case 'melt':
        meltButtonState = 'result';

        meltSoundEffect.play();

        const result = engine.get_random_subset(1)[0];   //  eslint-disable-line

        setTimeout(() => {
          resultTextShape.innerHTML = `Shape: ${result.name}</br>`;
          resultTextShape.classList.remove('interpretation1');
          void resultTextShape.offsetWidth;  //  eslint-disable-line
          resultTextShape.classList.add('interpretation1');

          resultTextMeaning.innerHTML = `${result.longMeaning}`;
          resultTextMeaning.classList.remove('interpretation2');
          void resultTextMeaning.offsetWidth;  //  eslint-disable-line
          resultTextMeaning.classList.add('interpretation2');
        }, morphTime * 1000);

        texts[1] = result.emoji;
        time = new Date();
        meltButton.style.pointerEvents = 'none';
        meltButton.innerText = 'Melting tin...';
        animate();

        // Set Button Delay
        setTimeout(() => {
          meltButton.style.pointerEvents = 'all';
          meltButton.innerText = 'Try Again?';
        }, morphTime * 1000 + 1250);

        break;

      case 'result':
        meltButton.innerText = 'Melt the Tin!';
        meltButtonState = 'melt';

        textIndex = -1;
        elts.text1.textContent = texts[0];
        elts.text2.textContent = texts[0];
        cooldown = cooldownTime;
        resultTextShape.innerHTML = '';
        resultTextMeaning.innerHTML = '';
        break;
    }
  });

  // Background music
  const bgm = new Audio('../../assets/moly/bgm-background.mp3');
  bgm.loop = true;
  bgm.volume = 0.4;
  bgm.play();

  // Music Button
  musicButton.addEventListener('click', (event) => {
    console.log('music');
    const musicImg = document.getElementById('music');
    if (musicEnabled) {
      musicImg.src = '../../assets/audio_off.png';
      bgm.pause();
    } else {
      musicImg.src = '../../assets/audio_on.png';
      bgm.play();
    }
    musicEnabled = !musicEnabled;
  });

  // Info Button
  infoButton.addEventListener('click', (event) => {
    const infoPopup = document.getElementById('info-popup');
    infoPopup.style.display = !showInfo ? 'flex' : 'none';
    showInfo = !showInfo;
  });
});

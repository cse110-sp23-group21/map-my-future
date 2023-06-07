/*  Molybdomancy Code Here  */

/**
 * List of shapes for molybdomancy
 *
 * @author Gil Keidar
 */

/* function meltTin() {
    var img = document.getElementById('tinImage');
    img.style.transition = "all 2s";
    img.style.transform = "scaleY(0.1)";
} */

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
  const resultText = document.querySelector('.interpretation');

  let meltButtonState = 'melt';
  let musicEnabled = true;
  let showInfo = false;

  meltButton.addEventListener('click', () => {
    switch (meltButtonState) {
      case 'melt':
        // meltButton.innerText = 'New Round';
        meltButtonState = 'result';

        const result = engine.get_random_subset(1)[0];   //  eslint-disable-line
        setTimeout(() => {
          resultText.innerHTML = `Shape: ${result.name}</br> Meaning: ${result.meaning}.`;
          resultText.classList.remove('interpretation');
          void resultText.offsetWidth;
          resultText.classList.add('interpretation');
        }, morphTime * 1000);

        texts[1] = result.emoji;
        time = new Date();
        animate();
        meltButton.style.pointerEvents = 'none';
        meltButton.innerText = 'Melting tin...';
        setTimeout(() => {
          meltButton.style.pointerEvents = 'all';
          meltButton.innerText = 'Try Again?';
        }, morphTime * 1000);

        break;

      case 'result':
        meltButton.innerText = 'Melt the Tin!';
        meltButtonState = 'melt';

        textIndex = -1;
        elts.text1.textContent = texts[0];
        elts.text2.textContent = texts[0];
        cooldown = cooldownTime;
        resultText.innerHTML = '';
        break;
    }
  });

  // Background music
  //   const bgm = new Audio('background_music1.mp3');
  //   bgm.loop = true;
  //   bgm.volume = 0.3;
  //   bgm.play();

  // Music Button
  musicButton.addEventListener('click', (event) => {
    console.log('music');
    const musicImg = document.getElementById('music');
    if (musicEnabled) {
      musicImg.src = '../../../assets/audio_off.png';
      // bgm.pause();
    } else {
      musicImg.src = '../../../assets/audio_on.png';
      // bgm.play();
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

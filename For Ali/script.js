const screens = {
  welcome: document.getElementById('welcomeScreen'),
  reveal: document.getElementById('revealScreen'),
  letter: document.getElementById('letterScreen')
};
const backgroundMusic =
  document.getElementById('backgroundMusic');
backgroundMusic.volume = 0.65;
backgroundMusic.loop = true;
function showScreen(name) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove('active');
  });
  screens[name].classList.add('active');
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
function playBackgroundMusic() {
  if (!backgroundMusic.paused) return;
  backgroundMusic.play().catch(error => {
    console.error(
      'Music could not play. Check your music file.',
      error
    );
  });
}
function makeHearts() {
  const field = document.getElementById('heartField');
  if (field.childElementCount > 0) return;
  const symbols = ['♥', '♡', '♥', '✦'];
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent =
      symbols[i % symbols.length];
    heart.style.left =
      `${4 + Math.random() * 92}%`;
    heart.style.fontSize =
      `${13 + Math.random() * 19}px`;
    heart.style.animationDelay =
      `${Math.random() * 5}s`;
    heart.style.animationDuration =
      `${5 + Math.random() * 4}s`;
    field.appendChild(heart);
  }
}
function unwrapGift() {
  if (screens.reveal.classList.contains('active') ||
      screens.letter.classList.contains('active')) {
    return;
  }
  playBackgroundMusic();
  showScreen('reveal');
  makeHearts();
}
document
  .getElementById('unwrapButton')
  .addEventListener('click', unwrapGift);
screens.welcome.addEventListener('click', event => {
  if (event.target.closest('button')) return;
  unwrapGift();
});
document
  .getElementById('openLetterButton')
  .addEventListener('click', () => {
    showScreen('letter');
  });
document
  .getElementById('closeLetterButton')
  .addEventListener('click', () => {
    showScreen('reveal');
  });
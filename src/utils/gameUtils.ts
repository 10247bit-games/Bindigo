export const generateRandomBoard = () => {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);
  return Array.from({ length: 5 }, (_, i) =>
    numbers.slice(i * 5, (i + 1) * 5).map(value => ({ value, marked: false }))
  );
};

export const SOUND_URLS = {
  mark: '/src/assets/sounds/select.wav',
  line: '/src/assets/sounds/line.wav',
  victory: '/src/assets/sounds/victory.mp3'
};
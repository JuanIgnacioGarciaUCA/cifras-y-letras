// src/main.js
import { CifrasGame } from './cifras.js';

const app = document.querySelector('#app');
let mode = 'Letras';
const letrasSection = document.querySelector('.letras-container');
const cifrasSection = document.querySelector('.cifras-container');
const cifrasSectionElement = document.querySelector('.cifras-section');

cifrasSection.style.display = 'none';

let cifrasGame = new CifrasGame();

const generateButton = document.createElement('button');
generateButton.textContent = 'Nuevo Juego';
generateButton.addEventListener('click', () => {
  cifrasGame.newGame();
  const numbers = cifrasGame.getNumbers();
  const target = cifrasGame.getTarget();

  const numbersContainer = document.querySelector('#numeros-lista');
  numbersContainer.innerHTML = '';
  numbers.forEach(number => {
    const numberElement = document.createElement('div');
    numberElement.textContent = number;
    numbersContainer.appendChild(numberElement);
  });

  document.querySelector('#objetivo').textContent = target;
  document.querySelector('#cifras-input').value = '';
});

cifrasSection.appendChild(generateButton);
const checkButton = document.createElement('button');
checkButton.textContent = 'Comprobar';
checkButton.addEventListener('click', () => {
  const input = document.querySelector('#cifras-input').value;
  try {
    const result = cifrasGame.check(input);
    const target = cifrasGame.getTarget();
    const difference = Math.abs(result - target);

    if (result === target) {
      alert('¡Has ganado!');
    } else {
      alert(`Te has quedado a ${difference} del objetivo. Resultado: ${result}, Objetivo: ${target}`);
    }
  } catch (error) {
    alert(error.message);
  }
});

if (cifrasSectionElement) {
    cifrasSectionElement.appendChild(checkButton);
}
const modeButton = document.createElement('button');
modeButton.id = 'mode-button';
modeButton.textContent = 'Cambiar a Cifras';

modeButton.addEventListener('click', () => {
  if (mode === 'Letras') {
    mode = 'Cifras';
    letrasSection.style.display = 'none';
    cifrasSection.style.display = 'block';
    modeButton.textContent = 'Cambiar a Letras';
  } else {
    mode = 'Letras';
    letrasSection.style.display = 'block';
    cifrasSection.style.display = 'none';
    modeButton.textContent = 'Cambiar a Cifras';
  }
});

app.appendChild(modeButton);

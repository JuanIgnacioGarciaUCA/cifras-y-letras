// src/main.js
import { CifrasGame } from './cifras.js';

const app = document.querySelector('#app');
let mode = 'Letras';
const letrasSection = document.getElementById('letras-section');
const cifrasSection = document.getElementById('cifras-section');
//const cifrasSectionElement = document.querySelector('.cifras-section');

cifrasSection.style.display = 'none';

let cifrasGame = new CifrasGame();

const generateButton = document.getElementById('nuevoJuego');
generateButton.addEventListener('click', () => {
  cifrasGame.newGame();
  const numbers = cifrasGame.getNumbers();
  const target = cifrasGame.getTarget();

  const numbersContainer = document.querySelector('#numeros-lista');
  numbersContainer.className='contenedor';
  numbersContainer.innerHTML = '';
  numbers.forEach(number => {
    const numberElement = document.createElement('div');
    numberElement.className='caja';
    numberElement.textContent = number;
    numbersContainer.appendChild(numberElement);
  });

  document.querySelector('#objetivo').textContent = target;
  document.getElementById('operacion').value = '';
});


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

/*
if (cifrasSection) {
    cifrasSection.appendChild(checkButton);
}*/

const modeButton = document.getElementById('mode-button');
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


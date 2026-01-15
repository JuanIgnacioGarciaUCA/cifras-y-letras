// src/main.js
import { CifrasGame } from './cifras.js';
import { generarLetrasAleatorias } from './letras.js';

const app = document.querySelector('#app');
let mode = 'Letras';
const letrasSection = document.getElementById('letras-section');
const cifrasSection = document.getElementById('cifras-section');
cifrasSection.style.display = 'none';

// botón comprobar palabra
const comprobarPalabraBtn = document.getElementById('comprobarpalabra');
comprobarPalabraBtn.addEventListener('click', () => {
  const palabraInput = document.getElementById('palabrausuario');
  const palabra = palabraInput.value.trim().toLowerCase();


  import('./letras.js').then(({ verificarPalabra }) => {
    const existe = verificarPalabra(palabra);
    if (existe) {
      console.log( `La palabra "${palabra}" existe en el diccionario.` );
    } else {
      console.log( `La palabra "${palabra}" NO existe en el diccionario.` );
    }
  });
});


// botón pedir letras
const pedirletras = document.getElementById('btn-pedir-letra');
pedirletras.disabled=true;
const numvocales = document.getElementById('numvocales');
numvocales.addEventListener('change', () => {
  console.log("numvocales="+numvocales.value);
  pedirletras.disabled=false;
});
pedirletras.addEventListener('click', () => {
  let ll=generarLetrasAleatorias(numvocales.value,10-numvocales.value);
  console.log("letras=",ll);
  for(let i=1;i<=10;i++){
    let letrai=document.getElementById("l"+i);
    letrai.value=ll[i-1];
  }
});


// botón de modo de juego
const modeButton = document.getElementById('mode-button');

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


/*
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


// src/main.js
import { CifrasGame, resolver } from './cifras.js';
import { generarLetrasAleatorias, esPalabraValida, encontrarPalabraMasLarga } from './letras.js';

const app = document.querySelector('#app');
let mode = 'Cifras';
const letrasSection = document.getElementById('letras-section');
const cifrasSection = document.getElementById('cifras-section');
letrasSection.style.display = 'none';

const modeButton = document.getElementById('mode-button');
const palabraInput = document.getElementById('palabrausuario');
const pedirletras = document.getElementById('btn-pedir-letra');
const numvocales = document.getElementById('numvocales');
const comprobarPalabraBtn = document.getElementById('comprobarpalabra');
const palabrasolucion=document.getElementById("palabrasolucion");

// botón de modo de juego
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


// botón pedir letras
pedirletras.disabled=true;

numvocales.addEventListener('change', () => {
  console.log("numvocales="+numvocales.value);
  pedirletras.disabled=false;
  palabraInput.value='';
  palabrasolucion.innerHTML='Pulse aquí para posible solución';
  for(let i=1;i<=10;i++){
    let letrai=document.getElementById("l"+i);
    letrai.value='_';
  }
});

let letras;
pedirletras.addEventListener('click', () => {
  palabraInput.value='';
  palabrasolucion.innerHTML='Pulse aquí para posible solución';
  letras=generarLetrasAleatorias(numvocales.value,10-numvocales.value);
  console.log("letras=",letras);
  for(let i=1;i<=10;i++){
    let letrai=document.getElementById("l"+i);
    letrai.innerHTML="<center><b>"+letras[i-1].toUpperCase()+"</b></center>";
  }
});

// botón comprobar palabra
comprobarPalabraBtn.addEventListener('click', () => {
  const palabra = palabraInput.value.trim().toLowerCase();

  import('./letras.js').then(({ verificarPalabra }) => {
    const existe = esPalabraValida(palabra,letras);
    if (existe) {
      console.log( `La palabra "${palabra}" existe en el diccionario.` );
      comprobarPalabraBtn.innerHTML=`<a href='https://dle.rae.es/${palabra}'>&#x2705;</a>`;
    } else {
      console.log( `La palabra "${palabra}" NO es correcta.` );
      comprobarPalabraBtn.innerHTML="&#x274C;";
    }
  });
});

// botón encontrar palabra más larga
palabrasolucion.addEventListener('click', () => {
  import('./letras.js').then(({ verificarPalabra }) => {
    const propuesta=encontrarPalabraMasLarga(letras);
    if(propuesta!=null){
      palabrasolucion.innerHTML=`<a href="https://dle.rae.es/${propuesta}">${propuesta}</a>`;
    }else{
      palabrasolucion.value="no hay propuesta";
    }
  });
});



const nuevascifras = document.getElementById('nuevascifras');

let cifrasGame=new CifrasGame();

nuevascifras.addEventListener('click', () => {
  cifrasGame.newGame();
  const numbers = cifrasGame.getNumbers();
  const target = cifrasGame.getTarget();

  for(let i=1;i<=6;i++){
    const ni = document.getElementById("n"+i);
    ni.value=numbers[i-1];
  }
  document.getElementById("objetivo").value=target;
});

const cifrassolucion = document.getElementById('cifrassolucion');
cifrassolucion.addEventListener('click', () => {
  console.log("Buscando solución");
  cifrassolucion.innerHTML="Buscando solución";
  const sol=resolver(cifrasGame.getTarget(), cifrasGame.getNumbers());
  console.log(sol);
  cifrassolucion.innerHTML=sol;
});

const operacion = document.getElementById('operacion');
const comprobarSolucion = document.getElementById('comprobarSolucion');

comprobarSolucion.addEventListener('click', () => {
  try {
    const result = eval(operacion.value);
    const target = cifrasGame.getTarget();
    const difference = Math.abs(result - target);
    console.log(`resultado ${result}, objetivo ${target}, diferencia ${difference}`);

    if (result === target) {
      alert('¡Has ganado!');
    } else {
      alert(`Te has quedado a ${difference} del objetivo. Resultado: ${result}, Objetivo: ${target}`);
    }
  } catch (error) {
    alert(error.message);
  }
});

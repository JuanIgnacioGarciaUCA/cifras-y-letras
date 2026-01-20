// src/main.js
import { CifrasGame, resolver } from './cifras.js';
import { generarLetrasAleatorias, esPalabraValida, encontrarPalabraMasLarga } from './letras.js';

const app = document.querySelector('#app');
let mode = 'Cifras';
let modeTV = false;
const letrasSection = document.getElementById('letras-section');
const cifrasSection = document.getElementById('cifras-section');
const letrasSectionTV = document.getElementById('letrasTV-section');
const cifrasSectionTV = document.getElementById('cifrasTV-section');

letrasSection.style.display = 'none';
letrasSectionTV.style.display = 'none';
cifrasSectionTV.style.display = 'none';

const modeButton = document.getElementById('mode-button');
const modeButtonTV = document.getElementById('mode-TV');
const palabraInput = document.getElementById('palabrausuario');
const nuevasLetras = document.getElementById('nuevasLetras');
const numvocales = document.getElementById('numvocales');
const comprobarPalabraBtn = document.getElementById('comprobarpalabra');
const palabrasolucion=document.getElementById("palabrasolucion");
const cifrassolucionTV=document.getElementById("cifrassolucionTV");
const objetivoTV=document.getElementById("objetivoTV");


function borrarTodo(){
  objetivoTV.value='';
  cifrassolucionTV.innerHTML="Buscar solución"
  palabraInput.value='Buscar Solución';
  palabrasolucion.innerHTML='Pulse aquí para posible solución';
  for(let i=1;i<=10;i++){
    let letrai=document.getElementById("l"+i);
    letrai.value='';
  }
  for(let i=1;i<=10;i++){
    let letrai=document.getElementById("tvl"+i);
    letrai.value='';
  }
  for(let i=1;i<=6;i++){
    const ni = document.getElementById("n"+i);
    ni.value='';
  }
  for(let i=1;i<=6;i++){
    const tvni = document.getElementById("tvn"+i);
    tvni.value='';
  }
  document.getElementById("objetivo").value='';
  document.getElementById("objetivoTV").value='';
  document.getElementById("operacion").value="";
  document.getElementById("cifrassolucion").innerHTML="Buscar solución";
}

function cambiaBloquesVisibles(){
  borrarTodo();
  if(modeTV){
    if (mode === 'Letras') {
      letrasSectionTV.style.display = 'block';
      cifrasSectionTV.style.display = 'none';
      modeButton.textContent = 'Cambiar a Cifras';
    } else {
      letrasSectionTV.style.display = 'none';
      cifrasSectionTV.style.display = 'block';
      modeButton.textContent = 'Cambiar a Letras';
    }
    letrasSection.style.display = 'none';
    cifrasSection.style.display = 'none';
  }else{
        if (mode === 'Letras') {
      letrasSection.style.display = 'block';
      cifrasSection.style.display = 'none';
      modeButton.textContent = 'Cambiar a Cifras';
    } else {
      letrasSection.style.display = 'none';
      cifrasSection.style.display = 'block';
      modeButton.textContent = 'Cambiar a Letras';
    }
    letrasSectionTV.style.display = 'none';
    cifrasSectionTV.style.display = 'none';
  }
}

// botón de modo de juego
modeButtonTV.addEventListener('click', () => {
  if(modeTV){
    modeTV=false;
  }else{
    modeTV=true;
  }
  cambiaBloquesVisibles();
});

// botón de modo de juego
modeButton.addEventListener('click', () => {
  if (mode === 'Letras') {
    mode = 'Cifras';
  } else {
    mode = 'Letras';
  }
  cambiaBloquesVisibles();
});


// botón pedir letras
nuevasLetras.disabled=true;
numvocales.addEventListener('change', () => {
  console.log("numvocales="+numvocales.value);
  nuevasLetras.disabled=false;
  palabraInput.value='';
  palabrasolucion.innerHTML='Pulse aquí para posible solución';
  for(let i=1;i<=10;i++){
    let letrai=document.getElementById("l"+i);
    letrai.value='_';
  }
});

// nuevo juego letras
let letras;
nuevasLetras.addEventListener('click', () => {
  borrarTodo();
  palabraInput.value='';
  palabrasolucion.innerHTML='Pulse aquí para posible solución';
  letras=generarLetrasAleatorias(numvocales.value,10-numvocales.value);
  console.log("letras=",letras);
  for(let i=1;i<=10;i++){
    let letrai=document.getElementById("l"+i);
    letrai.value=letras[i-1].toUpperCase();
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




///////////////
// Cifras game
///////////////

const nuevascifras = document.getElementById('nuevascifras');

let cifrasGame=new CifrasGame();

nuevascifras.addEventListener('click', () => {
  document.getElementById("operacion").value="";
  document.getElementById("cifrassolucion").innerHTML="Buscar solución";
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
  document.getElementById("cifrassolucion").innerHTML="Buscando...";
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


//////////////////////////////////////////////////
// Código para la versión TV
//////////////////////////////////////////////


for(let i=1;i<10;i++){
  const ni = document.getElementById("tvl"+i);
  const nimas1 = document.getElementById("tvl"+(i+1));
  ni.addEventListener('input', () => {
    if(ni.value.length>=1){
      nimas1.focus();
    }
  });
} 

const tvl10=document.getElementById("tvl10");
tvl10.addEventListener('input', () => {
  if(tvl10.value.length>=1){
    //document.getElementById("palabrasolucionTV").focus();
    document.activeElement.blur();
  }
});

// botón buscar solución letras TV
const palabrasolucionTV=document.getElementById("palabrasolucionTV");
palabrasolucionTV.addEventListener('click', () => {
  import('./letras.js').then(({ verificarPalabra }) => {
    const letrasTV=[];
    for(let i=1;i<=10;i++){
      let letrai=document.getElementById("tvl"+i);
      letrasTV.push(letrai.value.trim().toLowerCase());
    }
    console.log("letrasTV=",letrasTV);
    const propuesta=encontrarPalabraMasLarga(letrasTV);
    if(propuesta!=null){
      palabrasolucionTV.innerHTML=`<a href="https://dle.rae.es/${propuesta}" target="_blank">${propuesta}</a>`;
    }else{
      palabrasolucionTV.value="no hay propuesta";
    }
  });
});


///////////////////


/*
for(let i=1;i<6;i++){
  const tvni = document.getElementById("tvn"+i);
  const tvnimas1 = document.getElementById("tvn"+(i+1));
  tvni.addEventListener('input', () => {
    if(tvni.value.length>=1){
      tvnimas1.focus();
    }
  });
} 
document.getElementById("tvn6").addEventListener('input', () => {
  document.getElementById("objetivoTV").focus();
});

objetivoTV.addEventListener('input', () => {
  document.activeElement.blur();
});*/


cifrassolucionTV.addEventListener('click', () => {
  cifrasGame.newGame();

  cifrasGame.objetivo=objetivoTV.value;
  cifrasGame.numeros=[];
  for(let i=1;i<=6;i++){
    cifrasGame.numeros[i-1] = document.getElementById("tvn"+i).value;
  }

  const numbers = cifrasGame.getNumbers();
  const target = cifrasGame.getTarget();

  console.log("Buscando solución");
  console.log(numbers);
  console.log(target);
  cifrassolucionTV.innerHTML="Buscando...";
  const sol=resolver(cifrasGame.getTarget(), cifrasGame.getNumbers());
  console.log(sol);
  cifrassolucionTV.innerHTML=sol;

});

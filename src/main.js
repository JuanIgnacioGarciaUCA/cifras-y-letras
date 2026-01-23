// src/main.js
import { CifrasGame, resolver1, ArbolBOp, NodoExpresion, obtenerPermutaciones } from './cifras.js';
import { generarLetrasAleatorias, esPalabraValida, encontrarPalabrasMasLargas } from './letras.js';
const version = import.meta.env.APP_VERSION;
document.getElementById('version-display').innerText = `Versión: ${version}`;
console.log(version);

let mode = 'Cifras';
let modeTV = false;
const letrasSection = document.getElementById('letras-section');
const cifrasSection = document.getElementById('cifras-section');
const letrasSectionTV = document.getElementById('letrasTV-section');
const cifrasSectionTV = document.getElementById('cifrasTV-section');

letrasSection.style.display = 'none';
letrasSectionTV.style.display = 'none';
cifrasSectionTV.style.display = 'none';

//const modeButton = document.getElementById('mode-button');
//const modeButtonTV = document.getElementById('mode-TV');
const palabraInput = document.getElementById('palabrausuario');
const nuevasLetras = document.getElementById('nuevasLetras');
const numvocales = document.getElementById('numvocales');
const comprobarPalabraBtn = document.getElementById('comprobarpalabra');
const palabrasolucion=document.getElementById("palabrasolucion");
const cifrassolucionTV=document.getElementById("cifrassolucionTV");
const objetivoTV=document.getElementById("objetivoTV");

const operacion = document.getElementById('operacion');

const palabrasolucionTV=document.getElementById("palabrasolucionTV");
const sol1=document.getElementById("sol1");
const sol2=document.getElementById("sol2");
const sol3=document.getElementById("sol3");
const sol4=document.getElementById("sol4");
const sol5=document.getElementById("sol5");
const linksol1=document.getElementById("linksol1");
const linksol2=document.getElementById("linksol2");
const linksol3=document.getElementById("linksol3");
const linksol4=document.getElementById("linksol4");
const linksol5=document.getElementById("linksol5");

const sol1normal=document.getElementById("sol1normal");
const sol2normal=document.getElementById("sol2normal");
const sol3normal=document.getElementById("sol3normal");
const sol4normal=document.getElementById("sol4normal");
const sol5normal=document.getElementById("sol5normal");
const linksol1normal=document.getElementById("linksol1normal");
const linksol2normal=document.getElementById("linksol2normal");
const linksol3normal=document.getElementById("linksol3normal");
const linksol4normal=document.getElementById("linksol4normal");
const linksol5normal=document.getElementById("linksol5normal");

let solsnormal=[sol1normal,sol2normal,sol3normal,sol4normal,sol5normal];
let lssnormal=[linksol1normal,linksol2normal,linksol3normal,linksol4normal,linksol5normal];

let sols=[sol1,sol2,sol3,sol4,sol5];
let lss=[linksol1,linksol2,linksol3,linksol4,linksol5];

let bcifras=document.getElementById("bcifras");
let bletras=document.getElementById("bletras");
let bTV=document.getElementById("bTV");
let bjuego=document.getElementById("bjuego");

bcifras.addEventListener("click",()=>{
  mode='Cifras';
  cambiaBloquesVisibles();
});

bletras.addEventListener("click",()=>{
  mode='Letras';
  cambiaBloquesVisibles();
});

bTV.addEventListener("click",()=>{
  modeTV=true;
  cambiaBloquesVisibles();
});

bjuego.addEventListener("click",()=>{
  modeTV=false;
  cambiaBloquesVisibles();
}); 


function borrarTodo(){
  
  for(let i=0;i<5;i++){
    console.log("borrando sol ",i);
    sols[i].innerHTML='';
    lss[i].innerHTML='';
  }

  for(let i=0;i<solsnormal.length;i++){
    solsnormal[i].innerHTML="";
    lssnormal[i].innerHTML=""
  }

  nIUsados=[false,false,false,false,false,false];
  for(let i=0;i<6;i++){
    let nI=document.getElementById("n"+(i+1));
    nI.style.color="";
  }
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
/*modeButtonTV.addEventListener('click', () => {
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
});*/


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
    const propuesta=encontrarPalabrasMasLargas(letras,5);
    if(propuesta!=null){
      for(let i=0;i<propuesta.length;i++){
        console.log("propuesta ",i,": ",propuesta[i]);
        solsnormal[i].innerHTML=propuesta[i];
        lssnormal[i].innerHTML=`<a href="https://dle.rae.es/${propuesta[i]}" style="text-decoration: none;" >🔗 Ver definición</a>`;
      }
      
    }else{
      palabrasolucion.innerHTML="no hay propuesta";
    }
  });
});




///////////////
// Cifras game
///////////////

const nuevascifras = document.getElementById('nuevascifras');

let cifrasGame=new CifrasGame();

nuevascifras.addEventListener('click', () => {
  borrarTodo();

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
  document.getElementById('loader').style.display = 'block';
  setTimeout(function(){
    console.log("Buscando solución");
    console.log(cifrasGame.getTarget());
    console.log(cifrasGame.getNumbers());
    //document.getElementById("cifrassolucion").innerHTML="Buscando...";
    const sol=resolver1(cifrasGame.getTarget(), cifrasGame.getNumbers(),5);
    console.log(sol);
    cifrassolucion.innerHTML='Soluciones:<br>';
    for(let i=0;i<sol.length;i++){
      cifrassolucion.innerHTML=cifrassolucion.innerHTML+`${sol[i]}<br>`;
    }
    if(sol==[]){
      cifrassolucionTV.innerHTML='No hay soluciones';
    }

    document.getElementById('loader').style.display = 'none';
  }, 50);

});

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
// Letras para la versión TV
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

palabrasolucionTV.addEventListener('click', () => {
  import('./letras.js').then(({ verificarPalabra }) => {
    //let sols=[sol1,sol2,sol3,sol4,sol5];
    //let lss=[linksol1,linksol2,linksol3,linksol4,linksol5];
    for(let i=0;i<5;i++){
      console.log("borrando sol ",i);
      sols[i].innerHTML='';
      lss[i].innerHTML='';
    }
    const letrasTV=[];
    for(let i=1;i<=10;i++){
      let letrai=document.getElementById("tvl"+i);
      letrasTV.push(letrai.value.trim().toLowerCase());
    }
    console.log("letrasTV=",letrasTV);
    const propuesta=encontrarPalabrasMasLargas(letrasTV,5);
    console.log("propuesta=",propuesta);
    //let sols=[sol1,sol2,sol3,sol4,sol5];
    //let lss=[linksol1,linksol2,linksol3,linksol4,linksol5];
    if(propuesta!=[]){
      for(let i=0;i<propuesta.length;i++){
        sols[i].innerHTML=propuesta[i];
        lss[i].innerHTML=`<a href="https://dle.rae.es/${propuesta[i]}" target="_blank" style="text-decoration: none;">🔗 Ver definición</a>`;
      }
    }else{
      sol1.innerHTML="no hay propuesta";
    }
  });
});


///////////////////
// cifras TV
///////////////////



cifrassolucionTV.addEventListener('click', () => {
  document.getElementById('loader').style.display = 'block';
  setTimeout(function(){
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
    //cifrassolucionTV.innerHTML="Buscando...";
    const sol1=resolver1(target, numbers ,5);
    console.log(sol1);
    cifrassolucionTV.innerHTML='Soluciones:<br>';
    for(let i=0;i<sol1.length;i++){
      cifrassolucionTV.innerHTML=cifrassolucionTV.innerHTML+`${sol1[i]}<br>`;
    }
    if(sol1.length==0){
      cifrassolucionTV.innerHTML='No se han encontrado soluciones';
    }

    document.getElementById('loader').style.display = 'none';
  }, 50);
});



///////////////////////
// Instalación de pwa
///////////////////////

let eventoInstalacion; // Variable para guardar el evento
const botonInstalar = document.getElementById('btnInstalar');

// 1. Escuchar el evento que lanza el navegador cuando detecta que la PWA es instalable
window.addEventListener('beforeinstallprompt', (e) => {
  // Evitar que Chrome muestre su propio banner automático (mini-infobar)
  e.preventDefault();
  // Guardar el evento para usarlo después
  eventoInstalacion = e;
  // Mostrar nuestro botón de instalación
  botonInstalar.style.display = 'block';
});

// 2. Programar el clic del botón
botonInstalar.addEventListener('click', async () => {
  if (eventoInstalacion) {
    // Mostrar el mensaje nativo de confirmación del navegador
    eventoInstalacion.prompt();
    
    // Esperar a que el usuario responda
    const { outcome } = await eventoInstalacion.userChoice;
    console.log(`El usuario respondió: ${outcome}`);
    
    // Limpiar la variable y ocultar el botón (ya no se puede usar el evento de nuevo)
    eventoInstalacion = null;
    botonInstalar.style.display = 'none';
  }
});

// 3. (Opcional) Detectar cuando la app ya se instaló con éxito
window.addEventListener('appinstalled', () => {
  console.log('¡PWA instalada con éxito!');
  botonInstalar.style.display = 'none';
});

const resultado=document.getElementById("resultado");
const parI=document.getElementById("parI");
const parD=document.getElementById("parD");
const opMas=document.getElementById("opMas");
const opMenos=document.getElementById("opMenos");
const opPor=document.getElementById("opPor");
const opDiv=document.getElementById("opDiv");
const nI=[];
let nIUsados=[false,false,false,false,false,false];
for(let i=1;i<=6;i++){
  nI[i-1]=document.getElementById("n"+i);
  nI[i-1].addEventListener("click", () =>{
    if(!nIUsados[i-1]){
      operacion.value=operacion.value+nI[i-1].value;   
      operacionCambiado();
      nIUsados[i-1]=true;
      nI[i-1].style.color="#ff0000";
    }
  });
}
parI.addEventListener("click",()=>{
  operacion.value=operacion.value+"(";
  operacionCambiado();
});
parD.addEventListener("click",()=>{
  operacion.value=operacion.value+")";
  operacionCambiado();
});
opMas.addEventListener("click",()=>{
  operacion.value=operacion.value+"+";
  operacionCambiado();
});
opMenos.addEventListener("click",()=>{
  operacion.value=operacion.value+"-";
  operacionCambiado();
});
opPor.addEventListener("click",()=>{
  operacion.value=operacion.value+"*";
  operacionCambiado();
});
opDiv.addEventListener("click",()=>{
  operacion.value=operacion.value+"/";
  operacionCambiado();
});
operacion.addEventListener("input", () => {
  operacionCambiado();
});

function operacionCambiado(){
  let cad=operacion.value;
  let aux;
  try {
    aux=eval(cad);
  } catch (error) {
    aux=NaN;
  }
  console.log(aux);
  resultado.value=aux;
}


///////////////////////
// Login con Google
///////////////////////

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function mostrarPerfilUsuario(usuario) {
    const botonGoogle = document.getElementById('botonGoogle');
    const contenedorUsuario = document.getElementById('contenedor-usuario');
    const fotoImg = document.getElementById('foto-usuario');
    const nombreSpan = document.getElementById('nombre-usuario');

    if (usuario) {
        // 1. Ponemos la URL de la foto de Google en el src de la imagen
        fotoImg.src = usuario.picture;
        // 2. Ponemos el nombre
        nombreSpan.innerText = usuario.name;
        // 3. Intercambiamos los contenedores
        botonGoogle.style.display = 'none';
        contenedorUsuario.style.display = 'flex';
    }
}

window.manejarRespuestaGoogle = function(response) {
    // Extraemos los datos del token que nos da Google
    const datosUsuario = parseJwt(response.credential);
    
    console.log("Datos recibidos:", datosUsuario);

    // Guardamos en localStorage para que al recargar la PWA siga logueado
    localStorage.setItem('usuario_identificado', JSON.stringify(datosUsuario));

    // Ejecutamos la función para cambiar la interfaz
    mostrarPerfilUsuario(datosUsuario);
}

window.onload = function () {
    // Inicializar Google
    google.accounts.id.initialize({
        client_id: "47924315675-pdr6g1q9vpln1168861ng9u3bamimanc.apps.googleusercontent.com",
        callback: manejarRespuestaGoogle // Llamamos a la función de arriba
    });

    // Renderizar el botón
    google.accounts.id.renderButton(
        document.getElementById("botonGoogle"),
        { theme: "outline", size: "medium" }
    );

    // REVISAR SI YA ESTABA LOGUEADO (Persistencia)
    const sesionGuardada = localStorage.getItem('usuario_identificado');
    if (sesionGuardada) {
        mostrarPerfilUsuario(JSON.parse(sesionGuardada));
    }
};

window.cerrarSesion = function() {
    // Borramos el rastro en el navegador
    localStorage.removeItem('usuario_identificado');
    // Recargamos la página para limpiar todo y que vuelva a salir el botón de Google
    location.reload(); 
}

///////////////////////
// Firebase Analytics
///////////////////////
console.log("Inicializando Firebase");
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection,      // <--- ¡Faltaba este!
  query,           // <--- ¡Faltaba este!
  orderBy,         // <--- ¡Faltaba este!
  limit,           // <--- ¡Faltaba este!
  getDocs          // <--- ¡Faltaba este!
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvT49tY_q0_ecpzdJxgpize07BkpFKa44",
  authDomain: "cifras-y-letras-ec61e.firebaseapp.com",
  projectId: "cifras-y-letras-ec61e",
  storageBucket: "cifras-y-letras-ec61e.firebasestorage.app",
  messagingSenderId: "267177891125",
  appId: "1:267177891125:web:0047953b90424fa3b0287c",
  measurementId: "G-FBEEGXBVNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 


// FUNCIÓN PARA GUARDAR PUNTUACIÓN
async function guardarPuntuacionGlobal(puntos) {
    const usuario = JSON.parse(localStorage.getItem('usuario_identificado'));
    if (!usuario) return;

    try {
        await addDoc(collection(db, "rankings"), {
            nombre: usuario.name,
            foto: usuario.picture,
            puntos: puntos,
            fecha: new Date()
        });
        console.log("¡Récord guardado en la nube!");
    } catch (e) {
        console.error("Error al guardar: ", e);
    }
}

// FUNCIÓN PARA OBTENER EL TOP 10
export async function obtenerRanking() {
    try {
        // Creamos la referencia a la colección
        const colRef = collection(db, "rankings");

        // Construimos la consulta
        const q = query(colRef, orderBy("puntos", "desc"), limit(10));

        // Ejecutamos la consulta
        const querySnapshot = await getDocs(q);
        
        const listaRanking = [];
        querySnapshot.forEach((doc) => {
            listaRanking.push(doc.data());
        });

        console.log("Ranking obtenido:", listaRanking);
        return listaRanking;

    } catch (error) {
        console.error("Error al obtener el ranking:", error);
    }
}

console.log("Obteniendo ranking global...");
guardarPuntuacionGlobal(100);
obtenerRanking();

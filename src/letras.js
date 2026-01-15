/**
 * Genera un array de letras aleatorias.
 * @param {number} numVocales - El número de vocales a generar.
 * @param {number} numConsonantes - El número de consonantes a generar.
 * @returns {string[]} Un array de letras aleatorias.
 */
export function generarLetrasAleatorias(numVocales, numConsonantes) {
  const vocales = ['a', 'e', 'i', 'o', 'u'];
  const consonantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'ñ', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  const letras = [];

  for (let i = 0; i < numVocales; i++) {
    letras.push(vocales[Math.floor(Math.random() * vocales.length)]);
  }

  for (let i = 0; i < numConsonantes; i++) {
    letras.push(consonantes[Math.floor(Math.random() * consonantes.length)]);
  }

  // Mezclar el array para que no estén todas las vocales primero y luego las consonantes
  letras.sort(() => Math.random() - 0.5);

  return letras;
}

/**
 * Verifica si una palabra existe en un diccionario.
 * @param {string} palabra - La palabra a verificar.
 * @returns {boolean} True si la palabra existe, false de lo contrario.
 */

import { diccionario } from "./esDicc1.js";

//console.log(lista);

/**
 * Determina si una palabra se puede formar con una lista de letras
 * y si además existe en el diccionario.
 * 
 * @param {string} palabra - La palabra a comprobar.
 * @param {string[]} letras - Un array de letras disponibles (ej: ['a', 'p', 'l', 'a', 'b', 'r', 'a']).
 * @returns {boolean} - true si es válida y se puede formar; false en caso contrario.
 */
export function esPalabraValida(palabra, letras) {
    // 1. Verificar si la palabra existe en el diccionario cargado
    if (!diccionario.includes(palabra)) {
        console.log("la palabra no está en diccionario");
        return false;
    }

    // 2. Crear un mapa de frecuencia de las letras disponibles
    // Esto cuenta cuántas veces aparece cada letra en la lista "letras"
    const cuentaLetras = {};
    for (const letra of letras) {
        cuentaLetras[letra] = (cuentaLetras[letra] || 0) + 1;
    }

    // 3. Comprobar si tenemos suficientes letras para la palabra
    for (const letra of palabra) {
        // Si la letra no existe en nuestro mazo o ya no quedan unidades
        if (!cuentaLetras[letra] || cuentaLetras[letra] === 0) {
            console.log(`frecuencia incorrecta de ${letra}`);
            return false;
        }
        // "Gastamos" una letra
        cuentaLetras[letra]--;
    }

    // Si pasa ambas pruebas, la palabra es válida
    return true;
}

// --- EJEMPLO DE USO ---
// Supongamos que estas variables ya están en tu programa:
// const diccionario = ["casa", "perro", "palabra", "sol"];
// const misLetras = ["p", "a", "l", "a", "b", "r", "a", "x", "y"];

// console.log(esPalabraValida("palabra", misLetras)); // true
// console.log(esPalabraValida("casa", misLetras));    // false (no hay 'c' ni 's')

// Ejemplo de uso
// const letras = generarLetrasAleatorias(3, 4);
// console.log(letras); // Ejemplo: [ 'a', 'b', 'i', 'd', 'e', 'n', 'u' ]

// const palabra = letras.join(''); // Formar una palabra con las letras
// console.log(palabra); // Ejemplo: abi denu

// const existe = verificarPalabra(palabra);
// console.log(`La palabra "${palabra}" existe: ${existe}`); // Ejemplo: La palabra "abidenu" existe: false


/**
 * Encuentra la palabra más larga posible.
 * Asume que la variable global 'diccionario' ya está ordenada por longitud (descendente).
 * 
 * @param {string[]} letras - Array de letras disponibles (ej: ['a', 'p', 'e', 'l'])
 * @returns {string|null} - La palabra más larga encontrada o null.
 */
export function encontrarPalabraMasLarga(letras) {
    
    // Recorremos el diccionario. 
    // Al estar ordenado por longitud, el primer éxito es el ganador.
    for (const palabra of diccionario) {
        if (sePuedeFormar(palabra, letras)) {
            return palabra; 
        }
    }

    return null; // Si no se encuentra ninguna
}

/**
 * Función auxiliar para verificar si una palabra se puede construir
 * con un mazo de letras determinado.
 */
function sePuedeFormar(palabra, letras) {
    // Creamos una copia del array de letras para poder ir "gastándolas"
    // sin modificar la lista original.
    let copiaLetras = [...letras];

    for (const letra of palabra) {
        const indice = copiaLetras.indexOf(letra);
        
        if (indice === -1) {
            // Si la letra no está, esta palabra no sirve
            return false;
        }
        
        // Si está, la "gastamos" eliminándola del array temporal
        copiaLetras.splice(indice, 1);
    }
    
    return true;
}

// --- EJEMPLO DE USO ---
// const diccionario = ["murciélago", "comida", "casa", "sol"]; // Ya ordenado por length
// const misLetras = ["c", "o", "m", "i", "d", "a", "z", "x"];

// const resultado = encontrarPalabraMasLarga(misLetras);
// console.log("La mejor palabra es:", resultado); // "comida"
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

import { diccionario } from "./es_txt.js";

//console.log(lista);

export function verificarPalabra(palabra) {
  // Mock de diccionario (reemplazar con una API real)
  //const diccionario = ['hola', 'mundo', 'javascript', 'casa', 'perro'];
  return diccionario.includes(palabra);

  // O, para usar una API, podrías usar algo como:
  // fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`)
  //   .then(response => response.ok)
  //   .catch(() => false); // Manejar errores de red u otros errores
}

// Ejemplo de uso
// const letras = generarLetrasAleatorias(3, 4);
// console.log(letras); // Ejemplo: [ 'a', 'b', 'i', 'd', 'e', 'n', 'u' ]

// const palabra = letras.join(''); // Formar una palabra con las letras
// console.log(palabra); // Ejemplo: abi denu

// const existe = verificarPalabra(palabra);
// console.log(`La palabra "${palabra}" existe: ${existe}`); // Ejemplo: La palabra "abidenu" existe: false
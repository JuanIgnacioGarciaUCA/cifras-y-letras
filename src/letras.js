/**
 * Genera un array de letras aleatorias.
 * @param {number} numVocales - El número de vocales a generar.
 * @param {number} numConsonantes - El número de consonantes a generar.
 * @returns {string[]} Un array de letras aleatorias.
 */
export function generarLetrasAleatorias(numVocales, numConsonantes) {
    const letras = [];
  
    const frecuenciaVocales = {
        "e": 30.35,
        "a": 27.80,
        "o": 19.26,
        "i": 13.87,
        "u": 8.72
    };

    const frecuenciaConsonantes = {
        "s": 14.53, "r": 12.51, "n": 12.22, "d": 10.67, "l": 9.05,
        "c": 8.52, "t": 8.43, "m": 5.73, "p": 4.57, "b": 2.58,
        "g": 1.84, "v": 1.64, "y": 1.64, "q": 1.60, "h": 1.27,
        "f": 1.26, "z": 0.95, "j": 0.80, "ñ": 0.56, "x": 0.40,
        "k": 0.04, "w": 0.02
    };

    // Función interna para elegir una letra basada en su peso
    const elegirLetraPorPeso = (diccionario) => {
        const random = Math.random() * 100;
        let acumulado = 0;

        for (const [letra, porcentaje] of Object.entries(diccionario)) {
            acumulado += porcentaje;
            if (random <= acumulado) {
                return letra;
            }
        }
        // Retorno de seguridad (última letra del diccionario)
        return Object.keys(diccionario)[Object.keys(diccionario).length - 1];
    };

    // Generar vocales ponderadas
    for (let i = 0; i < numVocales; i++) {
        letras.push(elegirLetraPorPeso(frecuenciaVocales));
    }

    // Generar consonantes ponderadas
    for (let i = 0; i < numConsonantes; i++) {
        letras.push(elegirLetraPorPeso(frecuenciaConsonantes));
    }

    // Mezclar el array (Algoritmo Fisher-Yates para una mezcla más eficiente)
    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]];
    }

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
    console.log("buscando en diccionario...");
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
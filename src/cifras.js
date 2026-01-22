// Función para resolver el juego de Cifras de forma recursiva
export function resolver(objetivo, numeros) {
  const operaciones = ['+', '-', '*', '/'];
  let mejorSolucion = null;
  let diferenciaMinima = Infinity;

  function calcularResultado(expresion) {
    try {
      // eslint-disable-next-line no-eval
      return eval(expresion);
    } catch (error) {
      return NaN;
    }
  }

  function probarCombinaciones(numerosRestantes, expresionActual) {
    const resultado = calcularResultado(expresionActual);
    if (!isNaN(resultado)) {
      const diferencia = Math.abs(resultado - objetivo);
      if (diferencia < diferenciaMinima) {
        diferenciaMinima = diferencia;
        mejorSolucion = expresionActual + ' = ' + resultado;
      }
    }
    if (numerosRestantes.length === 0) {
      return;
    }else{
      if(diferenciaMinima===0){ 
        return;
      }
    }
    for (let i = 0; i < numerosRestantes.length; i++) {
      const numeroActual = numerosRestantes[i];
      const nuevosNumerosRestantes = [...numerosRestantes.slice(0, i), ...numerosRestantes.slice(i + 1)];

      if (expresionActual === '') {
        probarCombinaciones(nuevosNumerosRestantes, numeroActual.toString());
      } else {
        for (let j = 0; j < operaciones.length; j++) {
          const operacion = operaciones[j];
          probarCombinaciones(nuevosNumerosRestantes, `(${expresionActual}) ${operacion} ${numeroActual}`);
        }
      }
    }
  }
  
  probarCombinaciones(numeros, '');

  return mejorSolucion;
}


export class CifrasGame {
  constructor() {
    this.numerosDisponibles = [
      1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 
      25, 50, 75, 100
    ];
    this.numeros=[];
    this.objetivo=0;
  }

  newGame() {
    const objetivo = Math.floor(Math.random() * 899) + 101;
    const numeros = [];
    const copiaPool = [...this.numerosDisponibles];
    
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * copiaPool.length);
      numeros.push(copiaPool.splice(index, 1)[0]);
    }
    this.objetivo=objetivo;
    this.numeros=numeros;
    return { objetivo, numeros };
  }

  getNumbers() {
    return this.numeros;
  }

  getTarget() {
    return this.objetivo;
  }

  // Para la evaluación, lo más sencillo en Vanilla es usar un constructor de Function
  // o una librería pequeña, pero para empezar podemos usar un parser simple.
  evaluarExpresion(expresion) {
    try {
      // Reemplaza la evaluación insegura por una lógica de cálculo
      // Por ahora, para prototipar rápido:
      // eslint-disable-next-line no-eval
      const resultado = eval(expresion);
      return resultado;
    } catch (e) {
      return null;
    }
  }

  resolverJuego(objetivo, numeros) {
    return resolver(objetivo, numeros);
  }

    cifras() {
        return this.generarJuego();
    }

    esObjetivoValido(objetivo) {
        return !isNaN(objetivo) && objetivo >= 101 && objetivo <= 999;
    }

    sonNumerosValidos(numeros) {
        return Array.isArray(numeros) && numeros.length === 6 && numeros.every(num => this.numerosDisponibles.includes(num));
    }

}

export default CifrasGame;

/*
// Ejemplo de uso
const juego = cifras();
console.log("Objetivo:", juego.objetivo);
console.log("Números:", juego.numeros);

// Ejemplo de evaluación de una expresión
const expresion = juego.numeros[0] + "*" + juego.numeros[1] + "+" + juego.numeros[2];
const resultado = juego.evaluarExpresion(expresion);
console.log("Expresión:", expresion);
console.log("Resultado:", resultado);

// Ejemplo de uso de la función resolver (mover a un contexto adecuado)
const objetivo2 = juego.objetivo;
const numeros2 = juego.numeros;
const solucion = resolver(objetivo2, numeros2);
console.log("Solución:", solucion);
*/

export class ArbolBOp {
  constructor(){
    this.arbol=[];
  }
  evalua(){
    return this.evaluaAux(this.arbol);
  }
  evaluaAux(arbol){
    if(arbol.length==1){
      return arbol[0];
    }else if(arbol==[]){
        return NaN;
    }else if(arbol.length==3){
        try{
          console.log(this.evaluaAux(arbol[0]));
          console.log(this.evaluaAux(arbol[1]));
          console.log(this.evaluaAux(arbol[2]));
          console.log("("+this.evaluaAux(arbol[1])+")"+ arbol[0] + "("+this.evaluaAux(arbol[2])+")");
          return eval( "("+this.evaluaAux(arbol[1])+")"+ arbol[0] + "("+this.evaluaAux(arbol[2])+")" );
        }catch(error){
          return NaN;
        }
    }
  }
}


export class NodoExpresion {
    constructor(valor, izquierdo = null, derecho = null) {
        this.valor = valor; // Puede ser un número o un operador (+, -, *, /)
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    // Método para evaluar el resultado del árbol de forma recursiva
    evaluar() {
        // 1. CASO BASE: Es una hoja (un número)
        if (this.izquierdo === null && this.derecho === null) {
            // Usamos Number() para asegurar que no se concatenen strings
            return Number(this.valor);
        }
        // 2. SEGURIDAD: Si falta algún hijo, la operación no es válida
        if (this.izquierdo === null || this.derecho === null) {
            return NaN;
        }
        // 3. RECURSIÓN: Evaluamos los subárboles
        const izq = this.izquierdo.evaluar();
        const der = this.derecho.evaluar();
        // Si alguno de los hijos ya dio un error previo (NaN), propagamos el NaN
        if (isNaN(izq) || isNaN(der)) return NaN;
        // 4. OPERACIONES
        switch (this.valor) {
            case '+': return izq + der;
            case '-': return izq - der;
            case '*': return izq * der;
            case '/': 
                // 5. MANEJO DE DIVISIÓN POR CERO
                if (der === 0) return NaN; 
                return izq / der;
            default: 
                throw new Error(`Operador desconocido: ${this.valor}`);
        }
    }

    // Método para mostrar la operación en formato texto (infijo)
    toString() {
        if (this.izquierdo === null && this.derecho === null) {
            return this.valor.toString();
        }
        return `(${this.izquierdo.toString()} ${this.valor} ${this.derecho.toString()})`;
    }
    evaluar1(){
      try{
        return eval(this.toString());
      }catch(error){
        return NaN;
      }
    }
}

// Genera todas las formas de agrupar una lista fija de números con operadores
function* generarArbolesLazy(numeros) {
    if (numeros.length === 1) {
        yield new NodoExpresion(numeros[0]);
        return;
    }

    for (let i = 1; i < numeros.length; i++) {
        const izquierdaSujeto = numeros.slice(0, i);
        const derechaSujeto = numeros.slice(i);

        for (const izq of generarArbolesLazy(izquierdaSujeto)) {
            for (const der of generarArbolesLazy(derechaSujeto)) {
                for (const op of ['+', '-', '*', '/']) {
                    yield new NodoExpresion(op, izq, der);
                }
            }
        }
    }
}

export function obtenerPermutaciones(array) {
    if (array.length <= 1) return [array];
    let resultado = [];
    for (let i = 0; i < array.length; i++) {
        const actual = array[i];
        const restantes = array.slice(0, i).concat(array.slice(i + 1));
        const permsRestantes = obtenerPermutaciones(restantes);
        for (let p of permsRestantes) {
            resultado.push([actual, ...p]);
        }
    }
    return resultado;
}

function obtenerSubconjuntos(array) {
    // Empezamos con un array que contiene el conjunto vacío
    let subconjuntos = [[]];
    for (let numero of array) {
        const tamanoActual = subconjuntos.length;
        
        // Tomamos todos los subconjuntos creados hasta ahora
        for (let i = 0; i < tamanoActual; i++) {
            // Creamos una copia del subconjunto actual y le añadimos el nuevo número
            const nuevoSubconjunto = [...subconjuntos[i], numero];
            subconjuntos.push(nuevoSubconjunto);
        }
    }
    return subconjuntos;
}


/**
 * Función Principal
 * @param {Array} listaNumeros - Ejemplo: [1, 2, 3, 4, 5, 6]
 * @param {Number} objetivo - El resultado que buscamos
 * @param {Number} n - Cuántas soluciones queremos encontrar
 */
/*export function resolver1(objetivo, listaNumeros, n=1) {
    const soluciones = [];
    const permutaciones = obtenerPermutaciones(listaNumeros);
    const margenError = 0.000001; // Para lidiar con decimales imprecisos

    console.log(`Buscando las primeras ${n} soluciones para llegar a ${objetivo}...`);
    console.log("permutaciones",permutaciones);
    console.log(objetivo);
    console.log(listaNumeros);
    

    for (const p of permutaciones) {
        // Usamos el generador para ir uno por uno sin llenar la RAM
        const generador = generarArbolesLazy(p);
        
        for (const arbol of generador) {
            const r1 = arbol.evaluar1();

            if (Math.abs(r1 - objetivo) < margenError) {
                soluciones.push(arbol.toString());
                console.log("solución encontrada",arbol.toString(),arbol.evaluar(),eval(arbol.toString()));
                // Si ya encontramos las n soluciones, terminamos todo
                if (soluciones.length === n) {
                    return soluciones;
                }
            }
        }
    }

    return soluciones;
}*/


export function resolver1(target, listaNumeros, n, tiempoLimiteSegundos=10) {
    let contador=0;
    const inicio = Date.now();
    const limiteMs = tiempoLimiteSegundos * 1000;
    const soluciones = new Set(); // Usamos Set para evitar duplicados
    const margenError = 0.000001;
    // Obtenemos todos los subconjuntos posibles de la lista original
    const subconjuntos = obtenerSubconjuntos(listaNumeros);
    // Ordenamos subconjuntos por tamaño (opcional, para hallar soluciones simples primero)
    subconjuntos.sort((a, b) => a.length - b.length);
    //console.log("subconjuntos",subconjuntos);
    //console.log(`Buscando soluciones para objetivo ${target}...`);

    for (const sub of subconjuntos) {
        //console.log("sub=",sub);
        if(sub.length==0){
          continue;
        }
        // Si el subconjunto es de 1 solo número, chequemos si es el objetivo
        if (sub.length === 1) {
            if (Math.abs(sub[0] - target) < margenError) {
                soluciones.add(sub[0].toString());
                if (soluciones.size === n) return Array.from(soluciones);
            }
            continue;
        }

        // Para cada subconjunto, probamos todas sus permutaciones
        const permutaciones = obtenerPermutaciones(sub);
        //console.log(`permutaciones de ${sub.toString()}:`,permutaciones);
        for (const p of permutaciones) {
            const generador = generarArbolesLazy(p);
            for (const arbol of generador) {
                //console.log(`arbol(${contador}):`,arbol.toString());
                const resultado = arbol.evaluar();
                if (Math.abs(resultado - target) < margenError) {
                    soluciones.add(arbol.toString());
                    if (soluciones.size === n) {
                        return Array.from(soluciones);
                    }
                }
                // --- CHEQUEO DE TIEMPO ---
                if (Date.now() - inicio > limiteMs) {
                  console.warn(`Tiempo agotado. Devolviendo soluciones encontradas hasta ahora. Soluciones exploradas ${contador} en ${Date.now() - inicio} segundos.`);
                  alert(`Tiempo agotado, ${Date.now() - inicio}, soluciones exploradas ${contador}.`);
                  return Array.from(soluciones);
                }
                contador++;
            }
        }
    }
    alert(`Tiempo empleado ${Date.now() - inicio}, soluciones exploradas ${contador}.`);
    return Array.from(soluciones);
}
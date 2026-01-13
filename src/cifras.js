// Función para resolver el juego de Cifras de forma recursiva
function resolver(objetivo, numeros) {
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
    if (numerosRestantes.length === 0) {
      const resultado = calcularResultado(expresionActual);
      if (!isNaN(resultado)) {
        const diferencia = Math.abs(resultado - objetivo);
        if (diferencia < diferenciaMinima) {
          diferenciaMinima = diferencia;
          mejorSolucion = expresionActual + ' = ' + resultado;
        }
      }
      return;
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

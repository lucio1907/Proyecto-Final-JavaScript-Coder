import { data } from "./classes/variables.js";

// Variables
const pregunta = selector('#contenedor-preguntas');
const contenedorRtas = selector('#botons');
const vidasUI = selector('#vidas-usuario');
const body = selector('#body');

let vidasUsuario = 1;


// Clases
class UI {
  // Imprime las preguntas en el HTML
  imprimirPregunta(p, aleatoria) {
    this.limpiarHTML(pregunta);
    p.innerText = aleatoria.texto;
    if (aleatoria) {
      pregunta.appendChild(p);
    }
  }

  // Imprime los botones con sus valores
  imprimirBotones(btn1, btn2, btn3, btn4) {
    // Se crea el elemento boton
    const botones1 = document.createElement('button');
    botones1.classList.add('botones-value');
    botones1.innerText = btn1;
    botones1.value = btn1;
    
    const botones2 = document.createElement('button');
    botones2.classList.add('botones-value');
    botones2.innerText = btn2;
    botones2.value = btn2;

    const botones3 = document.createElement('button');
    botones3.classList.add('botones-value');
    botones3.innerText = btn3;
    botones3.value = btn3;

    const botones4 = document.createElement('button');
    botones4.classList.add('botones-value');
    botones4.innerText = btn4;
    botones4.value = btn4;

    // Agrega al HTML los botones
    contenedorRtas.append(botones1);
    contenedorRtas.append(botones2);
    contenedorRtas.append(botones3);
    contenedorRtas.append(botones4);
    
    // Eventos
    botones1.addEventListener('click', () => {
        this.esCorrecta(botones1);
        if (botones1) {
          botones2.disabled = true;
          botones3.disabled = true;
          botones4.disabled = true;
        }
    });

    botones2.addEventListener('click', () => {
      this.esCorrecta(botones2);
      if (botones2) {
          botones1.disabled = true;
          botones3.disabled = true;
          botones4.disabled = true;
      }
    });

    botones3.addEventListener('click', () => {
      this.esCorrecta(botones3);
      if (botones3) {
        botones1.disabled = true;
        botones2.disabled = true;
        botones4.disabled = true;
      }
    });

    botones4.addEventListener('click', () => {
      this.esCorrecta(botones4)
      if (botones4) {
        botones1.disabled = true;
        botones2.disabled = true;
        botones3.disabled = true;
      }
    });
    
  }

  // Valida que la pregunta sea correcta o incorrecto
  esCorrecta(opcion) {
    if (opcion.value === preguntaAleatorias.correcta) {
      // Agrega color al boton
      opcion.classList.add('botones-value-seleccionado', 'color-verde');

      // Selecciono el numero del metodo vidas() y limpio el HTML
      const borrarNumeroCorrecta = selector('.vida-usuario');
      setTimeout(() => {
        borrarNumeroCorrecta.remove();
      }, 2500);

      // Limpia HTML
      setTimeout(() => {
        this.limpiarHTML(contenedorRtas);
        preguntaAleatoria();
        contenedorRtas.classList.remove('opacity');
      }, 2500);
    } else {

      // Agrega color al boton
      opcion.classList.add('botones-value-seleccionado', 'color-rojo');
      const parrafo = document.createElement('p');
      parrafo.classList.add('botones-value-seleccionado', 'color-verde', 'uppercase');
      parrafo.innerText = `La respuesta correcta es: "${preguntaAleatorias.correcta}"`;
      contenedorRtas.appendChild(parrafo);

      // Restar vidas y limpiar HTML
      this.restarVidas(opcion, preguntaAleatorias);

      setTimeout(() => {
        this.limpiarHTML(contenedorRtas);
        contenedorRtas.classList.remove('opacity');
        preguntaAleatoria();
      }, 2500);

    }
  } 

  vidas() {
    // Creo parrafo para las vidas
    const vidasHTML = document.createElement("p");
    // Le paso un atributo para modificarlo
    vidasHTML.setAttribute('class', 'vida-usuario');
    vidasHTML.textContent = vidasUsuario;
    vidasUI.appendChild(vidasHTML);
  }

  restarVidas(param1, param2) {
    if (param1.value !== param2.correcta) {
      vidasUsuario--;
      const borrarNumero = selector('.vida-usuario');
      setTimeout(() => {
        borrarNumero.remove();
      }, 2500);
    }

    // Valida vidas que no sea menor a 0
    if (vidasUsuario <= 0) {
      this.mostrarCartelTerminado();
    }
  }

  mostrarCartelTerminado() {
    const cartel = document.createElement('div');
    cartel.setAttribute('class', 'cartel-terminado');
    cartel.innerHTML = `
      <div class="parrafo-gameover">
        <p>¡Juego terminado!</p>
      </div>
      `;
      
      const botonJugar = document.createElement('button')
      botonJugar.setAttribute('id','btn-jugar');
      botonJugar.setAttribute('class', 'boton-jugar posicion-boton');
      botonJugar.textContent = 'Juega de nuevo!';
      cartel.append(botonJugar)

      // Evento de boton
      botonJugar.addEventListener('click', () => {
        setTimeout(() => { 
          cartel.remove()
        }, 700);
      })
    
    setTimeout(() => {
      body.append(cartel);
      // Reinicia la vida
      vidasUsuario = 8; 
    }, 2500);
  }

  // Limpia el HTML para que no se repitan valores
  limpiarHTML(elemento) {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }
}

// Instanciar
const ui = new UI();

// Preguntas sacadas de la base 
const nuevasPreguntas = data.filter(preg => {return preg.texto, preg.respuestas, preg.correcta});
let preguntaAleatorias;

// Funciones
preguntaAleatoria()
function preguntaAleatoria() {
  preguntaAleatorias = nuevasPreguntas[Math.floor(Math.random() * nuevasPreguntas.length)];

  // Crear parrafo con la pregunta
  const parrafo = document.createElement("p");
  
  // Imprimir preguntas
  ui.imprimirPregunta(parrafo, preguntaAleatorias);
  
  // Imprimir botones
  ui.imprimirBotones(preguntaAleatorias.respuestas[0], preguntaAleatorias.respuestas[1], preguntaAleatorias.respuestas[2], preguntaAleatorias.respuestas[3]);

  // Imprime las vidas
  ui.vidas();
}

function selector(param) {
    return document.querySelector(param);
}
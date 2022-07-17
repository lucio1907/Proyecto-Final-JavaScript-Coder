import { data } from "./classes/preguntas.js";

// Variables
const pregunta = selector('#contenedor-preguntas');
const contenedorRtas = selector('#botons');
const vidasUI = selector('#vidas-usuario');
const body = selector('#body');
const puntosTotales = selector('#puntosTotales');
const btnSalirContenedor = selector('#btnSalir');

// Juego
let vidasUsuario = localStorage.getItem('vidas')
let puntaje = Number(localStorage.getItem('puntajes'));

// Clases
class UI {
  // Imprime las preguntas en el HTML
  imprimirPregunta(p, aleatoria) {
    this.limpiarHTML(pregunta);
    p.innerText = aleatoria.texto;
    // Insertar al HTML
    aleatoria && pregunta.appendChild(p);
  }

  // Imprime los botones con sus valores
  imprimirBotones(btn1, btn2, btn3, btn4) {
    // Se crea el elemento boton
    const botones1 = document.createElement('button');
    this.valoresBotones(botones1, btn1)
    
    const botones2 = document.createElement('button');
    this.valoresBotones(botones2, btn2)

    const botones3 = document.createElement('button');
    this.valoresBotones(botones3, btn3);

    const botones4 = document.createElement('button');
    this.valoresBotones(botones4, btn4)

    // Agrega al HTML los botones
    contenedorRtas.append(botones1, botones2, botones3, botones4);
    
    // Eventos
    botones1.addEventListener('click', () => {
        this.esCorrecta(botones1);
        if (botones1) {
          botones1.disabled = true;
          // Agrego color a los valores de los inputs para mayor efecto a los inputs
          botones1.style.color = '#000';
          botones2.disabled = true;
          botones3.disabled = true;
          botones4.disabled = true;
        }
    });

    botones2.addEventListener('click', () => {
      this.esCorrecta(botones2);
      if (botones2) {
          botones1.disabled = true;
          botones2.disabled = true;
          // Agrego color a los valores de los inputs para mayor efecto a los inputs
          botones2.style.color = '#000';
          botones3.disabled = true;
          botones4.disabled = true;
      }
    });

    botones3.addEventListener('click', () => {
      this.esCorrecta(botones3);
      if (botones3) {
        botones1.disabled = true;
        botones2.disabled = true;
        botones3.disabled = true
        // Agrego color a los valores de los inputs para mayor efecto a los inputs
        botones3.style.color = '#000';
        botones4.disabled = true;
      }
    });

    botones4.addEventListener('click', () => {
      this.esCorrecta(botones4)
      if (botones4) {
        botones1.disabled = true;
        botones2.disabled = true;
        botones3.disabled = true;
        botones4.disabled = true
        // Agrego color a los valores de los inputs para mayor efecto a los input
        botones4.style.color = '#000';
      }
    });
    
  }

  valoresBotones(boton, valor) {
    boton.classList.add('botones-value');
    boton.innerText = valor;
    boton.value = valor;
}

  // Valida que la pregunta sea correcta o incorrecto
  esCorrecta(opcion) {
    if (opcion.value === preguntaAleatorias.correcta) {
      // Agrega color al boton
      opcion.classList.add('botones-value-seleccionado', 'color-verde');

      // Sumo en caso de que sea correcta
      puntaje += 10;
      localStorage.setItem('puntajes', puntaje);

      // Selecciono el numero del metodo vidas() y limpio el HTML
      const borrarNumeroCorrecta = selector('.vida-usuario');
      setTimeout(() => {
        borrarNumeroCorrecta.remove();
      }, 3000);

      // Limpia HTML
      setTimeout(() => {
        this.limpiarHTML(contenedorRtas);
        preguntaAleatoria();
        contenedorRtas.classList.remove('opacity');
      }, 3000);

    } else {

      // Agrega color al boton
      opcion.classList.add('botones-value-seleccionado', 'color-rojo');

      // Resto en caso de que sea incorrecta
      puntaje -= 10;
      localStorage.setItem('puntajes', puntaje);

      // Scripting
      const parrafo = document.createElement('p');
      parrafo.classList.add('cartel-incorrecto', 'color-rojo', 'uppercase');
      parrafo.innerText = `La respuesta correcta es: "${preguntaAleatorias.correcta}"`;
      contenedorRtas.appendChild(parrafo);
    

      // Restar vidas y limpiar HTML
      this.restarVidas(opcion, preguntaAleatorias);

      setTimeout(() => {
        this.limpiarHTML(contenedorRtas);
        contenedorRtas.classList.remove('opacity');
        preguntaAleatoria();
      }, 3500);

      // Valido puntajes
      if (puntaje <= 0) {
        puntaje = 0;
        localStorage.setItem('puntajes', puntaje)
      }

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
      localStorage.setItem('vidas', vidasUsuario);
      const borrarNumero = selector('.vida-usuario');
      setTimeout(() => {
        borrarNumero.remove();
      }, 3500);
    }

    // Valida vidas que no sea menor a 0 y reinicia localStorage
    if (vidasUsuario <= 0) {
      vidasUsuario = 8;
      localStorage.setItem('vidas', vidasUsuario);
      puntaje = 0;
      localStorage.setItem('puntajes', puntaje)
      this.mostrarCartelTerminado();
    }
  }

  botonSalir() {
    // Crear Boton
    btnSalirContenedor.innerHTML = `
    <button class="btn-salir">
      <span class="transition"></span>
      <span class="gradient"></span>
      <span class="label">Salir</span>
    </button>
    `;

  btnSalirContenedor.addEventListener('click', () => {
    setTimeout(() => {
      window.location.reload()
    }, 200);
  });
  }

  mostrarCartelTerminado() {
    const cartel = document.createElement('div');
    cartel.setAttribute('class', 'cartel-terminado');
    cartel.innerHTML = `
      <div class="parrafo-gameover">
        <p>¡Juego terminado!</p>
      </div>
      `;
      
      const botonJugar = document.createElement('button');
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

  imprimirPuntaje() {
    const puntos = document.createElement('p');
    puntos.textContent = `Tienes ${puntaje} Pts.`;

    this.limpiarHTML(puntosTotales);
    puntosTotales.append(puntos);
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

  // Imprime puntaje
  ui.imprimirPuntaje();

  // Imprime el boton para salir
  ui.botonSalir();
}

function selector(param) {
    return document.querySelector(param);
}
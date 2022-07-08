const selectorId = (param) => document.querySelector(param);

// Variables
const contenedorUsuarios = selectorId("#usuarios");
const contenedorJuegos = selectorId("#contenedorJuegos");
const inputUsuario = selectorId("#inputUsuario");
const btnIngresar = selectorId("#botonIngresar");

// Formulario
const formulario = selectorId("#formulario");

// Eventos
eventsListeners();
function eventsListeners() {
  document.addEventListener("DOMContentLoaded", () => contenedorJuegos.style.display = "none");

  inputUsuario.addEventListener("input", () => {
    if (inputUsuario.value > 0) {
        btnIngresar.disabled = false;
        btnIngresar.classList.remove("opacity");
    }
  });

  formulario.addEventListener("submit", ingresarAlJuego);
}

// Funciones
function ingresarAlJuego(e) {
  e.preventDefault();

//   Valido que no se envie un string vacio
  if (inputUsuario.value === "" || inputUsuario.value < 0) {
    mostrarAlerta("El campo es obligatorio", "error");
  } else {
    mostrarAlerta('Ingresando...');

    // Inserto al HTML el juego
    setTimeout(() => {
        contenedorUsuarios.remove();
        btnIngresar.remove();
        contenedorJuegos.style.display = "flex";
      }, 3000);
  }
}

function mostrarAlerta(mensaje, tipo) {
  const divAlerta = document.createElement("div");
  divAlerta.innerHTML = `
        <p class="alertas">${mensaje}</p>
    `;

  if (tipo === "error") {
    divAlerta.classList.add("color-rojo", "uppercase2", "contenedor");
  } else {
    divAlerta.classList.add("color-verde", "uppercase2", "contenedor");
  }

  contenedorUsuarios.appendChild(divAlerta);

  setTimeout(() => {
    divAlerta.remove();
  }, 3000);
}

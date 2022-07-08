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
  document.addEventListener("DOMContentLoaded", () => {
    btnIngresar.disabled = true;
    btnIngresar.classList.add("opacity");
    contenedorJuegos.style.display = "none";
  });

  inputUsuario.addEventListener("input", validacion);

  formulario.addEventListener("submit", ingresarAlJuego);
}

// Funciones
function ingresarAlJuego(e) {
  e.preventDefault();

  //   Valido que no se envie un string vacio
  if (inputUsuario.value === "" || inputUsuario.value < 0) {
    mostrarAlerta("El nombre de usuario es obligatorio", "error");
  } else {
    mostrarAlerta("Ingresando...");

    // Inserto al HTML el juego y borro el formulario
    setTimeout(() => {
      contenedorUsuarios.remove();
      btnIngresar.remove();
      contenedorJuegos.style.display = "flex";
      imprimirNombreUsuario();
    }, 5000);
  }
}

function mostrarAlerta(mensaje, tipo) {
  const alertas = selectorId("#alertas");
  const divAlerta = document.createElement("div");
  const pAlerta = document.createElement("p");
  pAlerta.setAttribute('class', 'animacion-letra')
  pAlerta.textContent = mensaje;

  // Limpio HTML
  alertas.innerHTML = "";

  if (tipo === "error") {
    divAlerta.classList.add("color-rojo", "uppercase2", "contenedor2", "alertas");
  } else {
    divAlerta.classList.add("color-verde", "uppercase2", "contenedor", "alertas");
  }

  // Insertar al HTML
  divAlerta.append(pAlerta);
  alertas.append(divAlerta);

  // Remover alertas
  setTimeout(() => {
    divAlerta.remove();
  }, 5000);
}

function validacion() {
  if (inputUsuario.value < 0 || inputUsuario.value === "" || inputUsuario.value.length < 6) {
    btnIngresar.disabled = true;
    btnIngresar.classList.add("opacity");
  } else {
    btnIngresar.disabled = false;
    btnIngresar.classList.remove("opacity");
  }

  if (Number(inputUsuario.value)) {
    btnIngresar.disabled = true;
    mostrarAlerta("Solo se pueden ingresar nombres y números al final","error");
  }
}



function imprimirNombreUsuario() {
  // Agregar valor del input al HTML
  const nombreDeUsuarioUI = selectorId('#nombreUsuario');
  const divUsuario = document.createElement('div');
  divUsuario.setAttribute('class', 'fondo-usuario');
  divUsuario.innerHTML = `
    <p class="letra-usuario">Usuario: ${inputUsuario.value}</p>  
  `;

  nombreDeUsuarioUI.innerHTML = '';
  nombreDeUsuarioUI.append(divUsuario);
}
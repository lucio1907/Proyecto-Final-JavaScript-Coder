const selectorId = (param) => document.querySelector(param);

// Variables
const contenedorUsuarios = selectorId("#usuarios");
const contenedorJuegos = selectorId("#contenedorJuegos");
const btnIngresar = selectorId("#botonIngresar");

// Formulario
const formulario = selectorId("#formulario");

// Eventos
eventsListeners();
function eventsListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    contenedorJuegos.style.display = "none";
  });

  btnIngresar.addEventListener('click', ingresarAlJuego);

  formulario.addEventListener("submit", (e) => e.preventDefault());
}

// Funciones

function ingresarAlJuego() {
  btnIngresar.disabled = true;
  btnIngresar.classList.add('opacity')
  
  // Inserto al HTML el juego y borro el formulario
  setTimeout(() => {
    contenedorUsuarios.remove();
    btnIngresar.remove();
    contenedorJuegos.style.display = "flex";
  }, 3000);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Ingresando correctamente',
    margin: '20px',
    color: '#28b62c',
  })
  
}

function mostrarAlerta(mensaje) {
  const alertas = selectorId("#alertas");
  const divAlerta = document.createElement("div");
  divAlerta.classList.add("color-verde", "uppercase2", "contenedor", "alertas");
  const pAlerta = document.createElement("p");
  pAlerta.setAttribute('class', 'animacion-letra')
  pAlerta.textContent = mensaje;

  // Limpio HTML
  alertas.innerHTML = "";

  // Insertar al HTML
  divAlerta.append(pAlerta);
  alertas.append(divAlerta);

  // Remover alertas
  setTimeout(() => {
    divAlerta.remove();
  }, 4000);
}
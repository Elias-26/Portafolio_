// input
let textarea = document.getElementById("txt-input");
let informacion = document.querySelector(".txt-instrucciones");

// contenedor Ilustracion
const contenedorInicial = document.querySelector(".ilustracion");

// output
let secRespuesta = document.querySelector(".sec-respuesta");
let textareaOut = document.getElementById("txt-output");
console.log(textareaOut);
let contenedorSalida = document.getElementById("contenedor-salida");

// btn
const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");
const btnCopiar = document.getElementById("btn-copiar");

// verificaciones
var mayus = /[A-Z]/gm;
var caracteres = /[~!@#$%^&*()_+|}{[\]\\\/?><:"`;.,áéíóúÁÉÍÓÚ'1-9]/gm;

// limpiar contenedor de salida
function quitarImg() {
  let mensajeEntrada = textarea.value;
  if (mensajeEntrada.length > 0) {
    contenedorInicial.style.display = "none";
  } else contenedorInicial.style.display = "";
}

// foco en el textarea de entrada
function foco() {
  textarea.focus();
}

// encriptar mensaje
function encriptar() {
  if (validarMayusculas() || validarCaracter() || validarCampo()) {
    Swal.fire({
      icon: "error",
      title: "Lo siento",
      text: "No cumple con las condiciones",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (!validarMayusculas() && !validarCampo() && !validarCaracter()) {
    let nuevoTexto = textarea.value;
    nuevoTexto = nuevoTexto
      .replace(/e/gm, "enter")
      .replace(/i/gm, "imes")
      .replace(/a/gm, "ai")
      .replace(/o/gm, "ober")
      .replace(/u/gm, "ufat");
    secRespuesta.classList.add("sec-ed");
    contenedorSalida.classList.add("respuesta-ed");
    btnCopiar.style.display = "block";
    textareaOut.style.display = "block";
    textareaOut.value = nuevoTexto;
    quitarImg();
  }
}

// desencriptar mensaje
function desencriptar() {
  if (validarMayusculas() || validarCaracter() || validarCampo()) {
    Swal.fire({
      icon: "error",
      title: "Lo siento",
      text: "No cumple con las condiciones",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (!validarMayusculas() && !validarCampo() && !validarCaracter()) {
    let nuevoTexto = textarea.value;
    nuevoTexto = nuevoTexto
      .replace(/enter/gm, "e")
      .replace(/imes/gm, "i")
      .replace(/ai/gm, "a")
      .replace(/ober/gm, "o")
      .replace(/ufat/gm, "u");
    secRespuesta.classList.add("sec-ed");
    contenedorSalida.classList.add("respuesta-ed");
    btnCopiar.style.display = "block";
    textareaOut.style.display = "block";
    textareaOut.value = nuevoTexto;
    quitarImg();
  }
}

// copiar mensaje

function copiar() {
  let copiado = textareaOut.value;
  textarea.value = "";
  textareaOut.style.display = "none";
  btnCopiar.style.display = "none";
  secRespuesta.classList.remove("sec-ed");
  contenedorSalida.classList.remove("respuesta-ed");
  contenedorInicial.style.display = "";
  foco();
  navigator.clipboard.writeText(copiado).then(() => {
    btnCopiar.textContent = "Copiado ✅";
    window.setTimeout(() => {
      btnCopiar.textContent = "Copiar";
      btnCopiar.classList.remove("btn-copiado");
    }, 1000);
  });
  Swal.fire({
    icon: "success",
    title: "Copiado",
    showConfirmButton: false,
    timer: 1500,
  });
  
}

// verificar si existen mayusculas
function validarMayusculas() {
  let validarMayusculas = mayus.test(textarea.value);
  if (validarMayusculas) {
    textarea.style.color = "#ff0000";
    informacion.style.color = "#ff0000";
    foco();
    return true;
  } else {
    textarea.style.color = "var(--d-blue-300)";
    informacion.style.color = "var(--gray-500)";
    return false;
  }
}

// verificar si existen caracteres especiales
function validarCaracter() {
  let validarCaracteres = caracteres.test(textarea.value);
  if (validarCaracteres) {
    textarea.style.color = "#ff0000";
    informacion.style.color = "#ff0000";
    foco();
    return true;
  } else {
    textarea.style.color = "var(--d-blue-300)";
    informacion.style.color = "var(--gray-500)";
    return false;
  }
}

// verificar que el campo no esté vacío
function validarCampo() {
  if (textarea.value.length == 0) {
    return true;
  } else {
    return false;
  }
}

foco();

btnEncriptar.addEventListener("click", encriptar);

btnDesencriptar.addEventListener("click", desencriptar);

btnCopiar.addEventListener("click", copiar);

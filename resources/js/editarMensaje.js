function cargarDatos() {
  const txtMensaje = document.getElementById("txtMensaje");
  const inputIdMsg = document.getElementById("idMensaje")
  const pServicio = document.getElementById("pServicio")
  const frmIdServicio = document.getElementById("subCategoria")
  const inputCategoria = document.getElementById("categoria")

  // Leer la ID del parámetro en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const subCategoria = urlParams.get("subCategoria");
  const idMensaje = urlParams.get("idMensaje");
  const categoria = urlParams.get("categoria")

  // Cargar los datos del archivo JSON externo
  fetch(`/resources/data${categoria}.json`)
    .then((response) => response.json())
    .then((laceadoData) => {
      txtMensaje.value = laceadoData[subCategoria][idMensaje].mensaje;
      inputIdMsg.value = idMensaje
      pServicio.innerHTML = "(" + subCategoria + ")"
      frmIdServicio.value = subCategoria
      inputCategoria.value = categoria
    })
    .catch((error) => console.error("Error al cargar los datos:", error));
};

function cargarDatosImg() {
  const inputIdMsg = document.getElementById("idMensaje")
  const pServicio = document.getElementById("pServicio")
  const frmIdServicio = document.getElementById("subCategoria")
  const actualImg = document.getElementById("actualImg")

  // Leer la ID del parámetro en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const subCategoria = urlParams.get("subCategoria");
  const idMensaje = urlParams.get("idMensaje");
  const categoria = urlParams.get("categoria")
  console.log(categoria)

  const formulario = document.getElementById("formImg")
  formulario.action = `/editarMensajeImg?tipoServicio=${subCategoria}&idMensaje=${idMensaje}&categoria=${categoria}`
  // Cargar los datos del archivo JSON externo
  fetch(`/resources/data${categoria}.json`)
    .then((response) => response.json())
    .then((laceadoData) => {
      let mensajeJson = laceadoData[subCategoria][idMensaje].mensaje;
      actualImg.src = mensajeJson
      inputIdMsg.value = idMensaje
      pServicio.innerHTML = "(" + subCategoria + ")"
      frmIdServicio.value = subCategoria
    })
    .catch((error) => console.error("Error al cargar los datos:", error));
};
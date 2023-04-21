function cargarDatos() {
  const txtMensaje = document.getElementById("txtMensaje");
  const inputIdMsg = document.getElementById("idMensaje")
  const pServicio = document.getElementById("pServicio")
  const frmIdServicio = document.getElementById("idServicio")

  // Leer la ID del parámetro en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const idServicio = urlParams.get("idServicio");
  const idMensaje = urlParams.get("idMensaje");

  // Cargar los datos del archivo JSON externo
  fetch("/resources/servicios/dataServicios.json")
    .then((response) => response.json())
    .then((laceadoData) => {
      txtMensaje.value = laceadoData[idServicio][idMensaje].mensaje;
      inputIdMsg.value = idMensaje
      pServicio.innerHTML = "(" + idServicio + ")"
      frmIdServicio.value = idServicio
    })
    .catch((error) => console.error("Error al cargar los datos:", error));
};
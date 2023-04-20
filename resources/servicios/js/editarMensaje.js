function cargarDatos() {
  const txtMensaje = document.getElementById("txtMensaje");
  const id = document.getElementById("id")
  // Leer la ID del parámetro en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const idBuscado = urlParams.get("idLaceado");

  // Cargar los datos del archivo JSON externo
  fetch("/resources/servicios/dataServicios.json")
    .then((response) => response.json())
    .then((laceadoData) => {
      txtMensaje.value = laceadoData.Laceado[idBuscado].mensaje;
      id.value = idBuscado
    })
    .catch((error) => console.error("Error al cargar los datos:", error));
};

function modificarDatos() {
  console.log("hola");
}

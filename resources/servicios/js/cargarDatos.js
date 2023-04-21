// Obtener la URL actual
const url = window.location.pathname;
// Dividir la URL en un array utilizando el carácter "/" como separador
const urlArray = url.split('/');
// Obtener el último elemento del array, que sería "laceado"
const idServicio = urlArray[urlArray.length - 1];

// Cargar los datos del archivo JSON externo
fetch("/resources/servicios/dataServicios.json")
  .then((response) => response.json())
  .then((laceadoData) => {
    var laceadoTableBody = document.getElementById("laceadoTableBody");
    console.log(laceadoData.alisado.length);
    // Iterar sobre los datos del objeto alisado y construir las filas de la tabla
    for (var i = 0; i < laceadoData.alisado.length; i++) {
      let msg = laceadoData.alisado[i].mensaje
      //Creamos el elemento tr
      var fila = document.createElement("tr");
      //Agregamos la clase que le da estilo por bootstrap
      fila.classList.add("table-secondary");
      //Creamos el elemento th
      var celdaMensaje = document.createElement("th");

      //VALIDAMOS SI EL MENSAJE ES UN TEXTO O LA RUTA DE UNA IMAGEN
      if(typeof msg === 'string') {
        if(msg.match(/\.(jpeg|jpg|gif|png)$/) != null) {
          var imagen = document.createElement("img");
          imagen.src = msg;
          imagen.style.maxheight = "20em";
          imagen.style.maxWidth = "20em";
          celdaMensaje.appendChild(imagen)
        } else {
          //Se le agrega el contenido a la etiqueta <th>
          celdaMensaje.textContent = laceadoData.alisado[i].mensaje;
        }
      } else {
        console.log('El campo "mensaje" no contiene una cadena de texto.');
      }
      //Agregamos atributo
      celdaMensaje.setAttribute("scope", "row");
      celdaMensaje.style.whiteSpace = "pre-line";
      celdaMensaje.style.textTransform = "none";
      celdaMensaje.style.fontWeight = "normal";

      //Declaro botones
      var celdaBtnEditar = document.createElement("td");
      var frmBtnEditar = document.createElement("form");
      frmBtnEditar.setAttribute("method", "get");
      frmBtnEditar.setAttribute("action", "/servicios/editarMensaje");
      var inptFrmBtnEditar = document.createElement("input");
      inptFrmBtnEditar.type = "hidden";
      inptFrmBtnEditar.value = i;
      inptFrmBtnEditar.name = "idMensaje";
      var inpt2FrmBtnEditar = document.createElement("input");
      inpt2FrmBtnEditar.type = "hidden";
      inpt2FrmBtnEditar.value = idServicio;
      inpt2FrmBtnEditar.name = "idServicio";
      var btnEditar = document.createElement("button");
      btnEditar.classList.add("btn");
      btnEditar.classList.add("btn-primary");
      btnEditar.type = "submit";
      var iconEditar = document.createElement("i");
      iconEditar.classList.add("fa");
      iconEditar.classList.add("fa-pencil-square-o");
      btnEditar.appendChild(iconEditar);
      frmBtnEditar.appendChild(inptFrmBtnEditar);
      frmBtnEditar.appendChild(inpt2FrmBtnEditar)
      frmBtnEditar.appendChild(btnEditar);
      celdaBtnEditar.appendChild(frmBtnEditar);

      var celdaBtnEliminar = document.createElement("td"); // Crear una celda para el botón de eliminación
      var frmBtnEliminar = document.createElement("form");
      frmBtnEliminar.setAttribute("method", "get");
      frmBtnEliminar.setAttribute("action", "#");
      var inptFrmBtnEliminar = document.createElement("input");
      inptFrmBtnEliminar.type = "hidden";
      inptFrmBtnEliminar.value = i;
      inptFrmBtnEliminar.name = "idLaceado";
      var btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn");
      btnEliminar.classList.add("btn-danger"); // Cambiar la clase para que sea un botón de eliminación rojo
      btnEliminar.type = "submit";
      var iconEliminar = document.createElement("i");
      iconEliminar.classList.add("fa");
      iconEliminar.classList.add("fa-trash"); // Cambiar el icono para que sea un icono de basura que represente la eliminación
      btnEliminar.appendChild(iconEliminar);
      frmBtnEliminar.appendChild(inptFrmBtnEliminar);
      frmBtnEliminar.appendChild(btnEliminar);
      celdaBtnEliminar.appendChild(frmBtnEliminar);

      fila.appendChild(celdaMensaje);
      fila.appendChild(celdaBtnEditar);
      fila.appendChild(celdaBtnEliminar);
      laceadoTableBody.appendChild(fila);
    }
  })
.catch((error) => console.error("Error al cargar los datos:", error));

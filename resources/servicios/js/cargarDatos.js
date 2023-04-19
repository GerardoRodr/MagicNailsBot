// Cargar los datos del archivo JSON externo
fetch("/resources/servicios/dataServicios.json")
  .then((response) => response.json())
  .then((laceadoData) => {
    var laceadoTableBody = document.getElementById("laceadoTableBody");
    console.log(laceadoData.Laceado.length);
    // Iterar sobre los datos del objeto Laceado y construir las filas de la tabla
    for (var i = 0; i < laceadoData.Laceado.length; i++) {
      //Creamos el elemento tr
      var fila = document.createElement("tr");
      //Agregamos la clase que le da estilo por bootstrap
      fila.classList.add("table-secondary");
      //Creamos el elemento th
      var celdaNombre = document.createElement("th");
      //Se le agrega el contenido a la etiqueta <th>
      celdaNombre.textContent = laceadoData.Laceado[i].mensaje;
      //Agregamos atributo
      celdaNombre.setAttribute("scope", "row");
      celdaNombre.style.whiteSpace = "pre-line";

      /*Declarando celdaImagen y dandole propiedades
      var celdaImagen = document.createElement("td");
      var imagen = document.createElement("img");
      imagen.src = laceadoData.Laceado[i].imagen;
      imagen.style.height = "10em";
      imagen.style.maxWidth = "10em";
      celdaImagen.appendChild(imagen);*/

      //Declaro mis botones
      var celdaBtnEditar = document.createElement("td");
      var frmBtnEditar = document.createElement("form");
      frmBtnEditar.setAttribute("method", "get");
      frmBtnEditar.setAttribute("action", "/servicios/editarServicio");
      var inptFrmBtnEditar = document.createElement("input");
      inptFrmBtnEditar.type = "hidden";
      inptFrmBtnEditar.value = i;
      inptFrmBtnEditar.name = "idLaceado";
      var btnEditar = document.createElement("button");
      btnEditar.classList.add("btn");
      btnEditar.classList.add("btn-primary");
      btnEditar.type = "submit";
      var iconEditar = document.createElement("i");
      iconEditar.classList.add("fa");
      iconEditar.classList.add("fa-pencil-square-o");
      btnEditar.appendChild(iconEditar);
      frmBtnEditar.appendChild(inptFrmBtnEditar);
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

      fila.appendChild(celdaNombre);
      //fila.appendChild(celdaImagen);
      fila.appendChild(celdaBtnEditar);
      fila.appendChild(celdaBtnEliminar);
      laceadoTableBody.appendChild(fila);
    }
  })
.catch((error) => console.error("Error al cargar los datos:", error));

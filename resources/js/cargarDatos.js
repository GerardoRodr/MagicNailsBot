// Obtener la URL actual
const url = window.location.pathname;
// Dividir la URL en un array utilizando el carácter "/" como separador
const urlArray = url.split('/');
// Obtener el último elemento del array, que sería "alisado"
const subCategoria = urlArray[urlArray.length - 1];

let categoria = urlArray[urlArray.length - 2]
categoria = categoria.charAt(0).toUpperCase() + categoria.slice(1)
console.log(categoria)

// Cargar los datos del archivo JSON externo
fetch(`/resources/data${categoria}.json`)
  .then((response) => response.json())
  .then((data) => {
    var tablaMensajes = document.getElementById("tablaMensajes");
    console.log(data[subCategoria].length);
    // Iterar sobre los datos del objeto alisado y construir las filas de la tabla
    for (var i = 0; i < data[subCategoria].length; i++) {
      let msg = data[subCategoria][i].mensaje
      let isImg = false;
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
          isImg = true
        } else {
          //Se le agrega el contenido a la etiqueta <th>
          celdaMensaje.textContent = data[subCategoria][i].mensaje;
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
      if(isImg === true) {
        frmBtnEditar.setAttribute("action", "/editarMensajeImg");
      } else {
        frmBtnEditar.setAttribute("action", "/editarMensaje");
      }
      var inptFrmBtnEditar = document.createElement("input");
      inptFrmBtnEditar.type = "hidden";
      inptFrmBtnEditar.value = i;
      inptFrmBtnEditar.name = "idMensaje";
      var inpt2FrmBtnEditar = document.createElement("input");
      inpt2FrmBtnEditar.type = "hidden";
      inpt2FrmBtnEditar.value = subCategoria;
      inpt2FrmBtnEditar.name = "subCategoria";
      var inpt3FrmBtnEditar = document.createElement("input");
      inpt3FrmBtnEditar.type = "hidden";
      inpt3FrmBtnEditar.value = categoria;
      inpt3FrmBtnEditar.name = "categoria";
      var btnEditar = document.createElement("button");
      btnEditar.classList.add("btn");
      btnEditar.classList.add("btn-primary");
      btnEditar.type = "submit";
      var iconEditar = document.createElement("i");
      iconEditar.classList.add("fa");
      iconEditar.classList.add("fa-pencil-square-o");
      btnEditar.appendChild(iconEditar);
      frmBtnEditar.appendChild(inptFrmBtnEditar);
      frmBtnEditar.appendChild(inpt2FrmBtnEditar);
      frmBtnEditar.appendChild(inpt3FrmBtnEditar);
      frmBtnEditar.appendChild(btnEditar);
      celdaBtnEditar.appendChild(frmBtnEditar);

      var celdaBtnEliminar = document.createElement("td"); // Crear una celda para el botón de eliminación
      var frmBtnEliminar = document.createElement("form");
      frmBtnEliminar.setAttribute("method", "post");
      frmBtnEliminar.setAttribute("action", "/eliminarMensaje");
      var inptFrmBtnEliminar = document.createElement("input");
      inptFrmBtnEliminar.type = "hidden";
      inptFrmBtnEliminar.value = i;
      inptFrmBtnEliminar.name = "idMensaje";
      var inpt2FrmBtnEliminar = document.createElement("input");
      inpt2FrmBtnEliminar.type = "hidden";
      inpt2FrmBtnEliminar.value = subCategoria;
      inpt2FrmBtnEliminar.name = "subCategoria";
      var inpt3FrmBtnEliminar = document.createElement("input");
      inpt3FrmBtnEliminar.type = "hidden";
      inpt3FrmBtnEliminar.value = categoria;
      inpt3FrmBtnEliminar.name = "categoria";
      var btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn");
      btnEliminar.classList.add("btn-danger");
      btnEliminar.type = "submit";
      //FUNCION DE CONFIRMACION PARA ELIMINAR
      btnEliminar.onclick = function() {
        return confirm('¿Estás seguro de que deseas eliminar este dato?');
      }
      var iconEliminar = document.createElement("i");
      iconEliminar.classList.add("fa");
      iconEliminar.classList.add("fa-trash");
      btnEliminar.appendChild(iconEliminar);
      frmBtnEliminar.appendChild(inptFrmBtnEliminar);
      frmBtnEliminar.appendChild(inpt2FrmBtnEliminar)
      frmBtnEliminar.appendChild(inpt3FrmBtnEliminar)
      frmBtnEliminar.appendChild(btnEliminar);
      celdaBtnEliminar.appendChild(frmBtnEliminar);

      fila.appendChild(celdaMensaje);
      fila.appendChild(celdaBtnEditar);
      fila.appendChild(celdaBtnEliminar);
      tablaMensajes.appendChild(fila);
    }
  })
.catch((error) => console.error("Error al cargar los datos:", error));

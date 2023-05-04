const {
    addKeyword,
    addAnswer,
  } = require("@bot-whatsapp/bot");
  
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const fs = require("fs");

//FUNCION PARA LEER LOS DATOS DEL JSON
function readMessagesFromFile(filepath, section) {
  const data = fs.readFileSync(filepath, { encoding: 'utf8' });
  const messages = JSON.parse(data)[section];
  return messages.map(message => message.mensaje);
}

function retMsgs(...messages) {
  // Utilizo spread operator (...) para recibir los mensajes como argumentos
  const messageObjects = messages.map(message => {

    if(typeof message === 'string') {
      if(message.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return {body: " ", media: `.${message}`}
      } else {
        return {body: message}
      }
    } else {
      console.log('El campo "mensaje" no contiene una cadena de texto.');
    }
  });
  // Mapeo los mensajes a objetos con la propiedad "body"
  return messageObjects;
}

const flowGracias = addKeyword(["Gracias", "grasias", "agradesco", "agradezco"])
.addAnswer("Muchas gracias a ti 😊")

const servicioAlisado = addKeyword(['a', 'A'], {sensitive: true,})
.addAnswer("*Alisado:*", null, async (ctx, {flowDynamic}) => {
    const messages = readMessagesFromFile('./resources/dataServicios.json', 'alisado');
    const messageObjects = retMsgs(...messages)

    return flowDynamic(messageObjects)
})
.addAnswer(
  "Para volver al menu principal, presione m 😊. Si desea comunicarse con una recepcionista. Escribanos a este numero: 974322773",
  null,
  null,
  [flowGracias]
);

const servicioMechas = addKeyword(['b', 'B'], {sensitive: true,})
.addAnswer("*Mechas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'mechas');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
async (ctx, {previousAnswers}) => {
  // Aquí se invoca servicioManicure
  const servicioManicureResponse = await servicioManicure.run(ctx, {previousAnswers});
  // Se agrega servicioManicure al arreglo de opciones
  const options = [flowGracias, servicioManicureResponse];
  return options;
}
);

const servicioManicure = addKeyword(['c', 'C'], {sensitive: true,})
.addAnswer("*Manicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'manicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null,
[flowGracias]
);

const servicioMaquillaje = addKeyword(['d', 'D'], {sensitive: true,})
.addAnswer("*Maquillaje:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'maquillaje');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null,
[flowGracias]
);

const servicioCejaspes = addKeyword(['e', 'E'], {sensitive: true,})
.addAnswer("*Cejas y Pestañas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'cejaspes');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null,
[flowGracias]
);

const servicioPedicure = addKeyword(['f', 'F'], {sensitive: true,})
.addAnswer("*Pedicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'pedicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null,
[flowGracias]
);

const servicioDepilaciones = addKeyword(['g', 'G'], {sensitive: true,})
.addAnswer("*Depilaciones:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'depilaciones');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null,
[flowGracias]
);

const servicioLimpiezafacial = addKeyword(['h', 'H'], {sensitive: true,})
.addAnswer("*Limpieza Facial:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'limpiezafacial');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null,
[flowGracias]
);

const servicioTratamientoCapilar = addKeyword(['i', 'I'], {sensitive: true,})
.addAnswer("*Tratamiento Capilar:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'tratamcapil');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null,
[flowGracias]
);

const servicioOtros = addKeyword(['j', 'J'])
.addAnswer("*Otros:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'otros');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null,
[flowGracias]
);

module.exports = 
{servicioAlisado, servicioMechas, servicioManicure, 
  servicioMaquillaje, servicioCejaspes, servicioPedicure,
  servicioDepilaciones, servicioLimpiezafacial, servicioTratamientoCapilar, servicioOtros}
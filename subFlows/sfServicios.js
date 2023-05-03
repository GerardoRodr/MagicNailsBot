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

const servicioAlisado = addKeyword('a', {sensitive: true,})
.addAnswer("*Alisado:*", null, async (ctx, {flowDynamic}) => {
    const messages = readMessagesFromFile('./resources/dataServicios.json', 'alisado');
    const messageObjects = retMsgs(...messages)

    return flowDynamic(messageObjects)
})
.addAnswer(
  "Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
  null,
  null
);

const servicioMechas = addKeyword('b', {sensitive: true,})
.addAnswer("*Mechas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'mechas');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
null,
null
);

const servicioManicure = addKeyword('c', {sensitive: true,})
.addAnswer("*Manicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'manicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
null,
null
);

const servicioMaquillaje = addKeyword('d', {sensitive: true,})
.addAnswer("*Maquillaje:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'maquillaje');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
null,
null
);

const servicioCejaspes = addKeyword('e', {sensitive: true,})
.addAnswer("*Cejas y Pestañas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'cejaspes');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
null,
null
);

const servicioPedicure = addKeyword('f', {sensitive: true,})
.addAnswer("*Pedicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'pedicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
null,
null
);

const servicioDepilaciones = addKeyword('g', {sensitive: true,})
.addAnswer("*Depilaciones:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'depilaciones');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
null,
null
);

const servicioLimpiezafacial = addKeyword('h', {sensitive: true,})
.addAnswer("Limpieza Facial:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'limpiezafacial');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
null,
null
);

const servicioTratamientoCapilar = addKeyword('i', {sensitive: true,})
.addAnswer("*Tratamiento Capilar:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'tratamcapil');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
null,
null
);

const servicioOtros = addKeyword('j', {sensitive: true,})
.addAnswer("*Otros:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'otros');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
null,
null
);

module.exports = 
{servicioAlisado, servicioMechas, servicioManicure, 
  servicioMaquillaje, servicioCejaspes, servicioPedicure,
  servicioDepilaciones, servicioLimpiezafacial, servicioTratamientoCapilar, servicioOtros}
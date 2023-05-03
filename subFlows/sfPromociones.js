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

const promoAlisado = addKeyword('a')
.addAnswer("*Alisado:*", null, async (ctx, {flowDynamic}) => {
    const messages = readMessagesFromFile('./resources/dataPromociones.json', 'alisado');
    const messageObjects = retMsgs(...messages)

    return flowDynamic(messageObjects)
})
.addAnswer(
  "Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
  null,
  null
);

const promoMechas = addKeyword('b')
.addAnswer("*Mechas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'mechas');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null
);

const promoManicure = addKeyword('c')
.addAnswer("*Manicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'manicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null
);

const promoMaquillaje = addKeyword('d')
.addAnswer("*Maquillaje:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'maquillaje');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null
);

const promoCejaspes = addKeyword('e')
.addAnswer("*Cejas y Pestañas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'cejaspes');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null
);

const promoPedicure = addKeyword('f')
.addAnswer("*Pedicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'pedicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null
);

const promoDepilaciones = addKeyword('g')
.addAnswer("*Depilaciones:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'depilaciones');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null
);

const promoLimpiezafacial = addKeyword('h')
.addAnswer("Limpieza Facial:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'limpiezafacial');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null
);

const promoTratamientoCapilar = addKeyword('i')
.addAnswer("*Tratamiento Capilar:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'tratamcapil');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null
);

const promoOtros = addKeyword('j')
.addAnswer("*Otros:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'otros');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer(
"Si desea volver al menu principal para otra consulta, solo vuelvanos a escribir 😊",
null,
null
);

module.exports = 
{promoAlisado, promoMechas, promoManicure, 
  promoMaquillaje, promoCejaspes, promoPedicure,
  promoDepilaciones, promoLimpiezafacial, promoTratamientoCapilar, promoOtros}
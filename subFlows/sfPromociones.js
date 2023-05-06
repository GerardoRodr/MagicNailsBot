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

const promoAlisado = addKeyword(["^1$"], {regex: true,})
.addAnswer("*Alisado:*", null, async (ctx, {flowDynamic}) => {
    const messages = readMessagesFromFile('./resources/dataPromociones.json', 'alisado');
    const messageObjects = retMsgs(...messages)

    return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const promoMechas = addKeyword(["^2$"], {regex: true,})
.addAnswer("*Mechas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'mechas');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const promoManicure = addKeyword(["^3$"], {regex: true,})
.addAnswer("*Manicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'manicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const promoMaquillaje = addKeyword(["^4$"], {regex: true,})
.addAnswer("*Maquillaje:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'maquillaje');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const promoCejaspes = addKeyword(["^5$"], {regex: true,})
.addAnswer("*Cejas y Pestañas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'cejaspes');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const promoPedicure = addKeyword(["^6$"], {regex: true,})
.addAnswer("*Pedicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'pedicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const promoDepilaciones = addKeyword(["^7$"], {regex: true,})
.addAnswer("*Depilaciones:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'depilaciones');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const promoLimpiezafacial = addKeyword(["^8$"], {regex: true,})
.addAnswer("Limpieza Facial:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'limpiezafacial');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const promoTratamientoCapilar = addKeyword(["^9$"], {regex: true,})
.addAnswer("*Tratamiento Capilar:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'tratamcapil');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const promoOtros = addKeyword(["^10$"], {regex: true,})
.addAnswer("*Otros:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataPromociones.json', 'otros');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otra promocion, escriba **P**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

module.exports = 
{promoAlisado, promoMechas, promoManicure, 
  promoMaquillaje, promoCejaspes, promoPedicure,
  promoDepilaciones, promoLimpiezafacial, promoTratamientoCapilar, promoOtros}
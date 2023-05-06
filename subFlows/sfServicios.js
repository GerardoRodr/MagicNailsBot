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

const servicioAlisado = addKeyword(["^1$"], {regex: true,})
.addAnswer("*Alisado:*", null, async (ctx, {flowDynamic}) => {
    const messages = readMessagesFromFile('./resources/dataServicios.json', 'alisado');
    const messageObjects = retMsgs(...messages)

    return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const servicioMechas = addKeyword(["^2$"], {regex: true,})
.addAnswer("*Mechas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'mechas');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const servicioManicure = addKeyword(["^3$"], {regex: true,})
.addAnswer("*Manicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'manicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const servicioMaquillaje = addKeyword(["^4$"], {regex: true,})
.addAnswer("*Maquillaje:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'maquillaje');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const servicioCejaspes = addKeyword(["^5$"], {regex: true,})
.addAnswer("*Cejas y Pestañas:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'cejaspes');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const servicioPedicure = addKeyword(["^6$"], {regex: true,})
.addAnswer("*Pedicure:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'pedicure');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const servicioDepilaciones = addKeyword(["^7$"], {regex: true,})
.addAnswer("*Depilaciones:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'depilaciones');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const servicioLimpiezafacial = addKeyword(["^8$"], {regex: true,})
.addAnswer("*Limpieza Facial:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'limpiezafacial');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const servicioTratamientoCapilar = addKeyword(["^9$"], {regex: true,})
.addAnswer("*Tratamiento Capilar:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'tratamcapil');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

const servicioOtros = addKeyword(["^10$"], {regex: true,})
.addAnswer("*Otros:*", null, async (ctx, {flowDynamic}) => {
  const messages = readMessagesFromFile('./resources/dataServicios.json', 'otros');
  const messageObjects = retMsgs(...messages)

  return flowDynamic(messageObjects)
})
.addAnswer([
  "⬅️ Para consultar otro servicio, escriba **S**",
  "\n⬅️ Para volver al menu principal escriba **M**",
  "\n📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773"]);

module.exports = 
{servicioAlisado, servicioMechas, servicioManicure, 
  servicioMaquillaje, servicioCejaspes, servicioPedicure,
  servicioDepilaciones, servicioLimpiezafacial, servicioTratamientoCapilar, servicioOtros}
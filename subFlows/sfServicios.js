const {
    createBot,
    createProvider,
    createFlow,
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

const servicioAlisado = addKeyword(["1", "alisado", "lisado"])
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

module.exports = {servicioAlisado}
const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    addAnswer,
  } = require("@bot-whatsapp/bot");
  
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const servAlisado = addKeyword(["1", "alisado", "lisado"])
.addAnswer(null, null, async (ctx, {flowDynamic}) => {
    
})
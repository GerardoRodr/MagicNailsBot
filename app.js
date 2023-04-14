const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  addAnswer,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowNegativa = addKeyword(["no", "cancelar", "canselar"]).addAnswer("Entiendo, esperamos que te animes a probar nuestros servicios en un futuro!")

const flowReservacion2 = addKeyword([
  "si",
  "is",
  "sí",
  "so"
]).addAnswer(
  "Genial! Recuerda que en caso desees cancelar esta solicitud de reservacion, simplemente escribe la palabra **Cancelar**"
  , null, null, [flowNegativa])
  .addAnswer("Por favor dinos tu nombre y apellido");

const flowReservacion = addKeyword([
  "reservacion",
  "reservación",
  "reserbacion",
  "recerbasion"
]).addAnswer(
  "Genial! Para hacer tu reservacion primeramente necesito tu *nombre* y un *apellido*"
, null, null, [flowNegativa]);

const flowPrecios = addKeyword(["precios", "precio", "ptecio"])
  .addAnswer([
    "Genial! Nuestros precios son los siguientes:",
    "\nPintado de uñas: S/45",
    "\nPintado de pelo: S/35",
  ])
  .addAnswer(
    [
      "¿Desea hacer alguna reservacion?",
      "\nEscriba *Si* si desea agendarla ahora mismo 😁!",
    ],
    null,
    null,
    [flowReservacion, flowNegativa]
  );

//Shift + Alt + F for Format

const flowPrincipal = addKeyword([
  "hola",
  "ole",
  "alo",
  "buenos",
  "buenas",
  "tardes",
  "noches",
  "dias",
  "hi",
  "hey"
])
  .addAnswer("🙌 Hola bienvenido al spa!")
  .addAnswer("Soy tu asistente virtual, comentanos ¿Que te gustaría saber?", null, null)
  .addAnswer(
    ["Escribe **Precios** si deseas saber nuestros precios",
     "\nEscribe **Reservacion** si deseas hacer una reservacion"], {capture:true}, (ctx, {fallBack}) => {
      //Pasando todo a minuscula para una mejor validacion
      const respLow = ctx.body.toLowerCase()
      
      const kwValid = 
      ["reservacion",
      "reservación",
      "reserbacion",
      "recerbasion",
      "precio",
      "ptecio",
      "precios"]

      let valid = false
      for(let i = 0; i < kwValid.length; i++){
        if(respLow.includes(kwValid[i])){
          valid = true
          console.log("Respuesta: ", ctx.body)
        }
      }

      if(valid == false){
        return fallBack()
      }
    }, [flowPrecios, flowReservacion]);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();

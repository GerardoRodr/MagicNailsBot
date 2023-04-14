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

const flowNegativa = addKeyword(["no", "cancelar", "canselar"]).addAnswer(
  "Entiendo, esperamos que te animes a probar nuestros servicios en un futuro!"
);

//Declaracion de una variable que guarde el nombre del cliente
let name

const flowReservacion = addKeyword(["si", "is", "sí", "so"])
  .addAnswer(
    "Genial! Recuerda que en caso desees cancelar esta solicitud de reservacion, simplemente escriba la palabra **Cancelar**",
    null,
    null,
    [flowNegativa]
  )
  .addAnswer(
    "Por favor dinos tu nombre y apellido",
    { capture: true },
    (ctx, { fallBack }) => {
      //Pasando todo a minuscula para una mejor validacion
      const nameRgx = /^[A-Za-zÁ-ÿ\u00C0-\u017F']+([\s-][A-Za-zÁ-ÿ\u00C0-\u017F']+)*$/;
      //Validamos que se escriba bien el nombre
      if(!nameRgx.test(ctx.body)) {
        fallBack()
      } else {
        name = ctx.body
      }
    }
  )
  .addAnswer(`Genial entonces tu nombre es ${name}`)
  .addAnswer(["\nEs esto correcto?",
  "\nSi lo es, escribe *Si*, si no lo es escribe *No* para volver a introducirlo"], null, null, [flowTipoServicio]);

const flowTipoServicio = addKeyword(["si", "is", "sí"]).addAnswer()
 
const flowPrecios = addKeyword(["precios", "precio", "ptecio"])
  .addAnswer([
    "Genial! Nuestros precios son los siguientes:",
    "\nPintado de uñas: S/45",
    "\nPintado de pelo: S/35",
  ])
  .addAnswer(
    [
      "¿Desea hacer alguna reservacion?",
      "\nSi desea agendarla ahora mismo, escriba *Si* 😁!",
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
  "hey",
])
  .addAnswer("🙌 Hola bienvenido al spa!")
  .addAnswer(
    "Soy tu asistente virtual, comentanos ¿Que te gustaría saber?",
    null,
    null
  )
  .addAnswer(
    [
      "Escribe **Precios** si deseas saber nuestros precios",
      "\nEscribe **Reservacion** si deseas hacer una reservacion",
    ],
    { capture: true },
    (ctx, { fallBack }) => {
      //Pasando todo a minuscula para una mejor validacion
      const respLow = ctx.body.toLowerCase();

      const kwValid = [
        "reservacion",
        "reservación",
        "reserbacion",
        "recerbasion",
        "precio",
        "ptecio",
        "precios",
      ];

      let valid = false;
      for (let i = 0; i < kwValid.length; i++) {
        if (respLow.includes(kwValid[i])) {
          valid = true;
          console.log("Respuesta: ", ctx.body);
        }
      }

      if (valid == false) {
        return fallBack();
      }
    },
    [flowPrecios, flowReservacion]
  );

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

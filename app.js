let name;
let servicio;
let fecha;

//Servicio
//Promociones
//Cita
//Contactos
//Direccion

const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  addAnswer,
  addAction
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const arrSi = ["si", "is", "sí", "so"];

const flowNegativa = addKeyword(["no", "cancelar", "canselar"]).addAnswer(
  "Entiendo, esperamos que te animes a probar nuestros servicios en un futuro!"
);

const flowContacto = addKeyword([
  "reservacion",
  "reservación",
  "reserbacion",
  "recerbasion",
  "precio",
  "ptecio",
  "precios",
])
  .addAnswer(
    "Genial! Recuerda que en caso desees cancelar esta solicitud de reservacion, simplemente escriba la palabra **Cancelar**",
    null,
    null,
    [flowNegativa]
  )
  .addAnswer(
    "Por favor dinos tu nombre y apellido",
    { capture: true },
    async (ctx, { fallBack }) => {
      //Pasando todo a minuscula para una mejor validacion
      const nameRgx =
        /^[A-Za-zÁ-ÿ\u00C0-\u017F']+([\s-][A-Za-zÁ-ÿ\u00C0-\u017F']+)*$/;
      //Validamos que se escriba bien el nombre
      if (!nameRgx.test(ctx.body)) {
        fallBack();
      } else {
        name = ctx.body;
        console.log(name);
      }
    }
  )
  .addAnswer(`Genial, entonces tu nombre es ${name}`)
  .addAnswer(
    "Ahora necesito que me indiques el servicio que necesitas",
    { capture: true },
    async (ctx, { fallBack }) => {
      let serv = ctx.body
      if (serv.length < 3) {
        fallBack();
      } else {
        servicio = ctx.body;
        console.log(servicio);
      }
    }
  )
  .addAnswer(
    "Por ultimo necesito que me indiques tu fecha ideal y la hora de tu reservacion.",
    { capture: true },
    async (ctx, { fallBack }) => {

      let fecha = ctx.body;
      console.log(fecha.length)
      if (fecha.length < 3) {
        fallBack();
      } else {
        fecha = ctx.body;
        console.log(fecha);
      }
    }
  )
  .addAnswer(
    ["Todo listo! El detalle de tu reservacion es la siguiente:",
     `\nNombre: ${name}`,
     `\nServicio: ${servicio}`,
     `\nFecha ideal: ${fecha}`])
  .addAnswer("En unos momentos se te comunicara con una asistente real para que puedan consolidar la reservacion 🙌");

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
      "*Selecciona una de nuestras opciones: *",
      "1️⃣)  Servicios",
      "\n2️⃣) Promociones",
      "\n3️⃣) Contacto",
      "\n4️⃣) Agendar una Cita",
      "\n5️⃣) Ubicacion"
    ],
    { capture: true },
    (ctx, { fallBack }) => {
      if (ctx.body != false) {
        return fallBack();
      }
    },
    [flowPrecios, flowContacto]
  );

const flowSiguiente = addKeyword("ok").addAnswer(`Nombre: ${name}`)

const flowPrueba = addKeyword("test").addAnswer("Nombre", {capture: true}, 
(ctx, {fallBack}) => {
  if(ctx.body != "Gerardo"){
    fallBack("Por favor ingrese correctamente su nombre")
  } else {
    console.log(ctx.body)
  }

  modifName(ctx.body);
}).addAnswer(`Entonces tu nombre es ${name}`, null, null, [flowSiguiente])

const modifName = (n) => {
  name = n;
  console.log("Variable Modificada:" + name)
} 


const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal, flowPrueba]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();

let nombreCliente;
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
  addAction,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

//const arrSi = ["si", "is", "sí", "so"];

const flowNegativa = addKeyword(["cancelar", "canselar"]).addAnswer(
  "Entiendo, esperamos que te animes a probar nuestros servicios en un futuro!"
);

const flowCancelar = addKeyword(["cancelar", "canselar"]).addAnswer(
  "Entiendo, esperamos que te animes a probar nuestros servicios en un futuro!"
);

const flowCita = addKeyword(["2", "dos", "cita"])
  .addAnswer(
    "Genial! Recuerda que en caso desees cancelar esta solicitud de cita, simplemente escriba la palabra **Cancelar**",
    null,
    null,
    [flowCancelar]
  )
  .addAnswer(
    "Por favor dinos tu nombre y apellido",
    { capture: true },
    (ctx, { fallBack }) => {
      //Pasando todo a minuscula para una mejor validacion
      const nameRgx =
        /^[A-Za-zÁ-ÿ\u00C0-\u017F']+([\s-][A-Za-zÁ-ÿ\u00C0-\u017F']+)*$/;
      //Validamos que se escriba bien el nombre
      if (!nameRgx.test(ctx.body)) {
        fallBack(["Me parece que el nombre que es ingresado no es valido, trada de escribirlo de otra manera.",
        "\nEjemplo: ",
        "_Luis Ramirez_"]);
      } else {
        nombreCliente = ctx.body;
        console.log(nombreCliente);
      }
    },
    [flowCancelar]
  )
  .addAnswer(`Genial, entonces tu nombre es ${nombreCliente}`)
  .addAnswer(
    "Ahora necesito que me indiques el servicio que necesitas",
    { capture: true },
    async (ctx, { fallBack }) => {
      let serv = ctx.body;
      if (serv.length < 3) {
        fallBack();
      } else {
        servicio = ctx.body;
        console.log(servicio);
      }
    },
    [flowCancelar]
  )
  .addAnswer(
    "Por ultimo necesito que me indiques tu fecha ideal y la hora de tu reservacion.",
    { capture: true },
    async (ctx, { fallBack }) => {
      let fecha = ctx.body;
      console.log(fecha.length);
      if (fecha.length < 3) {
        fallBack();
      } else {
        fecha = ctx.body;
        console.log(fecha);
      }
    },
    [flowCancelar]
  )
  .addAnswer([
    "Todo listo! El detalle de tu reservacion es la siguiente:",
    `\nNombre: ${nombreCliente}`,
    `\nServicio: ${servicio}`,
    `\nFecha ideal: ${fecha}`,
  ])
  .addAnswer(
    "En unos momentos se te comunicara con una asistente real para que puedan consolidar la reservacion 🙌"
  );

const flowServicios = addKeyword([
  "1",
  "servicios",
  "precio",
  "ptecio",
  "precios",
])
  .addAnswer([
    "Genial! Nuestros servicios son los siguientes:",
    "- LACEADO",
    "- MECHAS",
    "- MANICURE",
    "- MAQUILLAJE",
    "- PESTAÑAS Y CEJAS",
    "- PEDICURE",
    "- LIMPIEZA FACIAL",
    "- DEPILACIONES",
  ])
  .addAnswer(
    [
      "¿Desea hacer alguna reservacion?",
      "\nSi desea agendarla ahora mismo, escriba 2️⃣ 😁!",
    ],
    null,
    null,
    [flowCita, flowNegativa]
  );

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
      "*Porfavor selecciona una de nuestras opciones: *",
      "1️⃣  Servicios", //LISTO
      "\n2️⃣ Agendar una Cita", //IN DEV
      "\n3️⃣ Contacto",
      "\n4️⃣ Promociones",
      "\n5️⃣ Ubicacion",
    ],
    { capture: true },
    (ctx, { fallBack }) => {
      const rsp = ctx.body

      const kwValid = ["1", "2", "3", "4", "5"];

      let valid = false;
      for (let i = 0; i < kwValid.length; i++) {
        if (rsp.includes(kwValid[i])) {
          valid = true;
          console.log("Respuesta: ", ctx.body);
        }
      }

      if (valid == false) {
        return fallBack();
      }
    },
    [flowServicios, flowCita]
  );

/*const flowSiguiente = addKeyword("ok").addAnswer(`Nombre: ${name}`)

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
*/

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

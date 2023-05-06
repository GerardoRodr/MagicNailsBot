let nombre;
let servicio;
let fecha;

const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  addAnswer,
  EVENTS,
} = require("@bot-whatsapp/bot");

const {servicioAlisado, servicioMechas, servicioManicure, servicioMaquillaje, 
      servicioCejaspes, servicioPedicure, servicioDepilaciones,
      servicioLimpiezafacial, servicioTratamientoCapilar, servicioOtros} = require("./subFlows/sfServicios")

const {promoAlisado, promoMechas, promoManicure, promoMaquillaje, 
      promoCejaspes, promoPedicure, promoDepilaciones,
      promoLimpiezafacial, promoTratamientoCapilar, promoOtros} = require("./subFlows/sfPromociones")

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowGracias = addKeyword(["Gracias", "grasias", "agradesco", "agradezco"])
.addAnswer("Muchas gracias a ti 😊")

const flowUbicacion = addKeyword(["^5$"], {regex: true,})
.addAnswer(
[
  "*DIRECCION:*", 
  "▬  Av. Isabel de Bobadilla #388",
  "  (Urbanizacion El Recreo-Trujillo)",
  "▬ Link de GOOGLE MAPS: https://goo.gl/maps/Vs889z12bSScCZiHA",
  "\n*TELEFONO DE CITAS:*",
  "▬  ☏ 974322773 ☏",
  '(Si toma taxi, indique: "Interseccion de Cuba y Bobadilla en EL RECREO")'
]
)
.addAnswer("*Fachada del local*", {media:'./resources/ubicacion/imgs/fachada.jpeg'})
.addAnswer("📲 Si desea comunicarse con una recepcionista, escribanos a este numero: 974322773")
.addAnswer("⬅️ Para volver al menu principal escriba **M**")

const flowContacto = addKeyword(["^3$"], {regex: true,})
  .addAnswer(["TELEFONO DE CITAS - WSP:", "▬  📞 974322773 📞"])
  .addAnswer("⬅️ Para volver al menu principal escriba **M**")

const flowCita = addKeyword(["^2$"], {regex: true,})
  .addAnswer(
    "Genial! Recuerda que en caso desees cancelar esta solicitud de cita, simplemente escriba la palabra **Cancelar**"
  )
  .addAnswer(
    "Por favor dinos tu nombre y apellido",
    { capture: true },
    async (ctx, { fallBack, flowDynamic, endFlow }) => {
      //Validando si cancelaron la solicitud
      if (ctx.body == 'Cancelar' || ctx.body == 'cancelar' || ctx.body == 'Canselar' || ctx.body == 'canselar') {
        return endFlow({body: '❌ Su solicitud ha sido cancelada ❌'})
      }

      //REGEX Para validar el nombre
      const nameRgx = /^[A-Za-z]+([ ][A-Za-z]+)+$/;

      //Validamos que se escriba bien el nombre
      if (!nameRgx.test(ctx.body)) {
        return fallBack("Me parece que el nombre que es ingresado no es valido, trata de escribirlo de otra manera." +
          "\n\n*Ejemplo:*" +
          "\n_Maria Rodriguez_")
      } else {
        nombre = ctx.body;
        console.log(nombre);
        return flowDynamic(`Encantado *${nombre}*`)
      }
    }
  )
  .addAnswer(
    "Ahora necesito que me indiques el servicio que necesitas",
    { capture: true },
    async (ctx, { fallBack, flowDynamic, endFlow }) => {
      //Validando si cancelaron la solicitud
      if (ctx.body == 'Cancelar' || ctx.body == 'cancelar' || ctx.body == 'Canselar' || ctx.body == 'canselar') {
        return endFlow({body: '❌ Su solicitud ha sido cancelada ❌'})
      }

      let tempServ = ctx.body

      if (tempServ.length < 3) {
        return fallBack("Por favor se más especific@");
      }

      servicio = ctx.body;
      console.log(`ServicioCita: ${servicio}`);
    }
  )
  .addAnswer(
    "Por ultimo necesito que me indiques tu fecha ideal y la hora de tu reservacion.",
    { capture: true },
    async (ctx, { fallBack, flowDynamic }) => {

      //Validando si cancelaron la solicitud
      if (ctx.body == 'Cancelar' || ctx.body == 'cancelar' || ctx.body == 'Canselar' || ctx.body == 'canselar') {
        return endFlow({body: '❌ Su solicitud ha sido cancelada ❌'})
      }

      let tempFecha = ctx.body;

      if (tempFecha.length < 3) {
        return fallBack("Me parece que no ingresaste bien la fecha, trata de ser más especific@ por favor.");
      }

      fecha = ctx.body;
      console.log(tempFecha);

      return flowDynamic([
        `*_Todo listo! El detalle de tu reservacion es la siguiente:_*
        \n*Nombre:* ${nombre}
        \n*Servicio:* ${servicio}
        \n*Fecha ideal:* ${fecha}`
      ])
    }
  )
  .addAnswer(
    "En unos momentos te llamará una asistente real para que puedan consolidar la reservacion 🙌"
  );

  const flowPromociones = addKeyword(["^(4|[pP])$"], {regex: true,})
    .addAnswer([
      "_*Genial! Puedes consultar por las siguientes promociones:*_",
      "\n*1️⃣ ALISADOS*",
      "\n*2️⃣ MECHAS*",
      "\n*3️⃣ MANICURE*",
      "\n*4️⃣ MAQUILLAJE*",
      "\n*5️⃣ CEJAS Y PESTAÑAS*",
      "\n*6️⃣ PEDICURE*",
      "\n*7️⃣ DEPILACIONES*",
      "\n*8️⃣ LIMPIEZA FACIAL*",
      "\n*9️⃣ TRATAMIENTO CAPILARES*",
      "\n*🔟 OTROS*",
    ])
    .addAnswer("Si desea ver el detalle de alguna promocion escriba la letra correspondiente.",
    { capture: true },
    (ctx, { fallBack, endFlow }) => {
      const rsp = ctx.body;

      //Validando si cancelaron la solicitud
      if (ctx.body == 'Cancelar' || ctx.body == 'cancelar' || ctx.body == 'Canselar' || ctx.body == 'canselar') {
        return endFlow({body: '❌ Su solicitud ha sido cancelada ❌'})
      }     
  
      //10 Opciones
      const kwValid = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

      console.log(rsp === kwValid[0])

      let valid = false;

      for (let i = 0; i < kwValid.length; i++) {
        if (rsp === kwValid[i]) {
          valid = true;
          console.log("RespuestaServicios: ", rsp);
        }
      }

      if (valid == false) {
        return fallBack([
          "*_⚠️Por favor elija una opcion valida:⚠️*_",
          "\n*1️⃣ ALISADOS*",
          "\n*2️⃣ MECHAS*",
          "\n*3️⃣ MANICURE*",
          "\n*4️⃣ MAQUILLAJE*",
          "\n*5️⃣ CEJAS Y PESTAÑAS*",
          "\n*6️⃣ PEDICURE*",
          "\n*7️⃣ DEPILACIONES*",
          "\n*8️⃣ LIMPIEZA FACIAL*",
          "\n*9️⃣ TRATAMIENTO CAPILARES*",
          "\n*🔟 OTROS*",
        ]);
      }
    },
    [ promoAlisado, promoMechas, promoManicure, 
      promoMaquillaje, promoCejaspes, promoPedicure, promoDepilaciones,
      promoLimpiezafacial, promoTratamientoCapilar, promoOtros, flowGracias]
    );

const flowServicios = addKeyword(["^(1|[sS])$"], {regex: true,})
  .addAnswer([
    "_*Genial! Nuestros servicios son los siguientes:*_",
    "\n*1️⃣ ALISADOS*",
    "\n*2️⃣ MECHAS*",
    "\n*3️⃣ MANICURE*",
    "\n*4️⃣ MAQUILLAJE*",
    "\n*5️⃣ CEJAS Y PESTAÑAS*",
    "\n*6️⃣ PEDICURE*",
    "\n*7️⃣ DEPILACIONES*",
    "\n*8️⃣ LIMPIEZA FACIAL*",
    "\n*9️⃣ TRATAMIENTO CAPILARES*",
    "\n*🔟 OTROS*",
  ])
  .addAnswer("Si desea ver el detalle de algun servicio escriba el numero correspondiente 🙌",
  { capture: true },
  (ctx, { fallBack, endFlow }) => {
    const rsp = ctx.body;
      //Validando si cancelaron la solicitud
      if (ctx.body == 'Cancelar' || ctx.body == 'cancelar' || ctx.body == 'Canselar' || ctx.body == 'canselar') {
        return endFlow({body: '❌ Su solicitud ha sido cancelada ❌'})
      }

    //10 Opciones
    const kwValid = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    let valid = false;
    for (let i = 0; i < kwValid.length; i++) {
      if (ctx.body === kwValid[i]) {
        valid = true;
        console.log("RespuestaServicios: ", rsp);
      }
    }

    if (valid == false) {
      return fallBack([
        "*_⚠️ Por favor elija una opcion valida ⚠️_*",
        "\n*1️⃣ ALISADOS*",
        "\n*2️⃣ MECHAS*",
        "\n*3️⃣ MANICURE*",
        "\n*4️⃣ MAQUILLAJE*",
        "\n*5️⃣ CEJAS Y PESTAÑAS*",
        "\n*6️⃣ PEDICURE*",
        "\n*7️⃣ DEPILACIONES*",
        "\n*8️⃣ LIMPIEZA FACIAL*",
        "\n*9️⃣ TRATAMIENTO CAPILARES*",
        "\n*🔟 OTROS*",
      ]);
    }
  },
  [servicioAlisado, servicioMechas, servicioManicure, 
    servicioMaquillaje, servicioCejaspes, servicioPedicure, servicioDepilaciones,
    servicioLimpiezafacial, servicioTratamientoCapilar, servicioOtros, flowGracias]
  );

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAnswer("🙌 Hola bienvenid@, soy tu asistente virtual MagicBot!")
  .addAnswer("Comentanos ¿Que te gustaría saber?")
  .addAnswer(
    [
      "*Porfavor selecciona una de nuestras opciones:*",
      "\n*1️⃣ Servicios*",
      "\n*2️⃣ Agendar una Cita*",
      "\n*3️⃣ Contacto*",
      "\n*4️⃣ Promociones*", 
      "\n*5️⃣ Ubicacion*",
      "\n*Si desea comunicarse con una recepcionista. Escribanos a este numero: 974322773*"
    ],
    { capture: true },
    async (ctx, { fallBack }) => {
      const rsp = ctx.body;

      const kwValid = ["1", "2", "3", "4", "5"];

      let valid = false;
      for (let i = 0; i < kwValid.length; i++) {
        if (rsp === kwValid[i] && rsp.length === 1) {
          valid = true;
          console.log("Respuesta: ", ctx.body);
        }
      }

      if (valid == false) {
        fallBack([
          "*Porfavor selecciona una de nuestras opciones:*",
          "\n*1️⃣ Servicios*",
          "\n*2️⃣ Agendar una Cita*",
          "\n*3️⃣ Contacto*",
          "\n*4️⃣ Promociones*", 
          "\n*5️⃣ Ubicacion*",
          "\n*Si desea comunicarse con una recepcionista. Escribanos a este numero: 974322773*"
        ]);
      }
    },
    [flowServicios, flowCita, flowContacto, flowUbicacion, flowPromociones]
  )

  const flowMenu = addKeyword(["^[mM]$"], {regex: true,})
  .addAnswer(
    [
      "*Porfavor selecciona una de nuestras opciones:*",
      "\n*1️⃣ Servicios*",
      "\n*2️⃣ Agendar una Cita*",
      "\n*3️⃣ Contacto*",
      "\n*4️⃣ Promociones*", 
      "\n*5️⃣ Ubicacion*",
      "\n*Si desea comunicarse con una recepcionista. Escribanos a este numero: 974322773*"
    ],
    { capture: true },
    async (ctx, { fallBack }) => {
      const rsp = ctx.body;

      const kwValid = ["1", "2", "3", "4", "5"];

      let valid = false;
      for (let i = 0; i < kwValid.length; i++) {
        if (rsp === kwValid[i] && rsp.length === 1) {
          valid = true;
          console.log("Respuesta: ", ctx.body);
        }
      }

      if (valid == false) {
        fallBack([
          "*Porfavor selecciona una de nuestras opciones:*",
          "\n*1️⃣ Servicios*",
          "\n*2️⃣ Agendar una Cita*",
          "\n*3️⃣ Contacto*",
          "\n*4️⃣ Promociones*", 
          "\n*5️⃣ Ubicacion*",
          "\n*Si desea comunicarse con una recepcionista. Escribanos a este numero: 974322773*"
        ]);
      }
    },
    [flowServicios, flowCita, flowContacto, flowUbicacion, flowPromociones]
  )

//(["^1$"], {regex: true,})

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal, flowGracias, flowServicios, flowPromociones, flowMenu]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  },
  //El bot no actuara con los numeros especificados en la blacklist
  {
    blackList: ['51920276971', '51969137630', '51933819460'],
  });
  QRPortalWeb();
};

main();
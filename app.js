global.nombreCliente;
let servicio;
let fecha;

const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  addAnswer,
} = require("@bot-whatsapp/bot");

const {servicioAlisado, servicioMechas, servicioManicure, servicioMaquillaje, 
      servicioCejaspes, servicioPedicure, servicioDepilaciones,
      servicioLimpiezafacial, servicioTratamientoCapilar, servicioOtros} = require("./subFlows/sfServicios")

const {promoAlisado, promoMechas, promoManicure, promoMaquillaje, 
      promoCejaspes, promoPedicure, promoDepilaciones,
      promoLimpiezafacial, promoTratamientoCapilar, promoOtros} = require("./subFlows/sfPromociones")

const fs = require("fs")
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowNegativa = addKeyword(["cancelar", "canselar"]).addAnswer(
  "Entiendo, esperamos que te animes a probar nuestros servicios en un futuro!"
);

const flowCancelar = addKeyword(["cancelar", "canselar"]).addAnswer(
  "Entiendo, esperamos que te animes a probar nuestros servicios en un futuro!"
);

const flowUbicacion = addKeyword(["5", "ubicacion", "direccion", "donde es", "queda"]).addAnswer(
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
.addAnswer(
  "Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
  null,
  null
);

const flowContacto = addKeyword(["3", "tres", "contacto", "numero", "numeros"])
  .addAnswer(["TELEFONO DE CITAS - WSP:", "▬  📞 974322773 📞"])
  .addAnswer(
    "Si desea volver al menu principal para consultar otra cosa escriba 0️⃣",
    null,
    null
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
        fallBack([
          "Me parece que el nombre que es ingresado no es valido, trada de escribirlo de otra manera.",
          "\nEjemplo: ",
          "_Luis Ramirez_",
        ]);
      } else {
        global.nombreCliente = ctx.body;
        console.log(global.nombreCliente);
      }
    },
    [flowCancelar]
  )
  .addAnswer(`Genial, entonces tu nombre es ${global.nombreCliente}`)
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
    `\nNombre: ${global.nombreCliente}`,
    `\nServicio: ${servicio}`,
    `\nFecha ideal: ${fecha}`,
  ])
  .addAnswer(
    "En unos momentos se te comunicara con una asistente real para que puedan consolidar la reservacion 🙌"
  );

  const flowPromociones = addKeyword([
    "4",
    "promociones",
    "promocion"
  ])
    .addAnswer([
      "Genial! Puedes consultar por las siguiebtes promociones:",
      "\n_Ⓐ ALISADOS_",
      "\n_Ⓑ MECHAS_",
      "\n_Ⓒ MANICURE_",
      "\n_Ⓓ MAQUILLAJE_",
      "\n_Ⓔ CEJAS Y PESTAÑAS_",
      "\n_Ⓕ PEDICURE_",
      "\n_Ⓖ DEPILACIONES_",
      "\n_Ⓗ LIMPIEZA FACIAL_",
      "\n_Ⓘ TRATAMIENTO CAPILARES_",
      "\n_Ⓙ OTROS_",
  
    ])
    .addAnswer("Si desea ver el detalle de alguna promocion escriba la letra correspondiente.",
    { capture: true },
    (ctx, { fallBack }) => {
      const rsp = ctx.body;
  
      //11 Opciones
      const kwValid = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  
      let valid = false;
      for (let i = 0; i < kwValid.length; i++) {
        if (rsp.includes(kwValid[i])) {
          valid = true;
          console.log("RespuestaServicios: ", ctx.body);
        }
      }
  
      if (valid == false) {
        return fallBack();
      }
    },
    [flowNegativa, promoAlisado, promoMechas, promoManicure, 
      promoMaquillaje, promoCejaspes, promoPedicure, promoDepilaciones,
      promoLimpiezafacial, promoTratamientoCapilar, promoOtros]
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
    "\n_Ⓐ ALISADOS_",
    "\n_Ⓑ MECHAS_",
    "\n_Ⓒ MANICURE_",
    "\n_Ⓓ MAQUILLAJE_",
    "\n_Ⓔ CEJAS Y PESTAÑAS_",
    "\n_Ⓕ PEDICURE_",
    "\n_Ⓖ DEPILACIONES_",
    "\n_Ⓗ LIMPIEZA FACIAL_",
    "\n_Ⓘ TRATAMIENTO CAPILARES_",
    "\n_Ⓙ OTROS_",

  ])
  .addAnswer("Si desea ver el detalle de algun servicio escriba la letra correspondiente",
  { capture: true },
  (ctx, { fallBack }) => {
    const rsp = ctx.body;

    //11 Opciones
    const kwValid = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

    let valid = false;
    for (let i = 0; i < kwValid.length; i++) {
      if (rsp.includes(kwValid[i])) {
        valid = true;
        console.log("RespuestaServicios: ", ctx.body);
      }
    }

    if (valid == false) {
      return fallBack();
    }
  },
  [flowNegativa, servicioAlisado, servicioMechas, servicioManicure, 
    servicioMaquillaje, servicioCejaspes, servicioPedicure, servicioDepilaciones,
    servicioLimpiezafacial, servicioTratamientoCapilar, servicioOtros]
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
  "0"
])
  .addAnswer("🙌 Hola bienvenid@!")
  .addAnswer(
    "Comentanos ¿Que te gustaría saber?",
    null,
    null
  )
  .addAnswer(
    [
      "*Porfavor selecciona una de nuestras opciones:*",
      "\n_1️⃣ Servicios_", //LISTO
      "\n_2️⃣ Agendar una Cita_", //IN DEV
      "\n_3️⃣ Contacto_", //LISTO
      "\n_4️⃣ Promociones_", 
      "\n_5️⃣ Ubicacion_", //LISTO
    ],
    { capture: true },
    (ctx, { fallBack }) => {
      const rsp = ctx.body;

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
    [flowServicios, flowCita, flowContacto, flowUbicacion, flowPromociones]
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
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
const WhatsappClient = require("./whatsapp-bot.js");

require("dotenv").config();


function convertirANumeroInternacional(numeroLocal, codigoPais) {
  let numeroLimpio = numeroLocal.replace(/[^\d]/g, "");

  if (numeroLimpio.startsWith(codigoPais)) {
    return numeroLimpio + "@c.us";
  }

  if (numeroLimpio.startsWith("0")) {
    numeroLimpio = numeroLimpio.substring(1);
  }
  if (numeroLimpio.startsWith("+")) {
    numeroLimpio = numeroLimpio.substring(1);
  }
  return codigoPais + numeroLimpio + "@c.us";
}

const postWhatsappNotification = async (req, res) => {
  try {
    const whatsappClient = WhatsappClient.getInstance(
      "cliente-test",
      "./whatsapp-sessions"
    );

    const { code: countryCode, number: number, msg: msg } = req.body;

    let internationalNumberFormatted = convertirANumeroInternacional(
      number,
      countryCode
    );

    // Función para enviar mensaje
    const sendMessage = () => {
      whatsappClient.client
        .sendMessage(internationalNumberFormatted, msg)
        .then((response) => {
          return res.send({ status: true, msg: "Mensaje enviado con éxito." });
        })
        .catch((err) => {
          console.error(err);
          return res.send({
            status: false,
            msg: "Error al enviar mensaje: " + err,
          });
        });
    };

    // Comprobar si el cliente está listo y enviar mensaje
    if (whatsappClient.isReady()) {
      sendMessage();
    } else {
      // Si el cliente no está listo, espera al evento 'ready'
      whatsappClient.client.once("ready", () => {
        sendMessage();
      });
    }
  } catch (e) {
    console.error(e);
    return res.send({ status: false, msg: "Error: " + e.message });
  }
};
module.exports = {
  postWhatsappNotification,
};

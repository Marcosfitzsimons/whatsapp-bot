const WhatsappClient = require("../whatsapp-bot.js");

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
      "client-test",
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

const sendValidationCode = async (req, res) => {
  const { randomCode, phoneNumber, countryCode } = req.body;
  try {
    const whatsappClient = WhatsappClient.getInstance(
      "client-test",
      "./whatsapp-sessions"
    );

    let internationalNumberFormatted = convertirANumeroInternacional(
      phoneNumber,
      countryCode
    );

    const sendCodeMessage = (randomGeneratedCode) => {
      const message = `Estimado/a, su código de verificación es: ${randomGeneratedCode}.`;
      whatsappClient.client
        .sendMessage(internationalNumberFormatted, message)
        .then((response) => {
          return console.log({
            status: true,
            msg: "Mensaje enviado con éxito.",
            code: randomGeneratedCode,
          });
        })
        .catch((err) => {
          console.error(err);
          return console.log({
            status: false,
            msg: "Error al enviar mensaje: " + err,
          });
        });
    };
    // Comprobar si el cliente está listo y enviar mensaje
    if (whatsappClient.isReady()) {
      sendCodeMessage(randomCode);
    } else {
      // Si el cliente no está listo, espera al evento 'ready'
      whatsappClient.client.once("ready", () => {
        sendCodeMessage(randomCode);
      });
    }
  } catch (err) {
    console.log("Error validacion Whatsapp", err);
  }

  return res.send({ status: true, msg: "Codigo enviado con exito" });

}

const notifyByWhatsappFromNotification = async (req, res) => {
  const { whatsappContent, phoneNumber, countryCode } = req.body;
  try {
    const whatsappClient = WhatsappClient.getInstance(
      "client-test",
      "./whatsapp-sessions"
    );

    let internationalNumberFormatted = convertirANumeroInternacional(
      phoneNumber,
      countryCode
    );

    const sendWhatsappMessage = () => {
      const message = whatsappContent;
      whatsappClient.client
        .sendMessage(internationalNumberFormatted, message)
        .then((response) => {
          return console.log({
            status: true,
            msg: "Mensaje enviado con éxito.",
          });
        })
        .catch((err) => {
          console.error(err);
          return console.log({
            status: false,
            msg: "Error al enviar mensaje: " + err,
          });
        });
    };
    // Comprobar si el cliente está listo y enviar mensaje
    if (whatsappClient.isReady()) {
      sendWhatsappMessage()
    } else {
      // Si el cliente no está listo, espera al evento 'ready'
      whatsappClient.client.once("ready", () => {
        sendWhatsappMessage()
      });
    }
  } catch (err) {
    console.log("Error al enviar Whatsapp", err);
  }

  return res.send({ status: true, msg: "Mensaje enviado con éxito" });
}

const sendRecruiterReadyToInterview = async (req, res) => {
  const { phoneNumber, countryCode, whatsappContent } = req.body;
  try {
    const whatsappClient = WhatsappClient.getInstance(
      "client-test",
      "./whatsapp-sessions"
    );

    let internationalNumberFormatted = convertirANumeroInternacional(
      phoneNumber,
      countryCode
    );

    const sendWhatsappMessage = () => {
      const message = whatsappContent;
      whatsappClient.client
        .sendMessage(internationalNumberFormatted, message)
        .then((response) => {
          return console.log({
            status: true,
            msg: "Mensaje enviado con éxito.",
          });
        })
        .catch((err) => {
          console.error(err);
          return console.log({
            status: false,
            msg: "Error al enviar mensaje: " + err,
          });
        });
    };
    // Comprobar si el cliente está listo y enviar mensaje
    if (whatsappClient.isReady()) {
      sendWhatsappMessage()
    } else {
      // Si el cliente no está listo, espera al evento 'ready'
      whatsappClient.client.once("ready", () => {
        sendWhatsappMessage()
      });
    }
  } catch (err) {
    console.log("Error al enviar Whatsapp", err);
  }

  return res.send({ status: true, msg: "Mensaje enviado con éxito" });
}

const sendTalentReadyToInterview = async (req, res) => {
  const { phoneNumber, countryCode, whatsappContent } = req.body;
  try {
    const whatsappClient = WhatsappClient.getInstance(
      "client-test",
      "./whatsapp-sessions"
    );

    let internationalNumberFormatted = convertirANumeroInternacional(
      phoneNumber,
      countryCode
    );
    const sendWhatsappMessage = () => {
      whatsappClient.client
        .sendMessage(internationalNumberFormatted, whatsappContent)
        .then((response) => {
          return console.log({
            status: true,
            msg: "Mensaje enviado con éxito.",
          });
        })
        .catch((err) => {
          console.error(err);
          return console.log({
            status: false,
            msg: "Error al enviar mensaje: " + err,
          });
        });
    };
    // Comprobar si el cliente está listo y enviar mensaje
    if (whatsappClient.isReady()) {
      sendWhatsappMessage();
    } else {
      // Si el cliente no está listo, espera al evento 'ready'
      whatsappClient.client.once("ready", () => {
        sendWhatsappMessage();
      });
    }
    console.log(`Notification sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Error sending notification to ${phoneNumber}:`, error);
  }

  return res.send({ status: true, msg: "Mensaje enviado con éxito" });
}

const sendConfirmTalentApplication = async (req, res) => {
  const { phoneNumber, countryCode, whatsappContent } = req.body;

  try {
    const whatsappClient = WhatsappClient.getInstance(
      "client-test",
      "./whatsapp-sessions"
    );

    let internationalNumberFormatted = convertirANumeroInternacional(
      phoneNumber,
      countryCode
    );
    const sendWhatsappMessage = () => {
      whatsappClient.client
        .sendMessage(internationalNumberFormatted, whatsappContent)
        .then((response) => {
          return console.log({
            status: true,
            msg: "Mensaje enviado con éxito.",
          });
        })
        .catch((err) => {
          console.error(err);
          return console.log({
            status: false,
            msg: "Error al enviar mensaje: " + err,
          });
        });
    };
    // Comprobar si el cliente está listo y enviar mensaje
    if (whatsappClient.isReady()) {
      sendWhatsappMessage();
    } else {
      // Si el cliente no está listo, espera al evento 'ready'
      whatsappClient.client.once("ready", () => {
        sendWhatsappMessage();
      });
    }
    console.log(`Notification sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Error sending notification to ${phoneNumber}:`, error);
  }

  return res.send({ status: true, msg: "Mensaje enviado con éxito" });
}

const sendTalentMatchedNotification = async (req, res) => {
  const { phoneNumber, countryCode, whatsappContent } = req.body;
  try {
    const whatsappClient = WhatsappClient.getInstance(
      "client-test",
      "./whatsapp-sessions"
    );

    let internationalNumberFormatted = convertirANumeroInternacional(
      phoneNumber,
      countryCode
    );
    const sendWhatsappMessage = () => {
      whatsappClient.client
        .sendMessage(internationalNumberFormatted, whatsappContent)
        .then((response) => {
          return console.log({
            status: true,
            msg: "Mensaje enviado con éxito.",
          });
        })
        .catch((err) => {
          console.error(err);
          return console.log({
            status: false,
            msg: "Error al enviar mensaje: " + err,
          });
        });
    };
    // Comprobar si el cliente está listo y enviar mensaje
    if (whatsappClient.isReady()) {
      sendWhatsappMessage();
    } else {
      // Si el cliente no está listo, espera al evento 'ready'
      whatsappClient.client.once("ready", () => {
        sendWhatsappMessage();
      });
    }
    console.log(`Notification sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Error sending notification to ${phoneNumber}:`, error);
  }

  return res.send({ status: true, msg: "Mensaje enviado con éxito" });

}

const sendTalentSelectedNotification = async (req, res) => {
  const { phoneNumber, countryCode, whatsappContent } = req.body;
  try {
    const whatsappClient = WhatsappClient.getInstance(
      "client-test",
      "./whatsapp-sessions"
    );

    let internationalNumberFormatted = convertirANumeroInternacional(
      phoneNumber,
      countryCode
    );
    const sendWhatsappMessage = () => {
      whatsappClient.client
        .sendMessage(internationalNumberFormatted, whatsappContent)
        .then((response) => {
          return console.log({
            status: true,
            msg: "Mensaje enviado con éxito.",
          });
        })
        .catch((err) => {
          console.error(err);
          return console.log({
            status: false,
            msg: "Error al enviar mensaje: " + err,
          });
        });
    };
    // Comprobar si el cliente está listo y enviar mensaje
    if (whatsappClient.isReady()) {
      sendWhatsappMessage()
    } else {
      // Si el cliente no está listo, espera al evento 'ready'
      whatsappClient.client.once("ready", () => {
        sendWhatsappMessage()
      });
    }
    console.log(`Notification sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Error sending notification to ${phoneNumber}:`, error);
  }

  return res.send({ status: true, msg: "Mensaje enviado con éxito" });

}

module.exports = {
  postWhatsappNotification,
  sendValidationCode,
  notifyByWhatsappFromNotification,
  sendRecruiterReadyToInterview,
  sendTalentReadyToInterview,
  sendConfirmTalentApplication,
  sendTalentMatchedNotification,
  sendTalentSelectedNotification
};

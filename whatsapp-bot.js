const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');

let instances = {};

class WhatsappClient {
    constructor(clientId, dataPath = './whatsapp-sessions') {
        if (instances[clientId]) {
            return instances[clientId];
        }

        console.log('\x1b[31m%s\x1b[0m%s', 'WHATSAPP BOT', ' >> Inicializando el BOT, por favor aguarde.');

        const sessionPath = path.join(dataPath, clientId);
        this.client = new Client({
            authStrategy: new LocalAuth({ clientId, dataPath: sessionPath }),
            webVersionCache: {
                type: "remote",
                remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
            }
        });

        // Error handling
        this.client.on('error', err => {
            console.error('Error:', err);
        });

        this.client.on('qr', qr => {
            console.log('\x1b[31m%s\x1b[0m%s', 'WHATSAPP BOT', ' >> Generando QR, por favor aguarde...');
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('\x1b[31m%s\x1b[0m%s', 'WHATSAPP BOT', ' >> Conexión exitosa, ya puede utilizar el servicio de mensajería.');
            this.ready = true;
            this.setupMessageHandler();
        });

        this.client.on('auth_failure', msg => {
            console.error('Error de autenticación:', msg);
        });

        this.client.on('disconnected', reason => {
            console.error('Desconectado:', reason);
        });

        this.ready = false;
        instances[clientId] = this;
    }

    static getInstance(clientId, dataPath) {
        if (!instances[clientId]) {
            instances[clientId] = new WhatsappClient(clientId, dataPath);
            instances[clientId].client.initialize();
            console.log('\x1b[31m%s\x1b[0m%s', 'WHATSAPP BOT', ` >> Inicializando instancia para cliente ${clientId}.`);
        } else {
            console.log('\x1b[31m%s\x1b[0m%s', 'WHATSAPP BOT', ` >> Cliente ${clientId} ya está inicializado.`);
        }
        return instances[clientId];
    }

    setupMessageHandler() {
        console.log('\x1b[31m%s\x1b[0m%s', 'WHATSAPP BOT', ' >> Configurando manejador de mensajes.');
        this.client.on('message', message => {
            console.log('\x1b[31m%s\x1b[0m%s', 'WHATSAPP BOT', ' >> Mensaje recibido:', message.body);
            if (message.body === 'Hola' || message.body === "hola") {
                message.reply(`¡Hola! Soy el BOT🤖 de Asignate.\n Estoy en etapa de desarrollo, pero aqui te dejo unas opciones (Envia el numero): \n
        1- Contactar con una persona 🤵
        2- Agendar una entrevista 🎫
                `);
            } else if (message.body === "1") {
                message.reply("Hemos notificado al personal de Asignate, aguarda su respuesta!");
            }
            else if (message.body === "2") {
                message.reply("Perfecto, hemos tomado nota sobre tu solicitud. Estarás recibiendo información en los próximos días, saludos.");
            }
            else {
                // Responder con un mensaje predeterminado o no hacer nada
                // message.reply('Recibí tu mensaje, pero aún no estoy programado para responder a eso.');
                console.log('reply to message received here...')
            }
        });
    }

    isReady() {
        return this.ready;
    }
}

module.exports = WhatsappClient;

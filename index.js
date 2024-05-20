const dotenv = require("dotenv");

dotenv.config()

const express = require("express");

const notificationRoutes = require("./routes/notificationRoutes.js");

var cors = require("cors");
const path = require("path")

const WhatsappClient = require("./whatsapp-bot.js");
//WhatsappClient.getInstance("cliente-test","./whatsapp-sessions");

const whitelist = []

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "ngrok-skip-browser-warning",
    ],
};

const app = express();
const port = process.env.PORT || 3000;
app.set("trust proxy", 1);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static("public"));

app.use("/api/notification", notificationRoutes);
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Serve QR code
app.get('/qr', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'qr.png'));
});

const start = () => {
    app.listen(port, () =>
        console.log(`Connected to backend. Server is listening on port ${port}...`)
    );
};

start();

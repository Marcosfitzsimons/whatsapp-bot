const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100000000000, // Limitar a 100 solicitudes por ventana
    message: "Has excedido el límite de solicitudes permitidas.", // Mensaje de error personalizado
    keyGenerator: function (req, res) {
        return (req.ip || '') + req.headers['user-agent'];
    }
});

module.exports = { apiLimiter };

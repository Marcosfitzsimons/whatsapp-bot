const express = require('express');

const {

    postWhatsappNotification,

} = require("./notificationController.js");

const router = express.Router();

router.route("/whatsapp").post(postWhatsappNotification);

module.exports = router;
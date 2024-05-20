const express = require('express');
const { apiLimiter } = require('../middlewares/apiLimiter.js');


const {
    postWhatsappNotification,
    sendValidationCode,
    notifyByWhatsappFromNotification,
    sendRecruiterReadyToInterview,
    sendTalentReadyToInterview,
    sendConfirmTalentApplication,
    sendTalentMatchedNotification,
    sendTalentSelectedNotification
} = require("../controllers/notificationController.js");

const router = express.Router();

router.route("/whatsapp").post(apiLimiter, postWhatsappNotification);
router.route("/whatsapp/send-validation-code").post(apiLimiter, sendValidationCode);
router.route('/whatsapp/notify-by-whatsapp-from-notification').post(apiLimiter, notifyByWhatsappFromNotification);
router.route('/whatsapp/recruiter-ready-to-interview').post(apiLimiter, sendRecruiterReadyToInterview)
router.route('/whatsapp/talent-ready-to-interview').post(apiLimiter, sendTalentReadyToInterview);
router.route('/whatsapp/send-confirm-talent-application').post(apiLimiter, sendConfirmTalentApplication)
router.route('/whatsapp/send-talent-matched-notification').post(apiLimiter, sendTalentMatchedNotification);
router.route('/whatsapp/send-talent-selected-notification').post(apiLimiter, sendTalentSelectedNotification);
module.exports = router;
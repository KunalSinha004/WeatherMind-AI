"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alertController_1 = require("../controllers/alertController");
const router = (0, express_1.Router)();
router.get('/', alertController_1.getAlerts);
router.post('/preferences', alertController_1.updateAlertPreferences);
exports.default = router;

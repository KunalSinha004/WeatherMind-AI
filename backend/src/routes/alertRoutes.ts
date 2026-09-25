import { Router } from 'express';
import { getAlerts, updateAlertPreferences } from '../controllers/alertController';

const router = Router();

router.get('/', getAlerts);
router.post('/preferences', updateAlertPreferences);

export default router;

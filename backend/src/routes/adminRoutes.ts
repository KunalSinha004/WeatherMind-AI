import { Router } from 'express';
import { getAdminDashboardStats } from '../controllers/adminController';

const router = Router();

router.get('/stats', getAdminDashboardStats);

export default router;

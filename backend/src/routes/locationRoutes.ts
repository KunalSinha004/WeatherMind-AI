import { Router } from 'express';
import { getSavedLocations, addSavedLocation, removeSavedLocation } from '../controllers/locationController';

const router = Router();

router.get('/', getSavedLocations);
router.post('/', addSavedLocation);
router.delete('/:id', removeSavedLocation);

export default router;

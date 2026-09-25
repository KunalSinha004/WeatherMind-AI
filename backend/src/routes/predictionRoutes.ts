import { Router } from 'express';
import {
  getPrediction,
  getAnomalyDetection,
  getModelEvaluationMetrics
} from '../controllers/predictionController';

const router = Router();

router.post('/predict', getPrediction);
router.post('/temperature', (req, res) => { req.body.metric = 'temperature'; getPrediction(req, res); });
router.post('/rainfall', (req, res) => { req.body.metric = 'rainfall'; getPrediction(req, res); });
router.post('/humidity', (req, res) => { req.body.metric = 'humidity'; getPrediction(req, res); });
router.post('/wind', (req, res) => { req.body.metric = 'wind'; getPrediction(req, res); });
router.get('/anomaly', getAnomalyDetection);
router.get('/metrics', getModelEvaluationMetrics);

export default router;

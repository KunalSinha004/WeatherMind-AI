import { Router } from 'express';
import {
  getCurrentWeather,
  getHourlyForecast,
  getDailyForecast,
  searchCities,
  getHistoricalAnalytics,
  compareCities
} from '../controllers/weatherController';

const router = Router();

router.get('/current', getCurrentWeather);
router.get('/hourly', getHourlyForecast);
router.get('/forecast', getDailyForecast);
router.get('/search', searchCities);
router.get('/historical', getHistoricalAnalytics);
router.get('/compare', compareCities);

export default router;

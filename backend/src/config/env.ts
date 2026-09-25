import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/weathermind',
  JWT_SECRET: process.env.JWT_SECRET || 'weathermind_ai_super_secret_jwt_key_2026',
  FASTAPI_AI_URL: process.env.FASTAPI_AI_URL || 'http://localhost:8000',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY || 'openmeteo_free',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

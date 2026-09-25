import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { ENV } from './config/env';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import weatherRoutes from './routes/weatherRoutes';
import predictionRoutes from './routes/predictionRoutes';
import alertRoutes from './routes/alertRoutes';
import locationRoutes from './routes/locationRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();
const server = http.createServer(app);

// Initialize Socket.io for real-time notifications & weather alerts
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/prediction', predictionRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/admin', adminRoutes);

// Root Status Health Route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WeatherMind AI Node Backend',
    timestamp: new Date().toISOString(),
    env: ENV.NODE_ENV
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);
  
  socket.on('subscribe_location', (location) => {
    console.log(`[Socket.io] Socket ${socket.id} subscribed to updates for ${location}`);
    socket.join(`location_${location}`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Database & Express Server
connectDB().then(() => {
  server.listen(ENV.PORT, () => {
    console.log(`====================================================`);
    console.log(`  WeatherMind AI Server running on port ${ENV.PORT}`);
    console.log(`  Mode: ${ENV.NODE_ENV}`);
    console.log(`  FastAPI AI Proxy: ${ENV.FASTAPI_AI_URL}`);
    console.log(`====================================================`);
  });
});

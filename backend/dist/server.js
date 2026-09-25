"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const weatherRoutes_1 = __importDefault(require("./routes/weatherRoutes"));
const predictionRoutes_1 = __importDefault(require("./routes/predictionRoutes"));
const alertRoutes_1 = __importDefault(require("./routes/alertRoutes"));
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Initialize Socket.io for real-time notifications & weather alerts
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});
// API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/weather', weatherRoutes_1.default);
app.use('/api/prediction', predictionRoutes_1.default);
app.use('/api/alerts', alertRoutes_1.default);
app.use('/api/locations', locationRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
// Root Status Health Route
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'WeatherMind AI Node Backend',
        timestamp: new Date().toISOString(),
        env: env_1.ENV.NODE_ENV
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
app.use(errorMiddleware_1.errorHandler);
// Start Database & Express Server
(0, db_1.connectDB)().then(() => {
    server.listen(env_1.ENV.PORT, () => {
        console.log(`====================================================`);
        console.log(`  WeatherMind AI Server running on port ${env_1.ENV.PORT}`);
        console.log(`  Mode: ${env_1.ENV.NODE_ENV}`);
        console.log(`  FastAPI AI Proxy: ${env_1.ENV.FASTAPI_AI_URL}`);
        console.log(`====================================================`);
    });
});

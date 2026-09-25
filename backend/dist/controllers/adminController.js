"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminDashboardStats = void 0;
const getAdminDashboardStats = async (req, res) => {
    res.json({
        success: true,
        stats: {
            totalUsers: 14280,
            activeUsersToday: 3840,
            totalApiRequests: 1284500,
            totalForecastsGenerated: 492100,
            mlModelPredictions: 312890,
            activeAlertsCount: 14,
            systemHealth: {
                nodeServer: 'healthy',
                aiService: 'healthy',
                database: 'healthy',
                apiLatencyMs: 42,
                memoryUsagePercent: 38.5,
                cpuUsagePercent: 12.4
            }
        },
        users: [
            { id: 'usr_1', name: 'Kunal Sharma', email: 'kunal@example.com', role: 'admin', location: 'Bangalore', status: 'Active', registeredAt: '2026-01-15' },
            { id: 'usr_2', name: 'Ananya Roy', email: 'ananya@example.com', role: 'user', location: 'Kolkata', status: 'Active', registeredAt: '2026-02-02' },
            { id: 'usr_3', name: 'Rahul Verma', email: 'rahul@example.com', role: 'user', location: 'Delhi', status: 'Active', registeredAt: '2026-02-20' },
            { id: 'usr_4', name: 'Priya Nair', email: 'priya@example.com', role: 'user', location: 'Cochin', status: 'Active', registeredAt: '2026-03-10' }
        ],
        predictionLogs: [
            { id: 'log_101', timestamp: new Date().toISOString(), location: 'Bangalore', metric: 'Temperature', model: 'XGBoost v3.1', confidence: '91%', executionTimeMs: 38, status: 'Success' },
            { id: 'log_102', timestamp: new Date(Date.now() - 300000).toISOString(), location: 'Delhi', metric: 'Rainfall', model: 'PyTorch LSTM', confidence: '88%', executionTimeMs: 65, status: 'Success' },
            { id: 'log_103', timestamp: new Date(Date.now() - 600000).toISOString(), location: 'Mumbai', metric: 'Wind Speed', model: 'Random Forest', confidence: '86%', executionTimeMs: 42, status: 'Success' },
            { id: 'log_104', timestamp: new Date(Date.now() - 1200000).toISOString(), location: 'London', metric: 'Humidity', model: 'XGBoost v3.1', confidence: '94%', executionTimeMs: 29, status: 'Success' }
        ]
    });
};
exports.getAdminDashboardStats = getAdminDashboardStats;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(env_1.ENV.MONGODB_URI, {
            serverSelectionTimeoutMS: 3000,
        });
        console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    }
    catch (error) {
        console.warn(`[MongoDB Warning] Could not connect to MongoDB instance at ${env_1.ENV.MONGODB_URI}.`);
        console.warn(`[MongoDB Warning] App will run with resilient in-memory fallback state.`);
    }
};
exports.connectDB = connectDB;

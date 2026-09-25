"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSavedLocation = exports.addSavedLocation = exports.getSavedLocations = void 0;
// In-memory store per user for locations
const userLocationsMap = new Map();
const getSavedLocations = async (req, res) => {
    const userId = req.user?.id || 'demo_user';
    const list = userLocationsMap.get(userId) || [
        { id: 'loc_1', city: 'Bangalore', country: 'India', lat: 12.9716, lon: 77.5946, isPrimary: true },
        { id: 'loc_2', city: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090, isPrimary: false },
        { id: 'loc_3', city: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777, isPrimary: false }
    ];
    res.json({ success: true, locations: list });
};
exports.getSavedLocations = getSavedLocations;
const addSavedLocation = async (req, res) => {
    const userId = req.user?.id || 'demo_user';
    const { city, country, lat, lon } = req.body;
    if (!city) {
        res.status(400).json({ success: false, message: 'City name is required' });
        return;
    }
    const list = userLocationsMap.get(userId) || [
        { id: 'loc_1', city: 'Bangalore', country: 'India', lat: 12.9716, lon: 77.5946, isPrimary: true },
        { id: 'loc_2', city: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090, isPrimary: false }
    ];
    const newItem = {
        id: `loc_${Date.now()}`,
        city,
        country: country || 'International',
        lat: lat || 12.97,
        lon: lon || 77.59,
        isPrimary: list.length === 0
    };
    list.push(newItem);
    userLocationsMap.set(userId, list);
    res.status(201).json({ success: true, location: newItem });
};
exports.addSavedLocation = addSavedLocation;
const removeSavedLocation = async (req, res) => {
    const userId = req.user?.id || 'demo_user';
    const locId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    let list = userLocationsMap.get(userId) || [];
    list = list.filter(item => item.id !== locId && item.city.toLowerCase() !== String(locId).toLowerCase());
    userLocationsMap.set(userId, list);
    res.json({ success: true, message: 'Location removed successfully' });
};
exports.removeSavedLocation = removeSavedLocation;

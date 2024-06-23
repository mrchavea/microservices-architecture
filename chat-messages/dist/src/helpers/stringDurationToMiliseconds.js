"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInMiliseconds = void 0;
function calculateInMiliseconds(duration) {
    const units = {
        'ms': 1,
        's': 1000,
        'm': 60000,
        'h': 3600000,
        'd': 86400000
    };
    const time = parseInt(duration);
    const unit = duration[duration.length - 1].toLowerCase();
    return time * units[unit];
}
exports.calculateInMiliseconds = calculateInMiliseconds;

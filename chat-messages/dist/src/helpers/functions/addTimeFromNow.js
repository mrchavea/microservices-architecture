"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTimeFromNow = void 0;
const domain_1 = require("../../domain");
function addTimeFromNow(time) {
    const unities = {
        'ms': 1,
        's': 1000,
        'm': 60000,
        'h': 3600000,
        'd': 86400000
    };
    const quantity = parseInt(time);
    const unity = time.match(/ms|[smhd]/i)[0];
    if (!unities.hasOwnProperty(unity)) {
        throw domain_1.CustomError.internalServer('Error creating expiry time');
    }
    let date = new Date();
    date.setTime(date.getTime() + quantity * unities[unity]);
    return date;
}
exports.addTimeFromNow = addTimeFromNow;

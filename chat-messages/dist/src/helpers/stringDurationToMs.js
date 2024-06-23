"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../domain");
function addTimeFromNow(time) {
    const unities = {
        'ms': 1,
        's': 1000,
        'm': 60000,
        'h': 3600000,
        'd': 86400000
    };
    // Extraer la cantidad y la unidad del tiempo
    const quantity = parseInt(time);
    const unity = time.match(/ms|[smhd]/i)[0];
    // Verificar si la unidad es válida
    if (!unities.hasOwnProperty(unity)) {
        throw domain_1.CustomError.internalServer('Error creating expiry time');
    }
    // Crear una nueva instancia de Date basada en la fecha actual
    let date = new Date();
    // Sumar el tiempo correspondiente
    date.setTime(date.getTime() + quantity * unities[unity]);
    return date;
}

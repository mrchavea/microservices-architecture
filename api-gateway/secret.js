const crypto = require("crypto");

// Generar una clave privada de 32 bytes (256 bits)
const privateKey = crypto.randomBytes(32);

console.log("Clave privada generada:", privateKey.toString("hex"));

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const registry_json_1 = __importDefault(require("./registry.json"));
// Importa y tipa el archivo JSON de configuración
const registry = registry_json_1.default;
// Crea el router de Express
const router = (0, express_1.Router)();
// Define la ruta para manejar solicitudes
router.all("/:apiName/:path", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtiene `user_id` del objeto `req`
    const user_id = req === null || req === void 0 ? void 0 : req.user_id;
    // Obtiene los parámetros de la solicitud
    const apiName = req.params.apiName;
    const path = req.params.path;
    // Verifica si el servicio está registrado en `registry`
    if (registry.services[apiName]) {
        // Configura los parámetros para la solicitud Axios
        const config = {
            method: req.method, // `req.method` es de tipo `string`, pero `Method` es específico para Axios
            url: `${registry.services[apiName].url}${path}`, // Concatena la URL del servicio con el path
            headers: req.headers, // Usa `any` si no conoces la forma exacta de `headers`
            data: req.body, // Datos del cuerpo de la solicitud
            params: Object.assign(Object.assign({}, req.params), { user_id }) // Añade `user_id` a los parámetros de la solicitud
        };
        try {
            // Realiza la solicitud Axios
            const response = yield (0, axios_1.default)(config);
            console.timeEnd("http communication");
            // Devuelve la respuesta del servidor
            return res.status(200).json(response.data);
        }
        catch (error) {
            console.error("Error al realizar la solicitud:", error);
            return res.status(500).send("Error en el servidor");
        }
    }
    // Si no se encuentra el servicio, devuelve un error 404
    return res.sendStatus(404);
}));
exports.default = router;

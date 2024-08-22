"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookieEncrypter = require('cookie-encrypter');
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = __importDefault(require("../middleware"));
const routes_1 = __importDefault(require("./presentation/authentication/routes"));
const routes_2 = __importDefault(require("./presentation/routes"));
// Cargar las variables de entorno
dotenv_1.default.config();
// Variables de entorno y opciones
const PORT = process.env.PORT || 3000;
const CORS_OPTIONS = {
    origin: "http://localhost:4000",
    credentials: true,
    allowedHeaders: ["jwt_session", "jwt_access"],
};
// Configuración de la aplicación
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: CORS_OPTIONS.origin,
        credentials: CORS_OPTIONS.credentials,
        allowedHeaders: CORS_OPTIONS.allowedHeaders
    }
});
// Configuración de eventos de Socket.IO
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("join", (room) => {
        socket.join(room);
        console.log(`Socket ${socket.id} joining room ${room}`);
    });
    socket.on("leave", (room) => {
        console.log(`Socket ${socket.id} leaving room ${room}`);
        socket.leave(room);
    });
    socket.on("message", (message) => {
        console.log("MSG:", message);
        socket.to(message.chatId).emit("message", {
            id: message.id,
            text: message.text,
            from: message.from,
            to: message.to,
            sent_date: message.sent_date,
            chatId: message.chatId
        });
    });
});
// Middleware y rutas
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(CORS_OPTIONS));
app.use((0, cookie_parser_1.default)());
app.use(cookieEncrypter(process.env.COOKIE_SECRET_KEY));
app.use(middleware_1.default);
app.use("/auth", routes_1.default);
app.use("/", routes_2.default);
// Iniciar el servidor
server.listen(PORT, () => {
    console.log("Started server at port ", PORT);
});

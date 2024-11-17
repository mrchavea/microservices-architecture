import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
const cookieEncrypter: any = require("cookie-encrypter");
import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import dotenv from "dotenv";
import authenticateToken from "../middleware";
import authRoutes from "./presentation/authentication/routes";
import routes from "./presentation/routes";

// Cargar las variables de entorno
dotenv.config();

// Definición de tipos
interface Message {
  id: string;
  text: string;
  from: string;
  to: string;
  sent_date: string;
  chatId: string;
}

// Variables de entorno y opciones
const PORT = process.env.PORT || 3000;
const CORS_OPTIONS = {
  origin: "http://localhost:4000",
  credentials: true,
  allowedHeaders: ["jwt_session", "jwt_access", "Content-Type"]
};

// Configuración de la aplicación
const app: Express = express();
const server: HTTPServer = createServer(app);
const io: SocketIOServer = new SocketIOServer(server, {
  cors: CORS_OPTIONS
});

// Configuración de eventos de Socket.IO
io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  socket.on("join", (room: string) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joining room ${room}`);
  });

  socket.on("leave", (room: string) => {
    console.log(`Socket ${socket.id} leaving room ${room}`);
    socket.leave(room);
  });

  socket.on("message", (message: Message) => {
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
app.use(express.json());
app.use(helmet());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
//app.use(cookieEncrypter(process.env.COOKIE_SECRET_KEY as string));
app.use(authenticateToken);
app.use("/auth", authRoutes);
app.use("/", routes);

// Iniciar el servidor
server.listen(PORT, () => {
  console.log("Started server at port ", PORT);
});

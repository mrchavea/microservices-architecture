const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieEncrypter = require("cookie-encrypter");
const authenticateToken = require("../middleware");
const authRoutes = require("./presentation/authentication/routes");
const routes = require("./presentation/routes");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const CORS_OPTIONS = {
  origin: "http://localhost:4000",
  credentials: true
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: CORS_OPTIONS,
  allowedHeaders: ["jwt_session", "jwt_access"]
});

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
    socket.to(message?.chatId).emit("message", {
      id: message.id,
      text: message.text,
      from: message.from,
      to: message.to,
      sent_date: message.sent_date,
      chatId: message.chatId
    });
  });
});

app.use(express.json());
app.use(helmet());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
app.use(cookieEncrypter(process.env.COOKIE_SECRET_KEY));
app.use(authenticateToken);
app.use("/auth", authRoutes);
app.use("/", routes);

server.listen(PORT, () => {
  console.log("Started server at port ", PORT);
});

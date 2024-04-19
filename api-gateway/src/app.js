const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieEncrypter = require("cookie-encrypter");
const authenticateToken = require("../middleware");
const authRoutes = require("./presentation/authentication/routes");
const routes = require("./presentation/routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: "http://localhost:4000", credentials: true }));
app.use(cookieParser());
app.use(cookieEncrypter(process.env.COOKIE_SECRET_KEY));
app.use(authenticateToken);
app.use("/auth", authRoutes);
app.use("/", routes);

app.listen(PORT, () => {
  console.log("Started server at port ", PORT);
});

const express = require("express");
const helmet = require("helmet");
const app = express();
const routes = require("./presentation/routes");
const authRoutes = require("./presentation/authentication/routes");
const authenticateToken = require("./middleware/");
const PORT = 3000;

app.use(express.json());
app.use(helmet());
app.use(authenticateToken);
app.use("/auth", authRoutes);
app.use("/", routes);

app.listen(PORT, () => {
  console.log("Started server at port ", PORT);
});

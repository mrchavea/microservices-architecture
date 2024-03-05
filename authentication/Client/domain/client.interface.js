import { Client } from "./client";

const ClientInterface = {
  createClient: function (clientData) {
    throw new Error("createUser method not implemented");
  },
  getClientById: function (clientId) {
    throw new Error("getUserById method not implemented");
  }
  // Otros métodos de la interfaz de usuario
};

module.exports = ClientInterface;

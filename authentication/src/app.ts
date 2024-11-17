import { MongoDatabase } from "../database/mongoose/database copy";
import { CustomError } from "./domain";
import { AjvValidator } from "./helpers";
import { gRPC_Server } from "./presentation/gRPC/gRPC.server";
import { gRPCServices } from "./presentation/gRPC/gRPC.services";

const PORT = process.env.PORT || 50051;
const DB_HOST = process.env.DATABASE_HOST || "localhost";
const DB_PORT = process.env.DATABASE_PORT || "27017";
const DB_NAME = "authentication";

const mongodbConnection = `mongodb://${DB_HOST}:${DB_PORT}`;

const services = gRPCServices.services;

(() => {
  main();
})();

async function main() {
  try {
    //Ajv validator instance (all schemas compiled once in initialization)
    const ajvValidator = AjvValidator.getInstance();
    const gRPC_server = new gRPC_Server({
      PROTO_NAME: "authentication",
      services: services,
      PORT: Number(PORT)
    });
    //connect to database
    await MongoDatabase.connect({
      dbName: DB_NAME,
      mongoUrl: mongodbConnection
    });
    ajvValidator.start();
    gRPC_server.start();
  } catch (error) {
    console.error(error);
    throw CustomError.internalServer("Initialization error!");
  }
}

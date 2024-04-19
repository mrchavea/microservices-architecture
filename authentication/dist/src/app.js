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
Object.defineProperty(exports, "__esModule", { value: true });
const database_copy_1 = require("../database/mongoose/database copy");
const domain_1 = require("./domain");
const helpers_1 = require("./helpers");
const gRPC_server_1 = require("./presentation/gRPC/gRPC.server");
const gRPC_services_1 = require("./presentation/gRPC/gRPC.services");
const PORT = process.env.PORT || 50051;
const DB_HOST = process.env.DATABASE_HOST || "localhost";
const DB_PORT = process.env.DATABASE_PORT || "27017";
const DB_NAME = 'authentication';
const mongodbConnection = `mongodb://${DB_HOST}:${DB_PORT}`;
const services = gRPC_services_1.gRPCServices.services;
(() => {
    main();
})();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Ajv validator instance (all schemas compiled once in initialization)
            const ajvValidator = helpers_1.AjvValidator.getInstance();
            const gRPC_server = new gRPC_server_1.gRPC_Server({
                PROTO_NAME: 'authentication',
                services: services,
                PORT: Number(PORT)
            });
            //connect to database
            yield database_copy_1.MongoDatabase.connect({
                dbName: DB_NAME,
                mongoUrl: mongodbConnection,
            });
            ajvValidator.start();
            gRPC_server.start();
        }
        catch (error) {
            console.error(error);
            throw domain_1.CustomError.internalServer("Initialization error!");
        }
    });
}

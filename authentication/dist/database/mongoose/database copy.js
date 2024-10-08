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
exports.MongoDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDatabase {
    static connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dbName, mongoUrl } = options;
            try {
                yield mongoose_1.default.connect(mongoUrl, {
                    dbName: dbName,
                });
                // const DB_HOST = process.env.DATABASE_HOST || "localhost";
                // const DB_PORT = process.env.DATABASE_PORT || "27017";
                // const mongodbConnection = `mongodb://${DB_HOST}:${DB_PORT}`;
                // console.log("url", mongodbConnection)
                //     await mongoose.connect(mongodbConnection);
                console.log('Mongo connected');
                return true;
            }
            catch (error) {
                console.log('Mongo connection error');
                throw error;
            }
        });
    }
}
exports.MongoDatabase = MongoDatabase;

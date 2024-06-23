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
exports.UserDatasourceMongoose = void 0;
const models_1 = require("../../../../database/mongoose/models");
const bcrypt_1 = require("../../../helpers/bcrypt");
const domain_1 = require("../../../domain");
const user_mapper_1 = require("../../mappers/user.mapper");
class UserDatasourceMongoose {
    constructor(hashPassword = bcrypt_1.BcryptAdapter.hash, comparePassword = bcrypt_1.BcryptAdapter.compare) {
        this.hashPassword = hashPassword;
        this.comparePassword = comparePassword;
    }
    registerUser(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, client_id, password, username } = registerUserDto;
            try {
                const userExists = yield models_1.UserModel.exists({ email: email });
                if (userExists)
                    throw domain_1.CustomError.badRequest("User already exists");
                const client = yield models_1.ClientModel.findById(client_id);
                if (!client)
                    throw domain_1.CustomError.badRequest("Client does not exists");
                //Check if are users left to create
                //if(client.activeUsers)
                const user = yield models_1.UserModel.create({
                    name,
                    email,
                    client_id,
                    password: yield this.hashPassword(password),
                    username
                });
                yield user.save();
                return user_mapper_1.UserMapper.userFromObject(user);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError)
                    throw error;
                console.log("DATS ERR", error);
                throw domain_1.CustomError.badRequest('Error creating user');
            }
        });
    }
    authenticateUser(logInUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = logInUserDto;
            try {
                const user = yield models_1.UserModel.findOne({ email });
                if (!user)
                    throw domain_1.CustomError.badRequest("Email or password wrong");
                if (!(yield this.comparePassword(password, user.password)))
                    throw domain_1.CustomError.badRequest("Email or password wrong");
                return user_mapper_1.UserMapper.userFromObject(user);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError)
                    throw error;
                throw domain_1.CustomError.internalServer('Log in error');
            }
        });
    }
}
exports.UserDatasourceMongoose = UserDatasourceMongoose;

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
exports.BcryptAdapter = void 0;
const bcryptjs_1 = require("bcryptjs");
const domain_1 = require("../domain");
class BcryptAdapter {
    static hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield (0, bcryptjs_1.genSalt)();
                return yield (0, bcryptjs_1.hash)(password, salt);
            }
            catch (error) {
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    static compare(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, bcryptjs_1.compare)(password, hashedPassword);
            }
            catch (error) {
                throw domain_1.CustomError.internalServer();
            }
        });
    }
}
exports.BcryptAdapter = BcryptAdapter;

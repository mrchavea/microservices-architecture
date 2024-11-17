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
const gRPCClient_1 = require("../gRPCClient");
const CookieAdapter_1 = require("../src/presentation/adapters/CookieAdapter");
function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.time("validating");
        // Disable authentication for authentication microservice and functionalities
        if (req.path.startsWith("/auth"))
            return next();
        // const authHeader = req.headers["authorization"];
        // const token = authHeader && authHeader.split(" ")[1];
        // if (!token) {
        //   res.sendStatus(401);
        //   return;
        // }
        const sessionCookie = req.cookies["jwt_session"];
        const accessCookie = req.cookies["jwt_access"];
        console.log("COOKIES?", sessionCookie, accessCookie);
        if (!sessionCookie || !accessCookie) {
            res.sendStatus(401);
            return;
        }
        const sessionToken = CookieAdapter_1.CookieAdapter.decrypt(sessionCookie);
        const validateToken = () => new Promise((resolve, reject) => {
            gRPCClient_1.tokengRPCClient.validateToken({ accessCookie }, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
        try {
            const response = yield validateToken();
            console.log("RES", response);
            console.timeEnd("validating");
            if (((_a = response === null || response === void 0 ? void 0 : response.status) === null || _a === void 0 ? void 0 : _a.code) !== 200) {
                res.sendStatus(403);
                return;
            }
            req.user_id = response.user_id;
            next();
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });
}
exports.default = authenticateToken;

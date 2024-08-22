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
const express_1 = __importDefault(require("express"));
const gRPCClient_1 = require("../../../gRPCClient");
const cookies_1 = require("../../helpers/cookies");
const router = express_1.default.Router();
const getRefreshToken = (refresh_token) => new Promise((resolve, reject) => {
    gRPCClient_1.tokengRPCClient.refreshToken({ refresh_token }, (err, res) => {
        if (err)
            return reject(err);
        resolve(res);
    });
});
const authenticateUser = (email, password) => new Promise((resolve, reject) => {
    gRPCClient_1.usergRPCClient.authenticateUser({ email, password }, (err, res) => {
        if (err)
            return reject(err);
        resolve(res);
    });
});
const registerUser = (email, password, username, name, client_id) => new Promise((resolve, reject) => {
    gRPCClient_1.usergRPCClient.registerUser({ email, password, username, name, client_id }, (err, res) => {
        if (err)
            return reject(err);
        resolve(res);
    });
});
router.get("/refreshToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refresh_token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt_session;
    console.log("REFRESH_COOKIE", refresh_token);
    if (!refresh_token)
        return res.sendStatus(401);
    try {
        const response = yield getRefreshToken(refresh_token);
        console.log("REFRESH?", response);
        if (response.status.code === 200) {
            (0, cookies_1.addAccessToken)(res, response.access_token, response.access_token_expiration);
            return res.sendStatus(200);
        }
        return res.status(response.status.code).send({ error: response.status.error });
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.time("login");
    const { email, password } = req.body;
    try {
        const response = yield authenticateUser(email, password);
        console.timeEnd("login");
        console.log("TOKEN?", response);
        if (response.status.code === 200) {
            (0, cookies_1.addRefreshCookie)(res, response.refresh_token, response.refresh_token_expiration);
            (0, cookies_1.addAccessToken)(res, response.access_token, response.access_token_expiration);
            return res.sendStatus(200);
        }
        return res.status(response.status.code).send({ error: response.status.error });
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.time("register");
    const { email, password, username, name, client_id } = req.body;
    try {
        const response = yield registerUser(email, password, username, name, client_id);
        console.timeEnd("register");
        console.log("REGISTER?", response);
        if (response.status.code === 200) {
            const { id, name, email, username, access_token, refresh_token, access_token_expiration, refresh_token_expiration } = response;
            (0, cookies_1.addRefreshCookie)(res, refresh_token, access_token_expiration);
            (0, cookies_1.addAccessToken)(res, access_token, refresh_token_expiration);
            return res.status(200).json({
                id,
                name,
                email,
                username
            });
        }
        return res.status(response.status.code).send({ error: response.status.error });
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}));
exports.default = router;

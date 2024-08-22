"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRefreshCookie = addRefreshCookie;
exports.addAccessToken = addAccessToken;
// Función para enviar una cookie de refresco
function addRefreshCookie(response, refresh_token, refresh_token_expiration) {
    response.cookie("jwt_session", refresh_token, {
        maxAge: getMillisecondsUntilExpiration(Number(refresh_token_expiration)),
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: true, // cambiar a true en producción con HTTPS
        httpOnly: true
    });
}
// Función para enviar una cookie de acceso
function addAccessToken(response, access_token, access_token_expiration) {
    console.log("ACCESS_DATE", access_token_expiration, getMillisecondsUntilExpiration(Number(access_token_expiration)));
    response.cookie("jwt_access", access_token, {
        maxAge: getMillisecondsUntilExpiration(Number(access_token_expiration)),
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: true, // cambiar a true en producción con HTTPS
        httpOnly: false
    });
}
// Función para calcular los milisegundos hasta la fecha de expiración
function getMillisecondsUntilExpiration(timestamp) {
    if (!timestamp)
        throw new Error("Error with cookie expiration");
    return new Date(timestamp).getTime() - new Date().getTime();
}

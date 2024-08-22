import { Response } from "express";

// Define tipos para las opciones de cookies
interface CookieOptions {
  maxAge?: number;
  domain?: string;
  path?: string;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
  httpOnly?: boolean;
  plain?: boolean; // Nota: `plain` no es una opción estándar de cookies
}

// Función para enviar una cookie de refresco
function addRefreshCookie(response: Response, refresh_token: string, refresh_token_expiration: string): void {
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
function addAccessToken(response: Response, access_token: string, access_token_expiration: string): void {
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
function getMillisecondsUntilExpiration(timestamp: number): number {
  if (!timestamp) throw new Error("Error with cookie expiration");
  return new Date(timestamp).getTime() - new Date().getTime();
}

export { addRefreshCookie, addAccessToken };

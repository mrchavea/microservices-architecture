function sendRefreshCookie(response, refresh_token, refresh_token_expiration) {
  response.cookie("jwt_session", refresh_token, {
    maxAge: refresh_token_expiration
      ? calculateMiliseconds(refresh_token_expiration)
      : 36000, //1 day
    domain: "localhost",
    path: "/",
    sameSite: "strict", // o 'strict'
    secure: true, // cambiar a true en producción con HTTPS
    httpOnly: true
  });
}

function sendAccessToken(response, access_token, access_token_expiration) {
  console.log(
    "ACCESS_DATE",
    access_token_expiration,
    calculateMiliseconds(access_token_expiration)
  );
  return response.cookie("jwt_access", access_token, {
    maxAge: access_token_expiration
      ? calculateMiliseconds(access_token_expiration)
      : 36000, //5 minutes
    domain: "localhost",
    path: "/",
    sameSite: "strict", // o 'strict'
    secure: true, // cambiar a true en producción con HTTPS
    httpOnly: false,
    plain: true //enviar sin encriptar
  });
}

function calculateMiliseconds(string_date) {
  if (!string_date) throw Error("Error with cookie expiration");
  return new Date(string_date).getMilliseconds() - new Date().getMilliseconds();
}

module.exports = { sendRefreshCookie, sendAccessToken };

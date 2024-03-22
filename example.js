const jwt = require("jsonwebtoken");
const private_key =
  "7fed13b003fc41bae6c4c7944329c34a7a6f950dc8c34e01a956c60b837269522ceb8d307f8038257a3f9e1266ad38280d456d54100745dc75512f4443d66860";

const refresh_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwibWV0aG9kIjoiTE9HSU4iLCJpYXQiOjE3MTAwMTE0NzMsImV4cCI6MTcxMDAxNTA3M30.z_hNkU9d9fuPKDzvz89IvvZX3NcIkQentlwKf6tAHBo";

const token = jwt.sign({ username: "username", method: "LOGIN" }, private_key, {
  expiresIn: "1h"
});

console.log("TOKEN", token);

console.time("decoded");
let decoded = jwt.decode(refresh_token, { complete: true });
console.timeEnd("decoded");
console.log(decoded);
console.log(new Date(decoded.payload?.exp));

console.time("verify");
const tokenPayload = jwt.verify(refresh_token, private_key, (err, token) => {
  if (err) return err;
  return token;
});
console.timeEnd("verify");
console.log(tokenPayload);
console.log(new Date(tokenPayload?.iat));

const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const registry = require("./registry.json");

router.all("/:apiName/:path", async (req, res) => {
  const { user_id } = req;
  if (registry.services[req.params?.apiName]) {
    const getData = async () =>
      await axios(
        {
          method: req.method,
          url: registry.services[req.params?.apiName].url + req.params.path,
          headers: req.headers,
          data: req.body,
          params: { ...req.params, user_id: user_id }
        }
        // {
        //   params: {
        //     user_id: user_id
        //   }
        // }
      );

    const response = await getData();
    console.timeEnd("http communication");

    //console.log("AUTHENTICATED?", response);
    return res.status(200).json(response.data);
  }
  return res.sendStatus(404);
});

module.exports = router;

// if (req.params?.apiName == "1") {
//   const authorizationRequest = {
//     apiName: req.params?.apiName,
//     token: "123"
//   };

//   console.time("grpc communication");
//   const checkAuthorization = new Promise((resolve, reject) =>
//     gRPCClient.checkAuthorization(authorizationRequest, (err, res) => {
//       if (err) return reject(err);
//       resolve(res.message);
//     })
//   );

//   const isAuthorized = await checkAuthorization;
//   console.timeEnd("grpc communication");

//   console.log("AUTHENTICATED?", await checkAuthorization);
//   if (isAuthorized == "OK") res.status(200).json(isAuthorized);
// }

// if (req.params?.apiName == "2") {
//   console.log("HOL");
//   console.time("http communication");
//   const getData = async () =>
//     await axios.get("http://localhost:3001", {
//       params: {
//         token: 123,
//         apiName: "authorization"
//       }
//     });

//   const isAuthorized = await getData();
//   console.timeEnd("http communication");

//   console.log("AUTHENTICATED?", isAuthorized.data);
//   if (isAuthorized.data.message == "OK")
//     res.status(200).json(isAuthorized.data.message);
// }

const express = require("express");
const router = express.Router();

// router.all("/", async (req, res) => {
//   console.log("HOLA", req.query);
//   res.status(200).json({ message: "OK" });
// });

router.get("/hola", (req, res) => {
  console.log("EXAMPLE");
  res.status(200);
});

module.exports = router;

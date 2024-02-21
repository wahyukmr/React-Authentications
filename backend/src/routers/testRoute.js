const express = require("express");
const router = express.Router();

// Membuat rute GET untuk mengetes koneksi ke database
router.get("/test", async (req, res) => {
  try {
    res.status(200).send("It works!");
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// Mengekspor router
module.exports = router;

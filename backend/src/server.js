// Mengimpor modul-modul yang dibutuhkan
const express = require("express");
const cors = require("cors");
require("./db");
const testRouter = require("./routers/testRoute");
const authRouter = require("./routers/auth");
const app = express();
const config = require("./config");

// Menggunakan middleware cors untuk mengizinkan permintaan dari domain lain dan middleware express.json untuk mengurai data JSON dari permintaan
app.use(cors());
app.use(express.json());

// Menambahkan rute APIs
app.use("/api", testRouter);
app.use("/api/users", authRouter);

// Menjalankan server
app.listen(config.port, () => console.log(`Server running on port ${config.port}`));

// Mengimpor modul-modul yang dibutuhkan
const express = require("express");
const cors = require("cors");
require("./db");
const testRouter = require("./routers/testRoute");
const authRouter = require("./routers/auth");
const app = express(); // Membuat aplikasi express

// Menggunakan middleware cors untuk mengizinkan permintaan dari domain lain dan middleware express.json untuk mengurai data JSON dari permintaan
app.use(cors());
app.use(express.json());

// Menentukan port untuk server
const PORT = process.env.PORT || 5000;

// Menambahkan rute APIs
app.use("/api", testRouter);
app.use("/api/users", authRouter);

// Menjalankan server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

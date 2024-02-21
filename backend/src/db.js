const mongoose = require("mongoose");
const config = require("./config");

// Membuat koneksi ke database MongoDB lokal
mongoose.connect(config.dbUrl, {
  dbName: config.dbName,
});

// Mendapatkan referensi ke objek koneksi
const db = mongoose.connection;

// Menambahkan event listener untuk menangani error koneksi
db.on("error", (error) => console.error(error));

// Menambahkan event listener untuk menangani koneksi terbuka
db.once("open", () => console.log("Connected to MongoDB"));

// Menambahkan event listener untuk menangani koneksi terputus
db.on("disconnected", () => console.log("Disconnected from MongoDB"));

// Menambahkan event listener untuk menangani koneksi terhubung kembali
db.on("reconnected", () => console.log("Reconnected to MongoDB"));

module.exports = db;

# User Authentication dan Authorization

User Authentication dan Authorization hanyalah suatu proses atau teknik untuk memverifikasi identitas pengguna, yang mana pengguna akan diberi izin disaat mendaftar, masuk, dan mengakses halaman atau rute tertentu.

Saat bekerja dengan Authentication, salah satu prinsip paling mendasar adalah jangan pernah menyimpan kata sandi (password) langsung ke dalam database. Sehingga perlu untuk mengenkripsi kata sandi pengguna terlebih dahulu.

## Cara kerja:

Cara-cara atau faktor yang digunakan untuk mengautentikasi seseorang terbagi dalam tiga kategori:

1. Knowledge-Based Authentication
   Authentication yang paling umum digunakan. Memverifikasi identitas pengguna berdasarkan pada suatu hal yang pengguna ketahui (misalnya: pin atau password).

   Masalah utama dengan strategi ini:

   - terlalu bergantung pada kekuatan kata sandi.
   - bisa mudah ditebak atau dicari oleh peretas.

2. Ownership-Based Authentication
   Memverifikasi identitas pengguna berdasarkan pada suatu hal yang pengguna miliki (misalnya: akses ke alamat email, kode OTP, keamanan token atau nomor telephone yang pengguna miliki).

   Authentication ini cukup aman tetapi tetap memiliki masalahnya sendiri:

   - Beberapa mengandalkan strategi berbasis pengetahuan secara tidak langsung (yaitu, seseorang bisa menebak kata sandi email).
   - Perangkat fisik dapat dicuri.
   - Perangkat fisik bisa hilang.

3. Biological-Based Authentication
   Memverifikasi pengguna berdasarkan pada karakteristik biologis yang ada pada pengguna (misalnya: wajah, sidik jari dan pemindaian mata).

## Single-factor authentication

Sebagai tingkat autentikasi yang paling lemah, hanya satu komponen dari salah satu dari tiga kategori faktor yang digunakan untuk mengautentikasi identitas seseorang. Penggunaan hanya satu faktor tidak memberikan banyak perlindungan dari penyalahgunaan atau penyusupan. Jenis otentikasi ini tidak direkomendasikan untuk transaksi keuangan atau transaksi yang relevan secara pribadi yang membutuhkan tingkat keamanan yang lebih tinggi.

## Multi-factor authentication

Autentikasi multi-faktor melibatkan dua atau lebih faktor autentikasi (knowledge-based, ownweship-based, atau biological-based). "Two-Factor Authentication" adalah kasus khusus autentikasi multi-faktor yang melibatkan tepat dua faktor.

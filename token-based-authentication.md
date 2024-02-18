## Token-based authentication

JSON Web Token (JWT) : hanyalah sebuah string unik yang diberikan ke pengguna dari situs saat mereka masuk. JWT adalah JSON, yaitu string yang berisi informasi tentang pengguna (seperti user ID, email, data dasar pengguna, dll). Ini adalah cara aman untuk mengirimkan informasi atau data antara dua pihak, misalnya pengguna dan situs web yang dikunjungi.

Data yang dikirim dengan JWT disebut **“klaim”**, yang bisa berupa data apa saja yang berkaitan dengan pengguna. Klaim ini terdiri dari tiga bagian, yaitu:

1. **Header:** Bagian ini memberitahu jenis token dan cara menandatanganinya (Signing).
2. **Payload:** Bagian ini berisi klaim yang dikirimkan.
3. **Signature:** bagian ini adalah tanda tangan yang dibuat dengan rahasia atau kunci khusus. Digunakan untuk membuktikan keaslian data JWT.

Ketiga bagian ini disatukan dengan titik (.) dan membentuk JWT. Misalnya:

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ

JWT dianalogikan sebagai kartu akses yang diberikan oleh pemilik rumah kepada pengunjung. Kartu akses ini berisi informasi tentang pengunjung, seperti nama, alamat, dan hak akses. Kartu akses ini juga memiliki masa berlaku, yang ditentukan oleh pemilik rumah. Pengunjung harus menunjukkan kartu akses ini kepada penjaga rumah, yang akan memeriksa keaslian dan validitas kartu akses tersebut. Jika kartu akses tersebut asli dan belum kadaluarsa, penjaga rumah akan mengizinkan pengunjung masuk ke rumah dan mengakses ruangan atau fasilitas yang sesuai dengan hak akses mereka. Jika kartu akses tersebut palsu atau sudah kadaluarsa, penjaga rumah akan menolak pengunjung masuk ke rumah.

Jadi, orang yang memiliki JWT bisa masuk ke situs tanpa perlu sandi atau email, asalkan JWT tersebut masih valid. JWT memberikan hak akses kepada orang yang memilikinya, sesuai dengan data dan klaim yang ada di dalamnya

Cara kerja JWT dalam aplikasi Fullstack:

- **Langkah 1**: Pengguna masuk dengan mengirimkan username atau email dan password ke server. Server memeriksa apakah data tersebut benar. Jika benar, pengguna diizinkan untuk masuk.
- **Langkah 2**: Server membuat JWT yang berisi data pengguna. Server juga memiliki kunci rahasia yang digunakan untuk membuat tanda tangan pada JWT. Hanya server yang tahu kunci dan tanda tangan ini.
- **Langkah 3**: Server mengirimkan JWT ke pengguna.
- **Langkah 4**: Frontend menyimpan JWT di tempat yang aman, misalnya cookie, session storage, atau local storage. Tempat penyimpanan yang berbeda memiliki keamanan yang berbeda juga.
- **Langkah 5**: Ketika pengguna ingin melakukan sesuatu di aplikasi, misalnya melihat atau mengubah data pribadi, mereka harus mengirimkan JWT bersama dengan permintaan (Request) mereka. Ini karena server perlu tahu siapa pengguna dan apa yang boleh mereka lakukan. JWT berfungsi sebagai bukti identitas dan otorisasi pengguna. Pengguna dapat mengirimkan JWT dengan cara yang berbeda, misalnya dengan menempatkannya di header permintaan, atau di bagian body permintaan. Yang penting adalah server dapat menerima dan membaca JWT.
- **Langkah 6**: Server memverifikasi JWT menggunakan kunci rahasia. Server akan melihat tanda tangan dan waktu berlaku JWT. Jika cocok dan belum kadaluarsa, server akan memproses permintaan pengguna.

Beberapa detail lain yang perlu diketahui:

1. Ketika frontend mengirim JWT ke server, biasanya akan mengirim token dalam header permintaan yang terlihat seperti ini:

   ```javascript
   {
     Authorization: "Bearer yJzdiOilx.eyJilxmJM0NTY3OD.SflKxwRJS";
   }
   ```

2. JWT adalah kredensial dan perlu diperlakukan dengan hati-hati. Dimana kita tidak ingin public mengakses atau tahu tentang token ini. Sebagai developer adalah suatu keharusan untuk memastikan bahwa JWT pengguna seaman mungkin.
3. Signing vs. Encrypting Token:

   **Signing token** membuktikan bahwa data dalam JWT utuh dan belum dimodifikasi. Karena server satu-satunya yang menghasilkan token dan yang memiliki kunci rahasia.

   **Encryption** adalah cara untuk mengubah data menjadi kode rahasia yang hanya bisa dibaca oleh orang yang memiliki kunci untuk mengembalikannya ke bentuk aslinya. JWT tidak dienkripsi secara default, karenanya encryption juga bisa digunakan untuk mengamankan JWT itu sendiri. Jadi jangan menaruh informasi rahasia di JWT kecuali dienkripsi atau menggunakan HTTPS.

   Jadi, Encryption dan JWT adalah dua hal yang berbeda, tetapi saling berkaitan. Encryption adalah cara umum untuk mengamankan data, sedangkan JWT adalah cara khusus untuk mengirimkan data pengguna secara aman dan efisien antara user dan server.

4. Kelebihan JWT:

   JWT berisi semua informasi yang dibutuhkan di dalam token. Artinya, tidak mengharuskan backend untuk secara aktif melacak siapa yang masuk.

   JWT menggunakan JSON, yang lebih pendek dan aman daripada opsi lain seperti XML.

5. Kekurangan JWT:

   Masa kadaluarsa token adalah waktu yang ditentukan oleh server untuk menentukan sampai kapan token tersebut valid. Setelah masa kadaluarsa token terpenuhi, token tersebut tidak bisa digunakan lagi untuk mengakses layanan server. Pengguna harus login kembali untuk mendapatkan token baru.

   Masa kadaluarsa token berguna untuk mencegah token disalahgunakan oleh orang yang tidak berhak, misalnya hacker yang berhasil mencuri token dari pengguna. Jika token memiliki masa kadaluarsa yang singkat, hacker tidak akan punya banyak waktu untuk memanfaatkan token tersebut. Namun, masa kadaluarsa token juga memiliki kekurangan, yaitu:

   - Pengguna harus mengautentikasi ulang setiap kali token kadaluarsa. Ini bisa merepotkan pengguna, karena mereka harus mengingat dan memasukkan username dan password mereka lagi. Jika pengguna sering menggunakan aplikasi, mereka mungkin merasa terganggu dengan proses login yang berulang-ulang.
   - Tidak ada cara untuk membatalkan token sebelum masa kadaluarsa. Jika pengguna ingin logout atau mengganti password, mereka tidak bisa memastikan bahwa token lama mereka tidak bisa digunakan lagi. Token lama masih valid sampai masa kadaluarsa terpenuhi, kecuali server mengubah kunci rahasia yang digunakan untuk membuat tanda tangan token. Namun, mengubah kunci rahasia juga berarti semua token yang ada akan tidak valid, sehingga semua pengguna harus login kembali.

# Jalur Eksekusi Kode (Flow)

Dokumentasi ini menjelaskan alur eksekusi aplikasi dari titik masuk hingga interaksi ke database, termasuk perpindahan antar file dan middleware yang terlibat. Disusun berdasarkan isi kode aktual.

## Titik Masuk Aplikasi
- **src/app.js**
  - Memuat konfigurasi environment (`dotenv`).
  - Inisialisasi Express app dan port.
  - Import koneksi database: `require('./config/db')`.
  - Import router: `bookRouter`, `authRouter`.
  - Import middleware: `notFoundHandler`, `errorHandler`, `log`.
  - Mengaktifkan parser JSON: `app.use(express.json())`.
  - Mengaktifkan logger request: `app.use(log)`.
  - Route root `/` menampilkan daftar endpoint.
  - Mount router:
    - `app.use('/auth', authRouter)`
    - `app.use('/books', bookRouter)`
  - Middleware akhir:
    - `app.use(notFoundHandler)`
    - `app.use(errorHandler)`
  - Menjalankan server dengan `app.listen(PORT, ...)`.

Dari sini, alur bercabang sesuai endpoint yang dipanggil klien.

---

## Konfigurasi Database
- **src/config/db.js**
  - Memuat `dotenv`.
  - Membuat MySQL `createPool` (mysql2) memakai env: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
  - Melakukan `getConnection` untuk memastikan koneksi dan log "Database Connected".
  - Mengekspor pool dengan API promise: `module.exports = db.promise()`.

File ini digunakan oleh:
- `src/app.js` (untuk memastikan koneksi terinisialisasi saat aplikasi start)
- `src/models/bookModel.js` (untuk eksekusi query buku)
- `src/controllers/authController.js` (untuk query user saat register/login)

---

## Routing Autentikasi
- **src/routes/authRouter.js**
  - Endpoint publik (tanpa middleware auth):
    - `POST /auth/register` → `authController.register`
    - `POST /auth/login` → `authController.login`

### Controller Autentikasi
- **src/controllers/authController.js**
  - Import: `jsonwebtoken`, `bcrypt`, dan `db` dari `src/config/db.js`.
  - `generateToken(userId, email)`: membuat JWT 24 jam memakai `process.env.JWT_SECRET`.
  - `register(req, res)`:
    - Validasi input `email`, `password`.
    - Cek email existing: `SELECT id FROM users WHERE email = ?` (ke DB).
    - Hash password (`bcrypt.hash`).
    - Insert user: `INSERT INTO users (email, password) VALUES (?, ?)` (ke DB).
    - Generate token dan kirim response 201 dengan `user` dan `token`.
  - `login(req, res)`:
    - Validasi input.
    - Ambil user: `SELECT * FROM users WHERE email = ?` (ke DB).
    - Verifikasi password (`bcrypt.compare`).
    - Generate token dan kirim response sukses dengan `user` dan `token`.

Alur baliknya:
- Controller ini langsung berinteraksi dengan DB (tanpa model khusus `users`).
- Kembali ke router `authRouter` untuk mengirim response ke klien.

---

## Routing Buku
- **src/routes/bookRouter.js**
  - Setiap route dilindungi oleh middleware `authenticateToken` (JWT):
    - `GET /books` → `authenticateToken` → `bookController.getAllBooks`
    - `GET /books/:id` → `authenticateToken` → `bookController.getBookById`
    - `POST /books` → `authenticateToken` → `validateBook` → `bookController.createBook`
    - `PUT /books/:id` → `authenticateToken` → `validateBook` → `bookController.updateBook`
    - `DELETE /books/:id` → `authenticateToken` → `bookController.deleteBook`

### Middleware Terkait Buku dan Auth
- **src/middleware/authvalidate.js** (`authenticateToken`)
  - Membaca header `Authorization: Bearer <token>`.
  - Verifikasi JWT dengan `process.env.JWT_SECRET`.
  - Jika valid, set `req.user` lalu `next()`.
  - Jika invalid/expired, `403`.
- **src/middleware/bookValidate.js** (`validateBook`)
  - Validasi body untuk field wajib: `title`, `author`, `year`, `price`, `stock`.
  - Jika invalid, `400`. Jika valid, `next()`.
- **src/middleware/log.js** (`logger`)
  - Log sederhana `METHOD URL` untuk setiap request.
- **src/middleware/errorHandler.js**
  - `notFoundHandler`: menangani route tak ditemukan (404) di akhir.
  - `errorHandler`: menangani error server (500) atau custom status melalui `err.status`.

### Controller Buku
- **src/controllers/bookController.js**
  - Import `bookModel` dari `src/models/bookModel.js`.
  - `getAllBooks`: panggil `bookModel.getAllBooks()` → response JSON data list buku.
  - `getBookById`: panggil `bookModel.getBookById(id)` → 404 jika tidak ada, atau kirim data buku.
  - `createBook`: ambil body terverifikasi → `bookModel.createBook({...})` → kirim `201` dengan `id` baru.
  - `updateBook`: ambil `id` param + body → `bookModel.updateBook(id, {...})` → jika `affectedRows === 0` kirim `404`, else sukses.
  - `deleteBook`: `bookModel.deleteBook(id)` → jika `affectedRows === 0` `404`, else sukses.
  - Semua method menangkap error dan mengembalikan `500` dengan pesan error.

### Model Buku
- **src/models/bookModel.js**
  - Import `db` dari `src/config/db.js` (pool promise) → eksekusi query ke tabel `books`.
  - `getAllBooks`: `SELECT * FROM books` → return rows.
  - `getBookById(id)`: `SELECT * FROM books WHERE id = ?` → return row tunggal atau `undefined`.
  - `createBook({title, author, year, price, stock})`:
    - `INSERT INTO books (...) VALUES (?, ?, ?, ?, ?)` → return `insertId`.
  - `updateBook(id, {...})`:
    - `UPDATE books SET ... WHERE id = ?` → return `affectedRows`.
  - `deleteBook(id)`:
    - `DELETE FROM books WHERE id = ?` → return `affectedRows`.
  - Setiap fungsi membungkus error dengan pesan yang lebih jelas.

Alur baliknya:
- Model mengembalikan hasil ke `bookController`.
- Controller merangkai response dan mengembalikan ke `bookRouter`.
- Router mengembalikan ke Express untuk dikirim ke klien.

---

## Contoh Alur Lengkap per Endpoint

- **GET / (root)**
  1. `app.js` menerima GET `/`.
  2. Mengirim JSON yang berisi daftar endpoint.

- **POST /auth/register**
  1. `app.js` → `authRouter`.
  2. `authRouter` → `authController.register`.
  3. `authController` → query ke `db` (cek email, insert user) → generate token.
  4. Kembali ke `authRouter` → response 201 ke klien.

- **POST /auth/login**
  1. `app.js` → `authRouter`.
  2. `authRouter` → `authController.login`.
  3. `authController` → query ke `db` (select user) → verifikasi password → generate token.
  4. Kembali ke `authRouter` → response sukses ke klien.

- **GET /books**
  1. `app.js` → `bookRouter`.
  2. `bookRouter` → `authenticateToken` (verifikasi JWT) → lanjut jika valid.
  3. `bookRouter` → `bookController.getAllBooks`.
  4. `bookController` → `bookModel.getAllBooks` → `db.query('SELECT * FROM books')`.
  5. Hasil kembali berurutan: `db` → `bookModel` → `bookController` → `bookRouter` → klien.

- **POST /books**
  1. `app.js` → `bookRouter`.
  2. `bookRouter` → `authenticateToken` → `validateBook` (cek body).
  3. `bookRouter` → `bookController.createBook`.
  4. `bookController` → `bookModel.createBook` → `db.query('INSERT ...')`.
  5. Hasil kembali: `db` → `bookModel` → `bookController` (201) → `bookRouter` → klien.

- **PUT /books/:id** dan **DELETE /books/:id** mengikuti pola yang sama dengan validasi dan akses model → DB → kembali ke klien.

---

## Error & Logging Flow
- Logging request terjadi awal di `app.use(log)` untuk semua request.
- Jika route tidak ditemukan, `notFoundHandler` di-invoke setelah semua router.
- Jika ada error dilempar (misal dari model/controller), `errorHandler` menangkap dan merespon sesuai status/pesan.

---

## Ringkas Alur Global
1. Klien mengirim request → `app.js` menerima.
2. `log` mencatat request.
3. Request diarahkan ke router sesuai prefix (`/auth` atau `/books`).
4. Pada `/books`, `authenticateToken` dan (untuk write) `validateBook` berjalan.
5. Controller menjalankan logika bisnis dan memanggil model/DB.
6. Model berinteraksi dengan DB (pool promise `mysql2`).
7. Hasil mengalir balik: DB → Model → Controller → Router → Express → Klien.
8. Jika tidak ada route yg cocok → `notFoundHandler`. Jika ada error → `errorHandler`.

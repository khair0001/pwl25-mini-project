# 📚 API Routes Documentation

## Base URL
```
http://localhost:3000
```

---

## 🏠 Home Endpoint

### Get API Information
```http
GET /
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome to Books API",
  "endpoints": {
    "register": "POST /auth/register",
    "login": "POST /auth/login",
    "getAllBooks": "GET /books",
    "getBookById": "GET /books/:id",
    "createBook": "POST /books",
    "updateBook": "PUT /books/:id",
    "deleteBook": "DELETE /books/:id"
  }
}
```

---

## 🔐 Authentication Routes

### 1. Register User
Mendaftarkan user baru dengan email dan password.

```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201 Created):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

- **400 Bad Request** - Email sudah terdaftar
```json
{
  "error": "Email already registered"
}
```

- **500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

---

### 2. Login User
Login dengan email dan password yang sudah terdaftar.

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

- **401 Unauthorized** - Email atau password salah
```json
{
  "error": "Invalid credentials"
}
```

- **500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

---

## 📖 Books Routes

### 1. Get All Books
Mengambil semua data buku.

```http
GET /books
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "year": 2008,
      "price": 350000,
      "stock": 10,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Book by ID
Mengambil detail buku berdasarkan ID.

```http
GET /books/:id
```

**URL Parameters:**
- `id` (integer) - ID buku

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008,
    "price": 350000,
    "stock": 10,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response:**
- **404 Not Found**
```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### 3. Create New Book
Menambahkan buku baru ke database.

```http
POST /books
```

**Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "price": 350000,
  "stock": 10
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008,
    "price": 350000,
    "stock": 10
  }
}
```

**Error Response:**
- **400 Bad Request** - Data tidak lengkap
```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

### 4. Update Book
Mengupdate data buku berdasarkan ID.

```http
PUT /books/:id
```

**URL Parameters:**
- `id` (integer) - ID buku

**Request Body:**
```json
{
  "title": "Clean Code - Updated",
  "author": "Robert C. Martin",
  "year": 2008,
  "price": 400000,
  "stock": 15
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "Clean Code - Updated",
    "author": "Robert C. Martin",
    "year": 2008,
    "price": 400000,
    "stock": 15
  }
}
```

**Error Response:**
- **404 Not Found**
```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### 5. Delete Book
Menghapus buku berdasarkan ID.

```http
DELETE /books/:id
```

**URL Parameters:**
- `id` (integer) - ID buku

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

**Error Response:**
- **404 Not Found**
```json
{
  "success": false,
  "message": "Book not found"
}
```

---

## 🔒 Protected Routes (Menggunakan JWT Token)

Untuk mengakses routes yang memerlukan autentikasi, tambahkan header:

```http
Authorization: Bearer <your_jwt_token>
```

**Contoh menggunakan cURL:**
```bash
curl -X GET http://localhost:3000/books \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Contoh menggunakan JavaScript (Fetch API):**
```javascript
fetch('http://localhost:3000/books', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
})
```

---

## 🧪 Testing dengan Postman/Thunder Client

### 1. Register User
- Method: `POST`
- URL: `http://localhost:3000/auth/register`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

### 2. Login User
- Method: `POST`
- URL: `http://localhost:3000/auth/login`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

### 3. Get All Books
- Method: `GET`
- URL: `http://localhost:3000/books`
- Headers:
  - `Authorization`: `Bearer <token_dari_login>`

### 4. Create Book
- Method: `POST`
- URL: `http://localhost:3000/books`
- Headers:
  - `Authorization`: `Bearer <token_dari_login>`
- Body (JSON):
```json
{
  "title": "JavaScript: The Good Parts",
  "author": "Douglas Crockford",
  "year": 2008,
  "price": 250000,
  "stock": 20
}
```

---

## ⚙️ Environment Variables

Pastikan file `.env` sudah dikonfigurasi:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=books_db
JWT_SECRET=your_secret_key_here
```

---

## 🚀 Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Setup database (jalankan SQL di `database-setup.sql`):
```bash
mysql -u root -p < database-setup.sql
```

3. Jalankan server:
```bash
npm run dev
```

4. Server akan berjalan di `http://localhost:3000`

---

## 📝 Database Schema

### Table: users
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### Table: books
```sql
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🎯 Status Codes

- `200 OK` - Request berhasil
- `201 Created` - Resource berhasil dibuat
- `400 Bad Request` - Request tidak valid
- `401 Unauthorized` - Autentikasi gagal
- `404 Not Found` - Resource tidak ditemukan
- `409 Conflict` - Konflik data (misal: email sudah terdaftar)
- `500 Internal Server Error` - Error di server

---

## 💡 Tips

1. **Simpan token** setelah login untuk digunakan di request selanjutnya
2. **Token berlaku 24 jam** - setelah itu harus login ulang
3. Gunakan **HTTPS** di production untuk keamanan
4. Jangan commit file `.env` ke repository

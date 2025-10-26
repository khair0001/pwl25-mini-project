# Books API - Express.js CRUD Application

RESTful API untuk manajemen data buku menggunakan Node.js, Express.js, dan MySQL dengan arsitektur Controller-Model-Router.

## 📋 Deskripsi

Aplikasi ini adalah REST API untuk mengelola data buku dengan operasi CRUD (Create, Read, Update, Delete). Dibangun menggunakan arsitektur MVC (Model-View-Controller) tanpa View karena ini adalah API.

## 🏗️ Arsitektur

```
project_baru/
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Dependencies dan scripts
├── README.md              # Dokumentasi
└── src/
    ├── app.js             # Entry point aplikasi
    ├── config/
    │   └── db.js          # Database configuration
    ├── controllers/
    │   └── bookController.js    # Business logic
    ├── models/
    │   └── bookModel.js         # Database queries
    ├── routes/
    │   └── bookRouter.js        # Route definitions
    └── middleware/
        ├── bookValidate.js      # Validation middleware
        ├── errorHandler.js      # Error handling
        └── log.js               # Logger middleware
```

## 🚀 Teknologi

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2** - Database driver dengan Promise support
- **dotenv** - Environment variables management
- **Nodemon** - Development auto-reload

## 📦 Entity Structure

### Books
| Field  | Type         | Description              |
|--------|--------------|--------------------------|
| id     | INT          | Primary key, auto increment |
| title  | VARCHAR(255) | Judul buku (required)    |
| author | VARCHAR(255) | Penulis buku (required)  |
| year   | INT          | Tahun terbit (required)  |
| price  | DECIMAL(10,2)| Harga buku (required)    |
| stock  | INT          | Stok buku (required)     |

## 🛠️ Setup & Installation

### 1. Prerequisites
- Node.js (v14 atau lebih tinggi)
- MySQL Server
- npm atau yarn

### 2. Clone atau Copy Project
```bash
cd project_baru
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Database

Buat database dan tabel di MySQL:

```sql
-- Buat database
CREATE DATABASE books;

-- Gunakan database
USE books;

-- Buat tabel books
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
);

-- Insert sample data (opsional)
INSERT INTO books (title, author, year, price, stock) VALUES
('Clean Code', 'Robert C. Martin', 2008, 350000, 15),
('The Pragmatic Programmer', 'Andrew Hunt', 1999, 425000, 10),
('Design Patterns', 'Gang of Four', 1994, 500000, 8),
('JavaScript: The Good Parts', 'Douglas Crockford', 2008, 275000, 20),
('You Don''t Know JS', 'Kyle Simpson', 2014, 300000, 12);
```

### 5. Configure Environment Variables

File `.env` sudah ada, sesuaikan jika perlu:

```env
PORT = 4000
DB_HOST = localhost
DB_USER = root
DB_PASSWORD = 
DB_NAME = books
```

### 6. Run Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server akan berjalan di: `http://localhost:4000`

## 📡 API Endpoints

### Base URL
```
http://localhost:4000
```

### 1. Get All Books
Mengambil semua data buku.

**Request:**
```http
GET /books
```

**Response Success (200):**
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
      "stock": 15
    },
    {
      "id": 2,
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt",
      "year": 1999,
      "price": 425000,
      "stock": 10
    }
  ]
}
```

### 2. Get Book by ID
Mengambil data buku berdasarkan ID.

**Request:**
```http
GET /books/:id
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008,
    "price": 350000,
    "stock": 15
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

### 3. Create New Book
Membuat data buku baru.

**Request:**
```http
POST /books
Content-Type: application/json

{
  "title": "Eloquent JavaScript",
  "author": "Marijn Haverbeke",
  "year": 2018,
  "price": 320000,
  "stock": 25
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 6,
    "title": "Eloquent JavaScript",
    "author": "Marijn Haverbeke",
    "year": 2018,
    "price": 320000,
    "stock": 25
  }
}
```

**Response Error - Validation (400):**
```json
{
  "message": "Title, author, year, price, and stock are required"
}
```

### 4. Update Book
Mengupdate data buku berdasarkan ID.

**Request:**
```http
PUT /books/:id
Content-Type: application/json

{
  "title": "Clean Code - Updated",
  "author": "Robert C. Martin",
  "year": 2008,
  "price": 375000,
  "stock": 20
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "Clean Code - Updated",
    "author": "Robert C. Martin",
    "year": 2008,
    "price": 375000,
    "stock": 20
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

### 5. Delete Book
Menghapus data buku berdasarkan ID.

**Request:**
```http
DELETE /books/:id
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

## 🧪 Testing dengan cURL

### Get All Books
```bash
curl http://localhost:4000/books
```

### Get Book by ID
```bash
curl http://localhost:4000/books/1
```

### Create New Book
```bash
curl -X POST http://localhost:4000/books \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Book\",\"author\":\"Test Author\",\"year\":2024,\"price\":100000,\"stock\":5}"
```

### Update Book
```bash
curl -X PUT http://localhost:4000/books/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Updated Book\",\"author\":\"Updated Author\",\"year\":2024,\"price\":150000,\"stock\":10}"
```

### Delete Book
```bash
curl -X DELETE http://localhost:4000/books/1
```

## 🔧 Testing dengan Postman/Thunder Client

1. Import collection atau buat request manual
2. Set base URL: `http://localhost:4000`
3. Untuk POST dan PUT, set header: `Content-Type: application/json`
4. Test semua endpoints sesuai dokumentasi di atas

## 🛡️ Middleware

### 1. Logger Middleware (`log.js`)
Mencatat setiap request yang masuk (method dan URL).

### 2. Validation Middleware (`bookValidate.js`)
Memvalidasi input untuk operasi POST dan PUT:
- Request body tidak boleh kosong
- Field required: title, author, year, price, stock

### 3. Error Handler Middleware (`errorHandler.js`)
- **notFoundHandler**: Menangani route yang tidak ditemukan (404)
- **errorHandler**: Menangani error umum (500)

## 📝 Response Format

Semua response menggunakan format JSON yang konsisten:

**Success Response:**
```json
{
  "success": true,
  "message": "...",
  "data": {...}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "...",
  "error": "..."
}
```

## 🔐 Error Handling

- **400** - Bad Request (validation error)
- **404** - Not Found (resource tidak ditemukan)
- **500** - Internal Server Error (database atau server error)

## 📚 Best Practices

1. **Separation of Concerns**: Model, Controller, dan Router terpisah
2. **Error Handling**: Setiap layer memiliki error handling
3. **Validation**: Input divalidasi di middleware sebelum masuk controller
4. **Security**: Menggunakan prepared statements untuk mencegah SQL injection
5. **Environment Variables**: Konfigurasi sensitif disimpan di .env
6. **Connection Pooling**: Menggunakan connection pool untuk performa database

## 🤝 Contributing

Jika ingin berkontribusi:
1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

ISC License

## 👤 Author

Dibuat sebagai project pembelajaran Express.js dengan arsitektur MVC.

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di repository atau hubungi maintainer.

---

**Happy Coding! 🚀**

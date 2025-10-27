### Nama : Ahmad Muslihul Khair
### NIM : F1D02310001
---
## Mini Project UTS

### Tools yang digunakan
- node.js
- Mysql2
- express
- dotenv
- bcrypt, jsonwebtoken
- Nodemon

### Deskripsi Project
Project ini merupakan implementasi REST API untuk CRUD, middleware, dan env menggunakan express dan untuk databasenya menggunakan mysql.  Kasus yang saya ambil adalah BooksAPI yang menampilkan 


### Fitur dalam program

### Struktur Folder Project
|── package.json
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bookController.js
│   ├── models/
│   │   └── bookModel.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   └── bookRouter.js
│   └── middleware/
│       ├── authvalidate.js
│       ├── bookValidate.js
│       ├── errorHandler.js
│       └── log.js
└── README.md

### Cara Instalasi
1. Clone repository
``` bash
git clone https://github.com/khair0001/pwl25-mini-project
```
2. install npm yang di perlukan di folder project
``` bash
npm install
```
3. buat database yang berisi table users dan books
``` sql
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```
3. buat file .env dengan isi
```
PORT = 
DB_HOST = 
DB_USER = 
DB_PASSWORD =
DB_NAME = namadatabsae
  

JWT_SECRET=
```
### Cara Run code
``` bash
npm run dev
```

### Hasil Program
1. GET /books tanpa auth
2. POST /auth/register
3. POST /auth/login
4. GET /books dengan auth
5. POST /books
6. DELETE /books/:id
7. PUT /books/:id
8. Middleware logger
9. Middleware validate
10. Middleware error handler
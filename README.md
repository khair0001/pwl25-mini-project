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

### Struktur Folder Project
```
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
```

### Fitur dalam program
- register
- login
- get data semua buku
- get data buku berdasarkan id
- create buku
- update buku
- delete buku


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
1. GET /books tanpa auth akan error karena auth di bagian middleware belum terpenuhi
<img width="1378" height="1088" alt="Screenshot 2025-10-27 072655" src="https://github.com/user-attachments/assets/fabc10d0-c3ce-471b-8f19-a24d09250e13" />

2. POST /auth/register untuk mendaftarkan email ke database dan mendapatkan token
<img width="1345" height="1085" alt="Screenshot 2025-10-27 072758" src="https://github.com/user-attachments/assets/7e7b6e0b-e340-48ca-a255-54566915bd91" />

3. POST /auth/login untuk mendapatkan token 
<img width="1355" height="1044" alt="Screenshot 2025-10-27 093628" src="https://github.com/user-attachments/assets/4be4b7dd-4a8f-4062-8d7e-570b18b077e2" />

4. GET /books dengan auth untuk menampilkan semua buku yang ada di dalam table books
<img width="1345" height="1085" alt="Screenshot 2025-10-27 072841" src="https://github.com/user-attachments/assets/c450ef93-5f08-4fdf-ae49-d0f493793070" />

5. POST /books untuk menambahkan buku baru
<img width="1347" height="1090" alt="Screenshot 2025-10-27 073016" src="https://github.com/user-attachments/assets/a24d374f-15fd-4cdc-b394-31eb098e6697" />

6. DELETE /books/:id untuk menghapus buku berdasarkan id
<img width="1348" height="1088" alt="Screenshot 2025-10-27 073042" src="https://github.com/user-attachments/assets/6675d1fd-993b-4d03-8922-647806b7a589" />

7. PUT /books/:id untuk update data buku
<img width="1366" height="1007" alt="Screenshot 2025-10-27 093840" src="https://github.com/user-attachments/assets/315586c4-2366-4209-9fa4-5a7635c37bd4" />

8. Middleware logger untuk menampilkan semua request yang berjalan di server
<img width="525" height="220" alt="Screenshot 2025-10-27 093902" src="https://github.com/user-attachments/assets/f02f6411-f879-4fcc-9ad7-1b5b95c04922" />

9. Middleware bookvalidate
<img width="1378" height="737" alt="Screenshot 2025-10-27 094023" src="https://github.com/user-attachments/assets/dce38f58-abfd-4f98-b696-fa933d0218f7" />

10. middleware authvalidate 
<img width="1361" height="201" alt="image" src="https://github.com/user-attachments/assets/9a4512a2-42f0-4097-bfbc-a08bcc7ccae7" />

11. Middleware error handler
<img width="1359" height="696" alt="Screenshot 2025-10-27 094124" src="https://github.com/user-attachments/assets/2f94b56b-ac0a-4a83-825d-ebaf45ba48a2" />

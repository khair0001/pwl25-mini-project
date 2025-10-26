require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const db = require('./config/db');
const bookRouter = require('./routes/bookRouter');
const authRouter = require('./routes/authRouter');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const log = require('./middleware/log');

app.use(express.json());

app.use(log);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Books API',
        endpoints: {
            // Auth endpoints
            register: 'POST /auth/register',
            login: 'POST /auth/login',
            // Books endpoints
            getAllBooks: 'GET /books',
            getBookById: 'GET /books/:id',
            createBook: 'POST /books',
            updateBook: 'PUT /books/:id',
            deleteBook: 'DELETE /books/:id'
        }
    });
});

app.use('/auth', authRouter);
app.use('/books', bookRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const db = require('../config/db');

const getAllBooks = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM books');
        return rows;
    } catch (error) {
        console.error('Error in getAllBooks model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const getBookById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error in getBookById model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const createBook = async (bookData) => {
    try {
        const { title, author, year, price, stock } = bookData;
        const [result] = await db.query(
            'INSERT INTO books (title, author, year, price, stock) VALUES (?, ?, ?, ?, ?)',
            [title, author, year, price, stock]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error in createBook model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const updateBook = async (id, bookData) => {
    try {
        const { title, author, year, price, stock } = bookData;
        const [result] = await db.query(
            'UPDATE books SET title = ?, author = ?, year = ?, price = ?, stock = ? WHERE id = ?',
            [title, author, year, price, stock, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error in updateBook model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const deleteBook = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error in deleteBook model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};

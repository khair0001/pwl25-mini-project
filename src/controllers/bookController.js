const bookModel = require('../models/bookModel');

const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.getAllBooks();
        res.json({
            success: true,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error',
            error: error.message
        });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookModel.getBookById(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'buku tidak ditemukan'
            });
        }

        res.json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error',
            error: error.message
        });
    }
};

const createBook = async (req, res) => {
    try {
        const { title, author, year, price, stock } = req.body;

        const bookId = await bookModel.createBook({ title, author, year, price, stock });

        res.status(201).json({
            success: true,
            message: 'buku berhasil ditambahkan',
            data: { id: bookId, title, author, year, price, stock }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error',
            error: error.message
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, year, price, stock } = req.body;

        const affectedRows = await bookModel.updateBook(id, { title, author, year, price, stock });

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'buku tidak ditemukan'
            });
        }

        res.json({
            success: true,
            message: 'buku berhasil diupdate',
            data: { id, title, author, year, price, stock }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating book',
            error: error.message
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await bookModel.deleteBook(id);

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'buku tidak ditemukan'
            });
        }

        res.json({
            success: true,
            message: 'buku berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'errorrrrr',
            error: error.message
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};

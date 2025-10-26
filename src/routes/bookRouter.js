const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateBook = require('../middleware/bookValidate');
const authenticateToken = require('../middleware/authvalidate');

// GET all books
router.get('/', authenticateToken, bookController.getAllBooks);

// GET book by ID
router.get('/:id', authenticateToken, bookController.getBookById);

// POST create new book (with validation)
router.post('/', authenticateToken, validateBook, bookController.createBook);

// PUT update book by ID (with validation)
router.put('/:id', authenticateToken, validateBook, bookController.updateBook);

// DELETE book by ID
router.delete('/:id', authenticateToken, bookController.deleteBook);

module.exports = router;

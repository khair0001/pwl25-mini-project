const validateBook = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: 'Request body is missing'
        });
    }
    const { title, author, year, price, stock } = req.body;
    if (!title || !author || !year || !price || stock === undefined) {
        return res.status(400).json({
            message: 'Title, author, year, price, and stock harus diisi'
        });
    }
    next();
}

module.exports = validateBook;

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "token tidak ditemukan"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "token tidak valid"
            });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
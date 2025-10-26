const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email dan password harus diisi"
            });
        }

        const [existingUsers] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: "email sudah terdaftar"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashedPassword]
        );

        const token = generateToken(result.insertId, email);

        res.status(201).json({
            success: true,
            message: "register berhasil",
            user: {
                id: result.insertId,
                email: email
            },
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "error",
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email dan password harus diisi"
            });
        }

        const [results] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        const user = results[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user.id, user.email);

        res.json({
            success: true,
            message: "Login berhasil",
            user: {
                id: user.id,
                email: user.email
            },
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "error",
            error: error.message
        });
    }
};
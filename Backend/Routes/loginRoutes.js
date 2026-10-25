const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = require("../Module/login");
require("dotenv").config();

// POST: Login API
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await login.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        let isMatch = false;

        if (user.password.startsWith("$2")) {
            isMatch = await bcrypt.compare(
                password,
                user.password
            );
        } else {
            isMatch = user.password === password;

            if (isMatch) {
                user.password = await bcrypt.hash(password, 10);
                await user.save();
            }
        }

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing from .env");
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;

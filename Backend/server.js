const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Login");

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("DB not connected", error);
});

db.once("open", () => {
    console.log("Database connected successfully");
});

// Login route
const loginRoutes = require("./Routes/loginRoutes");
app.use("/api", loginRoutes);


app.listen(5000, () => {
    console.log("Server started on port 5000");
});
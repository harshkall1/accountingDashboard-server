require("dotenv").config();
const express = require('express');
const connectDb = require('./utils/db');
const cors = require('cors');

const app = express();

// Enable CORS for all routes and origins
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allow all HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow credentials (e.g., cookies)
}));

// Parse JSON request bodies
app.use(express.json());

// Test route
app.get("/api", (req, res) => {
    res.status(200).send("Server is running");
});

// User routes
app.use('/user', require('./routers/userRouter'));

// Start the server
const PORT = process.env.PORT || 3000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running on PORT : ${PORT}`);
    });
});
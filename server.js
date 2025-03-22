require("dotenv").config();
const express = require('express');
const connectDb = require('./utils/db');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: '*', // Allow only requests from http://localhost:5173
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allow all HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Handle preflight requests
app.options('*', cors());

// Parse JSON request bodies
app.use(express.json());

// Log request headers for debugging
app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
});

// Test route
app.get("/api", (req, res) => {
    res.status(200).send("Server is running");
});

// User routes
app.use('/user', require('./routers/userRouter'));
app.use('/transection', require('./routers/transectionRouter'));

// Start the server
const PORT = process.env.PORT || 3000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running on PORT : ${PORT}`);
    });
});
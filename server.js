require("dotenv").config();
const express = require('express');
const connectDb = require('./utils/db');
const cors = require('cors');

const app = express();



const allowedOrigins = [
    "https://chasebank-page.vercel.app",
   
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the request
        } else {
          callback(new Error("Not allowed by CORS")); // Block the request
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: "Content-Type,Authorization",
      credentials: true
    })
  );
  



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
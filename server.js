require("dotenv").config();
const express = require('express');
const connectDb = require('./utils/db');
const cors = require('cors');



const app = express();

app.use(express.json());


app.get("/api", (req, res) => {
    res.status(200).send("Server is running");
});
app.use(cors());

app.use('/user', require('./routers/userRouter'))


const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running on PORT : ${PORT}`);
    });
});


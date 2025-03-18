const mongoose = require('mongoose')

const url = "mongodb+srv://arikkhill:anu..9678@cluster0.bkkqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb = async () => {
    try{
        await mongoose.connect(url)
        console.log("Databas Connected")
    }catch(err){
        console.log("Database Connection Failed");
        console.log(err)
        process.exit(0)
    }
}

module.exports = connectDb
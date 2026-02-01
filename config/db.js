const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MongoUrlLocal) // Offline connection string
        const conn = await mongoose.connect(process.env.MongoUrlOnline) // Online connection string
        console.log(`mongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
};
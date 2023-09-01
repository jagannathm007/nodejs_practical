let mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/demo_db"
mongoose.connect(DB_URL);

mongoose.connection.on('open', () => {
    console.log("Database Connected");
}).on('error', (error) => console.log(`Connection failed: ${error}`));
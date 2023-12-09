const mongoose = require("mongoose");



const dbConnection = async () => {
    try {

        const connect = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Datbase is connected " + connect.connection.name);

    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}



module.exports = dbConnection;
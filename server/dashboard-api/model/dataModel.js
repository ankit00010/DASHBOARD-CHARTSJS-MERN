const mongoose = require("mongoose");


const dataSchema = mongoose.Schema({


    Intensity: String,
    Likelihood: String,
    Relevance: String,
    Year: String,
    Country: String,
    Topics: String,
    Region: String,
    City: String,





});




const Data = mongoose.model("Data", dataSchema, "assignment_data");

module.exports = Data;
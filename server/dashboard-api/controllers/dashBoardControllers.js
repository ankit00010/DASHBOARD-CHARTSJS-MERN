
const Data = require("../model/dataModel");
const asyncHandler = require("express-async-handler");



const getData = asyncHandler(async (req, res) => {


    const data = await Data.find({}).limit(50);
    if (data.length === 0) {
        res.status(404);
        throw new Error("Data not found");
    }
    res.status(200).json(data);


}
);


const addData = asyncHandler(async (req, res) => {

    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
        res.status(400);
        throw new Error("Please add data");
    }

    // If the body is not empty, proceed to create a new instance of Data
    const newData = new Data(req.body);
    // const savedData = await newData.save();
    res.status(201).json(newData);



});


module.exports = { getData, addData };
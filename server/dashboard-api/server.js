const express = require("express");
const dotenv = require("dotenv").config();
const dbConnection = require("./cofig/dbConnection");
const cors = require('cors');
const dashBoardRoutes = require("./routes/dashBoardRoutes");
const app = express();
const errorHandler = require("./middleware/errorHandler");
dbConnection();

app.use(cors());
app.use(express.json());
const port = 5000;


app.use('/dashboard', dashBoardRoutes);

app.use(errorHandler);
app.listen(port, () => {
    console.log("Server is listening to port : " + port);
})
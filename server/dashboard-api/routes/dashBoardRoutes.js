const express = require("express");
const { getData, addData } = require("../controllers/dashBoardControllers");
const router = express.Router();

const Data = require("../model/dataModel");

router.get('/data', getData);
router.post('/data', addData);

module.exports = router;



const express = require("express");
const bodyParser = require('body-parser');

const app = express();

let date_1 = new Date(2019, 0, 2, 12, 31, 10);
let date_2 = new Date(2019, 0, 2, 14, 21, 9);
console.log(date_2 - date_1);

const parkTimeInfos = [
	{id:1, arrTime:date_1, depTime:date_2},
	{id:2, arrTime:20, depTime:30},
	{id:3, arrTime:10, depTime:70},
	{id:4, arrTime:5, depTime:25},
	{id:5, arrTime:30, depTime:45}
];

// request param X, response O
// response all data
app.get("/api/park/datas", (req, res) => {
	res.json({ok:true, parkTimeInfos:parkTimeInfos});
});

// Query parameter, request param O, response O
// response requested specific data
app.get("/api/park/data/:carId", (req, res) => {
	const carId = req.params.carId
	const parkTimeInfo = parkTimeInfos.filter(data => data.id == carId);
	res.json({ok:false, parkTimeInfos:parkTimeInfo});
});

// POST, request body, response O
// same as above one
app.post("/api/park/data", (req, res) => {
	const carId = req.body.id
	const parkTimeInfo = parkTimeInfos.filter(data => data.id == carId);
	res.json({ok:true, parkTimeInfos:parkTimeInfo});
});

var t = 0;
function isArrTime(e){
	if(e.id == t){
		return true;
	}
}

app.post("/api/park/fee", (req, res) => {
	const carId = req.body.id;
	t = req.body.id;
	const parkData = parkTimeInfos.filter(data => data.id == carId);
	const test = parkTimeInfos.find(isArrTime);
	console.log(test.arrTime, test.depTime);

	res.json({ok:true, parkTimeinfos:parkData['arrTime']});
});


module.exports = app;

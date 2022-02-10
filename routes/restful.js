const express = require("express");
const bodyParser = require('body-parser');

const app = express();

const arrTime1 = new Date(2022, 0, 29, 7, 20, 11); // 2022년 1월 29일 7시 20분 11초
const arrTime2 = new Date(2022, 0, 30, 8, 30, 4); // 2022년 1월 30일 8시 30분 4초
const arrTime3 = new Date(2022, 1, 1, 12, 12, 45); // 2022년 2월 1일 12시 12분 45초
const arrTime4 = new Date(2022, 1, 6, 13, 33, 29); // 2022년 2월 6일 13시 33분 29초
const arrTime5 = new Date(2022, 1, 7, 11, 20, 55); // 2022년 2월 7일 11시 20분 55초

const depTime1 = new Date(2022, 0, 29, 18, 3, 4); // 2022년 1월 29일 18시 03분 4초
const depTime2 = new Date(2022, 0, 30, 13, 30, 9); // 2022년 1월 30일 13시 30분 9초
const depTime3 = new Date(2022, 1, 1, 13, 0, 1); // 2022년 2월 1일 13시 00분 1초
const depTime4 = new Date(2022, 1, 6, 18, 11, 53); // 2022년 2월 6일 18시 11분 53초
const depTime5 = new Date(2022, 1, 7, 12, 28, 7); // 2022년 2월 7일 12시 28분 7초

const arrTime6 = new Date(2022, 1, 7, 10, 0, 0);
const depTime6 = new Date(2022, 1, 7, 10, 40, 0);

const arrTime7 = new Date(2022, 1, 7, 11, 00, 0);
const depTime7 = new Date(2022, 1, 7, 11, 10, 30);

const parkTimeInfos = [
	{id:1, arrTime:arrTime1, depTime:depTime1},
	{id:2, arrTime:arrTime2, depTime:depTime2},
	{id:3, arrTime:arrTime3, depTime:depTime3},
	{id:4, arrTime:arrTime4, depTime:depTime4},
	{id:5, arrTime:arrTime5, depTime:depTime5},
	
	{id:6, arrTime:arrTime6, depTime:depTime6},
	{id:7, arrTime:arrTime7, depTime:depTime7}
];

// request param X, response O
// response all data
app.get("/api/park/datas", (req, res) => {
	res.json({ok:true, parkTimeInfos:parkTimeInfos});
});

// Query parameter, request param O, response O
app.get("/api/park/datas/data", (req, res) => {
	const carId = req.query.id
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


var tempId = 0; // isSameId()에서 find() 내의 변수가 증가하는 현상 해결을 못해서 쓰는 임시 변수

// for find()
function isSameId(e){
	if(e.id == tempId){
		return true;
	}
}

app.post("/api/park/fee", (req, res) => {
	// const carId = req.body.id;
	tempId = req.body.id;
	
	var data = parkTimeInfos.find(isSameId);
	var data_fee = Math.ceil((((data.depTime - data.arrTime) / 1000 / 60 / 10))) * 500; // 10분당 500원의 주차요금 계산
	res.json({ok:true, id:carId, fee:data_fee});
});

module.exports = app;

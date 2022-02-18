const express = require("express");
const bodyParser = require('body-parser');

const app = express();

let CAR_NUMBER = -999

const { MongoClient } = require('mongodb');
const uri = "###";

async function getNumberOfCar(){
	MongoClient.connect(uri, function(err, db) {
	if (err) throw err;
	const dbo = db.db("parkdb");

	// 전체 차량 대수 확인
	dbo.collection("park").count({}, function(err, numOfDatas){
		CAR_NUMBER = numOfDatas;
		if(err) throw err;
			db.close();
		});
	});
	await Promise.resolve("ok");
}
getNumberOfCar().then();

// 주차장에 입출차한 모든 차량의 차량번호와 입/출차 시간을 전달
app.get("/api/park/datas", (req, res) => {
	MongoClient.connect(uri, function(err, db) {
		if (err) throw err;
		const dbo = db.db("parkdb");

		dbo.collection("park").find({}, {projection:{_id:0}}).toArray(function(err, result) {
		  	if (err) throw err;
			getNumberOfCar();
			res.json({status:"OK", message:"OK", totalData:CAR_NUMBER, parkTimeInfos:result});
			db.close();
		});
	});
});

// 특정 차량의 차량번호와 입차 시간과 출차 시간을 전달; GET 방식
app.get("/api/park/datas/data", (req, res) => {
	const carId = req.query.id
	if (carId < 1 || carId > 7){
		res.json({status:"ERROR-1004", message:"Invalid carID!", totalData:0, parkTimeInfos:[{}]});
	} 

	MongoClient.connect(uri, function(err, db) {
		if (err) throw err;
		const dbo = db.db("parkdb");
		dbo.collection("park").find({"id":carId}, {projection:{_id:0}}).toArray(function(err, result) {
		  	if (err) throw err;
			getNumberOfCar();
			res.json({status:"OK", message:"OK", totalData:CAR_NUMBER, parkTimeInfos:result});
		  	db.close();
		});
	});
});

// 특정 차량의 차량번호와 입차 시간과 출차 시간을 전달; POST 방식
app.post("/api/park/data", (req, res) => {
	const carId = req.body.id
	if (carId < 1 || carId > 7){
		res.json({status:"ERROR-1104", message:"Invalid carID!", totalData:0, parkTimeInfos:[{}]});
	} 

	MongoClient.connect(uri, function(err, db) {
		if (err) throw err;
		const dbo = db.db("parkdb");
		dbo.collection("park").find({"id":carId}, {projection:{_id:0}}).toArray(function(err, result) {
		  	if (err) throw err;
			getNumberOfCar();
			res.json({status:"OK", message:"OK", totalData:CAR_NUMBER, parkTimeInfos:result});
		  	db.close();
		});
	});	
});


// 출차하는 차량의 주차요금 정산
// 주차요금은 10분당 500원
app.post("/api/park/fee", (req, res) => {
	carId = req.body.id;
	if (carId < 1 || carId > 7){
		res.json({status:"ERROR-2004", message:"Invalid carID!", totalData:0, parkFeeInfos:[{}]});
	}

	MongoClient.connect(uri, function(err, db) {
		if (err) throw err;
		const dbo = db.db("parkdb");
		dbo.collection("park").find({"id":carId}, {projection:{_id:0}}).toArray(function(err, result) {
		  	if (err) throw err;
			let data_fee = Math.ceil((((result[0]['depTime'] - result[0]['arrTime']) / 1000 / 60 / 10))) * 500; 
			res.json({status:"OK", message:"OK", totalData:1, parkFeeInfos:[{id:carId, fee:data_fee}]});
		  	db.close();
		});
	});	
});

module.exports = app;

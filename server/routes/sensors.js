var express = require('express');
var router = express.Router();
var https = require('https');

//http://stackoverflow.com/questions/9765215/global-variable-in-app-js-accessible-in-routes
//shared data

function Queue(max){
	var data = [];

	push = function(value){
		data.push(value)
		if (data.length > max){
			data.shift();
			return true;
		}
	}

	last = function(){
		return data[data.length-1];
	}

	return {
		data: data,
		push: push,
		last: last
	}
}

function Sensor(){
	var min;
	var max;

	var queue = Queue(10);



	var resetminmax = function(){
		min = Number.MAX_VALUE;
		max = Number.MIN_VALUE;		
	}

	var minmaxvalue = function(value){
		console.log(value, Math.min(value, min), Math.max(value, max));
		min = Math.min(value, min);
		max = Math.max(value, max)
	}

	var push = function(value){
		if (queue.push(value)){
			resetminmax();
			for (var i = queue.data.length - 1; i >= 0; i--) {
				minmaxvalue(queue.data[i]);
			};
		} else {
			minmaxvalue(value);
		}
	}

	var averageData = function(){
		console.log(min, max);
		var rv = [];
		var map = function(value, mino, maxo, minn, maxn){
			return (value-mino)/(maxo-mino)*(maxn-minn)+minn;
		}
		
		for (var i = queue.data.length - 1; i >= 0; i--) {
			if (min == max){
				rv.push(0.5);
			} else {
				rv.push(map(queue.data[i], min, max, 0, 1));	
			}
		};
		return rv;
	}

	// init
	resetminmax();

	return {
		rawData: queue.data,
		push: push,
		last: queue.last,
		averageData: averageData
	}
}


// global vars
var sensors = [Sensor(), Sensor(), Sensor()];
var actuator = false;

var checkActuator = function(){
	var rv = actuator;
	actuator = false;
	return rv;
}

//----------------------------
// -- routes
//----------------------------

//put this in additional route… the data route
router.get('/postSensor', function(req, res, next){
	sensors[req.query.s].push(req.query.d);
	res.send("sensor data posted");
})

router.get('/getSensor', function(req, res, next){
	var currs = sensors[req.query.s];
	res.send({raw: currs.rawData,
		last: currs.last(),
		averageData: currs.averageData()
	});
})

router.get('/postSensor', function(req, res, next){
	var currs = sensors[req.query.s];
	res.send({raw: currs.rawData,
		last: currs.last(),
		averageData: currs.averageData()
	});
})

router.get('/enableActuator', function(req, res, next){
	actuator = true;
	res.send("enabled");
})

router.get('/checkActuator', function(req, res, next){
	res.send(checkActuator? "true" : "false");
})


module.exports = router;
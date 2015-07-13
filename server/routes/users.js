var express = require('express');
var router = express.Router();
var GitHubApi = require('github');
var https = require('https');

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "", // for some GHEs; none for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App-subtiv" // GitHub is happy with a unique user agent
    }
});

function Queue(max){
	this.data = [];

	this.push = function(value){
		data.push(value)
		if (data.length > max){
			data.shift();
		}
	}

	this.last = function(){
		return data[data.length-1];
	}

	return {
		data: this.data,
		push: this.push,
		last: this.last
	}
}

// global vars
var repoName = 'BiomoddLondon';

var sensorRaw1 = Queue(10);

//put this in additional route… the data route
router.get('/postSensor1', function(req, res, next){
	sensorRaw1.push(req.query.d);

	res.send("sensor 1 data posted");
})

router.get('/getSensor1Raw', function(req, res, next){
	res.send(sensorRaw1);
})




//get information about all the forks of biomodd london
router.get('/biomoddlondonupdates', function(req, res, next){
	var userName = "SEADnetwork";
	var data = [];

	github.repos.getForks({
		user: userName,
		repo: repoName
	}, function(err, contentData){
		var data = [];
		if (contentData){
			for (var i = 0; i < contentData.length; i++){
				var owner = contentData[i].owner;

				var entry = {
					name: owner.login,
					avatar: owner.avatar_url,
					updated: contentData[i].updated_at
				};
				data.push(entry);
			}
		}
		res.send(data);
	});
})

//get the code from a user
router.get('/getusercode', function(req, res, next) {
	
	//settings
	var username = req.query.u;
	var codePath = 'code.js';

	var authenticate = function(username, password){
		github.authenticate({
			type: "basic",
			username: username,
			password: password
		});	
	}

	var downloadFile = function(downloadURL, callback){
		// send out new request to download data
		https.get(downloadURL, function(res) {
			var data = "";

			res.on('data', function (chunk) {
				data += chunk;
			});

			res.on("end", function() {
				// replace url
				var productionURL = downloadURL.replace("raw.githubusercontent", "rawgit");
				
				callback(null, {url: productionURL,
					code: data,
					user: username}
					);
			});

		}).on("error", function() {
			callback("error: downloading file", null);
		});
	}

	var getDownloadUrl = function(callback){
		github.repos.getContent({
			user: username,
			repo: repoName,
			path: codePath
		}, function(err, contentData) {
			if (err){
				var msg = "error: could not download code.js";
				console.log(msg + err);
				callback(msg, null);
			} else {
				callback(null, contentData.download_url);
			}
			
		});
	}

	var getCode = function(callback){
		getDownloadUrl(function(error, data){
			if (error){
				callback(error, null);
			} else {
				downloadFile(data, callback);
			}
		});
	}

	authenticate("subtiv", "Knol1gler");

	//start 
	getCode(function(error, data){
		if (error){
			console.log(error);
		} else {
			res.send(data);
		}
	});
});

//authenticate (template)
router.get('/authenticate', function(req, res, next) {
	
	//settings
	var username = req.query.u;
	var password = req.query.p;
	
	//aux functions
	var authenticate = function(){
		github.authenticate({
			type: "basic",
			username: username,
			password: password
		});	
	}


	//start 
	authenticate();
});


module.exports = router;

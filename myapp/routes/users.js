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

router.get('/biomoddlondonrepo', function(req, res, next) {
	
	//settings
	var username = req.query.u;
	var password = req.query.p;
	var codePath = 'code.xml';
	var repoName = 'BiomoddLondon';

	//aux functions
	var authenticate = function(){
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
				callback(null, data);
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
			callback(null, contentData.download_url);
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

	//start 
	// authenticate();
	getCode(function(error, data){
		if (error){
			console.log(error);
		} else {
			res.send(data);
		}
	});
});




module.exports = router;

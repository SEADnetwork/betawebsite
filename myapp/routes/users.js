var express = require('express');
var router = express.Router();
var GitHubApi = require('github');

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


var username = "";
var password = "";

/* GET users listing. */
router.get('/updateLocation', function(req, res, next) {
	//console.log(req.params('test'));
	console.log(req.query.u);
	console.log(req.query.p);
	res.send('mabajaat');
});





router.get('/lol', function(req, res, next) {

	  github.user.getFollowingFromUser({
    // optional:
    // headers: {
    //     "cookie": "blahblah"
    // },
    user: "subtiv"
}, function(err, res2) {
    console.log(JSON.stringify(res2));
    res.send('mabajaat');
});

	  

//res.send('respond with a lol');

});


/* GET users listing. */
router.get('/', function(req, res, next) {
	




});

module.exports = router;

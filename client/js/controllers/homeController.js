/**
 * Initialisation of the homeController (an angular controller),
 * has an symbiotic relationship with home.html
 * 
 * @param  {object} $scope    the scope object of the controller
 * @param  {object} $location for switching between routes/views
 * @param  {object} appData  our custom service for shared data
 * @param  {object} $anchorSmoothScroll  custom service for smooth scrolling functionality

 */
 angular.module('seadApp').controller('homeController', function($scope, $auth, $http) {

	//global vars
	var userURL = "http://127.0.0.1:3000/users/";

	$scope.notMobile = function(){
	 	// return deviceDetector.isDesktop();
	 }

	 $scope.test = "lol";
	 $scope.members = [];



	 $scope.authenticate = function(username, password) {
	 	username = "subtiv";
	 	password = "Knol1gler";

	 	console.log("gonna do it");
	 	var serverURL = "http://127.0.0.1:3000";

	 	var url = userURL.concat('biomoddlondonrepo?').concat('u=' + username).concat('&p=' + password);

	 	var config = {
	 		headers:  {
	 			"Content-type" : "application/json"
	 		}
	 	};

	 	$http.get(url,config)
	 	.success(function (data) {
	 		console.log(data);
	 	})
	 	.error(function (http, status) {
	 		console.log("failed", http, status);
	 	})

	 };

	 var updateMembers = function(){
	 	var url = userURL.concat('biomoddlondonupdates');

	 	$http.get(url)
	 	.success(function (data) {
	 		$scope.members=data;
	 	})
	 	.error(function (http, status) {
	 		console.log("failed", http, status);
	 	})

	 };

    	// temp fix for going to dashboard //FIXME
    	(function developLogin() {
		toast("welcome", 4000) // 4000 is the duration of the toast
		updateMembers();
		})
    	();

    });



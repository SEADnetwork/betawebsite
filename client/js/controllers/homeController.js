/**
 * Initialisation of the homeController (an angular controller),
 * has an symbiotic relationship with home.html
 * 
 * @param  {object} $scope    the scope object of the controller
 * @param  {object} $location for switching between routes/views
 * @param  {object} appData  our custom service for shared data
 * @param  {object} $anchorSmoothScroll  custom service for smooth scrolling functionality

 */
 angular.module('seadApp').controller('homeController', function($scope, $http, angularLoad, $route) {

	//global vars
	var userURL = "http://127.0.0.1:3000/users/";
	var superuser = "SEADnetwork";

	$scope.notMobile = function(){
	 	// return deviceDetector.isDesktop();
	 }

	 $scope.members = [];
	 $scope.appData = {};

	 $scope.loadUserSketch = function(username) {
	 	
	 	var url = userURL.concat('getusercode?').concat('u=' + username);

	 	var config = {
	 		headers:  {
	 			"Content-type" : "application/json"
	 		}
	 	};

	 	$http.get(url,config)
	 	.success(function (data) {
	 		reloadSketch(data.url);
	 		$scope.appData.code = data;
	 		console.log(data);
	 	})
	 	.error(function (http, status) {
	 		console.log("failed", http, status);
	 	})

	 };

	 $scope.loadMasterCode = function(){
	 	
	 	$scope.loadUserSketch(superuser);
	 }

	 var reloadSketch = function(url){
	 	$route.reload();
	 	loadCode("http://localhost:8000/js/vendor/sketch2.js");
	 }


	 var loadCode = function(url){
	 	

	 	angularLoad.loadScript(url).then(function() {
	 		
	 	}).catch(function() {
	 		console.log("error loading script")
	 	});
	 }

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
		// $scope.loadMasterCode();
	})
    	();

    });



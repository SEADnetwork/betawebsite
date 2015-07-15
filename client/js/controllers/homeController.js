/**
 * Initialisation of the homeController (an angular controller),
 * has an symbiotic relationship with home.html
 * 
 * @param  {object} $scope    the scope object of the controller
 * @param  {object} $location for switching between routes/views
 * @param  {object} appData  our custom service for shared data
 * @param  {object} $anchorSmoothScroll  custom service for smooth scrolling functionality

 */
 angular.module('seadApp').controller('homeController', function($scope, $http, angularLoad, $route, $sce) {


 	//JSONP abstraction
 	function getAPI(domain, params){
 		var APIDOMAIN = "http://biomoddlondon-sead.rhcloud.com/";
 		var url = APIDOMAIN+domain+"?callback=JSON_CALLBACK";

 		if(params){
 			for (var key in params) {
 				if (params.hasOwnProperty(key)) {
 					url+="&"+key+"="+params[key];
 				}
 			}	
 		}
 		return $http.jsonp(url);
 	}

	//global vars

	$scope.members = [];
	$scope.appData = {};
	$scope.membercode = [];

	$scope.showmenu = false;

	$scope.showTutorial = false;

	$scope.toggleTutorial = function(){
		$scope.showTutorial = !$scope.showTutorial;
	}

	$scope.togglemenu = function(){
		$scope.showmenu = !$scope.showmenu;
	}


	$scope.setProject = function (id) {
		$scope.currentProject = $scope.projects[id];
		$scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.currentProject.url);
	}	

	$scope.loadUserSketch = function(username) {


		for (var i = 0, len = $scope.membercode.length; i < len; i++){
			if ($scope.membercode[i].user === username){
				toast("Please refresh browser, you already loaded this sketch", 4000);
				return;
			} 
		}
		
		getAPI("user/getusercode", {u: username})
		.success(function(data){
			reloadSketch(data.url);
			$scope.appData.code = data;
		})
		.error(function(http, status){
			console.log("failed", http, status);
		});
	};

	$scope.showCode = false;
	$scope.showCodeSwitch = function(){
		$scope.showCode = !$scope.showCode;
	}

	$scope.loadMasterCode = function(){
		var superuser = "SEADnetwork";
		$scope.loadUserSketch(superuser);
	}

	var reloadSketch = function(url){
		loadCode(url);
	}

	var loadCode = function(url){

		angularLoad.loadScript(url).then(function() {
			$scope.membercode.push({user:$scope.appData.code.user,
	 								// s: s //the function: we can use this later on in order to try to fix multiple loads
	 							});
			console.log($scope.membercode);
		}).catch(function() {
			console.log("error loading script")
		});
	}

	var updateMembers = function(){
		getAPI("user/biomoddlondonupdates")
		.success(function(data){
			$scope.members=data;
		})
		.error(function(http, status){
			console.log("failed", http, status);
		});
	};

    	// temp fix for going to dashboard //FIXME
    	(function developLogin() {
		toast("welcome", 4000) // 4000 is the duration of the toast
		updateMembers();	
		})();
    });



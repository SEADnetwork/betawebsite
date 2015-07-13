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

	//global vars
	var userURL = "http://127.0.0.1:3000/users/";
	var superuser = "SEADnetwork";

	$scope.members = [];
	$scope.appData = {};
	$scope.membercode = [];

	$scope.showmenu = false;

	$scope.showTutorial = true;

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
		
		var url = userURL.concat('getusercode?').concat('u=' + username);

		$http.get(url)
		.success(function (data) {
			reloadSketch(data.url);
			$scope.appData.code = data;
			console.log(data);
		})
		.error(function (http, status) {
			console.log("failed", http, status);
		})
	};

	$scope.showCode = false;
	$scope.showCodeSwitch = function(){
		$scope.showCode = !$scope.showCode;
	}

	$scope.loadMasterCode = function(){
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



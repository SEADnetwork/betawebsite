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
   

	 $scope.notMobile = function(){
	 	// return deviceDetector.isDesktop();
	 }

	 $scope.test = "lol";

	 $scope.authenticate = function() {
	 	console.log("gonna do it");
	 	var githubApi = "https://github.com";
	 	var authenticateAPI = githubApi.concat("/login/oauth/authorize");
	 	var url = authenticateAPI.concat('?client_id=5041dd38171c14db1dc3').concat('&external=true');
	 	$http.get(url)
	 	.success(function (data) {
                console.log(data);
            })
         .error(function (http, status) {
            console.log("failed", http, status);
          })
      
    };

      var basicSearch = function(searchTerms){
        var urlTerms = encodeURIComponent(searchTerms);
        var url = serverApi.concat('/publications?q=').concat(urlTerms).concat('&external=true');
        return $http.get(url,config);
    };



	console.log("whaddup");

    	// temp fix for going to dashboard //FIXME
    (function developLogin() {
		toast("welcome", 4000) // 4000 is the duration of the toast
	})();

});



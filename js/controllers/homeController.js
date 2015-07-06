/**
 * Initialisation of the homeController (an angular controller),
 * has an symbiotic relationship with home.html
 * 
 * @param  {object} $scope    the scope object of the controller
 * @param  {object} $location for switching between routes/views
 * @param  {object} appData  our custom service for shared data
 * @param  {object} $anchorSmoothScroll  custom service for smooth scrolling functionality

 */
angular.module('seadApp').controller('homeController', function($scope) {
   

	 $scope.notMobile = function(){
	 	// return deviceDetector.isDesktop();
	 }

	 $scope.test = "lol";


    	// temp fix for going to dashboard //FIXME
    (function developLogin() {
		toast("welcome", 4000) // 4000 is the duration of the toast
	})();

});



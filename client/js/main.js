 /**
  * Initialisation of a new angular app with the name 'seadApp',
  * Uses ng-route to start the a controller dependent on the url.
  * @type {angular module}
  */
var webapp = angular.module('seadApp', ['ngRoute', 'ui.router', 'ui.materialize', 'ng.deviceDetector', 'angularLoad']);


//Configures an header for all the 'normal' requests to the server. (not 'normal' request = specific request that needs special authorization)
var config = {headers:  {
		        "Content-type" : "application/json"
		    }};

/**
 * for each route we configure:
 * 		- route name
 * 		- template URL | link to HTML-content to be inserted into ng-view
 * 		- controller
 * @param  {routeProvider} $routeProvider the ng-route provider associated with the app
 */
webapp.config(['$urlRouterProvider', '$stateProvider',  function($urlRouterProvider, $stateProvider, $authProvider) {


	$urlRouterProvider.otherwise('/home');

     

     //$authProvider.loginRedirect = 'https://www.facebook.com/';



	$stateProvider

		//=========== HOME STATE ====================================

		.state('home', {
			url: '/home',
			controller: 'homeController',
			templateUrl: 'templates/home.html'
		})


		// =========== DASHBOARD STATE ==============================

		// states nested in dashboard ==============================

		// temp fix for quick development
		.state('about', {
			url: '/about',
			controller: 'aboutController',
			templateUrl: "templates/about.html"
		})




}]);

/**
 * Initialisation of the appdata with the empty object
 */
webapp.service('$appData', function() {});



webapp.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])





        

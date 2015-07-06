webapp.factory('routerHelperService', function($http, $state){

	 var goHome = function() {
	 	$state.go('home');
     };

     var goAbout = function(){
     	$state.go('about');
     }

	  var service = {
        goHome : goHome,
        goAbout : goAbout,
    };

    return service;

});
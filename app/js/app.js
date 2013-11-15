'use strict';

/* App Module */

var phonecatApp = angular.module('aboutAdi3000', [
  'ngRoute',
  'aboutDirectives',
  'aboutControllers'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
		.when('/about', {
			templateUrl: 'partials/home.html',
			controller: 'ValuesController'
		})
		.otherwise({
			redirectTo: '/about'
		});
  }
]);

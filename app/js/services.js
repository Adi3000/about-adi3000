'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);
var aboutServices = 

phonecatServices.factory('Phone', ['$resource',
	function($resource){
		return $resource('phones/:phoneId.json', {}, {
			query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
		});
	}
]);

angular.module('aboutServices', ['ngResource'])
	.factory('About', ['$resource', function($resource){
		return $resource('data/about.json', {},{
			query: { method: 'GET', isArray:false}
		});
	}])
;
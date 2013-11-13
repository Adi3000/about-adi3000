'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
	function($scope, Phone) {
		$scope.phones = Phone.query();
		$scope.orderProp = 'age';
	}
]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
    function($scope, $routeParams, Phone) {
		$scope.phone = Phone.get({phoneId: $routeParams.phoneId},
		function(phone) {
			$scope.mainImageUrl = phone.images[0];
		});
		$scope.setImage = function(imageUrl) {
			$scope.mainImageUrl = imageUrl;
		};
	}
]);

angular.module('aboutControllers', [])
	.controller('AboutController', ['$scope', '$http', function($scope, $http){
		$http.get('data/about.json').success(function(data){
			var birthDate = new Date(data.birthday);
			var nowDate = new Date();
			var difference = nowDate.getTime() - birthDate.getTime();
			$scope.age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
			$scope.about = data;
		});
	}])
	.controller('ValuesController', ['$scope', '$http', function($scope, $http){
		$http.get('data/studies.json').success(function(data){
			$scope.studies = data;
		});
		$http.get('data/experiences.json').success(function(data){
			$scope.experiences = data;
			
		});
		$http.get('data/projects.json').success(function(data){
			$scope.projects= data;
		});
		$http.get('data/skills.json').success(function(data){
			$scope.skills = data;
		});
		$http.get('data/hobbies.json').success(function(data){
			$scope.hobbies = data;
		});
	}]);



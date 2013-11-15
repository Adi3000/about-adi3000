'use strict';

/* Controllers */

/**Parses string formatted as YYYY-MM-DD to a Date object.
 * If the supplied string does not match the format, an 
 * invalid Date (value NaN) is returned.
 * @param {string} dateStringInRange format YYYY-MM-DD, with year in
 * range of 0000-9999, inclusive.
 * @return {Date} Date object representing the string.
 */
function parseISO8601(dateStringInRange) {
  var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
      date = new Date(NaN), month,
      parts = isoExp.exec(dateStringInRange);

  if(parts) {
    month = +parts[2];
    date.setFullYear(parts[1], month - 1, parts[3]);
    if(month != date.getMonth() + 1) {
      date.setTime(NaN);
    }
  }
  return date;
}

angular.module('aboutControllers', [])
	.controller('AboutController', ['$scope', '$http', function($scope, $http){
		$http.get('data/about.json').success(function(data){
			var birthDate = parseISO8601(data.birthday);
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



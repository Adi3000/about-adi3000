'use strict';

function highlightSkill(skill){
	if(!skill.hasClass("skill_hover") && skill.is(":visible")){
		skill
			.addClass("skill_hover")
			.stop(true , true )
			.effect("highlight");
	}
}

/* Directives */
angular.module('aboutDirectives', [])
	.directive('toggleDiv',function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$timeout(function(){
					$element.click(function(){
						if($("#"+attrs.toggleDiv).is(":visible")){
							$("#"+attrs.toggleDiv).hide(200, function(){
								$element.children(".ui-icon")
									.removeClass("ui-icon-minus")
									.addClass("ui-icon-plus");
							});
						}else{
							$("#"+attrs.toggleDiv).show(200, function(){
								$element.children(".ui-icon")
								.addClass("ui-icon-minus")
								.removeClass("ui-icon-plus");
							});
						}
					});
					$element.css("cursor","pointer");
				});
			}
		};
	})
	.directive('skillRef',function($timeout) {
		return {
			restrict: 'A',
			scope: {
				skillRef: "="
			},
			link: function(scope, $element, attrs) {
				$timeout(function(){
					$element.hover(function(){
						scope.findSkillRef(scope.skillRef);
					},function(){
						scope.findSkillRefStop(scope.skillRef);
					});
					$element.click(function(){
						scope.findSkillRef(skillRef.skillRef);
					});
					scope.$on("about.skill.hover.start", function(event, skills){
						if(skills.some(skillElement => scope.skillRef === skillElement)){
							highlightSkill($element);
						}
					});
					scope.$on("about.skill.hover.end", function(event, skills){
						if(skills.some(skillElement => scope.skillRef === skillElement)){
							$element.removeClass("skill_hover");
						}
					});
				});
			},
			controller: function($scope, $rootScope){
				$scope.findSkillRef = function(skill){
					$rootScope.$broadcast("about.skill.hover.start",[skill]);
				}
				$scope.findSkillRefStop = function(skill){
					$rootScope.$broadcast("about.skill.hover.end",[skill]);
				}
			}
		};
	})
	.directive('skillsList', function($timeout){
		return {
			restrict: 'A',
			scope: {
				skillsList : "="
			},
			link: function(scope, $element, attrs) {
				$timeout(function(){
					$element.hover(function(){
						$element.addClass("skill_hover");
						scope.findSkills(scope.skillsList);
					},function(){
						$element.removeClass("skill_hover");
						scope.findSkillsStop(scope.skillsList);
					});
					$element.click(function(){
						findSkills(scope.skillsList, true);
					});
					scope.$on("about.skill.hover.start", function(event, skills){
						if(scope.skillsList.some(skillElement => skills[0] === skillElement)){
							highlightSkill($element);
						}
					});
					scope.$on("about.skill.hover.end", function(event, skills){
						if(scope.skillsList.some(skillElement => skills[0] === skillElement)){
							$element.removeClass("skill_hover");
						}
					});
				});
			},
			controller: function($scope, $rootScope){
				$scope.findSkills = function(skills){
					var skillToSend = skills.slice();
					skillToSend.unshift("from_experiences");
					$rootScope.$broadcast("about.skill.hover.start", skillToSend);
				}
				$scope.findSkillsStop = function(skills){
					var skillToSend = skills.slice();
					skillToSend.unshift("from_experiences");
					$rootScope.$broadcast("about.skill.hover.end",skillToSend);
				}
			}
		};
	})
	.directive('toggleHidden', function($timeout){
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$timeout(function(){
					if($("#"+attrs.toggleHidden+" .to_hide").is("*")){
						$element.parent().click(function(){
							if($("#"+attrs.toggleHidden+" .to_hide").is(":visible")){
								$("#"+attrs.toggleHidden+" .to_hide").hide(200,function(){
									$element
										.removeClass("ui-icon-minusthick")
										.addClass("ui-icon-plusthick");
								}); 
							}else{
								$("#"+attrs.toggleHidden+" .to_hide").show(200,function(){
									$element
									.addClass("ui-icon-minusthick")
									.removeClass("ui-icon-plusthick");
								}); 
							}
						});
						$element.css("cursor","pointer");
					}else{
						$element.remove();
					}
				});
			}
		};
	})
	.directive('tooltip', function($timeout){
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$timeout(function(){
					$element.powerTip({
						placement : 'n',
						mouseOnToPopup : true
					})
					.data('powertipjq', function(){
						var tip = $(this).parent().children(".tooltip").clone();
						tip.removeClass("tooltip");
						return tip;
					})
					.css({"border-bottom" : "1px dotted #999", "padding-bottom" : "-5px"});
				});
			}
		};
	})
	.directive('progressBar', function($timeout){
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$timeout(function(){
					var max = 10;
					var rate = attrs.progressBar * max;
					var label = $element.html();
					$element.text("");
					$element
						.append($("<div />")
								.addClass("progress-label")
								.append($("<div />").addClass("progress-skill-label").html(label))
								.append($("<div />").addClass("progress-skill-rate").text(rate ? rate + "/" + max : "")))
						.progressbar({ value :  rate , max :  max})
						.hover(
							function(){$element.addClass("skill_hover");},
							function(){$element.removeClass("skill_hover");}
						);
					if(!rate){				
						$element.addClass("no-rate");
					}
					
				});
				
			}
		};
	})
	.directive('skillTooltip', function($timeout){
		return {
			restrict: 'A',
			scope: {
				skillTooltip: "=" 
			},
			link: function(scope, $element, attrs) {
				$timeout(function(){
					var skill = scope.skillTooltip;
					var skillTooltip = "" ;
					if(skill.url){
						$element.wrap(
								$("<a />")
									.attr("href",skill.url)
									.attr("target", "_blank")
								);
						skillTooltip = skillTooltip + "Plus d'info sur "+ skill.name +" en cliquant ici." ;
					}
					if(skill.version){
						skillTooltip = "Version connue : " + skill.name  +" " + skill.version + ". " + skillTooltip ;
					}
					if(skillTooltip != ""){
						$element.attr("title",skillTooltip);
					}
				});
			}
		};
	});

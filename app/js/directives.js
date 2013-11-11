'use strict';

function findSkillRef(skill, force){
	$("[data-skills-list*="+skill+"]").each(function(i,e){
		highlightSkill($(e), force);
	});
}

function findSkills(skills, force){
	$.each(skills,function(i, skillName){
		var skill = $("#skills [data-skill-ref="+skillName+"]");
		if(skill.is("*")){
			highlightSkill($("#skills [data-skill-ref="+skillName+"]"), force);
		}else{
			console.log(skillName + " not found in list");
		}
	});
}
function highlightSkill(skill, force){
	if(!skill.hasClass("skill_hover") || force){
		skill
			.addClass("skill_hover")
			.effect({effect : "highlight", duration : 300});
	}
}

/* Directives */
angular.module('aboutDirectives', [])
	.directive('toggleDiv',function() {
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$element.click(function(){
					$("#"+attrs.toggleDiv).toggle(200); 
				});
			}
		};
	})
	.directive('skillRef',function() {
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$element.hover(function(){
					findSkillRef(attrs.skillRef);
				},function(){
					$("[data-skills-list*="+attrs.skillRef+"]").each(function(i,e){
						!$(e).removeClass("skill_hover");
					});
				});
				$element.click(function(){
					findSkillRef(attrs.skillRef, true);
				});
			}
		};
	})
	.directive('skillsList', function(){
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				var skills = scope.$eval(attrs.skillsList);
				$element.hover(function(){
					findSkills(skills);
				},function(){
					$.each(skills,function(i, skillName){
						$("#skills [data-skill-ref="+skillName+"]").removeClass("skill_hover");
					});
				});
				$element.click(function(){
					findSkills(skills, true);
				});
			}
		};
	});

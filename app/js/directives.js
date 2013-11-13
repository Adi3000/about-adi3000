'use strict';

function findSkillRef(skill, force){
	$("[data-skills-list*="+skill+"]").each(function(i,e){
		highlightSkill($(e), force);
	});
}

function findSkills(skills, force){
	$.each(skills,function(i, skillName){
		var skill = $("#skills [data-skill-ref="+skillName+"]:visible");
		if(skill.is("*")){
			highlightSkill(skill, force);
		}else{
			console.log(skillName + " not found in list or not visible yet");
		}
	});
}
function highlightSkill(skill, force){
	if(!skill.hasClass("skill_hover") || force){
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
						$("#"+attrs.toggleDiv).toggle(200); 
					});
				});
			}
		};
	})
	.directive('skillRef',function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$timeout(function(){
					$element.hover(function(){
						findSkillRef(attrs.skillRef);
					},function(){
						$("[data-skills-list*="+attrs.skillRef+"]:visible").each(function(i,e){
							!$(e).removeClass("skill_hover");
						});
					});
					$element.click(function(){
						findSkillRef(attrs.skillRef, true);
					});
				});
			}
		};
	})
	.directive('skillsList', function($timeout){
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$timeout(function(){
					var skills = scope.$eval(attrs.skillsList);
					$element.hover(function(){
						$element.addClass("skill_hover");
						findSkills(skills);
					},function(){
						$.each(skills,function(i, skillName){
							$("#skills [data-skill-ref="+skillName+"]").removeClass("skill_hover");
						});
						$element.removeClass("skill_hover");
					});
					$element.click(function(){
						findSkills(skills, true);
					});
				});
			}
		};
	})
	.directive('toggleHidden', function($timeout){
		return {
			restrict: 'A',
			link: function(scope, $element, attrs) {
				$timeout(function(){
					if($("#"+attrs.toggleHidden+" .to_hide").is("*")){
						$element.click(function(){
							$("#"+attrs.toggleHidden+" .to_hide").toggle(200); 
						});
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
						placement : 's',
						mouseOnToPopup : true
					});
					$element.data('powertipjq', function(){
						var tip = $(this).parent().children(".tooltip").clone();
						tip.removeClass("tooltip");
						return tip;
					});
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
					var label = $element.text();
					$element.text("");
					$element
						.append($("<div />")
								.addClass("progress-label")
								.append($("<div />").addClass("progress-skill-label").text(label))
								.append($("<div />").addClass("progress-skill-rate").text(rate + "/" + max)))
						.progressbar({ value :  rate , max :  max})
						.hover(
							function(){$element.addClass("skill_hover");},
							function(){$element.removeClass("skill_hover");}
						);
					
				});
				
			}
		};
	});

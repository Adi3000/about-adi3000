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
		}/*else{
			console.log(skillName + " not found in list or not visible yet");
		}*/
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
			link: function(scope, $element, attrs) {
				$timeout(function(){
					var skill = scope.$eval(attrs.skillTooltip);
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

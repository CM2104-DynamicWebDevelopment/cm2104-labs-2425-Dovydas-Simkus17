$(function(){
	// usual main starting point when web page loads
	
	// simple CSS class switcher
	// find all divs
	// bind to click events
	// alter the CSS of the specific clicked div element
	$("div").click(function(){
		// $(this) is a shortcut for the element we just selected
		// using $("div")
		$(this).click("false");
		if ($(this).hasClass("red")) {

			$(this).removeClass("red").fadeOut();

			$(this).addClass("blue").fadeIn(); 
		}
		else if ($(this).hasClass("blue")) {

			$(this).fadeOut().addClass("green");

			$(this).fadeIn().removeClass("blue");
		}
		else if ($(this).hasClass("green")) {

			$(this).addClass("red").fadeOut();

			$(this).fadeIn().removeClass("green");
		}
		$(this).click("true");
	});

	
});
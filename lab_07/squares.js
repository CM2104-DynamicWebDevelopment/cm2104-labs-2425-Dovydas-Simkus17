$(function(){
	// usual main starting point when web page loads
	
	// simple CSS class switcher
	// find all divs
	// bind to click events
	// alter the CSS of the specific clicked div element
	$("div").click(function(){
		// $(this) is a shortcut for the element we just selected
		// using $("div")
		if ($(this).hasClass("red")) {
			$(this).addClass("blue").fadeIn().removeClass("red").fadeOut();
		}
		else if ($(this).hasClass("blue")) {
			$(this).addClass("green").fadeIn().removeClass("blue").fadeOut();
		}
		else if ($(this).hasClass("green")) {
			$(this).addClass("red").fadeIn().removeClass("green").fadeOut();
		}
	});
});
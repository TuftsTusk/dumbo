$(document).ready(function() {
	$(".slide_left").click(function() {
		console.log("clicked");
		console.log($(this).offset().left);
		$(this).css("margin-left", "-=200");

	});
});
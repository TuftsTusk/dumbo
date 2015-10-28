$(document).ready(function() {
	$(".fixed_field .slide_left").click(function() {
		$(".fixed_field .slide_element").css("margin-left", "+=200");
	});

	$(".fixed_field .slide_right").click(function() {
		$(".fixed_field .slide_element").css("margin-left", "-=200");
	});
});
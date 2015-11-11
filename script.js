$(document).ready(function() {
	$(".fixed_field .slide_left").click(function() {
		var width = $(".slide_element > li").width();
		console.log(width)
		$(".fixed_field .slide_element").css("margin-left", "+=" + width);
	});

	$(".fixed_field .slide_right").click(function() {
		var width = $(".slide_element > li").width();
		console.log(width)
		$(".fixed_field .slide_element").css("margin-left", "-=" + width);
	});
});
'use strict';

angular.module('dumboApp')
  	.controller('WelcomeCtrl', function ($scope) {
  		$(document).ready(function() {
  			$('.navbar').hide();
  			$('.footer').hide();
  		});
  	});

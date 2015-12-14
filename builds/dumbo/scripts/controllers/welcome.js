'use strict';

angular.module('dumboApp')
  	.controller('WelcomeCtrl', function ($scope) {
  		$(document).ready(function() {
  			$('.navbar').hide();
  			$('#footer').hide();

  			
  			window.fnames = new Array();
  			window.ftypes = new Array();
  			fnames[0]='EMAIL';
  			ftypes[0]='email';
  			fnames[1]='FNAME';
  			ftypes[1]='text';
  			fnames[2]='LNAME';
  			ftypes[2]='text';
  			var $mcj = jQuery.noConflict(true);
  		});
  	});

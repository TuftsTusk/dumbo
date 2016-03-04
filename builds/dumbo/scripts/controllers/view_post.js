'use strict';

/**
 * @ngdoc function
 * @name dumboApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the dumboApp
 */
angular.module('dumboApp')
  .controller('ViewCtrl', function () {
  	console.log('ViewCtrl');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

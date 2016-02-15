angular.module('dumboApp')
    .service('listingDataService', function($http,$q, EnvironmentConfig) {

  var host = EnvironmentConfig.api;
  var listingPath = '/listing';
  delete $http.defaults.headers.common['X-Requested-With'];
  this.newListing = function(listing) {
    return $http.post(host + listingPath, listing);
  }
});
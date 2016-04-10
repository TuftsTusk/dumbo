angular.module('dumboApp')
    .service('listingDataService', function($http, $q, EnvironmentConfig) {

  var host = EnvironmentConfig.api;
  var listingPath = '/listing';
  delete $http.defaults.headers.common['X-Requested-With'];
  this.newListing = function(listing) {
    return $http.post(host + listingPath, listing);
  }
  this.getListings = function() {
    return $http.get(host + listingPath);
  }
  this.getListingById = function(id) {
    return $http.get(host + listingPath + '/' + id);
  }
});

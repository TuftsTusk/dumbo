angular.module('dumboApp')
.service('listingDataService', function($http, $q, EnvironmentConfig, SweetAlert) {

    var host = EnvironmentConfig.api;
    var listingPath = '/listing';
    var mePath = '/me';
    var contactPath = '/contactSeller';
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
    this.getMeListing = function(id) {
        return $http.get(host + mePath + listingPath);
    }
    this.contactSeller = function(id, message) {
        return $http.post(host + listingPath + '/' + id + contactPath, {"message":message});
    }

});

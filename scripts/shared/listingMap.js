angular.module('dumboApp')
  .service('listingMap', function() {
    var defaultField = 'MiscListing';
    var categories = {
        'SubletListing': function() {
          return 'Sublet';
        },
        'BookListing': function() {
          return 'Book';
        },
        'FurnitureListing': function() {
            return 'Furniture';
        },
        'MiscListing': function() {
          return 'Miscellaneous';
        }
    };
    var fields = {
        'SubletListing': function() {
          return [

            {
              displayName: 'Title',
              name:'title',
              required:'true',
              type:'text',
              class:''
            },
            {
              displayName: 'Address',
              name:'address',
              required:'true',
              type:'text',
              class:''
            },
            {
              displayName: 'Description',
              name:'description',
              required:'true',
              type:'textarea',
              class:''
            },
            {
              displayName: 'Utilities',
              name:'utilities',
              type:'text',
              class:''
            },
            {
              displayName: 'Parking',
              name:'parking',
              type:'checkbox'
            },
            {
              displayName:'Move in Date',
              name:'movein',
              required:true,
              type:'datetime-local',
              class:''
            }
          ];
        },
        'BookListing': function() {
          return [
            {
              displayName: 'Title',
              name:'title',
              required:'true',
              type:'text',
              class:'largeBtn',
              minlength:5
            },
            {
              displayName: 'Price ($)',
              name:'price',
              required:'true',
              type:'number',
              class:'smallBtn'
            },
            {
              displayName:'ISBN',
              name:'isbn',
              required:'true',
              type:'text',
              class:'md-block'
            },
            {
              displayName:'Class Name',
              name:'classname',
              required:'false',
              type:'text',
              class:'md-block'
            }
          ];
        },
        'FurnitureListing': function() {
            return [];
        },
        'MiscListing': function() {
          return [
            {
              displayName:'Title',
              name:'title',
              required:'true',
              type:'text',
              class:'largeBtn',
              minlength:5
            },
            {
              displayName: 'Price ($)',
              name:'price',
              required:'true',
              type:'number',
              class:'smallBtn'
            },
            {
              displayName: 'Description',
              name:'description',
              required:'true',
              type:'textarea',
              class:'md-block'
            }
          ];
        }
    };
    this.getFieldsByType = function(type){
      if (fields[type]){
        return fields[type]();
      } else {
        return fields[defaultField]();
      }
    };
    this.getListingTypeByType = function(type) {
      if (categories[type]){
        return categories[type]();
      } else {
        return categories[defaultField]();
      }
    };

});

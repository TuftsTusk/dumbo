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
              class:'form-control'
            },
            {
              displayName: 'Address',
              name:'address',
              required:'true',
              type:'text',
              class:'form-control'
            },
            {
              displayName: 'Description',
              name:'description',
              required:'true',
              type:'textarea',
              class:'form-control'
            },
            {
              displayName: 'Utilities',
              name:'utilities',
              type:'text',
              class:'form-control'
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
              class:'form-control'
            }
          ];
        },
        'BookListing': function() {
          return [
            {
              displayName: 'Title',
              name:'title',
              required:true,
              type:'text',
              class:'form-control'
            },
               {
              displayName:'Author',
              name:'author',
              required:true,
              type:'text',
              class:'form-control'
            },
               {
              displayName:'Edition',
              name:'edition',
              required:false,
              type:'text',
              class:'form-control'
            },
            {
              displayName:'ISBN',
              name:'isbn',
              required:false,
              type:'text',
              class:'form-control'
            },
            {
              displayName:'Course Title (ex. PSY 17)',
              name:'pertinent_class',
              required:false,
              type:'text',
              class:'form-control'
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
              class:'form-control'
            },
            {
              displayName: 'Description',
              name:'description',
              required:'true',
              type:'textarea',
              class:'form-control'
            },
            {
              displayName: 'Price',
              name:'price',
              required:'true',
              type:'number',
              class:'form-control'
            },
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

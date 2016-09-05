angular.module('dumboApp')
  .service('listingMap', function() {
    var defaultField = 'MiscListing';
    var categories = {
        'SubletListing': function() {
          return 'Sublets';
        },
        'BookListing': function() {
          return 'Books';
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
              displayName: 'Address',
              name:'address',
              subField:'apt_info',
              required:'true',
              type:'text',
              class:'md-block'
            },
            {
              displayName: 'Total Number of Occupants',
              name:'num_occupants',
              subField:'apt_info',
              required:'true',
              type:'number',
              class:'largeBtn'
            },
            {
              displayName: 'Number of Available Rooms',
              name:'description',
              required:'true',
              type:'number',
              class:'largeBtn'
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
              required:'false',
              type:'text',
              class:'md-block'
            },
            {
              displayName:'Class Name',
              name:'pertinent_class',
              required:'false',
              type:'text',
              class:'md-block'
            }
          ];
        },
        'FurnitureListing': function() {
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
                displayName: 'Condition',
                name:'condition',
                required:'true',
                type:'text',
                class:'smallBtn'
              },
              {
                displayName: 'Description',
                name:'description',
                required:'true',
                type:'textarea',
                class:'largeBtn'
              },
              {
                displayName: 'Length (feet)',
                name:'length',
                subField:'dimensions',
                required:'false',
                type:'number',
                class:'smallBtn'
              },
              {
                displayName: 'Width (feet)',
                name:'width',
                subField:'dimensions',
                required:'false',
                type:'number',
                class:'smallBtn'
              },
              {
                displayName: 'Height (feet)',
                name:'height',
                subField:'dimensions',
                required:'false',
                type:'number',
                class:'smallBtn'
              },
              {
                displayName: 'Manufacturer',
                name:'manufacturer',
                subField:'model_info',
                required:'false',
                type:'text',
                class:'smallBtn'
              },
              {
                displayName: 'Model Name',
                name:'model_name',
                subField:'model_info',
                required:'false',
                type:'text',
                class:'smallBtn'
              }


            ];
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

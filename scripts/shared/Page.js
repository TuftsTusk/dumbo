 // Get the page title by Page.title()
 // Set the page title by Page.setTitle('string')
    // by default, setTitle will append ' | Tusk' to the page title. set
    // addTusk to false if you don't want that, e.g. Page.setTitle('string', false)
angular.module('dumboApp')
.factory('Page', function(){
    $('head #defaultTitle').hide();
    $('head #customTitle').show();
    var title = 'Tusk';
    return {
        title: function() { return title; },
        setTitle: function(newTitle, addTusk) {
            title = newTitle;
            if (addTusk == undefined || addTusk) {
                title += ' | Tusk';
            }
        }
    };
});

angular.module('dumboApp')
.factory('Page', function(){
    $('head #defaultTitle').hide();
    $('head #customTitle').show();
    var title = 'Tusk';
    return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
    };
});

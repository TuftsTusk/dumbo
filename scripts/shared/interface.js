$(document).ready(function() {

});

Array.prototype.rentValuesSame = function() {

    for(var i = 1; i < this.length; i++)
    {
        if(this[i].rent !== this[0].rent)
            return false;
    }

    return true;
}

Array.prototype.getMinimumRent = function() {
  return this.reduce(function (p, v) {
    if (v == null || v == undefined){
      return p.rent;
    } else {
      return ( p.rent < v ? p.rent : v );
    }
  });
}

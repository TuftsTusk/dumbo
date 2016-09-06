angular.module('dumboApp')
    .service('sellerContactService', function($http,$q, EnvironmentConfig, SweetAlert, ngToast, listingDataService) {

  this.contactSeller = function(uid){
    if (uid == undefined || uid ==null){
      ///TODO: Send Goolge Analytics event for this failure
      return ngToast.create({
        className: 'warning',
        content: "Contact seller is currently unavailable. Please try again later.",
        timeout: 3000
      })
    };
    swal({  title: "Contact Seller",
        text: "Enter your message to the seller",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        confirmButtonText: "Send Message",
        inputPlaceholder: "Enter a message",
        showLoaderOnConfirm: true
    },
    function(message){
        if (message === false) return false;
        if (message === "") {
            swal.showInputError("Please enter a message");
            return false
        }
        swal("We're sending your message", "Just a moment");
        listingDataService.contactSeller(uid, message).then(
            function success(res){
                swal("You're message to the seller has been sent", "They will respond to your email address" , "success");
            },
            function failure(res){
                if (res && res.data && res.data.message) {
                    swal("I'm sorry I can't do that", res.data.message, "error");
                } else {
                    swal("We're unable to contact the seller. We have been notified. Please try again later.", "We're working on resolving the issue", "error");
                }

            }

        )
    });
  }
});

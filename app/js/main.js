var app = app || {};

$(function() {

  /*
   * Mobile navigation handler (hamburger)
   *
   */
  $('.hamburger').on('click', function() {
    // hide cart if opened
    $('.cart-popup').hide();
    $(this).toggleClass('closeBtn');
    $('.navigation').toggleClass('hidden');
  });


  /*
   * Shop category navigation handlers
   *
   */
  $('.mobile-arrow').on('touchstart', function() {
    var parentNode = $(this).parent();

    if (parentNode.hasClass('opened')) {
      parentNode.removeClass('opened');
    } else {
      parentNode.addClass('opened');
    }
  });

  // Touch somewhere inside category navigation
  $('.categories li').on('touchstart', function(event) {
    event.preventDefault();
    // if touched arrow - do nothing
    if ($(event.target).closest('li').hasClass('mobile-arrow')) {
      return;
    }
    // if nav already was opened
    if ($(event.target).closest('.categories').hasClass('opened')) {
      // TODO: check if we have cheld section
      selectItem(event.target);
    } else {
      $('.categories').addClass('opened');
      selectItem(event.target);
    }
  });

  // Select item handler
  function selectItem(target){
    var $currentItem =  $(target).closest('a');
    // if element already was selected
    // then open current link
    if ($currentItem.hasClass('selected')) {
      location.href = $currentItem.attr('href');
      return;
    }
    $currentItem.addClass('selected');
    // Clear other selections
    $currentItem.parent().siblings().find('a').removeClass('selected');
  }

  // Hide navigation when touch somewhere outside navigation
  $(document).on('touchstart', function(event) {
    if (!$(event.target).closest('.categories').length) {
      $('.categories').removeClass('opened');
      $('.categories li a').removeClass('selected');
    }
  });

});


// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
    {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
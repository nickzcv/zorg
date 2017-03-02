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
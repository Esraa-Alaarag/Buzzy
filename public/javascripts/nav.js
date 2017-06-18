console.log("Nav is connected");

(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space


$(document).ready(function(){
      $('.parallax').parallax();
    });

 $(document).ready(function() {
    $('select').material_select();
  });

  $('.fixed-action-btn').openFAB();
  $('.fixed-action-btn').closeFAB();
  $('.fixed-action-btn.toolbar').openToolbar();
  $('.fixed-action-btn.toolbar').closeToolbar();
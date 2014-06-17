$(function(){

  // move the code from the code pretty stuff into the example
  $('.example-wrapper .prettyprint').each(function(){
    if(!$(this).hasClass("no-duplicate")){
      var example = $(this).html();
      $(this).parents('.example-wrapper').find('.example').html(example);
    }
  });

});
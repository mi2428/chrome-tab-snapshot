$(function(){
  $(".restore-snapshot").addClass("plugin-enabled");
});

$(".restore-snapshot").click(function(){
  var id = $(this).attr("id").split('-',3)[2];
  $('.snapshot-link-' + id).each(function(){
    /*
    var url = $(this).attr('href');
    window.open(url, '_blank');
    */
  });
});

$(".cell").mousedown(function() {
  $(this).css("background-color", "black");
  $(".cell").mouseover(function() {
    $(this).css("background-color", "black");
  });
}).mouseup(function() {
  $(".cell").unbind('mouseover');
});

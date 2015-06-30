
$.fn.equalize = function(){
  var maxHeight = 0;
  this.each(function(){
    var $this = $(this);
    if($this.height() > maxHeight){maxHeight = $this.height();}
  });

  return this.each(function(){
    $(this).height(maxHeight+40);
  });
};


$('#destaques > .carousel .item').each(function(){

  var next = $(this).next();

  if (!next.length) {
    next = $(this).siblings(':first');
  }

  next.children(':first-child').clone().appendTo($(this));

  for (var i=0;i<2;i++) {
    next=next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  }

});

$('.equalize').equalize();

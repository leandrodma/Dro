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

$(document).ready(function(){
    var personalize = $('.yellow-bg:first');
    personalize.height(personalize.width()*0.927);
});

$(window).resize(function() {
    var personalize = $('.yellow-bg:first');
    personalize.height(personalize.width()*0.927);
});
$(document).ready(function() {

	$('#nav').onePageNav({			
			begin: function() {
			console.log('start')},
			
			end: function() {
			console.log('stop')}
	});
	
	$('#logo a').click(
        function () {
					if($(document).scrollTop() !=0){
            			$('html, body').animate({scrollTop: '0px'}, 1000);
						return false;
					}
        }
    );
  $("a.fancylink").fancybox({
    'modal' : true,
    'titleShow' : false
  });
});
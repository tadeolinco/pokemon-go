$('.special.card .image').dimmer({
  on: 'hover'
});

$('.ui.modal').modal('setting',{
    closable  : false,
});

$("#modalButton").click(function() {
	$('.ui.modal').modal('show');
});



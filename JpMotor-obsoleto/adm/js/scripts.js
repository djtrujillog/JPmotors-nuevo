jQuery(document).ready(function(){			
	jQuery(".btn-open, .btn-cancelar").click(function(e){
		e.preventDefault();
		jQuery(".confirmar").slideToggle();
	})	

	jQuery(".btn-open-delete").click(function(e){
		e.preventDefault();
		jQuery(".box-delete").slideToggle();
	})


	jQuery(".btn-close-delete").click(function(e){
		e.preventDefault();
		jQuery(".box-delete").slideToggle();
	})

	jQuery(".btn-close-delete-2").click(function(e){
		e.preventDefault();
		jQuery(".box-delete-2").slideUp();
	})

	jQuery(".btn-open-delete-2").click(function(e){
		e.preventDefault();
		jQuery(".box-delete-2").slideToggle();
		jQuery(".box-delete").slideUp();
	})
});

$(document).ready(function() {
	$('#tabla').DataTable();
	$('#tabla_2').DataTable();
});

//WARNING INFO DANGER
function AlertaBtn(type, string, button){
    Swal.fire({
        position: 'center',
        type: type,
        text: string,
        showConfirmButton: true,
        confirmButtonText: button,
        allowOutsideClick: false
    })
}	
function AlertaBtnHtml(type, string, button){
    Swal.fire({
        position: 'center',
        type: type,
        html: string,
        showConfirmButton: true,
        confirmButtonText: button,
        allowOutsideClick: false
    })
}   
function Alerta(type, string, time){
    Swal.fire({
        position: 'center',
        type: type,
        text: string,
        showConfirmButton: false,
        timer: time
    })
}
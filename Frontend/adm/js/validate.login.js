jQuery(document).ready(function(){
	jQuery("#Ingresar").click(function(){
		var usuario = jQuery("#Usuario").val();        
		var password = jQuery("#Password").val();
		if(usuario == ""){
	        document.getElementById("Usuario").focus();
	        $("#Usuario").addClass("error-dato");               
	        return false;
	    }else{
	    	$("#Usuario").removeClass("error-dato");
	    	if(password == ""){
	            document.getElementById("Password").focus();
	            $("#Password").addClass("error-dato");               
	            return false;
	        }else{ 
	        	$("#Password").removeClass("error-dato");
	        	$("#preloader").show();
			    var url = "page/validar.php"; 
			    $.ajax({
			        type: "POST",
			        url: url,
			        data: $("#form-login").serialize(),
			        success: function(data)
			        {			        	
			        	if(data == 'db'){
			        		$("#preloader").hide();
			        		$(".error-login").fadeIn('fast').html("¡Usuario no existe o permiso denegado!"); 
			        		$("#Usuario").val("");
			        		$("#Password").val("");
			        		document.getElementById("Password").focus();		
			        	}
			        	if(data == 'pass'){
			        		$("#preloader").hide();
			        		$(".error-login").fadeIn('fast').html("¡Contraseña incorrecta!"); 
			        		$("#Password").val("");
			        		document.getElementById("Password").focus();		
			        	}
			        	if(data == 'success'){
			        		location.href ="index";
			        	}	            
			        	setTimeout(function() {	jQuery(".ocultar").slideUp(400); },5000);
			        }
			    }); 		    
		    }
	    }            
		return false;
	});
});
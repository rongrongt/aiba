define(['jquery'],function($){
	function Settlement(opt){

	}
	$('#pay-b').click(function(e){
		e.preventDefault();
		$.ajax({
			url:"./user/getUser.php",
			dataType:"json",
			success:function(result){
				var login= result.login;
				if(login){
					
				}
			}
		})

	})
})

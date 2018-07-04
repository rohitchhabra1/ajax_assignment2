$(function(){
	if (localStorage.getItem('username')){
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');
		loadfile(username, password);
	}
	$('input').focus(function(){
		$('#errormessage').html('');
	});
	$("form").validate({
		rules:{
			username:{
				required:true
			},
			password:{
				required:true,
				minlength:3
			}
		},
		messages:{
			username: "This field is required",
			password: {
				required:"This field is required",
				minlength:"Password minlength 3 characters"
			}
		},
		submitHandler: function(form) {
			console.log('2');
			username = $("#username").val();
			var password = $("#password").val();
			loadfile(username, password);
			return false;
	  	}
	});
	$("#logout").click(function(){
		localStorage.clear();
		location.reload();
	});
});
function loadfile(username, password){
	$.ajax({
		type: "GET",
		url: "data.json",
		dataType: 'json',
		cache: true,
		success: function(data){
			var login = false;
			$.each(data["login"], function(i,obj){
				if(username==obj.username && password==obj.password){
					$("#contain").hide();
					$("#loggedin").css("display","inline-block");
					$("tbody").html("<tr><td>"+obj.username+"</td><td>"+data["data"][i].age +"</td><td>"+data["data"][i].height+"</td><td>"+data["data"][i].address+"</td></tr>")
					login = true;
					localStorage.setItem('username',username);
					localStorage.setItem('password',password);
				}
			});
			if(!login){
				$("#errormessage").html("username and password donot match");	
			}
		},
		error: function(){
			console.log("could not load data");
		}
	});
}
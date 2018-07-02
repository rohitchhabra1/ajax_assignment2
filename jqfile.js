$(function(){
	$("table").hide();
	$("form").submit(function(){
		var username = $("#username").val();
		var password = $("#password").val();
		$.ajax({
			type: "GET",
			url: "data.json",
			dataType: 'json',
			success: function(data){
				var login = false;
				$.each(data["login"], function(i,obj){
					if(username==obj.username && password==obj.password){
						$("#main").hide();
						$("table").show();
						$("tbody").html("<tr><td>"+obj.username+"</td><td>"+data["data"][i].age +"</td><td>"+data["data"][i].height+"</td><td>"+data["data"][i].address+"</td></tr>")
						login = true;
					}
				});
				if(!login){
					alert("username and password donot match");
				}
			},
			error: function(){
				console.log("could not load data");
			}
		});
		return false;
	});
});
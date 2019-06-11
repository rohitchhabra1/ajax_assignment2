$(function(){
	var latitude, longitude;
	var map, marker, con, address, infowindow;
	var position;
	if (localStorage.getItem('username')){
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');
		loadfile(username, password);
	}
	$("#errormessage").click(function(){
		$("#errormessage").css("visibility","hidden");
	});
	$("form").submit(function(event){
		event.preventDefault();
		var username = $("#username").val();
	  	var password = $("#password").val();
		if(!username || !password)
		{
	  		$("#errormessage").css("visibility","visible");
	  		$("#errormessage").html("write valid info and Sign in");
	  	}
	  	else{
	  		loadfile(username, password);
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
					$("#loggedin").css("display","block");
					$("tbody").html("<tr><td>"+obj.username+"</td><td>"+data["data"][i].age +"</td><td>"+data["data"][i].height+"</td><td>"+data["data"][i].address +"</td></tr>");
					login = true;
					position = {lat:data["data"][i].lat, lng:data["data"][i].lng };
					con = "<div id='infowindow' style='width:200px'>" + data["data"][i].content + "</div>";
					address = data["data"][i].address;
					localStorage.setItem('username',username);
					localStorage.setItem('password',password);
				}
			});
			if(!login){
				$("#errormessage").html("Incorrect username or password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>x</b>");
				$("#errormessage").css("visibility","visible");
				return false;
			}
			map.setCenter(position);
			marker = new google.maps.Marker({position:position,map:map,title:address});
			infowindow = new google.maps.InfoWindow({
				content: con
			});
        	marker.addListener('click', function() {
        		infowindow.open(map, marker);
          	});		
          	var i=true;
          	google.maps.event.addListener(map,'click',function(event) {   
          		marker.setPosition({lat:event.latLng.lat(), lng:event.latLng.lng()});   
          		if(i){        
	            	$("table tr").first().append("<th>latitude</th><th>longitude</th>");
	            	$("table tr").last().append("<td id='lat'>"+event.latLng.lat().toPrecision(6)+"</td>"+"<td id='lng'>"+event.latLng.lng().toPrecision(6)+"</td>");
           			i=false;
           		}else{
           			$("#lat").html(event.latLng.lat().toPrecision(6));
           			$("#lng").html(event.latLng.lng().toPrecision(6));
           		}

            });
			
		},
		error: function(){
			console.log("could not load data");
		}
	});
}
function initMap(){
	var center = {lat: 28.5795603,lng: 77.3606211};
	map = new google.maps.Map(document.getElementById("map"),{zoom:13,draggable:false, center:center,disableDoubleClickZoom: true});

}

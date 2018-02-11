$(document).ready(function() {
	$("#weatherSubmit").click(function(e) {
	e.preventDefault();
	var value = $("#weatherInput").val();
    var myurl= "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=3b3753a040fd55761ebbcdb1426dc805";
	$.ajax({
	    url : myurl,
	    dataType : "json",
	    success : function(json) {
	    	var results = "";
		results += '<h2>Weather in ' + json.name + "</h2>";
		/*results += '<div class="weatherimg">'
		for (var i=0; i<json.weather.length; i++) {
		    results += '<img style="text-align:center" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"' + ' class="images" />';
		    
		}
		results += '</div>'*/
		
		results += "<p>"
		results += '<h2>' + json.main.temp + " &deg;F</h2>"
		results += '<h3>' + 'Wind Speed: ' + json.wind.speed + ' mph' + '</h3>'
		results += '<h3>' +  'Wind Direction: ' + json.wind.deg + "&deg;</h3>"
		results += '<h3>' + 'Humidity: ' + json.main.humidity + "%</h3>"
		for (var i=0; i<json.weather.length; i++) {
		    results += '<h3>' + json.weather[i].main + ': ' + json.weather[i].description + '</h3>'
		    
		}
		
		results += "</p>";
		$("#weatherResults").html(results);

		console.log(json);
	    }
		});
    });

	$("#stackSubmit").click(function(e) {
	e.preventDefault();
	var value = $("#stackInput").val();
	var myurl = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=" + value;
		
	$.ajax({
		url : myurl,
		dataType : "json",
		success : function(json) {
			var results = "";
		results += '<div class="result_class"'
		results += '<h2> Results: ' + json.items.length + '</h2>';

		for (var i=0; i<json.items.length; i++) {
			results += '<h4> <a href=' + json.items[i].link + '>' + json.items[i].title + ' -View Count: ' + json.items[i].view_count + '</a></h4>'		
		}//end for
		
		results += '</div>'

		$("#stackResults").html(results);
		console.log(json);
		}//json function
		})//end ajax function

	})//end click function



});